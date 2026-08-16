"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo aéreo de trânsito como fundo da secção Serviços: loop contínuo, a tocar
// apenas quando a secção está visível (IntersectionObserver), para poupar CPU e
// dados. Com prefers-reduced-motion fica no poster (estático), sem reprodução.

export default function CidadeBackground() {
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
    if (!video) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduzMotion]);

  return (
    <div className="services-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="services-bg-video"
        // Sufixo de versão: incrementar sempre que o ficheiro for substituído,
        // para nenhum browser servir uma versão antiga do cache.
        src="/assets/prontogo-cidade.mp4?v=7"
        poster="/assets/prontogo-cidade-poster.webp?v=7"
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
