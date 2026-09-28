"use client";

import { useEffect, useRef } from "react";

// Percursos do fundo (viewBox 1440×900, cortado para cobrir a secção). O
// pathLength normaliza todos a 1000, para o mesmo traço animado servir a
// linhas de comprimentos diferentes.
const ROTAS = [
  "M-40 690C260 640 420 470 720 500S1180 700 1480 560",
  "M-40 250C220 300 380 140 640 190S1060 380 1480 250",
  "M-40 820C300 800 520 880 820 760S1240 520 1480 600",
  "M120 -40C160 200 420 330 520 520S580 800 700 940",
  "M1060 -40C1000 180 1180 320 1120 520S980 780 1100 940",
];

// Fundo das secções escuras: luz que flutua, luz que segue o rato, rotas
// ténues com pontos de luz a percorrê-las (entregas em movimento) e grão de
// película. Tudo CSS sobre elementos estáticos; o JS só liga o rato e pausa
// as animações quando a secção sai do ecrã.
export default function FundoVivo({ rotas = true }: { rotas?: boolean }) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    const secao = el?.parentElement;
    if (!el || !secao) return;

    const io = new IntersectionObserver(
      ([e]) => el.classList.toggle("is-visivel", e.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(secao);

    // Luz que segue o cursor — só com rato e com movimento permitido
    const comRato = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    let frame = 0;
    function onMove(e: PointerEvent) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = secao!.getBoundingClientRect();
        el!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el!.style.setProperty("--my", `${e.clientY - r.top}px`);
        el!.classList.add("tem-cursor");
      });
    }
    function onLeave() {
      el!.classList.remove("tem-cursor");
    }
    if (comRato) {
      secao.addEventListener("pointermove", onMove);
      secao.addEventListener("pointerleave", onLeave);
    }
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      secao.removeEventListener("pointermove", onMove);
      secao.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="fv" ref={raiz} aria-hidden="true">
      <div className="fv-luz fv-luz--1" />
      <div className="fv-luz fv-luz--2" />
      {rotas && (
        <svg
          className="fv-rotas"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {ROTAS.map((d) => (
            <path key={d} d={d} className="fv-rota" pathLength={1000} />
          ))}
          {ROTAS.map((d, i) => (
            <path
              key={`f${i}`}
              d={d}
              className={`fv-fluxo fv-fluxo--${i + 1}`}
              pathLength={1000}
            />
          ))}
        </svg>
      )}
      <div className="fv-cursor" />
      <div className="fv-grao" />
    </div>
  );
}
