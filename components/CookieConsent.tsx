"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { googleAdsId, gaId } from "@/lib/site";

// Banner de consentimento de cookies (RGPD/ePrivacy).
//
// Princípio: consentimento PRÉVIO. Nenhum script do Google é carregado e
// nenhum cookie de publicidade é escrito até o visitante clicar em "Aceitar".
// Se recusar (ou fechar sem aceitar), não se carrega nada. A escolha fica
// guardada em localStorage — que é armazenamento estritamente necessário
// (guardar a própria preferência de consentimento), isento de consentimento.

const CHAVE = "prontogo-consent-v1";
export const EVENTO_ABRIR_COOKIES = "prontogo:cookies";

type Escolha = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let tagCarregado = false;

// Carrega o(s) tag(s) do Google apenas depois do consentimento e apenas para os
// IDs configurados (Ads e/ou Analytics). Idempotente: nunca injeta duas vezes.
function carregarGoogleTag() {
  const ids = [gaId, googleAdsId].filter(Boolean);
  if (tagCarregado || ids.length === 0) return;
  tagCarregado = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  // Consent Mode v2 — só chegamos aqui depois de o utilizador aceitar. Concede
  // apenas os tipos de armazenamento correspondentes às etiquetas ativas.
  gtag("consent", "default", {
    ad_storage: googleAdsId ? "granted" : "denied",
    ad_user_data: googleAdsId ? "granted" : "denied",
    ad_personalization: googleAdsId ? "granted" : "denied",
    analytics_storage: gaId ? "granted" : "denied",
  });
  gtag("js", new Date());
  ids.forEach((id) => gtag("config", id));
}

export default function CookieConsent() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem(CHAVE) as Escolha | null;
    if (guardado === "accepted") {
      carregarGoogleTag();
    } else if (guardado !== "rejected") {
      setVisivel(true);
    }

    // Permite reabrir o banner a partir do rodapé ("Definições de cookies").
    function abrir() {
      setVisivel(true);
    }
    window.addEventListener(EVENTO_ABRIR_COOKIES, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_COOKIES, abrir);
  }, []);

  function guardar(escolha: Escolha) {
    localStorage.setItem(CHAVE, escolha);
    if (escolha === "accepted") carregarGoogleTag();
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Consentimento de cookies"
    >
      <div className="cookie-text">
        <strong>Cookies de publicidade e análise</strong>
        <p>
          Usamos cookies do Google (Ads e Analytics) para medir a eficácia dos
          nossos anúncios e perceber como o site é usado. São opcionais e só
          ativados com a sua autorização. Saiba mais na{" "}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </p>
      </div>
      <div className="cookie-acoes">
        <button
          type="button"
          className="cookie-btn cookie-btn-recusar"
          onClick={() => guardar("rejected")}
        >
          Recusar
        </button>
        <button
          type="button"
          className="cookie-btn cookie-btn-aceitar"
          onClick={() => guardar("accepted")}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
