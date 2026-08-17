import type { NextConfig } from "next";

// CSP: além do próprio site, só os domínios do Google tag (Ads + GA4),
// que o CookieConsent injeta apenas após consentimento — sem estas
// exceções o browser bloqueava o tag mesmo com o visitante a aceitar.
// Lista conforme a documentação oficial de CSP para gtag.js.
// 'unsafe-inline' em script-src é exigido pelo bootstrap inline do
// Next.js (sem nonces neste setup estático). Aplicada apenas em
// produção — o dev server precisa de eval para HMR.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.googletagmanager.com https://*.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.pt",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com",
  "frame-src https://td.doubleclick.net https://www.googletagmanager.com",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Impede o browser de adivinhar content-types (mitiga sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Impede o site de ser embebido em iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // O site não usa câmara, microfone nem geolocalização
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: csp }]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Imagens e vídeos de /public são servidos com max-age=0 por
        // omissão, obrigando a revalidar 20+ ficheiros (incl. o vídeo de
        // 8.5MB) em cada visita. Como só mudam quando lhes mudamos o nome,
        // podem ser cacheados por um ano.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file(favicon.ico|apple-touch-icon.png|llms.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
  // Domínio canónico único: www e o alias .vercel.app redirecionam para
  // prontogo.pt (evita conteúdo duplicado no Google)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.prontogo.pt" }],
        destination: "https://prontogo.pt/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "prontogo-next.vercel.app" }],
        destination: "https://prontogo.pt/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
