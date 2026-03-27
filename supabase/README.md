## Supabase

O painel administrativo usa as seguintes estruturas no banco:

- `profiles`: perfis e papeis de acesso (`admin` ou `customer`)
- `campaigns`: campanhas de rifas com status e progresso
- `tickets`: cotas/bilhetes emitidos por campanha
- `payments`: pagamentos usados no dashboard financeiro
- `winners`: historico de contemplados

Para aplicar a configuracao inicial, execute:

`supabase/migrations/20260326_admin_panel.sql`

Para ligar o painel administrativo a numeros reais, execute em seguida:

`supabase/migrations/20260326_admin_real_metrics.sql`

Fluxo recomendado:

1. Rode `20260326_admin_panel.sql` para garantir as tabelas base e politicas.
2. Rode `20260326_admin_real_metrics.sql` para atualizar colunas, relacionamentos e views analiticas.
3. Marque pelo menos um perfil como `admin` em `public.profiles.role`.
4. Garanta que pagamentos concluidos tenham `status = 'completed'`.
5. Relacione `tickets.payment_id` quando houver venda confirmada.
6. Publique ou recarregue o frontend para ele consumir as views novas.

Observacao:

- O frontend ja faz fallback para mocks quando essas tabelas ainda nao existem.
- Para que um usuario entre no painel admin, o campo `role` do perfil ou `app_metadata.role` precisa ser `admin`.
- Depois da segunda migration, dashboard, graficos, campanhas, bilhetes, pagamentos, usuarios e relatorios passam a consumir views reais do banco.
