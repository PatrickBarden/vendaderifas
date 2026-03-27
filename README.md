# Venda de Rifas

Frontend em React + Vite para uma plataforma de campanhas, rifas e área administrativa.

## Rodando localmente

1. Instale as dependências com `npm install`
2. Copie `.env.example` para `.env.local`
3. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` quando quiser conectar o Supabase
4. Rode `npm run dev`

## Scripts

- `npm run dev`: inicia o servidor local
- `npm run build`: gera a versão de produção
- `npm run preview`: pré-visualiza o build local
- `npm run typecheck`: valida os tipos TypeScript
- `npm run clean`: remove a pasta `dist`

## Estrutura

- `src/app`: bootstrap e providers
- `src/routes`: roteamento da aplicação
- `src/components`: layouts e componentes compartilhados
- `src/features`: páginas por domínio
- `src/data`: mocks centralizados
- `src/lib`: utilitários e integrações
- `src/types`: tipos de domínio
