# Floresce — funil de validação (Fase 0)

Landing page + quiz "Perfil de Comunicação" + pré-venda **Membro Fundador**, para testar tráfego pago
antes de construir o app. Planejamento completo no Obsidian: `Sistemas/Floresce/`.

## Páginas
| Rota | O que é |
|---|---|
| `/` | Landing (gancho das 168 horas) |
| `/quiz` | 19 perguntas + captura do lead (nome, e-mail, WhatsApp opcional, consentimento LGPD) |
| `/resultado` | Perfil nos 5 pilares, sinais de alerta, 2 brincadeiras grátis e a oferta de fundador |
| `/obrigado` | Retorno do checkout |
| `/privacidade` | Política de Privacidade (minuta) |
| `POST /api/lead` | Grava o lead no Supabase e, opcionalmente, chama um webhook do n8n |

## Rodar localmente
```bash
npm install
npm run dev
```
Sem `.env.local`, tudo funciona: os leads só aparecem no log e o botão de compra avisa que falta o checkout.

## Eventos do Pixel
`PageView` · `ViewContent` (landing e resultado) · `QuizStart` · `QuizComplete` · `Lead` · `InitiateCheckout`.
O `Purchase` deve vir da integração de Pixel do gateway (Kirvano), que conhece o valor real.
As UTMs da primeira visita ficam salvas e são repassadas para o link do checkout (+ `src=quiz`).

## Checklist para colocar no ar
- [ ] Escolher o nome definitivo (trocar em `src/lib/config.ts`) e registrar o domínio
- [ ] **Fono parceira revisar** as perguntas e os alertas (`src/lib/quiz.ts`) e as brincadeiras (`src/lib/activities.ts`)
- [ ] **Advogado revisar** a Política de Privacidade (`src/app/privacidade/page.tsx`)
- [ ] Kirvano: criar o produto "Membro Fundador" (R$ 197, pagamento único), com a página de obrigado
      apontando para `https://SEU-DOMINIO/obrigado` e o Pixel configurado para o `Purchase`
- [ ] Supabase: rodar `supabase/schema.sql` e preencher `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Preencher as variáveis do `.env.example` na Vercel e fazer o deploy
- [ ] Meta: verificar o domínio e testar os eventos no Gerenciador de Eventos
- [ ] Testar o fluxo inteiro no celular com `?utm_source=teste&utm_campaign=teste`

## Atenção com o Meta Ads
- Não afirmar nem insinuar condição de saúde de quem vê o anúncio ("Seu filho tem autismo?").
- O Meta pode classificar sites de saúde e limitar eventos de conversão. Se isso acontecer, otimize para
  `Lead` ou para um evento personalizado e acompanhe as vendas pelo gateway.
