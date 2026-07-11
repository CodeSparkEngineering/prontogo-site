// Configuração do site partilhada por metadata, sitemap, robots e JSON-LD.
// Definir NEXT_PUBLIC_SITE_URL em produção com o domínio real.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prontogo.pt";

export const siteTitle =
  "ProntoGo — Logística inteligente. Entregas que conectam.";

export const siteDescription =
  "Logística e entregas rápidas em Aveiro e em todo Portugal. Entregas expressas urbanas, last-mile para e-commerce, transporte de mercadorias e logística para PMEs.";
