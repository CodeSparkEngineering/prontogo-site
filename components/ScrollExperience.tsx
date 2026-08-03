"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Experiência de scroll cinematográfica: um único vídeo multi-shot (3 planos)
// é "esfregado" (scrub) pelo scroll. Elementos coreografados por progresso:
// legendas por capítulo, barras letterbox, rail de capítulos navegável e um
// desfecho em que o vídeo recua para revelar o CTA. Com prefers-reduced-motion
// o vídeo reproduz em loop normal, sem scrub.

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

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function ScrollExperience() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) window.scrollTo(0, 0);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (reduzMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let alvo = 0; // progresso alvo vindo do scroll
    let atual = 0; // progresso suavizado aplicado ao vídeo
    let raf = 0;
    let primado = false;

    // Browsers mobile (iOS Safari, Chrome Android) não descodificam frames
    // até o vídeo ser "desbloqueado" por um play() — sem isto, o scrub via
    // currentTime deixa o ecrã preso no poster. Um play/pause mudo, chamado
    // no arranque e reforçado no primeiro toque (gesto exigido em Low Power
    // Mode / Data Saver), destrava a descodificação.
    function primar() {
      if (primado) return;
      primado = true;
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.preload = "auto";
      if (v.readyState === 0) v.load();
      const p = v.play();
      if (p) {
        p.then(() => v.pause()).catch(() => {
          primado = false;
        });
      } else {
        v.pause();
      }
    }

    function onScroll() {
      const trilho = trilhoRef.current;
      if (!trilho) return;
      const r = trilho.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      alvo = percurso > 0 ? clamp(-r.top / percurso, 0, 1) : 0;
      if (alvo > 0.005) primar();
    }

    function tick() {
      // Interpolação para o scrub não saltar entre eventos de scroll
      atual += (alvo - atual) * 0.12;
      if (Math.abs(alvo - atual) < 0.0005) atual = alvo;

      const v = videoRef.current;
      const d = v?.duration;
      if (v && d && Number.isFinite(d)) {
        v.currentTime = atual * d;
      }

      setProgresso(atual);
      raf = requestAnimationFrame(tick);
    }

    video.pause();
    onScroll();
    // Em mobile (ou com poupança de dados ativa) o vídeo de 8.5MB só começa
    // a descarregar ao primeiro gesto — quem entra e sai não paga o download.
    // Em desktop, o priming imediato garante scrub instantâneo.
    const pouparDados =
      window.matchMedia("(max-width: 640px)").matches ||
      (navigator as { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;
    if (pouparDados) {
      video.preload = "metadata";
    } else {
      primar();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", primar, { passive: true });
    window.addEventListener("pointerdown", primar, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", primar);
      window.removeEventListener("pointerdown", primar);
      cancelAnimationFrame(raf);
    };
  }, [reduzMotion]);

  // Navegação por capítulos: rola até ao ponto do percurso correspondente
  function irPara(p: number) {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const topo = trilho.getBoundingClientRect().top + window.scrollY;
    const percurso = trilho.offsetHeight - window.innerHeight;
    window.scrollTo({ top: topo + p * percurso, behavior: "smooth" });
  }

  // Quem quer informação já não é obrigado a ver a intro toda
  function saltarIntro() {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const topo = trilho.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: topo + trilho.offsetHeight - window.innerHeight + 2 });
  }

  const emViagem = progresso > 0.03 && progresso < FINAL && !reduzMotion;
  const noFinal = progresso >= FINAL || reduzMotion;

  return (
    <div ref={trilhoRef} id="inicio" className="xp-trilho">
      <div className="xp-palco">
        <p className="sr-only">
          Sequência de vídeo: uma carrinha ProntoGo atravessa a ponte sobre o
          canal de Aveiro ao pôr do sol, percorre as ruas de azulejos da cidade
          e um estafeta entrega a encomenda à porta do cliente.
        </p>
        <div className={`xp-moldura${noFinal && !reduzMotion ? " fim" : ""}`}>
          <video
            ref={videoRef}
            className="xp-video"
            src="/assets/prontogo-xp.mp4"
            poster="/assets/prontogo-xp-poster.webp"
            muted
            playsInline
            preload="auto"
            autoPlay={reduzMotion}
            loop={reduzMotion}
            aria-hidden="true"
          />
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
          <h2>Pronta a entregar pelo país inteiro.</h2>
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
