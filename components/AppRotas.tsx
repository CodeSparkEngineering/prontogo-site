"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import RotasMapa from "@/components/RotasMapa";
import { capacidadesApp } from "@/lib/content";

// Conjunto desenhado na grelha de 24, traço de 2, cantos redondos — o mesmo
// vocabulário dos restantes ícones do site. O traço base fica a currentColor
// (herda o #FFB259 da .app-item-icon-box e acompanha o hover) e cada ícone tem
// um único realce a #F5820B. Cada um diz literalmente o que o cartão promete,
// e nenhum repete símbolos já usados no simulador.
const ICONES = [
  // 1. Rotas calculadas por IA — percurso com paragens, a do meio realçada
  //    (a que o cálculo reposicionou).
  <svg key="rota" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.2 18.6C8 18.6 8 12.4 12 12.4C16 12.4 16 5.6 19.8 5.6" />
    <circle cx="4.2" cy="18.6" r="1.9" />
    <circle cx="19.8" cy="5.6" r="1.9" />
    <circle cx="12" cy="12.4" r="2.2" stroke="#F5820B" />
  </svg>,
  // 2. Menos quilómetros, mesma carga — conta-quilómetros com a seta a descer.
  //    Formas grandes, sem tracejado: é o que sobrevive aos 20 px reais.
  <svg key="km" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.6 16.8a8.4 8.4 0 0 1 12.8-7.2" />
    <path d="M12 16.8 9.4 12" />
    <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
    <path d="M19.4 5.6v5.2M17.3 8.7 19.4 10.8 21.5 8.7" stroke="#F5820B" />
  </svg>,
  // 3. Prova de entrega no telemóvel — a assinatura é a prova. A linha de base
  //    ficou a 19.2 para não colidir com o traço do laço, que desce a 17.15.
  <svg key="assinatura" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2.2" width="14" height="19.6" rx="3" />
    <path d="M10.4 5.2h3.2" />
    <path d="M8.2 14.4c1-2.6 1.9-2.6 2.7 0 .8 2.6 1.7 2.6 2.6 0 .5-1.5 1.3-1.1 2.3.7" stroke="#F5820B" />
    <path d="M8.2 19.2h7.6" opacity="0.5" />
  </svg>,
  // 4. Horas de chegada mais fiáveis — a cunha marca a janela horária, não uma
  //    hora. Raio 6.8 contra os 8.8 do mostrador: 2 unidades entre eixos, que é
  //    a folga mínima para dois traços de 2 não encostarem.
  <svg key="janela" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 12V5.2A6.8 6.8 0 0 1 17.89 8.6Z" fill="rgba(245,130,11,0.18)" stroke="#F5820B" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
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
