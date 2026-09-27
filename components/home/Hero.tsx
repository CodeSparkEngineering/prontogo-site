"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { whatsappLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Os dois percursos do gráfico (viewBox 1200×420). O direto é a ProntoGo:
// a mesma carrinha da recolha à entrega. O outro passa por dois centros de
// triagem — é o modelo de rede que não fazemos.
const DIRETO = "M90 300C380 300 700 150 1110 150";
const REDE =
  "M90 300C200 300 260 372 380 372C520 372 600 78 760 78C900 78 980 150 1110 150";

// O hero substitui a antiga intro em vídeo por um gráfico animado em SVG: a
// história da ProntoGo (sem transbordos) contada em movimento, sem 7 MB de
// frames. Tudo o que está no HTML é o estado final — com prefers-reduced-motion
// ou sem JavaScript, vê-se o gráfico completo e parado.
export default function Hero() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const direto = q<SVGPathElement>(".hx-direto")[0];
      const mascara = q<SVGPathElement>(".hx-mascara")[0];
      const lenDireto = direto.getTotalLength();
      const lenRede = mascara.getTotalLength();

      gsap.set(direto, { strokeDasharray: lenDireto, strokeDashoffset: lenDireto });
      gsap.set(mascara, { strokeDasharray: lenRede, strokeDashoffset: lenRede });
      gsap.set(q(".hx-no, .hx-hub"), { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".hx-rotulo"), { opacity: 0, y: 8 });
      gsap.set(q(".hx-van"), { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q(".h-linha-in"), { yPercent: 110, duration: 1.2, stagger: 0.12 })
        .from(q(".hx-sobe"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.35)
        .to(q(".hx-no-inicio"), { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.6)
        .to(q(".hx-rotulo-inicio"), { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        // A rede com triagem desenha-se primeiro, devagar e aos solavancos
        .to(mascara, { strokeDashoffset: 0, duration: 1.8, ease: "power1.inOut" }, 0.8)
        .to(q(".hx-hub"), { scale: 1, duration: 0.5, stagger: 0.45, ease: "back.out(2)" }, 1.15)
        .to(q(".hx-rotulo-rede"), { opacity: 1, y: 0, duration: 0.6 }, 1.6)
        // …e a linha direta passa-lhe à frente
        .to(direto, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" }, 1.5)
        .to(q(".hx-no-meio, .hx-no-fim"), { scale: 1, duration: 0.5, stagger: 0.35, ease: "back.out(2)" }, 1.9)
        .to(q(".hx-rotulo-fim, .hx-rotulo-direto"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 2.3)
        .to(q(".hx-van"), { opacity: 1, duration: 0.3 }, 2.6);

      // A carrinha percorre a linha direta em ciclo
      tl.add(
        gsap.to(q(".hx-van"), {
          duration: 3.4,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 1.4,
          motionPath: {
            path: direto,
            align: direto,
            alignOrigin: [0.5, 0.62],
            autoRotate: true,
          },
        }),
        2.6,
      );

      // Ao sair do hero, o texto sobe mais depressa do que o gráfico
      gsap.to(q(".hx-texto"), {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".hx-grafico"), {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" className="hx" ref={raiz}>
      <div className="hx-grelha" aria-hidden="true" />

      <div className="h-wrap hx-texto">
        <p className="h-eyebrow hx-sobe">
          <span className="h-ponto" />
          Transporte e entregas · Aveiro → Portugal e Europa
        </p>

        <h1 className="hx-titulo">
          <span className="h-linha">
            <span className="h-linha-in">Quem recolhe</span>
          </span>
          <span className="h-linha">
            <span className="h-linha-in h-serif hx-enfase">é quem entrega.</span>
          </span>
        </h1>

        <div className="hx-rodape">
          <p className="hx-lead hx-sobe">
            Uma só carrinha do ponto de recolha à porta do destino. Sem centros
            de triagem nem transbordos — de Aveiro para todo o continente e para
            a Europa.
          </p>
          <div className="hx-ctas hx-sobe">
            <a
              className="h-btn h-btn--laranja"
              href={whatsappLink(
                "Olá! Vim do site e queria pedir um orçamento para um envio.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir orçamento no WhatsApp
              <span className="h-btn-seta" aria-hidden="true">→</span>
            </a>
            <a className="h-btn h-btn--linha" href="#servicos">
              Ver serviços
            </a>
          </div>
        </div>
      </div>

      <div className="hx-grafico">
        <svg
          className="hx-svg"
          viewBox="0 0 1200 420"
          role="img"
          aria-labelledby="hx-svg-titulo"
        >
          <title id="hx-svg-titulo">
            Comparação entre o percurso direto da ProntoGo, da recolha à
            entrega na mesma carrinha, e uma rede que passa por dois centros de
            triagem
          </title>
          <defs>
            <mask id="hx-mascara-rede" maskUnits="userSpaceOnUse">
              <path
                className="hx-mascara"
                d={REDE}
                fill="none"
                stroke="#fff"
                strokeWidth="14"
              />
            </mask>
            <linearGradient id="hx-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#F5820B" />
              <stop offset="1" stopColor="#FFA238" />
            </linearGradient>
          </defs>

          {/* Rede com triagem: tracejado cinzento, revelado pela máscara */}
          <path
            d={REDE}
            fill="none"
            stroke="rgba(238,234,224,.34)"
            strokeWidth="2"
            strokeDasharray="6 9"
            strokeLinecap="round"
            mask="url(#hx-mascara-rede)"
          />
          <g className="hx-hub">
            <rect x="358" y="350" width="44" height="44" rx="6" className="hx-hub-caixa" />
            <path d="M370 372h20M380 362v20" className="hx-hub-marca" />
          </g>
          <g className="hx-hub">
            <rect x="738" y="56" width="44" height="44" rx="6" className="hx-hub-caixa" />
            <path d="M750 78h20M760 68v20" className="hx-hub-marca" />
          </g>
          <g className="hx-rotulo hx-rotulo-rede">
            <text x="760" y="36" textAnchor="middle" className="hx-txt hx-txt--apagado">
              Centro de triagem
            </text>
            <text x="380" y="416" textAnchor="middle" className="hx-txt hx-txt--apagado">
              Centro de triagem
            </text>
          </g>

          {/* Percurso direto ProntoGo */}
          <path
            className="hx-direto"
            d={DIRETO}
            fill="none"
            stroke="url(#hx-grad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <g className="hx-no hx-no-inicio">
            <circle cx="90" cy="300" r="15" className="hx-no-anel" />
            <circle cx="90" cy="300" r="6" className="hx-no-centro" />
          </g>
          <g className="hx-no hx-no-meio">
            <circle cx="555" cy="225" r="5" className="hx-no-centro" />
          </g>
          <g className="hx-no hx-no-fim">
            <circle cx="1110" cy="150" r="15" className="hx-no-anel" />
            <circle cx="1110" cy="150" r="6" className="hx-no-centro" />
          </g>

          <g className="hx-rotulo hx-rotulo-inicio">
            <text x="90" y="262" textAnchor="middle" className="hx-txt">Recolha</text>
          </g>
          <g className="hx-rotulo hx-rotulo-fim">
            <text x="1110" y="112" textAnchor="middle" className="hx-txt">Entrega</text>
          </g>
          <g className="hx-rotulo hx-rotulo-direto">
            <text x="600" y="190" textAnchor="middle" className="hx-txt hx-txt--laranja">
              ProntoGo · direto
            </text>
          </g>

          {/* Carrinha: desenhada virada para +x, centrada pelo alignOrigin */}
          <g className="hx-van" transform="translate(1086 124)">
            <rect x="0" y="4" width="32" height="20" rx="4" fill="#F5820B" />
            <path d="M32 9h8.5l7 7.5V24H32z" fill="#FFA238" />
            <path d="M35 12h5l4 4.5h-9z" fill="#06122A" opacity=".55" />
            <circle cx="10" cy="26" r="4.6" fill="#06122A" stroke="#EEEAE0" strokeWidth="2" />
            <circle cx="38" cy="26" r="4.6" fill="#06122A" stroke="#EEEAE0" strokeWidth="2" />
          </g>
        </svg>

        <ul className="hx-legenda" aria-hidden="true">
          <li>
            <span className="hx-leg-linha" /> ProntoGo — a mesma carrinha do
            início ao fim
          </li>
          <li>
            <span className="hx-leg-linha hx-leg-linha--rede" /> Rede tradicional
            — passa por centros de triagem
          </li>
        </ul>
      </div>
    </section>
  );
}
