"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Facto {
  /** Número a contar; sem número o valor aparece como texto */
  n?: number;
  valor: string;
  sufixo?: string;
  legenda: string;
}

// Só promessas de serviço e limites da operação — nada de estatísticas de
// volume ou pontualidade que a empresa ainda não pode provar.
const FACTOS: Facto[] = [
  { n: 24, valor: "24", sufixo: "h", legenda: "Serviço expresso para todo o continente." },
  { valor: "Mesmo dia", legenda: "Recolha e entrega nas principais cidades." },
  { n: 640, valor: "640", sufixo: " kg", legenda: "De carga por viagem — do envelope à palete." },
  { n: 100, valor: "100", sufixo: "%", legenda: "Das encomendas com rastreio e prova de receção." },
];

export default function Factos() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      Array.from(el.querySelectorAll<HTMLElement>(".ft-num[data-n]")).forEach((num) => {
        const alvo = Number(num.dataset.n);
        const estado = { v: 0 };
        num.textContent = "0";
        gsap.to(estado, {
          v: alvo,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: num, start: "top 88%", once: true },
          onUpdate: () => {
            num.textContent = String(Math.round(estado.v));
          },
        });
      });

      gsap.from(".ft-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".ft-grelha", start: "top 85%", once: true },
      });
      gsap.from(".ft-traco", {
        scaleX: 0,
        transformOrigin: "0 50%",
        duration: 1.2,
        ease: "expo.inOut",
        stagger: 0.1,
        scrollTrigger: { trigger: ".ft-grelha", start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="h-sec h-claro ft" ref={raiz}>
      <div className="h-wrap">
        <div className="h-cabeca">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Em números
          </p>
          <h2 className="h-titulo">
            Promessas que pode <span className="h-serif h-enfase">cobrar.</span>
          </h2>
        </div>
        <div className="ft-grelha">
          {FACTOS.map((f) => (
            <div className="ft-item" key={f.legenda}>
              <span className="ft-traco" aria-hidden="true" />
              <div className={`ft-valor${f.n === undefined ? " ft-valor--texto" : ""}`}>
                <span className="ft-num" data-n={f.n}>
                  {f.valor}
                </span>
                {f.sufixo && <span className="ft-sufixo">{f.sufixo}</span>}
              </div>
              <p className="ft-legenda">{f.legenda}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
