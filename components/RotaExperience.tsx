"use client";

import { useEffect, useRef, useState } from "react";

// Segunda experiência de scroll: o clip "Em rota" (prontogo-rota.mp4) é
// esfregado pelo scroll, à imagem do hero (ScrollExperience), mas mais enxuto
// — sem rail de capítulos nem painel final. Diferença face ao hero: o loop de
// scrub só corre quando a secção está visível (IntersectionObserver), para não
// descodificar dois vídeos ao mesmo tempo.
//
// Faz scrub em todos os tamanhos (como o hero); só com prefers-reduced-motion
// mostra um frame estático (poster) com a primeira legenda. Em ecrãs pequenos o
// vídeo (~6,6 MB) só descarrega quando a secção entra em vista (via o
// IntersectionObserver que faz o priming), não à entrada da página.

interface Legenda {
  de: number;
  ate: number;
  kicker: string;
  titulo: string;
}

const legendas: Legenda[] = [
  {
    de: 0.06,
    ate: 0.46,
    kicker: "Em rota",
    titulo: "A caminho — sem transbordos, sem paragens.",
  },
  {
    de: 0.54,
    ate: 0.95,
    kicker: "Sem fronteiras",
    titulo: "De Aveiro até à Europa, na mesma carrinha.",
  },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function RotaExperience() {
  const trilhoRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progresso, setProgresso] = useState(0);
  const [simples, setSimples] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSimples(mq.matches);
    const onChange = () => setSimples(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (simples) return;
    const video = videoRef.current;
    const trilho = trilhoRef.current;
    if (!video || !trilho) return;

    let alvo = 0; // progresso alvo vindo do scroll
    let atual = 0; // progresso suavizado aplicado ao vídeo
    let raf = 0;
    let visivel = false;
    let primado = false;

    // Destrava a descodificação de frames (iOS/Android só o fazem após um
    // play() disparado por gesto) — igual ao hero.
    function primar() {
      if (primado) return;
      primado = true;
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.preload = "auto";
      if (v.readyState === 0) v.load();
      const p = v.play();
      if (p) p.then(() => v.pause()).catch(() => (primado = false));
      else v.pause();
    }

    function onScroll() {
      const r = trilho!.getBoundingClientRect();
      const percurso = r.height - window.innerHeight;
      alvo = percurso > 0 ? clamp(-r.top / percurso, 0, 1) : 0;
      if (alvo > 0.005) primar();
    }

    function tick() {
      if (!visivel) {
        raf = 0;
        return;
      }
      atual += (alvo - atual) * 0.12;
      if (Math.abs(alvo - atual) < 0.0005) atual = alvo;
      const v = videoRef.current;
      const d = v?.duration;
      if (v && d && Number.isFinite(d)) v.currentTime = atual * d;
      setProgresso(atual);
      raf = requestAnimationFrame(tick);
    }

    // Só corre o scrub quando a secção está (perto de) visível.
    const io = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
        if (visivel) {
          primar();
          if (!raf) raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(trilho);

    video.pause();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", primar, { passive: true });
    window.addEventListener("pointerdown", primar, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", primar);
      window.removeEventListener("pointerdown", primar);
      cancelAnimationFrame(raf);
    };
  }, [simples]);

  const emViagem = !simples && progresso > 0.02 && progresso < 0.98;

  return (
    <section
      id="rota"
      className="xp2-trilho"
      ref={trilhoRef}
      aria-label="Em rota — de Aveiro à Europa"
    >
      <div className="xp2-palco">
        <p className="sr-only">
          Sequência de vídeo: uma carrinha ProntoGo percorre a estrada, de
          Portugal até à Europa, numa viagem direta e sem transbordos.
        </p>
        <div className="xp-moldura">
          <video
            ref={videoRef}
            className="xp-video"
            src="/assets/prontogo-rota.mp4"
            poster="/assets/prontogo-rota-poster.webp"
            muted
            playsInline
            preload={simples ? "none" : "metadata"}
            autoPlay={false}
            aria-hidden="true"
          />
          <div className="xp-vinheta" />
          <div className={`xp-barra xp-barra-topo${emViagem ? " on" : ""}`} />
          <div className={`xp-barra xp-barra-fundo${emViagem ? " on" : ""}`} />
        </div>

        {legendas.map((l, i) => {
          const ativa = simples
            ? i === 0
            : progresso >= l.de && progresso < l.ate;
          return (
            <div key={l.kicker} className={`xp-legenda${ativa ? " on" : ""}`}>
              <div className="kicker">{l.kicker}</div>
              <h2>{l.titulo}</h2>
            </div>
          );
        })}
      </div>
    </section>
  );
}
