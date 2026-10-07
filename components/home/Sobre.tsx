"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Sobre() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // A fotografia abre-se de uma janela estreita para o enquadramento
      // inteiro, atada ao scroll
      gsap.fromTo(
        ".sb-foto",
        { clipPath: "inset(18% 22% 18% 22% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          ease: "none",
          scrollTrigger: { trigger: ".sb-foto", start: "top 90%", end: "top 30%", scrub: true },
        },
      );
      gsap.fromTo(
        ".sb-foto img",
        { scale: 1.3 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".sb-foto", start: "top 90%", end: "bottom top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" className="h-sec h-claro sb" ref={raiz}>
      <div className="h-wrap sb-grelha">
        <div className="sb-foto">
          <Image
            src="/assets/prontogo-equipa.webp"
            alt="Equipa ProntoGo a carregar encomendas na carrinha, numa rua de Aveiro"
            width={1100}
            height={1100}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="sb-texto" data-reveal>
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Sobre nós
          </p>
          <h2 className="h-titulo">
            Nascida em Aveiro,{" "}
            <span className="h-serif h-enfase">feita para o país inteiro.</span>
          </h2>
          <p className="h-lead">
            A ProntoGo nasceu de uma constatação simples: quem tem um negócio
            pequeno em Aveiro merece o mesmo nível de serviço que uma grande
            marca em Lisboa — e raramente o consegue. As transportadoras
            grandes tratam-nos como número; as pequenas nem sempre chegam onde
            é preciso.
          </p>
          <p className="h-lead">
            Somos uma empresa jovem, e fazemos disso uma vantagem: conhecemos
            as ruas onde entregamos, respondemos sem passar por três
            departamentos e adaptamos a operação ao ritmo de quem servimos.
          </p>
          <ul className="sb-pills">
            <li>Sede em Aveiro</li>
            <li>Empresas e PMEs</li>
            <li>Carrinha própria</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
