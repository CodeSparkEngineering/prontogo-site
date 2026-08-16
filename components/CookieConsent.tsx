"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { googleAdsId } from "@/lib/site";

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

// Carrega o Google tag apenas depois do consentimento e apenas se houver um ID
// configurado. Idempotente: nunca injeta o script duas vezes.
function carregarGoogleTag() {
  if (tagCarregado || !googleAdsId) return;
  tagCarregado = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("js", new Date());
  // Consent Mode v2 — só chegamos aqui depois de o utilizador aceitar, por
  // isso concedemos o armazenamento de publicidade. Análise fica negada
  // (o site não usa ferramentas de analítica).
  gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "denied",
  });
  gtag("config", googleAdsId);
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
        <strong>Cookies de publicidade</strong>
        <p>
          Usamos cookies do Google Ads para medir a eficácia dos nossos
          anúncios. São opcionais e só ativados com a sua autorização. Saiba
          mais na <Link href="/privacidade">Política de Privacidade</Link>.
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
