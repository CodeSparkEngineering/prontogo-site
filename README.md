# ProntoGo — Site Institucional (Next.js)

Implementação do design **"ProntoGo Site Institucional"** (Claude Design) como projeto **Next.js (App Router) + TypeScript**.

## Stack

- **Next.js 16** (App Router, Server Components)
- **React 19** + **TypeScript**
- **next/font** (Sora via Google Fonts, self-hosted no build)
- **next/image** (otimização automática de imagens)
- CSS global puro (sem framework) — paleta em variáveis CSS

## Estrutura

```
prontogo-next/
├── app/
│   ├── layout.tsx        # Root layout: fonte Sora, metadata, favicon
│   ├── page.tsx          # Página única (composição das seções)
│   └── globals.css       # Estilos globais (paleta, layout, animações)
├── components/
│   ├── SiteHeader.tsx    # Nav fixa
│   ├── Hero.tsx          # Hero com stats, foto e rota animada
│   ├── Services.tsx      # 4 cards de serviços
│   ├── HowItWorks.tsx    # 3 passos com rota tracejada
│   ├── Differentials.tsx # Seção escura: features + métricas
│   ├── About.tsx         # Sobre nós
│   ├── Testimonials.tsx  # Depoimentos + card fotográfico
│   ├── Contact.tsx       # Seção de contacto
│   ├── ContactForm.tsx   # (client) Formulário com painel de sucesso
│   ├── ScrollReveal.tsx  # (client) Reveal on scroll via IntersectionObserver
│   ├── Footer.tsx        # Rodapé
│   └── Icon.tsx          # Ícones de traço no padrão do design
├── lib/
│   └── content.ts        # Conteúdo (serviços, passos, depoimentos…)
└── public/assets/        # Logos SVG + fotos
```

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
```

## ⚠️ Fotos placeholder

As 3 fotos do design (`prontogo-hero-van.png`, `prontogo-armazem.png`, `prontogo-lastmile.png`) excedem o limite de download da API do Claude Design, então há placeholders com a identidade da marca. Para usar as reais:

1. Abra o [projeto no Claude Design](https://claude.ai/design/p/bdf1283e-3049-49e9-84c5-680662c81908)
2. Baixe as 3 imagens da pasta `assets/`
3. Substitua em `public/assets/` mantendo os nomes

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | produção | Domínio público (Open Graph, sitemap, robots) |
| `RESEND_API_KEY` | produção | Chave da API [Resend](https://resend.com) para o formulário |
| `CONTACT_TO_EMAIL` | não | Destino dos pedidos (default: `geral@prontogo.pt`) |
| `CONTACT_FROM_EMAIL` | não | Remetente verificado no Resend |

## Notas

- **Conteúdo**: todo o texto editável está centralizado em `lib/content.ts`; URL/título/descrição do site em `lib/site.ts`.
- **Formulário**: envia via `POST /api/contact` (`app/api/contact/route.ts`) com validação, honeypot anti-spam e envio de email pelo Resend. Sem `RESEND_API_KEY`, devolve 503 e o form mostra fallback com email direto.
- **Redes sociais**: preencher as URLs em `redesSociais` (`lib/content.ts`) para os ícones aparecerem no rodapé — vazias ficam ocultas.
- **SEO**: metadata Open Graph/Twitter em `app/layout.tsx`, JSON-LD (LocalBusiness) em `app/page.tsx`, `robots.txt`/`sitemap.xml` gerados por `app/robots.ts`/`app/sitemap.ts`.
- **Paleta**: navy `#0E2A56` · azul `#1B4B9B` · laranja `#F5820B` — variáveis CSS no topo de `app/globals.css`.
- Animações respeitam `prefers-reduced-motion`.

## Deploy

```bash
npx vercel deploy          # preview
npx vercel deploy --prod   # produção
```
