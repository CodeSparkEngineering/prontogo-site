"use client";

import { useEffect, useRef, useState } from "react";

// Experiência de scroll: dois vídeos contínuos (o 2º começa no último frame
// do 1º) são "esfregados" (scrub) pelo scroll — o tempo do vídeo segue a
// posição de scroll em vez de reproduzir sozinho. Com prefers-reduced-motion,
// os vídeos reproduzem normalmente em loop, sem scrub.

interface Legenda {
  de: number; // progresso global [0..1] em que a legenda entra
  ate: number; // progresso em que sai
  kicker: string;
  titulo: string;
  principal?: boolean; // true = título principal da página (h1)
}

const legendas: Legenda[] = [
  {
    de: 0.0,
    ate: 0.3,
    kicker: "Logística inteligente · Aveiro",
    titulo: "A sua encomenda, entregue no tempo certo.",
    principal: true,
  },
  { de: 0.34, ate: 0.76, kicker: "Em rota", titulo: "Acompanhada em tempo real." },
  { de: 0.8, ate: 1.01, kicker: "Entregue", titulo: "Na porta certa, à hora certa." },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function ScrollExperience() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [progresso, setProgresso] = useState(0);
  const [reduzMotion, setReduzMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduzMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduzMotion) return;
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    let alvo = 0; // progresso alvo vindo do scroll
    let atual = 0; // progresso suavizado aplicado aos vídeos
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
      for (const v of [video1Ref.current, video2Ref.current]) {
        if (!v) continue;
        v.muted = true;
        if (v.preload !== "auto") v.preload = "auto";
        if (v.readyState === 0) v.load();
        const p = v.play();
        if (p) {
          p.then(() => v.pause()).catch(() => {
            // play() recusado (ex.: Low Power Mode fora de gesto):
            // permitir nova tentativa no próximo toque
            primado = false;
          });
        } else {
          v.pause();
        }
      }
    }

    function onScroll() {
      const trilho = trilhoRef.current;
      if (!trilho) return;
      const r = trilho.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      alvo = percurso > 0 ? clamp(-r.top / percurso, 0, 1) : 0;
      // O vídeo 2 começa com preload="metadata" para não pesar no carregamento
      // inicial; ao primeiro scroll pede-se o download completo, com folga
      // até ao ponto de corte do percurso.
      if (alvo > 0.05 && video2Ref.current && video2Ref.current.preload !== "auto") {
        video2Ref.current.preload = "auto";
      }
    }

    function tick() {
      // Interpolação para o scrub não saltar entre eventos de scroll
      atual += (alvo - atual) * 0.12;
      if (Math.abs(alvo - atual) < 0.0005) atual = alvo;

      const d1 = video1Ref.current?.duration;
      const d2 = video2Ref.current?.duration;
      // Divisão do percurso proporcional à duração de cada vídeo
      const corte = d1 && d2 ? d1 / (d1 + d2) : 0.5;

      if (atual <= corte) {
        if (d1 && Number.isFinite(d1) && video1Ref.current) {
          video1Ref.current.currentTime = (atual / corte) * d1;
        }
      } else if (d2 && Number.isFinite(d2) && video2Ref.current) {
        video2Ref.current.currentTime = ((atual - corte) / (1 - corte)) * d2;
      }

      setProgresso(atual);
      raf = requestAnimationFrame(tick);
    }

    v1.pause();
    v2.pause();
    onScroll();
    primar();
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

  const d1 = video1Ref.current?.duration ?? 8;
  const d2 = video2Ref.current?.duration ?? 7;
  const corte = d1 / (d1 + d2);
  const noSegundo = progresso > corte;

  return (
    <div ref={trilhoRef} id="inicio" className="xp-trilho">
      <div className="xp-palco">
        <p className="sr-only">
          Sequência de vídeo: uma carrinha ProntoGo atravessa a ponte sobre o
          canal de Aveiro ao pôr do sol, percorre a rua junto ao canal e um
          estafeta entrega a encomenda à porta do cliente.
        </p>
        <video
          ref={video1Ref}
          className="xp-video"
          style={{ opacity: noSegundo && !reduzMotion ? 0 : 1 }}
          src="/assets/prontogo-xp-1.mp4"
          poster="/assets/prontogo-xp-1-poster.webp"
          muted
          playsInline
          preload="auto"
          autoPlay={reduzMotion}
          loop={reduzMotion}
          aria-hidden="true"
        />
        <video
          ref={video2Ref}
          className="xp-video"
          style={{ opacity: noSegundo || reduzMotion ? 1 : 0 }}
          src="/assets/prontogo-xp-2.mp4"
          poster="/assets/prontogo-xp-2-poster.webp"
          muted
          playsInline
          preload="metadata"
          autoPlay={reduzMotion}
          loop={reduzMotion}
          aria-hidden="true"
        />
        <div className="xp-vinheta" />

        {legendas.map((l) => {
          const ativa = progresso >= l.de && progresso < l.ate;
          return (
            <div key={l.kicker} className={`xp-legenda${ativa ? " on" : ""}`}>
              <div className="kicker">{l.kicker}</div>
              {l.principal ? <h1>{l.titulo}</h1> : <h2>{l.titulo}</h2>}
            </div>
          );
        })}

        <div
          className={`xp-final${progresso > 0.94 ? " on" : ""}`}
          aria-hidden={progresso <= 0.94}
        >
          <a href="#contacto" className="btn btn-primary">
            Pedir orçamento
          </a>
        </div>

        <div className="xp-progresso" aria-hidden="true">
          <div className="xp-progresso-fill" style={{ transform: `scaleY(${progresso})` }} />
        </div>

        <div className={`xp-dica${progresso > 0.04 ? " off" : ""}`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Faça scroll</span>
        </div>
      </div>
    </div>
  );
}
