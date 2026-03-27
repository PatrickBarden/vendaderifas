-- Atualizacao real do painel administrativo
-- Objetivo: fazer dashboard, campanhas, bilhetes, pagamentos, usuarios e relatorios
-- consumirem dados reais do banco via views analiticas.

create extension if not exists "pgcrypto";

alter table if exists public.profiles
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists status text not null default 'active',
  add column if not exists last_sign_in_at timestamptz;

alter table if exists public.campaigns
  add column if not exists featured boolean not null default false,
  add column if not exists launch_at timestamptz,
  add column if not exists closed_at timestamptz;

alter table if exists public.payments
  add column if not exists method text not null default 'PIX',
  add column if not exists provider_reference text,
  add column if not exists approved_at timestamptz;

alter table if exists public.tickets
  add column if not exists payment_id uuid references public.payments(id) on delete set null,
  add column if not exists channel text not null default 'site',
  add column if not exists status text not null default 'reserved';

create index if not exists idx_campaigns_status_created_at on public.campaigns(status, created_at desc);
create index if not exists idx_campaigns_featured on public.campaigns(featured, sold_tickets desc);
create index if not exists idx_payments_created_at on public.payments(created_at desc);
create index if not exists idx_payments_status_created_at on public.payments(status, created_at desc);
create index if not exists idx_tickets_reserved_at on public.tickets(reserved_at desc);
create index if not exists idx_tickets_payment_id on public.tickets(payment_id);

-- Backfill minimo para estruturas legadas
update public.payments p
set campaign_title = c.title
from public.campaigns c
where p.campaign_id = c.id
  and (p.campaign_title is null or p.campaign_title = '');

update public.payments p
set customer_name = coalesce(pr.full_name, split_part(pr.email, '@', 1), p.customer_name),
    customer_email = coalesce(pr.email, p.customer_email)
from public.profiles pr
where p.user_id = pr.id
  and (
    p.customer_name is null
    or p.customer_name = ''
    or p.customer_email is null
    or p.customer_email = ''
  );

update public.tickets t
set payment_id = candidate.id,
    status = case when candidate.status = 'completed' then 'paid' else 'reserved' end
from lateral (
  select p.id, p.status
  from public.payments p
  where p.user_id is not distinct from t.user_id
    and p.campaign_id = t.campaign_id
  order by p.created_at desc
  limit 1
) candidate
where t.payment_id is null;

create or replace view public.admin_campaign_performance as
select
  c.id,
  c.code,
  c.title,
  c.hero_image,
  c.sold_tickets,
  c.total_tickets,
  c.ticket_price,
  c.status,
  c.created_at,
  (coalesce(c.sold_tickets, 0) * coalesce(c.ticket_price, 0))::numeric(12,2) as revenue,
  case
    when c.status = 'completed' then 'Finalizado em ' || to_char(coalesce(c.closed_at, c.updated_at, c.created_at), 'DD/MM')
    when c.status = 'draft' then 'Aguardando lancamento'
    else
      case
        when lag(coalesce(c.sold_tickets, 0)) over (order by c.created_at) > 0
          then ((coalesce(c.sold_tickets, 0) - lag(coalesce(c.sold_tickets, 0)) over (order by c.created_at)) * 100.0
            / nullif(lag(coalesce(c.sold_tickets, 0)) over (order by c.created_at), 0))::numeric(10,1)::text || '% vs anterior'
        else '+0.0% vs anterior'
      end
  end as trend_label,
  case
    when c.status = 'completed' then 'Campanha encerrada com desempenho consolidado.'
    when c.status = 'draft' then 'Rascunho aguardando configuracao final.'
    when coalesce(c.sold_tickets, 0) >= coalesce(c.total_tickets, 0) * 0.8 then 'Proxima do encerramento e pronta para acao comercial.'
    else 'Campanha em operacao e captando novas vendas.'
  end as note
from public.campaigns c;

create or replace view public.admin_recent_payments as
select
  p.id,
  p.customer_name,
  p.customer_email,
  p.campaign_title,
  p.amount,
  p.method,
  p.status,
  p.created_at
from public.payments p
order by p.created_at desc;

create or replace view public.admin_ticket_feed as
select
  t.id,
  t.ticket_number,
  t.reserved_at,
  c.title as campaign_title,
  coalesce(pr.full_name, p.customer_name, 'Cliente') as customer_name,
  coalesce(pr.email, p.customer_email, 'sem-email@local') as customer_email,
  coalesce(p.status::text, case when t.status = 'paid' then 'completed' else 'pending' end) as payment_status,
  coalesce(t.channel, p.method, 'site') as channel,
  coalesce(p.method, 'Online') as payment_method
from public.tickets t
left join public.campaigns c on c.id = t.campaign_id
left join public.profiles pr on pr.id = t.user_id
left join public.payments p on p.id = t.payment_id;

create or replace view public.admin_user_summary as
select
  pr.id,
  pr.full_name,
  pr.email,
  pr.role,
  pr.city,
  pr.status,
  pr.created_at,
  count(distinct p.id) filter (where p.status = 'completed') as total_orders,
  coalesce(sum(p.amount) filter (where p.status = 'completed'), 0)::numeric(12,2) as total_spent
from public.profiles pr
left join public.payments p on p.user_id = pr.id
group by pr.id, pr.full_name, pr.email, pr.role, pr.city, pr.status, pr.created_at;

create or replace view public.admin_revenue_daily_7d as
with buckets as (
  select
    generate_series(current_date - interval '6 day', current_date, interval '1 day')::date as bucket_date
),
daily as (
  select
    date_trunc('day', p.created_at)::date as bucket_date,
    coalesce(sum(p.amount) filter (where p.status = 'completed'), 0)::numeric(12,2) as revenue
  from public.payments p
  where p.created_at >= current_date - interval '6 day'
  group by 1
),
joined as (
  select
    b.bucket_date,
    coalesce(d.revenue, 0)::numeric(12,2) as revenue
  from buckets b
  left join daily d on d.bucket_date = b.bucket_date
)
select
  bucket_date,
  upper(to_char(bucket_date, 'Dy')) as day_label,
  revenue,
  revenue = max(revenue) over () and revenue > 0 as is_highlight
from joined
order by bucket_date;

create or replace view public.admin_featured_campaign as
select
  c.id,
  c.title,
  c.hero_image,
  c.badge,
  c.sold_tickets,
  c.total_tickets,
  round(coalesce(c.sold_tickets, 0) * 100.0 / nullif(c.total_tickets, 0))::int as progress_pct
from public.campaigns c
where c.status = 'active'
order by c.featured desc, progress_pct desc nulls last, c.sold_tickets desc
limit 1;

create or replace view public.admin_dashboard_metrics as
with sales as (
  select
    coalesce(sum(amount) filter (where status = 'completed'), 0)::numeric(12,2) as total_sales,
    coalesce(sum(amount) filter (where status = 'completed' and created_at >= date_trunc('month', now())), 0)::numeric(12,2) as monthly_revenue,
    coalesce(sum(amount) filter (
      where status = 'completed'
        and created_at >= date_trunc('month', now()) - interval '1 month'
        and created_at < date_trunc('month', now())
    ), 0)::numeric(12,2) as previous_monthly_revenue,
    coalesce(sum(amount) filter (
      where status = 'completed'
        and created_at >= current_date - interval '60 day'
        and created_at < current_date - interval '30 day'
    ), 0)::numeric(12,2) as previous_total_sales_window
  from public.payments
),
user_counts as (
  select
    count(*)::int as total_users,
    count(*) filter (where created_at >= current_date - interval '30 day')::int as new_users_30d,
    count(*) filter (
      where created_at >= current_date - interval '60 day'
        and created_at < current_date - interval '30 day'
    )::int as previous_new_users_30d
  from public.profiles
),
campaign_counts as (
  select
    count(*) filter (where status = 'active')::int as active_campaigns,
    count(*) filter (
      where status = 'active'
        and created_at >= current_date - interval '30 day'
    )::int as active_campaigns_recent
  from public.campaigns
)
select
  s.total_sales,
  c.active_campaigns,
  u.total_users,
  s.monthly_revenue,
  case
    when s.previous_total_sales_window > 0 then round(((s.total_sales - s.previous_total_sales_window) / s.previous_total_sales_window) * 100, 1)
    else 0
  end as total_sales_growth_pct,
  case
    when u.previous_new_users_30d > 0 then round(((u.new_users_30d - u.previous_new_users_30d)::numeric / u.previous_new_users_30d) * 100, 1)
    else 0
  end as user_growth_pct,
  c.active_campaigns_recent - c.active_campaigns as active_campaigns_delta,
  case
    when s.previous_monthly_revenue > 0 then round(((s.monthly_revenue - s.previous_monthly_revenue) / s.previous_monthly_revenue) * 100, 1)
    else 0
  end as monthly_revenue_growth_pct
from sales s
cross join user_counts u
cross join campaign_counts c;

create or replace view public.admin_report_summary as
with completed_payments as (
  select *
  from public.payments
  where status = 'completed'
),
repeat_customers as (
  select user_id
  from completed_payments
  where user_id is not null
  group by user_id
  having count(*) > 1
),
failed_payments as (
  select count(*)::int as failed_count
  from public.payments
  where status = 'failed'
    and created_at >= current_date - interval '30 day'
),
ticket_stats as (
  select
    count(*)::numeric as total_tickets,
    count(*) filter (where status = 'paid')::numeric as paid_tickets
  from public.tickets
),
top_campaign as (
  select title
  from public.campaigns
  order by sold_tickets desc, created_at desc
  limit 1
)
select
  coalesce(sum(amount), 0)::numeric(12,2) filter (where created_at >= current_date - interval '30 day') as revenue_last_30_days,
  coalesce(avg(amount), 0)::numeric(12,2) as average_ticket,
  case
    when (select total_tickets from ticket_stats) > 0
      then round(((select paid_tickets from ticket_stats) / nullif((select total_tickets from ticket_stats), 0)) * 100, 1)
    else 0
  end as conversion_rate_pct,
  case
    when count(distinct user_id) filter (where user_id is not null) > 0
      then round(((select count(*) from repeat_customers)::numeric / nullif(count(distinct user_id) filter (where user_id is not null), 0)) * 100, 1)
    else 0
  end as repeat_customer_rate_pct,
  (select failed_count from failed_payments) as failed_payments_last_30_days,
  (select title from top_campaign) as top_campaign_title
from completed_payments;

comment on view public.admin_campaign_performance is 'Fonte real da listagem administrativa de campanhas.';
comment on view public.admin_recent_payments is 'Fonte real da tela de pagamentos e widget de pagamentos recentes.';
comment on view public.admin_ticket_feed is 'Fonte real da tela de bilhetes.';
comment on view public.admin_user_summary is 'Resumo real dos usuarios com pedidos e gasto total.';
comment on view public.admin_revenue_daily_7d is 'Serie real usada no grafico semanal do dashboard.';
comment on view public.admin_featured_campaign is 'Campanha em destaque para o dashboard.';
comment on view public.admin_dashboard_metrics is 'Metricas reais do topo do dashboard.';
comment on view public.admin_report_summary is 'Resumo executivo real para a tela de relatorios.';
