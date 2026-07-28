import type { NextConfig } from "next";

// CSP: o site não usa scripts/estilos/imagens externos, por isso a política
// pode ser restrita. 'unsafe-inline' em script-src é exigido pelo bootstrap
// inline do Next.js (sem nonces neste setup estático). Aplicada apenas em
// produção — o dev server precisa de eval para HMR.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
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
    return [{ source: "/(.*)", headers: securityHeaders }];
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
