// Configuração do site partilhada por metadata, sitemap, robots e JSON-LD.
// Definir NEXT_PUBLIC_SITE_URL em produção com o domínio real.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prontogo.pt";

// Título com termos de pesquisa reais (entregas expressas, logística,
// Aveiro) — o slogan da marca vive no hero da página e no JSON-LD.
export const siteTitle =
  "ProntoGo — Entregas Expressas para Empresas em Aveiro, Portugal e Europa";

export const siteDescription =
  "Logística e entregas para empresas em Aveiro, em todo Portugal e na Europa. Entregas expressas urbanas, transporte de mercadorias e paletes, rotas fixas contratadas, logística para PMEs e entregas internacionais na Europa com frota própria.";

// Contactos públicos do site — fonte única usada em Contact, Footer,
// formulário, JSON-LD e API. Valores vazios ("") escondem o canal
// correspondente em todo o site (evita anunciar contactos falsos).
// NOTA: geral@prontogo.pt será criado quando o email profissional for
// contratado.
export const contactoEmail = "geral@prontogo.pt";
// Telefone da empresa. Manter os dois valores sincronizados:
// E.164 (para os links tel:) + versão legível (para mostrar).
export const contactoTelefone = "+351913942714"; // formato E.164
export const contactoTelefoneDisplay = "+351 913 942 714"; // versão legível

// Link curto do WhatsApp Business (vazio esconde o botão e o contacto)
export const contactoWhatsapp = "https://wa.me/message/D4VY7QSTGWJXO1";

// Conversa de WhatsApp com a mensagem já escrita. O link curto
// (wa.me/message/...) NÃO aceita texto pré-preenchido — só a forma com o
// número aceita —, por isso constrói-se a partir do telefone e só se cai
// no link curto se não houver número configurado.
export function whatsappLink(texto?: string): string {
  const numero = contactoTelefone.replace(/\D/g, "");
  if (!numero) return contactoWhatsapp;
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

// IDs das etiquetas do Google, carregadas via gtag.js SÓ depois de o visitante
// aceitar no banner de consentimento (RGPD/ePrivacy). Um ID vazio desativa a
// etiqueta correspondente; sem consentimento nunca se carrega script nenhum.
//   - Google Ads: formato "AW-XXXXXXXXX" (ID da conversão / etiqueta Google),
//     em NEXT_PUBLIC_GOOGLE_ADS_ID. NÃO é o ID de cliente (609-749-4280).
//   - Google Analytics 4: formato "G-XXXXXXXXXX" (ID de medição do fluxo web),
//     em NEXT_PUBLIC_GA_ID. NÃO é o número da propriedade (550080143).
export const googleAdsId =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-18371534478";
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";
