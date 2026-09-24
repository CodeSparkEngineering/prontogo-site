// Eventos de conversão (Google Ads + GA4). Só disparam se o visitante tiver
// aceite cookies — sem consentimento, window.gtag não existe e nada sai.
//
// O Google Ads precisa de um rótulo por conversão ("send_to": "AW-XXX/rótulo").
// Criar as conversões em Google Ads → Objetivos → Conversões e colar os
// rótulos nas variáveis abaixo (.env.local e Vercel). Sem rótulo, envia-se na
// mesma o evento ao GA4 (se configurado), para não perder a medição.
import { googleAdsId } from "@/lib/site";

export type Conversao = "pedido_formulario" | "clique_whatsapp" | "clique_telefone";

const rotulos: Record<Conversao, string> = {
  pedido_formulario: process.env.NEXT_PUBLIC_ADS_LABEL_FORMULARIO ?? "",
  clique_whatsapp: process.env.NEXT_PUBLIC_ADS_LABEL_WHATSAPP ?? "",
  clique_telefone: process.env.NEXT_PUBLIC_ADS_LABEL_TELEFONE ?? "",
};

export function registarConversao(nome: Conversao, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // GA4: evento com nome legível, útil mesmo sem Ads
  window.gtag("event", nome, extra);
  const rotulo = rotulos[nome];
  if (googleAdsId && rotulo) {
    window.gtag("event", "conversion", { send_to: `${googleAdsId}/${rotulo}`, ...extra });
  }
}
