create extension if not exists "pgcrypto";

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  short_description text not null,
  description text not null,
  category text not null check (category in ('pickup', 'car', 'cash')),
  ticket_price numeric(10, 2) not null,
  original_price numeric(10, 2),
  total_tickets integer not null default 0,
  sold_tickets integer not null default 0,
  hero_image text not null,
  gallery text[] default '{}',
  badge text,
  draw_date date not null,
  created_at timestamptz not null default now()
);

create table if not exists public.winners (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id) on delete cascade,
  campaign_title text not null,
  winner_name text not null,
  city text not null,
  state text not null,
  winning_ticket text not null,
  draw_date date not null,
  prize_description text not null,
  image text not null,
  created_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;
alter table public.winners enable row level security;

drop policy if exists "Public can read campaigns" on public.campaigns;
create policy "Public can read campaigns"
on public.campaigns
for select
to anon, authenticated
using (true);

drop policy if exists "Public can read winners" on public.winners;
create policy "Public can read winners"
on public.winners
for select
to anon, authenticated
using (true);
