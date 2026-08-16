// Configuração do site partilhada por metadata, sitemap, robots e JSON-LD.
// Definir NEXT_PUBLIC_SITE_URL em produção com o domínio real.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prontogo.pt";

// Título com termos de pesquisa reais (entregas expressas, logística,
// Aveiro) — o slogan da marca vive no hero da página e no JSON-LD.
export const siteTitle =
  "ProntoGo — Entregas Expressas e Logística em Aveiro, Portugal e Europa";

export const siteDescription =
  "Logística e entregas rápidas em Aveiro, em todo Portugal e na Europa. Entregas expressas urbanas, last-mile para e-commerce, transporte de mercadorias, logística para PMEs e entregas internacionais na Europa com frota própria.";

// Contactos públicos do site — fonte única usada em Contact, Footer,
// formulário, JSON-LD e API. Valores vazios ("") escondem o canal
// correspondente em todo o site (evita anunciar contactos falsos).
// NOTA: geral@prontogo.pt será criado quando o email profissional for
// contratado; o telefone é placeholder até haver número real.
export const contactoEmail = "geral@prontogo.pt";
// Telefone escondido em todo o site até haver um número real da empresa.
// Para o repor: preencher ambos os valores (E.164 + versão legível).
export const contactoTelefone = ""; // formato E.164, ex.: "+351912345678"
export const contactoTelefoneDisplay = ""; // ex.: "+351 912 345 678"

// Link curto do WhatsApp Business (vazio esconde o botão e o contacto)
export const contactoWhatsapp = "https://wa.me/message/D4VY7QSTGWJXO1";

// IDs das etiquetas do Google, carregadas via gtag.js SÓ depois de o visitante
// aceitar no banner de consentimento (RGPD/ePrivacy). Enquanto ambas estiverem
// vazias, o site não carrega qualquer script do Google nem escreve cookies.
//   - Google Ads: formato "AW-XXXXXXXXX" (ID da conversão / etiqueta Google),
//     em NEXT_PUBLIC_GOOGLE_ADS_ID. NÃO é o ID de cliente (609-749-4280).
//   - Google Analytics 4: formato "G-XXXXXXXXXX" (ID de medição do fluxo web),
//     em NEXT_PUBLIC_GA_ID. NÃO é o número da propriedade (550080143).
export const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
