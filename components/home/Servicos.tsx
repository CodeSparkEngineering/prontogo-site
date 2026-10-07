"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicos } from "@/lib/content";
import Icone, { type NomeIcone } from "@/components/home/Icones";

const ICONES_SERVICO: NomeIcone[] = ["expresso", "paletes", "loja"];
import FundoVivo from "@/components/home/FundoVivo";

gsap.registerPlugin(ScrollTrigger);

// Serviços em galeria horizontal: em ecrãs largos a secção fica presa e o
// scroll vertical desloca os cartões para o lado. Em mobile (e com movimento
// reduzido) é uma lista vertical normal — o pin horizontal em ecrã tátil
// luta com o gesto do polegar.
export default function Servicos() {
  const raiz = useRef<HTMLElement>(null);
  const pista = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    const trilho = pista.current;
    if (!el || !trilho) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distancia = () =>
          Math.max(0, trilho.scrollWidth - document.documentElement.clientWidth);

        const tween = gsap.to(trilho, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".sv-progresso-barra", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distancia()}`,
            scrub: true,
          },
        });

        // Cada imagem desliza dentro da moldura enquanto o cartão atravessa o
        // ecrã — paralaxe horizontal ligada à animação do trilho
        Array.from(el.querySelectorAll<HTMLElement>(".sv-img img")).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      },
      el,
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="servicos" className="h-escuro sv" ref={raiz}>
      <FundoVivo />
      <div className="sv-pista" ref={pista}>
        <div className="sv-intro">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Serviços
          </p>
          <h2 className="h-titulo">
            Tudo o que a sua empresa precisa de mover.{" "}
            <span className="h-serif h-enfase">Numa só operação.</span>
          </h2>
          <p className="h-lead">
            Do envelope urgente à palete entre armazéns: a mesma equipa e a
            mesma carrinha, sem passar a sua carga de mão em mão.
          </p>
          <span className="sv-dica" aria-hidden="true">
            Continue a rolar <span>→</span>
          </span>
        </div>

        {servicos.map((s, i) => (
          <article className="sv-cartao" key={s.titulo}>
            <div className="sv-img">
              <Image
                src={s.img}
                alt={s.imgAlt}
                width={900}
                height={675}
                sizes="(max-width: 960px) 100vw, 520px"
              />
              <Icone nome={ICONES_SERVICO[i]} tamanho={54} className="sv-icone" />
            </div>
            <div className="sv-corpo">
              <span className="sv-num">0{i + 1}</span>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </div>
          </article>
        ))}

        <div className="sv-fim">
          <p className="sv-fim-texto">
            Precisa de outra coisa?{" "}
            <span className="h-serif h-enfase">Fale connosco.</span>
          </p>
          <a className="h-btn h-btn--laranja" href="#contacto">
            Pedir orçamento
            <span className="h-btn-seta" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="sv-progresso" aria-hidden="true">
        <span className="sv-progresso-barra" />
      </div>
    </section>
  );
}
