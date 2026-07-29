// Configuração do site partilhada por metadata, sitemap, robots e JSON-LD.
// Definir NEXT_PUBLIC_SITE_URL em produção com o domínio real.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prontogo.pt";

// Título com termos de pesquisa reais (entregas expressas, logística,
// Aveiro) — o slogan da marca vive no hero da página e no JSON-LD.
export const siteTitle =
  "ProntoGo — Entregas Expressas e Logística em Aveiro e todo Portugal";

export const siteDescription =
  "Logística e entregas rápidas em Aveiro e em todo Portugal. Entregas expressas urbanas, last-mile para e-commerce, transporte de mercadorias e logística para PMEs.";

// Contactos públicos do site — fonte única usada em Contact, Footer,
// formulário, JSON-LD e API. Valores vazios ("") escondem o canal
// correspondente em todo o site (evita anunciar contactos falsos).
// NOTA: geral@prontogo.pt será criado quando o email profissional for
// contratado; o telefone é placeholder até haver número real.
export const contactoEmail = "geral@prontogo.pt";
export const contactoTelefone = "+351234000000"; // formato E.164
export const contactoTelefoneDisplay = "+351 234 000 000";

// Link curto do WhatsApp Business (vazio esconde o botão e o contacto)
export const contactoWhatsapp = "https://wa.me/message/D4VY7QSTGWJXO1";
