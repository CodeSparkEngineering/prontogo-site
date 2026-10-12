"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// O texto em partes; as marcadas com `enfase` saem em itálico serifado
const PARTES: { t: string; enfase?: boolean }[] = [
  {
    t: "Somos uma equipa com carrinha própria e base em Sangalhos, Anadia. Quem atende o seu pedido é quem recolhe a carga, faz a viagem e a entrega no destino.",
  },
];

// Manifesto: as palavras acendem à medida que se rola, atadas ao scroll (se
// o visitante recuar, apagam-se). No HTML ficam todas acesas — é o GSAP que
// as põe a meio-tom antes de animar, por isso sem JS ou com movimento
// reduzido o texto lê-se normalmente.
export default function Manifesto() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mf-p",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".mf-texto",
            start: "top 78%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-sec h-claro mf" ref={raiz}>
      <div className="h-wrap mf-grelha">
        <p className="h-eyebrow">
          <span className="h-ponto" />
          Porquê a ProntoGo
        </p>
        <p className="mf-texto">
          {PARTES.map((parte, i) =>
            parte.t.split(" ").map((palavra, j) => (
              <span
                key={`${i}-${j}`}
                className={`mf-p${parte.enfase ? " h-serif mf-enfase" : ""}`}
              >
                {palavra}{" "}
              </span>
            )),
          )}
        </p>
      </div>
    </section>
  );
}
