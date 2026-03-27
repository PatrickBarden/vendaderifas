-- Painel administrativo Bruno Pickups
-- Execute este script no SQL Editor do Supabase para preparar o backend.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'customer');
  end if;

  if not exists (select 1 from pg_type where typname = 'campaign_status') then
    create type public.campaign_status as enum ('draft', 'active', 'completed');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type public.payment_status as enum ('pending', 'completed', 'failed');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  short_description text not null,
  description text not null,
  category text not null default 'pickup',
  ticket_price numeric(10,2) not null default 0,
  original_price numeric(10,2),
  total_tickets integer not null default 0,
  sold_tickets integer not null default 0,
  hero_image text not null,
  gallery text[] not null default '{}',
  badge text,
  draw_date date,
  status public.campaign_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  ticket_number text not null,
  reserved_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  unique (campaign_id, ticket_number)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  campaign_title text not null,
  amount numeric(10,2) not null default 0,
  status public.payment_status not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.winners (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id) on delete set null,
  campaign_title text not null,
  winner_name text not null,
  city text not null,
  state text not null,
  winning_ticket text not null,
  draw_date date not null,
  prize_description text not null,
  image text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url',
    case
      when coalesce(new.raw_app_meta_data ->> 'role', new.raw_user_meta_data ->> 'role', 'customer') = 'admin' then 'admin'::public.app_role
      else 'customer'::public.app_role
    end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        avatar_url = excluded.avatar_url,
        role = excluded.role,
        updated_at = timezone('utc', now());

  return new;
end
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.tickets enable row level security;
alter table public.payments enable row level security;
alter table public.winners enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin" on public.profiles
for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin" on public.profiles
for update using (auth.uid() = id or public.is_admin());

drop policy if exists "campaigns_public_read" on public.campaigns;
create policy "campaigns_public_read" on public.campaigns
for select using (status <> 'draft' or public.is_admin());

drop policy if exists "campaigns_admin_all" on public.campaigns;
create policy "campaigns_admin_all" on public.campaigns
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "tickets_owner_or_admin" on public.tickets;
create policy "tickets_owner_or_admin" on public.tickets
for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "tickets_admin_all" on public.tickets;
create policy "tickets_admin_all" on public.tickets
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "payments_owner_or_admin" on public.payments;
create policy "payments_owner_or_admin" on public.payments
for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "payments_admin_all" on public.payments;
create policy "payments_admin_all" on public.payments
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "winners_public_read" on public.winners;
create policy "winners_public_read" on public.winners
for select using (true);

drop policy if exists "winners_admin_all" on public.winners;
create policy "winners_admin_all" on public.winners
for all using (public.is_admin()) with check (public.is_admin());

create or replace view public.admin_dashboard_metrics as
select
  coalesce(sum(c.sold_tickets * c.ticket_price), 0)::numeric(12,2) as total_sales,
  count(*) filter (where c.status = 'active') as active_campaigns,
  coalesce((select count(*) from public.profiles), 0) as total_users,
  coalesce((select sum(amount) from public.payments where status = 'completed' and created_at >= date_trunc('month', now())), 0)::numeric(12,2) as monthly_revenue
from public.campaigns c;

comment on view public.admin_dashboard_metrics is 'Resumo para cards do dashboard administrativo.';
