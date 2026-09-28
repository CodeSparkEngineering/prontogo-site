"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicosPreco } from "@/lib/precos";
import Icone, { type NomeIcone } from "@/components/home/Icones";
import FundoVivo from "@/components/home/FundoVivo";

gsap.registerPlugin(ScrollTrigger);

const ICONES_MOD: Record<string, NomeIcone> = {
  urbano: "expresso",
  regional: "carrinha",
  nacional: "continente",
  dedicada: "dedicada",
};

const C = 300; // centro do gráfico (Aveiro)

// Anéis por alcance, não um mapa à escala: cada anel é uma modalidade de
// serviço e as cidades ficam no anel certo, na direção aproximada.
const ANEIS = [
  { r: 92, rotulo: "até 100 km" },
  { r: 170, rotulo: "até 250 km" },
  { r: 238, rotulo: "todo o continente" },
  { r: 290, rotulo: "Europa · frota própria" },
];

// `direita` escolhe o lado do rótulo, para não colidir com os rótulos dos
// anéis, que ficam todos no topo
const CIDADES = [
  { nome: "Porto", km: "≈ 70 km", r: 92, ang: -125, direita: false },
  { nome: "Viseu", km: "≈ 90 km", r: 92, ang: -20, direita: true },
  { nome: "Coimbra", km: "≈ 60 km", r: 92, ang: 105, direita: false },
  { nome: "Lisboa", km: "≈ 250 km", r: 170, ang: 115, direita: false },
];

const ponto = (r: number, graus: number) => {
  const a = (graus * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

export default function Cobertura() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cb-grafico",
          start: "top 80%",
          end: "center 45%",
          scrub: 0.6,
        },
      });
      tl.from(".cb-anel", {
        scale: 0,
        opacity: 0,
        transformOrigin: "50% 50%",
        stagger: 0.18,
        ease: "power2.out",
      })
        .from(
          ".cb-cidade",
          { scale: 0, opacity: 0, transformOrigin: "50% 50%", stagger: 0.12, ease: "back.out(2)" },
          0.35,
        )
        .from(".cb-rotulo-anel", { opacity: 0, stagger: 0.1 }, 0.5);

      // Entrada vertical: a deslizar da direita, as linhas ainda por animar
      // alargavam a página e davam scroll horizontal em mobile
      gsap.from(".cb-modalidade", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".cb-lista", start: "top 82%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cobertura" className="h-sec h-escuro cb" ref={raiz}>
      <FundoVivo />
      <div className="h-wrap">
        <div className="h-cabeca">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Cobertura
          </p>
          <h2 className="h-titulo">
            De Aveiro para o continente.{" "}
            <span className="h-serif h-enfase">E para a Europa.</span>
          </h2>
        </div>

        <div className="cb-grelha">
          <div className="cb-grafico">
            <svg
              viewBox="0 0 600 600"
              role="img"
              aria-labelledby="cb-titulo-svg"
            >
              <title id="cb-titulo-svg">
                Alcance a partir de Aveiro: Porto, Viseu e Coimbra até 100 km,
                Lisboa até 250 km, todo o continente e a Europa com frota
                própria
              </title>
              <defs>
                <linearGradient id="cb-varrimento-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#F5820B" stopOpacity="0" />
                  <stop offset="1" stopColor="#F5820B" stopOpacity=".2" />
                </linearGradient>
              </defs>

              {ANEIS.map((a, i) => (
                <circle
                  key={a.r}
                  className={`cb-anel${i === ANEIS.length - 1 ? " cb-anel--europa" : ""}`}
                  cx={C}
                  cy={C}
                  r={a.r}
                />
              ))}

              <g className="cb-varrimento">
                <path
                  d={`M${C} ${C}L${C + 290} ${C}A290 290 0 0 0 ${ponto(290, -38).x} ${ponto(290, -38).y}Z`}
                  fill="url(#cb-varrimento-grad)"
                />
              </g>

              {ANEIS.map((a) => (
                <text
                  key={a.rotulo}
                  className="cb-rotulo-anel"
                  x={C}
                  y={C - a.r - 8}
                  textAnchor="middle"
                >
                  {a.rotulo}
                </text>
              ))}

              <circle className="cb-pulso" cx={C} cy={C} r="14" />
              <circle className="cb-pulso cb-pulso--2" cx={C} cy={C} r="14" />
              <circle className="cb-hub" cx={C} cy={C} r="9" />
              <text className="cb-hub-txt" x={C} y={C + 32} textAnchor="middle">
                Aveiro
              </text>

              {CIDADES.map((c) => {
                const p = ponto(c.r, c.ang);
                const { direita } = c;
                return (
                  <g className="cb-cidade" key={c.nome}>
                    <circle cx={p.x} cy={p.y} r="6" className="cb-cidade-ponto" />
                    <text
                      x={p.x + (direita ? 14 : -14)}
                      y={p.y - 2}
                      textAnchor={direita ? "start" : "end"}
                      className="cb-cidade-nome"
                    >
                      {c.nome}
                    </text>
                    <text
                      x={p.x + (direita ? 14 : -14)}
                      y={p.y + 16}
                      textAnchor={direita ? "start" : "end"}
                      className="cb-cidade-km"
                    >
                      {c.km}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="cb-lista">
            <p className="h-lead">
              Quatro modalidades, conforme a urgência e a distância. Todas com
              rastreio e prova de receção.
            </p>
            <ul>
              {servicosPreco.map((s) => (
                <li className="cb-modalidade" key={s.id}>
                  <Icone nome={ICONES_MOD[s.id] ?? "expresso"} tamanho={46} />
                  <div className="cb-mod-corpo">
                    <h3>{s.nome}</h3>
                    <p>{s.descricao}</p>
                  </div>
                  <span className="cb-mod-prazo">{s.prazo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
