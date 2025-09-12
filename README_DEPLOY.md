
# Deploy Guide — Vercel (front) + Render (back)

Este arquivo explica passo-a-passo como publicar o front no Vercel e o back no Render,
incluindo arquivos úteis que já foram adicionados ao repositório (render.yaml, vercel.json, Dockerfiles).

## Visão geral
- Front (Next.js) → Vercel
- Back (Node/Express) → Render (ou via Docker)

### Preparar o repositório
1. Commit e push do seu código para GitHub (branch `main` recomendado).
2. Estrutura sugerida (monorepo):
   - `/server` → backend (Express)
   - `/` ou `/front` → frontend (Next.js)

## Deploy do backend no Render (passo-a-passo)
1. Acesse https://render.com e crie conta (login via GitHub recomendado).
2. No dashboard: New → Web Service.
3. Conecte o repositório Git e selecione branch `main`.
4. Configure **Root directory** para `server` (se monorepo).
5. Preencha:
   - Name: `ecommerce-backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Adicione variáveis de ambiente no painel do Render (Environment):
   - JWT_SECRET=...
   - STRIPE_SECRET_KEY=...
   - STRIPE_WEBHOOK_SECRET=...  (opcional, para webhooks)
   - DATABASE_URL=... (se usar Postgres)
   - SMTP_HOST, SMTP_USER, SMTP_PASS, SUPPORT_EMAIL
7. Clique em **Create Web Service** / **Deploy**.
8. Após o deploy ser concluído, anote a URL: `https://<seu-servico>.onrender.com`.

## Deploy do front no Vercel (passo-a-passo)
1. Acesse https://vercel.com e crie conta (login via GitHub recomendado).
2. No dashboard: Add New Project → Import Git Repository.
3. Se for monorepo, configure o **Root Directory** (onde está o Next.js).
4. Vercel detecta Next.js automaticamente.
5. Em Project Settings → Environment Variables, adicione:
   - NEXT_PUBLIC_API_BASE=https://<seu-backend>.onrender.com
6. Clique em **Deploy**. Após o build, anote a URL pública (ex.: `https://meu-front.vercel.app`).

## Integração e teste
1. No front verifique `components/Api.ts` — ele usa `process.env.NEXT_PUBLIC_API_BASE`.
2. Teste o fluxo em produção:
   - Acesse o front público → teste cadastro, login, adicionar ao carrinho e checkout.
   - Verifique logs no Render (backend) se algo falhar.

## Deploy via Docker (opcional)
- Existem Dockerfiles para backend e front no repositório e um `docker-compose.yml`.
- Para rodar localmente com Docker:
```
docker-compose up --build
```
- Acesse `http://localhost:3000` (front) e `http://localhost:4000` (back).

## Notas finais e troubleshooting
- Garanta que o backend usa `process.env.PORT` (Render fornece a porta automaticamente).
- Habilite CORS no backend para o domínio do front.
- Configure o STRIPE_WEBHOOK_SECRET no Stripe Dashboard e no Render (opcional).
- Logs e erros aparecem nos painéis do Render e Vercel.

---
Se quiser, posso agora:
- Ajustar o `package.json` do servidor para adicionar script `start` se não existir.
- Adicionar exemplo de `Procfile` ou GitHub Actions para CI/CD.
- Fazer commits automáticos e gerar um novo zip com tudo isso integrado.
