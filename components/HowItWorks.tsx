"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger, svg } from "animejs";
import { passos } from "@/lib/content";

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // 1. Linha do percurso desenha-se
        const path = container.querySelector<SVGPathElement>("#stepsWavePath");
        if (path) {
          const drawable = svg.createDrawable(path);
          animate(drawable, {
            draw: ["0 0", "0 1"],
            duration: 1200,
            ease: "inOutQuad",
          });

          // 2. Partícula de energia viaja ao longo da curva em loop
          const orb = container.querySelector(".steps-travel-orb");
          if (orb) {
            const motion = svg.createMotionPath(path);
            animate(orb, {
              ...motion,
              duration: 3400,
              delay: 800,
              loop: true,
              ease: "inOutSine",
            });
          }
        }

        // 3. Círculos e passos surgem em cascata com efeito elástico
        const steps = container.querySelectorAll(".step");
        animate(steps, {
          opacity: [0, 1],
          translateY: [28, 0],
          scale: [0.92, 1],
          duration: 750,
          delay: stagger(180, { start: 300 }),
          ease: "outBack",
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="section" ref={containerRef}>
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Como funciona</div>
          <h2>Três passos. Zero complicações.</h2>
        </div>
        <div className="steps-wrap">
          <svg
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="steps-path"
            aria-hidden="true"
          >
            <path
              id="stepsWavePath"
              d="M 50 30 C 250 -5, 400 65, 500 30 S 750 -5, 950 30"
              fill="none"
              stroke="rgba(245,130,11,0.3)"
              strokeWidth="2.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
            {/* Partícula de energia a viajar entre os passos */}
            <g className="steps-travel-orb">
              <circle r="7" fill="rgba(245,130,11,0.35)" />
              <circle r="3.5" fill="#F5820B" stroke="#fff" strokeWidth="1.5" />
            </g>
          </svg>
          <div className="steps-grid">
            {passos.map((p) => (
              <div className="step" key={p.num}>
                <div className="step-circle">
                  <Image src={p.img} alt="" width={96} height={96} aria-hidden="true" />
                  <span className="step-num">{p.num}</span>
                </div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
