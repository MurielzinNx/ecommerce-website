
# Backend para Ecommerce (exemplo)

Este backend minimal implementa:
- Autenticação (register/login) com bcrypt + JWT
- Endpoints para tema (claro/escuro)
- Endpoints de carrinho e pedidos (SQLite)
- Integração com Stripe (exemplo)
- Suporte via email (Nodemailer)

Como usar:
1. Entre em `server/` e rode `npm install`
2. Configure variáveis de ambiente:
   - JWT_SECRET
   - STRIPE_SECRET_KEY
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SUPPORT_EMAIL
3. Rode `npm start`
