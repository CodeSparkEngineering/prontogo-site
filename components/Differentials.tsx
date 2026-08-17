"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import Icon from "@/components/Icon";
import RotaBackground from "@/components/RotaBackground";
import { diferenciais, numeros } from "@/lib/content";

export default function Differentials() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sec = secRef.current;
    if (!sec) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // 1. Contador numérico para os blocos de estatísticas
        const tiles = sec.querySelectorAll(".number-tile");
        animate(tiles, {
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.94, 1],
          duration: 650,
          delay: stagger(120),
          ease: "outBack",
        });

        // 2. Animar os valores numéricos específicos
        const num24 = sec.querySelector("[data-num='24h']");
        if (num24) {
          const obj = { val: 0 };
          animate(obj, {
            val: 24,
            duration: 1200,
            ease: "outExpo",
            onUpdate: () => {
              num24.textContent = `${Math.round(obj.val)}h`;
            },
          });
        }

        const num100 = sec.querySelector("[data-num='100%']");
        if (num100) {
          const obj = { val: 0 };
          animate(obj, {
            val: 100,
            duration: 1400,
            ease: "outExpo",
            onUpdate: () => {
              num100.textContent = `${Math.round(obj.val)}%`;
            },
          });
        }

        // 3. Efeito stagger nas features da esquerda
        const features = sec.querySelectorAll(".feature");
        animate(features, {
          opacity: [0, 1],
          translateX: [-15, 0],
          duration: 600,
          delay: stagger(90, { start: 150 }),
          ease: "outCubic",
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="diferenciais" className="section section-dark section-rota" ref={secRef}>
      <RotaBackground />
      <div className="container rel">
        <div className="split-grid">
          <div data-reveal>
            <div className="kicker">A operação</div>
            <h2>
              Velocidade com confiança, do primeiro ao último quilómetro
            </h2>
            <div className="features">
              {diferenciais.map((d) => (
                <div className="feature" key={d.titulo}>
                  <div className="feature-icon">
                    <Icon d={d.icon} size={19} />
                  </div>
                  <div>
                    <div className="feature-title">{d.titulo}</div>
                    <div className="feature-text">{d.texto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal>
            <div className="diff-visual">
              <Image
                src="/assets/prontogo-scan.webp"
                alt="Estafeta ProntoGo a registar uma encomenda com o scanner de rastreamento"
                width={1280}
                height={724}
                sizes="(max-width: 768px) 100vw, 520px"
                className="diff-img"
              />
              {/* Efeito Laser Scan High-Tech */}
              <div className="diff-laser-scanner" aria-hidden="true">
                <div className="diff-laser-line" />
              </div>
              <div className="diff-img-badge">
                <span className="route-dot" />
                <span>Monitorização e Rastreio em Tempo Real</span>
              </div>
            </div>
            <div className="numbers-grid">
              {numeros.map((n) => (
                <div className="number-tile" key={n.legenda}>
                  <div
                    className="number-value"
                    data-num={n.valor === "24h" || n.valor === "100%" ? n.valor : undefined}
                  >
                    {n.valor}
                  </div>
                  <div className="number-label">{n.legenda}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
