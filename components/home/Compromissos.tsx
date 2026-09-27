"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { compromissos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Compromissos de serviço — promessas que a empresa cumpre desde o primeiro
// dia. Voltará a ser uma secção de depoimentos quando houver clientes reais
// com testemunhos autênticos.
export default function Compromissos() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      Array.from(el.querySelectorAll<HTMLElement>(".cp-cartao")).forEach((c, i) => {
        const img = c.querySelector(".cp-img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: c, start: "top 85%", once: true },
          delay: i * 0.08,
        });
        tl.fromTo(
          img,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
        )
          .from(img?.querySelector("img") ?? [], { scale: 1.35, duration: 1.6, ease: "expo.out" }, 0.2)
          .from(c.querySelector(".cp-corpo"), { y: 30, opacity: 0, duration: 1, ease: "expo.out" }, 0.5);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-sec h-claro cp" ref={raiz}>
      <div className="h-wrap">
        <div className="h-cabeca">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            O nosso compromisso
          </p>
          <h2 className="h-titulo">
            O que pode <span className="h-serif h-enfase">esperar de nós.</span>
          </h2>
        </div>
        <div className="cp-grelha">
          {compromissos.map((c, i) => (
            <article className="cp-cartao" key={c.titulo}>
              <div className="cp-img">
                <Image
                  src={c.img}
                  alt={c.imgAlt}
                  width={900}
                  height={1125}
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="cp-corpo">
                <span className="cp-num">0{i + 1}</span>
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
