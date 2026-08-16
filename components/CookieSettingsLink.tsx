"use client";

import { EVENTO_ABRIR_COOKIES } from "@/components/CookieConsent";

// Reabre o banner de consentimento para o visitante rever ou mudar a escolha.
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="footer-cookie-btn"
      onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_COOKIES))}
    >
      Definições de cookies
    </button>
  );
}
