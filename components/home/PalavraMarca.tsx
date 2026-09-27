"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LETRAS = "ProntoGo".split("");

// A palavra ProntoGo à largura do rodapé; as letras sobem uma a uma, atadas
// ao scroll, quando o rodapé entra no ecrã.
export default function PalavraMarca() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".pm-letra", {
        yPercent: 105,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 92%", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pm" ref={raiz} aria-hidden="true">
      {LETRAS.map((l, i) => (
        <span key={i} className={`pm-letra${i >= 6 ? " pm-letra--go" : ""}`}>
          {l}
        </span>
      ))}
    </div>
  );
}
