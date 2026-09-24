"use client";

import { useEffect } from "react";
import { registarConversao } from "@/lib/conversoes";

// Apanha cliques em QUALQUER link de WhatsApp (wa.me) ou telefone (tel:) do
// site — botão flutuante, simulador, contacto, rodapé, guias — sem cada
// componente ter de saber de conversões. Montado uma vez no layout.
export default function ConversoesCliques() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.href;
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        registarConversao("clique_whatsapp", { origem: a.closest("section")?.id || "site" });
      } else if (href.startsWith("tel:")) {
        registarConversao("clique_telefone", { origem: a.closest("section")?.id || "site" });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
