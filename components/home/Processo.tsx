"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { passos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Ilustrações animadas de cada passo. O movimento é CSS em loop (classes
// .pc-a-*), desligado em globals via prefers-reduced-motion.
function IlustracaoPasso({ indice }: { indice: number }) {
  if (indice === 0) {
    // Pedido: mensagens a chegar ao telemóvel
    return (
      <svg viewBox="0 0 200 200" className="pc-ilustracao" aria-hidden="true">
        <rect x="58" y="22" width="84" height="156" rx="16" className="pc-traco" />
        <path d="M88 36h24" className="pc-traco" />
        <g className="pc-a-bolha pc-a-bolha--1">
          <rect x="70" y="62" width="50" height="20" rx="10" className="pc-cheio-claro" />
        </g>
        <g className="pc-a-bolha pc-a-bolha--2">
          <rect x="84" y="90" width="46" height="20" rx="10" className="pc-cheio-laranja" />
        </g>
        <g className="pc-a-bolha pc-a-bolha--3">
          <rect x="70" y="118" width="58" height="20" rx="10" className="pc-cheio-claro" />
          <path d="M80 128l5 5 9-10" className="pc-traco-escuro" />
        </g>
      </svg>
    );
  }
  if (indice === 1) {
    // Recolha: a caixa entra na carrinha
    return (
      <svg viewBox="0 0 200 200" className="pc-ilustracao" aria-hidden="true">
        <path d="M20 150h160" className="pc-traco pc-chao" />
        <g className="pc-a-carrinha">
          <path d="M70 92h66v54H70z" className="pc-traco" />
          <path d="M136 106h20l14 16v24h-34z" className="pc-traco" />
          <circle cx="92" cy="148" r="9" className="pc-roda" />
          <circle cx="150" cy="148" r="9" className="pc-roda" />
        </g>
        <g className="pc-a-caixa">
          <rect x="30" y="100" width="30" height="28" rx="3" className="pc-cheio-laranja" />
          <path d="M30 110h30M45 100v10" className="pc-traco-escuro" />
        </g>
      </svg>
    );
  }
  // Entrega: o pin cai à porta e confirma
  return (
    <svg viewBox="0 0 200 200" className="pc-ilustracao" aria-hidden="true">
      <circle cx="100" cy="150" r="10" className="pc-a-onda pc-a-onda--1" />
      <circle cx="100" cy="150" r="10" className="pc-a-onda pc-a-onda--2" />
      <ellipse cx="100" cy="152" rx="26" ry="6" className="pc-sombra" />
      <g className="pc-a-pin">
        <path
          d="M100 146s-34-30-34-58a34 34 0 0 1 68 0c0 28-34 58-34 58z"
          className="pc-cheio-laranja"
        />
        <path d="M86 86l10 10 19-20" className="pc-a-visto" />
      </g>
    </svg>
  );
}

export default function Processo() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Só com JS os passos inativos ficam a meio-tom; sem JS lê-se tudo
    el.classList.add("pc--js");

    const ctx = gsap.context(() => {
      // A linha lateral enche-se com o progresso da lista de passos
      gsap.fromTo(
        ".pc-linha-cheia",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".pc-passos",
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
      // Cada passo acende quando chega ao centro do ecrã
      Array.from(el.querySelectorAll<HTMLElement>(".pc-passo")).forEach((p) => {
        ScrollTrigger.create({
          trigger: p,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: "is-ativo",
        });
        gsap.from(p, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: p, start: "top 85%", once: true },
        });
      });
    }, el);
    return () => {
      ctx.revert();
      el.classList.remove("pc--js");
    };
  }, []);

  return (
    <section id="como-funciona" className="h-sec h-claro pc" ref={raiz}>
      <div className="h-wrap pc-grelha">
        <div className="pc-lado">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Como funciona
          </p>
          <h2 className="h-titulo">
            Três passos.{" "}
            <span className="h-serif h-enfase">Sempre as mesmas mãos.</span>
          </h2>
          <p className="h-lead">
            Não há centrais nem intermediários: quem confirma o seu pedido
            sabe quem vai recolher, e quem recolhe é quem entrega.
          </p>
          <a className="h-btn h-btn--escuro" href="#precos">
            Começar um pedido
            <span className="h-btn-seta" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="pc-passos">
          <span className="pc-linha" aria-hidden="true">
            <span className="pc-linha-cheia" />
          </span>
          <ol className="pc-lista">
          {passos.map((p, i) => (
            <li className="pc-passo" key={p.titulo}>
              <div className="pc-arte">
                <IlustracaoPasso indice={i} />
              </div>
              <div className="pc-texto">
                <span className="pc-num">0{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
