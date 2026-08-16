"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo "Em rota" como FUNDO de uma secção (não é secção própria): fica por
// trás do conteúdo e avança conforme o scroll atravessa a secção. É uma camada
// sticky que se fixa ao ecrã enquanto se percorre a secção; o currentTime do
// vídeo é conduzido pelo progresso do scroll através dela.
//
// Com prefers-reduced-motion fica no poster (estático). O scrub só corre quando
// a secção está visível (IntersectionObserver).

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function RotaBackground() {
  const raizRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduzMotion, setReduzMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzMotion(mq.matches);
    const onChange = () => setReduzMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduzMotion) return;
    const video = videoRef.current;
    const seccao = raizRef.current?.closest("section");
    if (!video || !seccao) return;

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

    function medir() {
      const r = seccao!.getBoundingClientRect();
      // Progresso enquanto a secção atravessa o ecrã: 0 quando entra por
      // baixo, 1 quando sai por cima. Dá um percurso generoso mesmo que a
      // secção seja mais baixa que o ecrã.
      alvo = clamp(
        (window.innerHeight - r.top) / (window.innerHeight + r.height),
        0,
        1
      );
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
      raf = requestAnimationFrame(tick);
    }

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
    io.observe(seccao);

    video.pause();
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    window.addEventListener("touchstart", primar, { passive: true });
    window.addEventListener("pointerdown", primar, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
      window.removeEventListener("touchstart", primar);
      window.removeEventListener("pointerdown", primar);
      cancelAnimationFrame(raf);
    };
  }, [reduzMotion]);

  return (
    <div className="rota-bg" ref={raizRef} aria-hidden="true">
      <video
        ref={videoRef}
        className="rota-bg-video"
        src="/assets/prontogo-rota.mp4"
        poster="/assets/prontogo-rota-poster.webp"
        muted
        playsInline
        preload="metadata"
        autoPlay={false}
      />
      <div className="rota-bg-scrim" />
    </div>
  );
}
