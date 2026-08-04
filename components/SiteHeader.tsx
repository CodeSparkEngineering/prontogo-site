"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Paths absolutos para os links funcionarem também fora da homepage
const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#precos", label: "Preços" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/guias", label: "Guias" },
];

export default function SiteHeader() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  useEffect(() => {
    if (!menuAberto) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuAberto(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuAberto]);

  return (
    <header className="site-header">
      <nav className="nav container">
        <a href="/#inicio" className="brand" onClick={fecharMenu}>
          <Image
            src="/assets/prontogo-icone-v2.svg"
            alt="ProntoGo"
            width={38}
            height={38}
            className="brand-icon"
          />
          <span className="brand-word">
            Pronto<span className="brand-go">Go</span>
          </span>
        </a>
        {/* CTA compacto visível na barra em mobile (o completo vive no menu) */}
        <a href="/#contacto" className="btn btn-nav nav-cta-m" onClick={fecharMenu}>
          Orçamento
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuAberto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <div
          id="menu-principal"
          className={`nav-links${menuAberto ? " open" : ""}`}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={fecharMenu}>
              {link.label}
            </a>
          ))}
          <a href="/#contacto" className="btn btn-nav" onClick={fecharMenu}>
            Pedir orçamento
          </a>
        </div>
      </nav>
    </header>
  );
}
