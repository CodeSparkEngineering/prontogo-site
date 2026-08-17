"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import RotasMapa from "@/components/RotasMapa";
import { capacidadesApp } from "@/lib/content";

const ICONES = [
  // 1. Rotas calculadas por IA
  <svg key="ia" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" fill="rgba(245,130,11,0.2)" stroke="#F5820B" strokeWidth="2" />
  </svg>,
  // 2. Menos quilómetros, mesma carga
  <svg key="eco" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="rgba(245,130,11,0.15)" stroke="#F5820B" strokeWidth="2" />
  </svg>,
  // 3. Prova de entrega no telemóvel
  <svg key="pod" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" stroke="#F5820B" strokeWidth="2" />
    <path d="m9 11 2 2 4-4" stroke="#38BDF8" strokeWidth="2" />
    <circle cx="12" cy="18" r="1" fill="#FFB259" />
  </svg>,
  // 4. Horas de chegada mais fiáveis
  <svg key="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" stroke="#F5820B" strokeWidth="2" fill="rgba(56,189,248,0.1)" />
    <polyline points="12 7 12 12 15 14" stroke="#38BDF8" strokeWidth="2" />
  </svg>,
];

export default function AppRotas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Animação stagger para os cartões de capacidades
        const cards = container.querySelectorAll(".app-item-card");
        if (cards.length) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            delay: stagger(110, { start: 200 }),
            ease: "outCubic",
          });
        }

        // Animação da barra de simulação
        const simPill = container.querySelector(".app-sim-ticker");
        if (simPill) {
          animate(simPill, {
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 600,
            delay: 450,
            ease: "outBack",
          });
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tecnologia" className="section section-app" ref={containerRef}>
      {/* Luzes de ambiência de fundo (ambient orbs) */}
      <div className="app-ambient-glow glow-cyan" />
      <div className="app-ambient-glow glow-orange" />
      <div className="blob blob-dark-br" />

      <div className="container split-grid rel">
        <div data-reveal>
          {/* Badge Tech */}
          <div className="app-badge">
            <span className="app-badge-ponto" aria-hidden="true" />
            <span>MOTOR IA EM DESENVOLVIMENTO</span>
            <span className="app-badge-tag">V2.4</span>
          </div>

          <h2>Uma app que pensa a rota antes de o estafeta arrancar</h2>

          <p className="app-intro">
            Estamos a construir a nossa própria tecnologia de apoio à
            distribuição, com inteligência artificial a calcular a melhor
            sequência de entregas porta a porta. O objetivo é simples: cada
            encomenda chega mais cedo e com menos quilómetros pelo caminho.
          </p>

          {/* Mini-ticker de simulação de cálculo ativo */}
          <div className="app-sim-ticker">
            <div className="app-sim-icon">⚡</div>
            <div className="app-sim-text">
              <strong>Simulação em direto:</strong> 18 paragens agrupadas •{" "}
              <span className="app-sim-highlight">-24.3 km otimizados</span>
            </div>
          </div>

          {/* Grelha de capacidades modernizada */}
          <div className="app-lista-tech">
            {capacidadesApp.map((c, i) => (
              <div className="app-item-card" key={c.titulo}>
                <div className="app-item-icon-box">{ICONES[i % ICONES.length]}</div>
                <div className="app-item-content">
                  <div className="app-item-titulo">{c.titulo}</div>
                  <p>{c.texto}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota com design glassmorphism */}
          <div className="app-nota-card">
            <div className="app-nota-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Em validação operacional</span>
            </div>
            <p>
              Ainda não está disponível — está a ser desenvolvida e testada na
              nossa própria operação. Quando entrar ao serviço, os clientes
              ProntoGo beneficiam automaticamente sem terem de fazer nada.
            </p>
          </div>
        </div>

        {/* Lado Direito: Mapa Interativo Tech */}
        <div className="app-media" data-reveal>
          <RotasMapa />
        </div>
      </div>
    </section>
  );
}
