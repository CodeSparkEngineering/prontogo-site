"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { obterLenis } from "@/lib/lenis";

// Paths absolutos para os links funcionarem também fora da homepage
const links = [
  { href: "/#servicos", id: "servicos", label: "Serviços" },
  { href: "/#como-funciona", id: "como-funciona", label: "Como funciona" },
  { href: "/#cobertura", id: "cobertura", label: "Cobertura" },
  { href: "/#precos", id: "precos", label: "Orçamento" },
  { href: "/#sobre", id: "sobre", label: "Sobre" },
  { href: "/guias", id: "guias", label: "Guias" },
];

// Cabeçalho fixo em vidro escuro. Esconde-se ao descer e volta ao subir,
// para não tapar as secções com animação ligada ao scroll. Nunca se esconde
// com o menu aberto nem no topo da página.
export default function SiteHeader() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [solido, setSolido] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [ativa, setAtiva] = useState("");
  const ultimoY = useRef(0);
  // Só a homepage abre sobre um fundo escuro; nas outras páginas o
  // cabeçalho é sempre sólido para o texto claro ter contraste
  const naHome = usePathname() === "/";

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setSolido(y > 24);
      const desce = y > ultimoY.current;
      if (Math.abs(y - ultimoY.current) > 6) {
        setEscondido(desce && y > 420);
        ultimoY.current = y;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Secção ativa (só existe na homepage; nas outras páginas não há alvos)
  useEffect(() => {
    const secoes = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!secoes.length) return;
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtiva(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    secoes.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-aberto", menuAberto);
    // O Lenis intercepta a roda do rato: tem de parar com o menu aberto,
    // senão a página rola por trás do menu
    if (menuAberto) obterLenis()?.stop();
    else obterLenis()?.start();
    if (!menuAberto) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuAberto(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuAberto]);

  const fechar = () => setMenuAberto(false);

  return (
    <header
      className={`hd${solido || !naHome ? " is-solido" : ""}${
        escondido && !menuAberto ? " is-escondido" : ""
      }${menuAberto ? " is-aberto" : ""}`}
    >
      <nav className="hd-barra" aria-label="Principal">
        <a href="/#inicio" className="hd-marca" onClick={fechar}>
          <Image
            src="/assets/prontogo-icone-v2.svg"
            alt=""
            width={34}
            height={34}
            priority
          />
          <span className="hd-palavra">
            Pronto<span>Go</span>
          </span>
        </a>

        <div className="hd-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={ativa === l.id ? "is-ativa" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="/#contacto" className="hd-cta" onClick={fechar}>
          Pedir orçamento
          <span aria-hidden="true" className="hd-cta-seta">
            →
          </span>
        </a>

        <button
          type="button"
          className="hd-toggle"
          aria-expanded={menuAberto}
          aria-controls="menu-movel"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuAberto((a) => !a)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* inert em vez de hidden: fechado fica fora do foco e dos leitores de
          ecrã, mas continua no DOM para a transição de entrada funcionar */}
      <div
        id="menu-movel"
        className="hd-menu"
        inert={!menuAberto}
        data-lenis-prevent
      >
        <div className="hd-menu-links">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={fechar}
              style={{ transitionDelay: `${80 + i * 45}ms` }}
            >
              <span className="hd-menu-num">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </div>
        <a href="/#contacto" className="h-btn h-btn--laranja" onClick={fechar}>
          Pedir orçamento
        </a>
      </div>
    </header>
  );
}
