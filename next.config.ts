import type { NextConfig } from "next";

const securityHeaders = [
  // Impede o browser de adivinhar content-types (mitiga sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Impede o site de ser embebido em iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // O site não usa câmara, microfone nem geolocalização
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
