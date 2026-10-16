-- Leads do quiz do Floresce. Rode no SQL Editor do Supabase.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  parent_name text not null,
  email text not null,
  whatsapp text,
  child_name text,
  child_age text,
  answers jsonb not null,
  profile jsonb,
  flags text[] not null default '{}',
  utms jsonb not null default '{}',
  marketing_opt_in boolean not null default false,
  consent_version text not null,
  user_agent text
);

-- RLS ligado e sem policies: só o servidor (service role) lê e grava.
-- Dados de criança + desenvolvimento = dado sensível (LGPD arts. 11 e 14).
alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

-- Visão rápida para acompanhar o teste de tráfego por campanha.
create or replace view public.leads_por_campanha
with (security_invoker = true) as
select
  date_trunc('day', created_at)::date as dia,
  coalesce(utms->>'utm_campaign', '(sem campanha)') as campanha,
  coalesce(utms->>'utm_content', '(sem criativo)') as criativo,
  count(*) as leads,
  count(*) filter (where whatsapp is not null) as com_whatsapp,
  count(*) filter (where 'regressao' = any(flags)) as com_regressao
from public.leads
group by 1, 2, 3
order by 1 desc, 4 desc;
