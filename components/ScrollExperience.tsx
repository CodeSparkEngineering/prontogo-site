"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { obterLenis, rolarPara } from "@/lib/lenis";
import { SequenciaFrames } from "@/lib/sequenciaFrames";

// Experiência de scroll cinematográfica: uma sequência de frames WebP (extraída
// do vídeo multi-shot de 3 planos) é desenhada num canvas e "esfregada" (scrub)
// pelo scroll — ver lib/sequenciaFrames.ts. Elementos coreografados por progresso:
// legendas por capítulo, barras letterbox, rail de capítulos navegável e um
// desfecho em que o vídeo recua para revelar o CTA. No fim, a secção seguinte
// desliza por cima do palco como uma cortina (o trilho tem 100vh a mais do que
// o percurso da intro; ver .xp-trilho e .zona-cidade no CSS). Com
// prefers-reduced-motion não há canvas: o vídeo original reproduz em loop.

interface Capitulo {
  rotulo: string; // etiqueta no rail de capítulos
  de: number; // progresso [0..1] em que a legenda entra
  ate: number; // progresso em que sai
  kicker: string;
  titulo: string;
  principal?: boolean; // true = título principal da página (h1)
}

const capitulos: Capitulo[] = [
  {
    rotulo: "Aveiro",
    de: 0.0,
    ate: 0.28,
    kicker: "Logística inteligente · Aveiro",
    titulo: "A sua encomenda, entregue no tempo certo.",
    principal: true,
  },
  {
    rotulo: "Em rota",
    de: 0.36,
    ate: 0.58,
    kicker: "Em rota",
    titulo: "Acompanhada em tempo real, rua a rua.",
  },
  {
    rotulo: "Entregue",
    de: 0.64,
    ate: 0.86,
    kicker: "Entregue",
    titulo: "Na porta certa, à hora certa.",
  },
];

// Progresso a partir do qual o vídeo recua e entra o painel final
const FINAL = 0.88;

// Frames da intro, gerados a partir de prontogo-xp.mp4 a 12 fps:
//   ffmpeg -i prontogo-xp.mp4 -vf fps=12 -start_number 0 -c:v libwebp //     -quality 68 -compression_level 6 -preset photo xp-frames-v1/xp-%03d.webp
// Ao regenerar (nova cena, outra cadência) mudar o sufixo da pasta — os
// /assets são servidos com cache imutável — e atualizar o total.
const FRAMES_BASE = "/assets/xp-frames-v1/xp-";
const FRAMES_TOTAL = 145;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function ScrollExperience() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progresso, setProgresso] = useState(0);
  const [reduzMotion, setReduzMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduzMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // A página abre sempre no início: sem isto, o browser restaura a posição
  // de scroll em reloads e no botão "voltar" (incl. bfcache), deixando o
  // visitante a meio da experiência de vídeo.
  // Exceção: quem chega com âncora (/#precos, /#contacto — os anúncios
  // apontam para lá) não vê a intro: salta-se o trilho e rola-se para o
  // alvo. Sem isto, o scrollTo(0, 0) anulava o deep link e o visitante
  // pago caía no topo, à procura do que clicou.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const hash = decodeURIComponent(location.hash.slice(1));
    const alvo = hash && hash !== "inicio" ? document.getElementById(hash) : null;
    if (alvo) {
      // Duas passagens: a primeira antes de as imagens/vídeos assentarem, a
      // segunda depois do layout final, para não ficar a meio da secção.
      const ir = () => alvo.scrollIntoView({ block: "start" });
      ir();
      const t = setTimeout(ir, 300);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted && !location.hash) window.scrollTo(0, 0);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    // Também se consulta a media query diretamente: no primeiro render o
    // estado ainda é false e, sem isto, o carregamento dos frames arrancava
    // para quem pediu menos movimento.
    if (
      reduzMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sequencia = new SequenciaFrames(canvas, {
      base: FRAMES_BASE,
      total: FRAMES_TOTAL,
    });

    let alvo = 0; // progresso alvo vindo do scroll
    let atual = 0; // progresso suavizado aplicado à sequência
    let raf = 0;
    const pointerFino = window.matchMedia("(pointer: fine)").matches;

    // Orçamento de bytes. Desktop: todos os frames de imediato (~6.6MB, o
    // peso do vídeo antigo, mas o scrub arranca logo com 1 frame em cada 4).
    // Mobile: 1 em cada 4 de imediato e metade dos frames após o primeiro
    // gesto — a outra metade nunca vem, como o "skip odd" do site de
    // referência. Com poupança de dados ativa, nada antes do gesto.
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const pouparDados =
      (navigator as { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;
    if (!mobile && !pouparDados) sequencia.carregarAte(3);
    else if (!pouparDados) sequencia.carregarAte(1);

    function aoGesto() {
      sequencia.carregarAte(2);
    }

    function onScroll() {
      const trilho = trilhoRef.current;
      if (!trilho) return;
      const r = trilho.getBoundingClientRect();
      // O último ecrã do trilho é a cortina da secção seguinte: a intro
      // chega a 1 quando ela começa a entrar, não quando o palco sai.
      const percurso = r.height - 2 * window.innerHeight;
      alvo = percurso > 0 ? clamp(-r.top / percurso, 0, 1) : 0;
      if (alvo > 0.005) aoGesto();
    }

    function tick() {
      // Interpolação para o scrub não saltar entre eventos de scroll. Com o
      // Lenis a suavizar o scroll do rato/trackpad ela é leve — senão
      // somavam-se dois atrasos; no toque o scroll é nativo e a suavização
      // fica toda por conta desta.
      const fator = obterLenis() && pointerFino ? 0.35 : 0.12;
      atual += (alvo - atual) * fator;
      if (Math.abs(alvo - atual) < 0.0005) atual = alvo;

      sequencia.desenhar(atual);
      setProgresso(atual);
      raf = requestAnimationFrame(tick);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", aoGesto, { passive: true });
    window.addEventListener("pointerdown", aoGesto, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", aoGesto);
      window.removeEventListener("pointerdown", aoGesto);
      cancelAnimationFrame(raf);
      sequencia.destruir();
    };
  }, [reduzMotion]);

  // Navegação por capítulos: rola até ao ponto do percurso correspondente
  function irPara(p: number) {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const topo = trilho.getBoundingClientRect().top + window.scrollY;
    const percurso = trilho.offsetHeight - 2 * window.innerHeight;
    rolarPara(topo + p * percurso);
  }

  // Quem quer informação já não é obrigado a ver a intro toda: salta para o
  // ponto em que a secção seguinte já tapou o palco por completo.
  function saltarIntro() {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const topo = trilho.getBoundingClientRect().top + window.scrollY;
    rolarPara(topo + trilho.offsetHeight - window.innerHeight + 2, {
      duracao: 0.8,
    });
  }

  // Barras letterbox recolhem bem antes do desfecho (0.7, não FINAL): com o
  // easing do scrub, ao chegar à fronteira com a secção seguinte ainda
  // estariam à vista — criavam um "espaço preto" entre os dois vídeos.
  const emViagem = progresso > 0.03 && progresso < 0.7 && !reduzMotion;
  const noFinal = progresso >= FINAL || reduzMotion;

  return (
    <div ref={trilhoRef} id="inicio" className="xp-trilho">
      <div className="xp-palco">
        <p className="sr-only">
          Sequência de vídeo: uma carrinha ProntoGo atravessa a ponte sobre o
          canal de Aveiro ao pôr do sol, percorre as ruas de azulejos da cidade
          e um estafeta entrega a encomenda à porta do cliente.
        </p>
        {/* Imagem pura de ecrã inteiro até ao fim — sem encolher em cartão.
            O poster fica como fundo do canvas até chegar o primeiro frame. */}
        <div className="xp-moldura">
          {reduzMotion ? (
            <video
              className="xp-video"
              src="/assets/prontogo-xp.mp4"
              poster="/assets/prontogo-xp-poster.webp"
              muted
              playsInline
              preload="auto"
              autoPlay
              loop
              aria-hidden="true"
            />
          ) : (
            <canvas
              ref={canvasRef}
              className="xp-canvas"
              style={{
                backgroundImage: "url(/assets/prontogo-xp-poster.webp)",
              }}
              aria-hidden="true"
            />
          )}
          <div className="xp-vinheta" />
          <div className={`xp-barra xp-barra-topo${emViagem ? " on" : ""}`} />
          <div className={`xp-barra xp-barra-fundo${emViagem ? " on" : ""}`} />
        </div>

        {capitulos.map((c) => {
          const ativa = reduzMotion
            ? c.principal === true
            : progresso >= c.de && progresso < c.ate;
          return (
            <div key={c.rotulo} className={`xp-legenda${ativa ? " on" : ""}`}>
              <div className="kicker">{c.kicker}</div>
              {c.principal ? <h1>{c.titulo}</h1> : <h2>{c.titulo}</h2>}
            </div>
          );
        })}

        <div
          className={`xp-final${noFinal ? " on" : ""}`}
          aria-hidden={!noFinal}
        >
          <Image
            src="/assets/prontogo-icone-v2.svg"
            alt=""
            width={60}
            height={60}
          />
          <h2>Pronta a entregar em Portugal e na Europa.</h2>
          <div className="xp-final-ctas">
            <a href="#contacto" className="btn btn-primary">
              Pedir orçamento
            </a>
            <a href="#servicos" className="link-ghost">
              Conhecer os serviços
            </a>
          </div>
        </div>

        {!reduzMotion && (
          <nav className="xp-caps" aria-label="Capítulos da experiência">
            {capitulos.map((c) => {
              const ativa =
                progresso >= c.de && (progresso < c.ate || c.ate > FINAL);
              return (
                <button
                  key={c.rotulo}
                  type="button"
                  className={`xp-cap${ativa ? " on" : ""}`}
                  onClick={() => irPara(c.de + 0.08)}
                >
                  <span>{c.rotulo}</span>
                  <span className="xp-cap-dot" aria-hidden="true" />
                </button>
              );
            })}
          </nav>
        )}

        {!reduzMotion && (
          <button
            type="button"
            className={`xp-saltar${progresso < FINAL ? " on" : ""}`}
            onClick={saltarIntro}
            tabIndex={progresso < FINAL ? 0 : -1}
          >
            Saltar intro
          </button>
        )}

        <div className={`xp-dica${progresso > 0.03 ? " off" : ""}`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Faça scroll</span>
        </div>
      </div>
    </div>
  );
}
