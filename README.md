# ProntoGo — Site Institucional (Next.js)

Implementação do design **"ProntoGo Site Institucional"** (Claude Design) como projeto **Next.js (App Router) + TypeScript**.

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19** + **TypeScript**
- **next/font** (Sora via Google Fonts, self-hosted no build)
- **next/image** (otimização automática de imagens)
- **Lenis** (scroll suave) + **anime.js** (reveals em cascata, mapa de rotas)
- CSS global puro (sem framework) — paleta em variáveis CSS

## Estrutura

```
prontogo-site/
├── app/
│   ├── layout.tsx            # Root layout: fonte, metadata, Lenis, cookies, conversões
│   ├── page.tsx              # Homepage (composição das secções) + JSON-LD
│   ├── globals.css           # Estilos globais (paleta, layout, animações)
│   ├── guias/                # Guias editoriais (/guias e /guias/[slug])
│   ├── pedido-enviado/       # Confirmação do formulário (conversão Google Ads)
│   ├── privacidade/          # Política de privacidade
│   ├── api/contact/route.ts  # Formulário → email via Resend
│   ├── robots.ts · sitemap.ts
│   └── not-found.tsx
├── components/
│   ├── SiteHeader.tsx        # Nav fixa com secção ativa
│   ├── ScrollExperience.tsx  # Intro cinematográfica: frames WebP em canvas, scrub por scroll (h1)
│   ├── Services.tsx · HowItWorks.tsx · CidadeBackground.tsx
│   ├── Differentials.tsx · About.tsx
│   ├── AppRotas.tsx · RotasMapa.tsx   # Secção da app de rotas (em desenvolvimento)
│   ├── Simulador.tsx         # Qualificação do pedido (#precos) → WhatsApp/formulário, sem valores
│   ├── Testimonials.tsx      # Compromissos de serviço
│   ├── GuiasPreview.tsx · GuiaCard.tsx · GuiaConteudo.tsx
│   ├── Faq.tsx · Contact.tsx · ContactForm.tsx · Footer.tsx
│   ├── CookieConsent.tsx     # Consentimento prévio; só depois carrega gtag
│   ├── ConversoesCliques.tsx # Conversões em cliques wa.me / tel:
│   ├── ConversaoPedido.tsx   # Conversão em /pedido-enviado
│   ├── SmoothScroll.tsx · ScrollEffects.tsx
│   └── WhatsappButton.tsx · Icon.tsx
├── lib/
│   ├── content.ts            # Conteúdo (serviços, passos, FAQ, compromissos…)
│   ├── site.ts               # URL, título, contactos, IDs Google
│   ├── guias.ts              # Conteúdo dos guias
│   ├── precos.ts             # Catálogo de serviços/escalões (SEM valores — vai para o browser)
│   ├── tarifario.ts          # Tarifas (só servidor)
│   ├── conversoes.ts         # Eventos de conversão Ads/GA4
│   ├── lenis.ts · sequenciaFrames.ts
└── public/
    ├── llms.txt              # Resumo para motores de resposta (manter alinhado com o site!)
    └── assets/               # Logos, fotos, vídeos e frames da intro (xp-frames-v1/)
```

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
```

## Intro (ScrollExperience)

Os frames em `public/assets/xp-frames-v1/` são gerados a partir de `prontogo-xp.mp4` a 12 fps (comando no topo do componente). Como `/assets` é servido com cache imutável, ao regenerar muda-se o sufixo da pasta. Com `prefers-reduced-motion` reproduz-se o vídeo original. Chegadas com âncora (`/#precos`, `/#contacto`) saltam a intro.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | produção | Domínio público (Open Graph, sitemap, robots) |
| `RESEND_API_KEY` | produção | Chave da API [Resend](https://resend.com) para o formulário |
| `CONTACT_TO_EMAIL` | não | Destino dos pedidos (default: `geral@prontogo.pt`) |
| `CONTACT_FROM_EMAIL` | não | Remetente verificado no Resend |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | não | Etiqueta Google Ads (default no `lib/site.ts`) |
| `NEXT_PUBLIC_GA_ID` | não | ID de medição GA4 |
| `NEXT_PUBLIC_ADS_LABEL_FORMULARIO` / `_WHATSAPP` / `_TELEFONE` | não | Rótulos das conversões do Google Ads |

## Notas

- **Conteúdo**: todo o texto editável está centralizado em `lib/content.ts`; URL/título/descrição do site em `lib/site.ts`.
- **Formulário**: envia via `POST /api/contact` (`app/api/contact/route.ts`) com validação, honeypot anti-spam e envio de email pelo Resend. Sem `RESEND_API_KEY`, devolve 503 e o form mostra fallback com email direto. Sucesso redireciona para `/pedido-enviado`.
- **Conversões**: `lib/conversoes.ts` dispara eventos GA4 e, com os rótulos `NEXT_PUBLIC_ADS_LABEL_*` preenchidos, conversões Google Ads — no `/pedido-enviado` e em qualquer clique `wa.me`/`tel:`. Só após consentimento de cookies.
- **Preços**: não são publicados. `lib/precos.ts` é importado no cliente — nunca pôr valores lá; as tarifas vivem em `lib/tarifario.ts`.
- **Redes sociais**: preencher as URLs em `redesSociais` (`lib/content.ts`) para os ícones aparecerem no rodapé — vazias ficam ocultas.
- **SEO**: metadata Open Graph/Twitter em `app/layout.tsx`, JSON-LD (LocalBusiness) em `app/page.tsx`, `robots.txt`/`sitemap.xml` gerados por `app/robots.ts`/`app/sitemap.ts`.
- **Paleta**: navy `#0E2A56` · azul `#1B4B9B` · laranja `#F5820B` — variáveis CSS no topo de `app/globals.css`.
- Animações respeitam `prefers-reduced-motion`.

## Deploy

```bash
npx vercel deploy          # preview
npx vercel deploy --prod   # produção
```
