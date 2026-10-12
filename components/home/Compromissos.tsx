"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { compromissos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Compromissos de serviço — promessas que a empresa cumpre desde o primeiro
// dia. Só texto: as fotografias voltam quando houver fotos reais da equipa. Voltará a ser uma secção de depoimentos quando houver clientes reais
// com testemunhos autênticos.
export default function Compromissos() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".cp-cartao", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".cp-grelha", start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-sec h-claro cp" ref={raiz}>
      <div className="h-wrap">
        <div className="h-cabeca">
          <h2 className="h-titulo">O que pode esperar de nós</h2>
        </div>
        <div className="cp-grelha">
          {compromissos.map((c) => (
            <article className="cp-cartao" key={c.titulo}>
              <div className="cp-corpo">
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
