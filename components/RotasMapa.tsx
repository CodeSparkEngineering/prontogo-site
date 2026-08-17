"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, svg } from "animejs";

interface CityInfo {
  id: string;
  name: string;
  cx: number;
  cy: number;
  eta: string;
  desc: string;
  dist: string;
  routeId?: string;
  isHub?: boolean;
}

const CITIES: CityInfo[] = [
  {
    id: "aveiro",
    name: "AVEIRO",
    cx: 105,
    cy: 135,
    eta: "HUB CENTRAL",
    desc: "Centro de Despacho & Base Operacional",
    dist: "Base HQ",
    isHub: true,
  },
  {
    id: "porto",
    name: "PORTO",
    cx: 130,
    cy: 50,
    eta: "45 min",
    desc: "Rota Norte • Entregas Diretas Urgentes",
    dist: "72 km",
    routeId: "rotaPorto",
  },
  {
    id: "viseu",
    name: "VISEU",
    cx: 220,
    cy: 100,
    eta: "55 min",
    desc: "Rota Interior Centro • Distribuição Rápida",
    dist: "85 km",
    routeId: "rotaViseu",
  },
  {
    id: "coimbra",
    name: "COIMBRA",
    cx: 150,
    cy: 190,
    eta: "40 min",
    desc: "Corredor Central • Entrega no Próprio Dia",
    dist: "62 km",
    routeId: "rotaCoimbra",
  },
  {
    id: "lisboa",
    name: "LISBOA",
    cx: 110,
    cy: 265,
    eta: "1h 50m",
    desc: "Rota Sul Expresso • Carga Consolidada & Direta",
    dist: "250 km",
    routeId: "rotaLisboa",
  },
  {
    id: "europa",
    name: "EUROPA",
    cx: 445,
    cy: 60,
    eta: "24h–48h",
    desc: "Linha Internacional • Transporte Exclusivo Dedicado",
    dist: "Intl",
    routeId: "rotaEuropa",
  },
];

export default function RotasMapa() {
  const raizRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState<CityInfo>(CITIES[1]); // Porto padrão
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState("08:42:15");

  useEffect(() => {
    // Relógio de simulação em tempo real
    const timer = setInterval(() => {
      const now = new Date();
      setSimulatedTime(
        now.toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotação automática da cidade ativa se o utilizador não estiver a interagir
  useEffect(() => {
    if (isUserHovering) return;
    const interval = setInterval(() => {
      setActiveCity((prev) => {
        const nextIndex = (CITIES.findIndex((c) => c.id === prev.id) + 1) % CITIES.length;
        return CITIES[nextIndex];
      });
    }, 3800);
    return () => clearInterval(interval);
  }, [isUserHovering]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raiz = raizRef.current;
    if (!raiz) return;

    let arrancou = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || arrancou) return;
        arrancou = true;
        io.disconnect();

        // 1. Radar Sonar Pulses em loop a partir do Hub Aveiro
        const sonarRings = raiz.querySelectorAll(".mapa-sonar-ring");
        if (sonarRings.length) {
          animate(sonarRings, {
            r: [12, 130],
            opacity: [0.65, 0],
            duration: 3200,
            delay: stagger(900),
            loop: true,
            ease: "outSine",
          });
        }

        // 2. Linhas de rotas desenham-se com efeito fluido a partir do Hub
        const linhas = svg.createDrawable(
          raiz.querySelectorAll<SVGPathElement>(".mapa-linha"),
        );
        animate(linhas, {
          draw: ["0 0", "0 1"],
          duration: 1600,
          delay: stagger(200, { start: 200 }),
          ease: "outQuad",
        });

        // 3. Nós e beacons das cidades acendem com salto dinâmico
        const nos = raiz.querySelectorAll(".mapa-no-ponto");
        animate(nos, {
          scale: [0, 1],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(150, { start: 500 }),
          ease: "outBack",
        });

        // 4. Badges e etiquetas de texto deslizam com subtil glow
        const etiquetas = raiz.querySelectorAll(".mapa-etiqueta");
        animate(etiquetas, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 700,
          delay: stagger(120, { start: 700 }),
          ease: "outCubic",
        });

        // 5. Veículo Europa (Long Haul Expresso com rasto)
        const caminhoEuropa = raiz.querySelector<SVGPathElement>("#rotaEuropa");
        const vanEuropa = raiz.querySelector(".mapa-van-europa");
        if (caminhoEuropa && vanEuropa) {
          const percurso = svg.createMotionPath(caminhoEuropa);
          animate(vanEuropa, {
            ...percurso,
            duration: 4800,
            delay: 1400,
            loop: true,
            ease: "inOutSine",
          });
        }

        // 6. Veículo Expresso Porto (Rota Norte)
        const caminhoPorto = raiz.querySelector<SVGPathElement>("#rotaPorto");
        const vanPorto = raiz.querySelector(".mapa-van-porto");
        if (caminhoPorto && vanPorto) {
          const percursoPorto = svg.createMotionPath(caminhoPorto);
          animate(vanPorto, {
            ...percursoPorto,
            duration: 2600,
            delay: 1800,
            loop: true,
            ease: "inOutQuad",
          });
        }

        // 7. Veículo Expresso Sul (Aveiro -> Lisboa)
        const caminhoLisboa = raiz.querySelector<SVGPathElement>("#rotaSulCompleta");
        const vanLisboa = raiz.querySelector(".mapa-van-lisboa");
        if (caminhoLisboa && vanLisboa) {
          const percursoLisboa = svg.createMotionPath(caminhoLisboa);
          animate(vanLisboa, {
            ...percursoLisboa,
            duration: 3800,
            delay: 2200,
            loop: true,
            ease: "inOutSine",
          });
        }

        // 8. Efeito de pulso contínuo nos anéis das cidades ativas
        const beacons = raiz.querySelectorAll(".mapa-beacon-ring");
        if (beacons.length) {
          animate(beacons, {
            scale: [1, 2.2],
            opacity: [0.75, 0],
            duration: 2200,
            delay: stagger(350),
            loop: true,
            ease: "outCubic",
          });
        }
      },
      { threshold: 0.25 },
    );

    io.observe(raiz);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mapa-card-tech" ref={raizRef}>
      {/* HUD Header Bar */}
      <div className="mapa-hud-header">
        <div className="mapa-hud-status">
          <span className="mapa-hud-live-dot" />
          <span className="mapa-hud-title">PRONTOGO AI DISPATCH ENGINE</span>
        </div>
        <div className="mapa-hud-telemetria">
          <span className="mapa-hud-badge">LATÊNCIA: 11ms</span>
          <span className="mapa-hud-time">{simulatedTime}</span>
        </div>
      </div>

      {/* Seletor rápido de Cidades em Chips interativos */}
      <div className="mapa-city-chips">
        <span className="mapa-chips-label">DESTINOS:</span>
        <div className="mapa-chips-list">
          {CITIES.map((city) => {
            const isSel = activeCity.id === city.id;
            return (
              <button
                key={city.id}
                type="button"
                className={`mapa-chip-btn ${isSel ? "is-active" : ""}`}
                onClick={() => {
                  setActiveCity(city);
                  setIsUserHovering(true);
                }}
                onMouseEnter={() => {
                  setActiveCity(city);
                  setIsUserHovering(true);
                }}
                onMouseLeave={() => setIsUserHovering(false)}
              >
                {city.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Canvas Interativo */}
      <div
        className="mapa-svg-wrapper"
        onMouseEnter={() => setIsUserHovering(true)}
        onMouseLeave={() => setIsUserHovering(false)}
      >
        <svg viewBox="0 0 520 310" fill="none" className="mapa-svg-canvas">
          <defs>
            {/* Grelha tech de coordenadas */}
            <pattern
              id="mapaGrelhaTech"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.06)" />
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="0.5"
              />
            </pattern>

            {/* Filtro de Brilho Neon */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradiente Laranja / Ouro para Rotas Ativas */}
            <linearGradient id="gradRotaPrincipal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5820B" />
              <stop offset="60%" stopColor="#FFB259" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>

            {/* Gradiente Rota Internacional Europa */}
            <linearGradient id="gradRotaEuropa" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5820B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FF9F38" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Fundo Grelha Tech */}
          <rect width="520" height="310" fill="url(#mapaGrelhaTech)" />

          {/* Círculos de Radar Sonar do Hub Aveiro */}
          <g className="mapa-sonar-group">
            <circle className="mapa-sonar-ring" cx="105" cy="135" r="12" fill="none" stroke="rgba(245,130,11,0.4)" strokeWidth="1.5" />
            <circle className="mapa-sonar-ring" cx="105" cy="135" r="12" fill="none" stroke="rgba(245,130,11,0.3)" strokeWidth="1.5" />
            <circle className="mapa-sonar-ring" cx="105" cy="135" r="12" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1" />
          </g>

          {/* Linhas de conexão e corredor secundário em baixa opacidade */}
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3">
            <line x1="130" y1="50" x2="220" y2="100" />
            <line x1="220" y1="100" x2="150" y2="190" />
            <line x1="220" y1="100" x2="445" y2="60" opacity="0.5" />
          </g>

          {/* Linhas de Rastro Neon (Glow Underlay) */}
          <g stroke="rgba(245,130,11,0.25)" strokeWidth="6" strokeLinecap="round" filter="url(#neonGlow)">
            <path d="M105 135 C 110 100, 118 75, 130 50" />
            <path d="M105 135 C 140 128, 175 118, 220 100" />
            <path d="M105 135 C 120 155, 135 175, 150 190" />
            <path d="M150 190 C 135 218, 122 242, 110 265" />
            <path d="M105 135 C 190 60, 310 40, 445 60" stroke="rgba(56,189,248,0.3)" strokeWidth="7" />
          </g>

          {/* Rotas Principais Desenhadas com Anime.js */}
          <g strokeLinecap="round">
            {/* Rota Aveiro -> Porto */}
            <path
              id="rotaPorto"
              className="mapa-linha"
              d="M105 135 C 110 100, 118 75, 130 50"
              stroke="url(#gradRotaPrincipal)"
              strokeWidth={activeCity.id === "porto" ? "4.5" : "2.8"}
            />
            {/* Rota Aveiro -> Viseu */}
            <path
              id="rotaViseu"
              className="mapa-linha"
              d="M105 135 C 140 128, 175 118, 220 100"
              stroke="url(#gradRotaPrincipal)"
              strokeWidth={activeCity.id === "viseu" ? "4.5" : "2.8"}
            />
            {/* Rota Aveiro -> Coimbra */}
            <path
              id="rotaCoimbra"
              className="mapa-linha"
              d="M105 135 C 120 155, 135 175, 150 190"
              stroke="url(#gradRotaPrincipal)"
              strokeWidth={activeCity.id === "coimbra" ? "4.5" : "2.8"}
            />
            {/* Rota Coimbra -> Lisboa */}
            <path
              id="rotaLisboa"
              className="mapa-linha"
              d="M150 190 C 135 218, 122 242, 110 265"
              stroke="url(#gradRotaPrincipal)"
              strokeWidth={activeCity.id === "lisboa" ? "4.5" : "2.8"}
            />
            {/* Caminho Invisível Contínuo Aveiro -> Coimbra -> Lisboa para o veículo */}
            <path
              id="rotaSulCompleta"
              d="M105 135 C 120 155, 135 175, 150 190 C 135 218, 122 242, 110 265"
              fill="none"
              stroke="transparent"
            />
            {/* Rota Internacional Europa */}
            <path
              id="rotaEuropa"
              className="mapa-linha"
              d="M105 135 C 190 60, 310 40, 445 60"
              stroke="url(#gradRotaEuropa)"
              strokeWidth={activeCity.id === "europa" ? "5" : "3.4"}
              strokeDasharray="7 3"
            />
          </g>

          {/* Nós / Cidades e Beacons */}
          <g className="mapa-nos">
            {CITIES.map((city) => {
              const isSelected = activeCity.id === city.id;
              return (
                <g
                  key={city.id}
                  className={`mapa-no-item ${city.isHub ? "is-hub" : ""} ${
                    isSelected ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setActiveCity(city);
                    setIsUserHovering(true);
                  }}
                  onMouseEnter={() => {
                    setActiveCity(city);
                    setIsUserHovering(true);
                  }}
                  onMouseLeave={() => setIsUserHovering(false)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Halo do Hub de Aveiro */}
                  {city.isHub && (
                    <>
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r="18"
                        fill="rgba(245,130,11,0.22)"
                        className="mapa-hub-halo"
                      />
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r="12"
                        fill="rgba(245,130,11,0.4)"
                      />
                    </>
                  )}

                  {/* Pulsing Beacon Ring nas Cidades */}
                  {!city.isHub && (
                    <circle
                      className="mapa-beacon-ring"
                      cx={city.cx}
                      cy={city.cy}
                      r="6"
                      fill="none"
                      stroke={city.id === "europa" ? "#38BDF8" : "#FFB259"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                    />
                  )}

                  {/* Ponto Central da Cidade */}
                  <circle
                    className="mapa-no-ponto"
                    cx={city.cx}
                    cy={city.cy}
                    r={isSelected ? (city.isHub ? 9.5 : 8) : city.isHub ? 7.5 : city.id === "europa" ? 7 : 5.5}
                    fill={
                      city.isHub
                        ? "#F5820B"
                        : city.id === "europa"
                        ? "#38BDF8"
                        : "#FFB259"
                    }
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 2.5 : city.isHub ? 2 : 1.5}
                  />

                  {/* Hit Target Invisível Grande para Facilitar Cliques/Hovers */}
                  <circle
                    cx={city.cx}
                    cy={city.cy}
                    r="24"
                    fill="transparent"
                  />
                </g>
              );
            })}
          </g>

          {/* Etiquetas e Badges de Cidades */}
          <g className="mapa-etiquetas">
            {/* PORTO */}
            <g className="mapa-etiqueta">
              <rect x="142" y="38" width="86" height="22" rx="6" fill="rgba(10,33,68,0.85)" stroke="rgba(255,255,255,0.14)" />
              <text x="150" y="52" fill="#E2E8F0" fontSize="11" fontWeight="700" letterSpacing="0.8">PORTO</text>
              <text x="195" y="52" fill="#FFB259" fontSize="9.5" fontWeight="800">45m</text>
            </g>

            {/* VISEU */}
            <g className="mapa-etiqueta">
              <rect x="232" y="88" width="84" height="22" rx="6" fill="rgba(10,33,68,0.85)" stroke="rgba(255,255,255,0.14)" />
              <text x="240" y="102" fill="#E2E8F0" fontSize="11" fontWeight="700" letterSpacing="0.8">VISEU</text>
              <text x="282" y="102" fill="#FFB259" fontSize="9.5" fontWeight="800">55m</text>
            </g>

            {/* COIMBRA */}
            <g className="mapa-etiqueta">
              <rect x="162" y="178" width="96" height="22" rx="6" fill="rgba(10,33,68,0.85)" stroke="rgba(255,255,255,0.14)" />
              <text x="170" y="192" fill="#E2E8F0" fontSize="11" fontWeight="700" letterSpacing="0.8">COIMBRA</text>
              <text x="226" y="192" fill="#FFB259" fontSize="9.5" fontWeight="800">40m</text>
            </g>

            {/* LISBOA */}
            <g className="mapa-etiqueta">
              <rect x="122" y="253" width="98" height="22" rx="6" fill="rgba(10,33,68,0.85)" stroke="rgba(255,255,255,0.14)" />
              <text x="130" y="267" fill="#E2E8F0" fontSize="11" fontWeight="700" letterSpacing="0.8">LISBOA</text>
              <text x="182" y="267" fill="#FFB259" fontSize="9.5" fontWeight="800">1h50</text>
            </g>

            {/* EUROPA */}
            <g className="mapa-etiqueta">
              <rect x="388" y="48" width="112" height="24" rx="7" fill="rgba(14,42,86,0.9)" stroke="rgba(56,189,248,0.45)" />
              <text x="398" y="64" fill="#38BDF8" fontSize="11.5" fontWeight="800" letterSpacing="1">EUROPA</text>
              <text x="456" y="64" fill="#FED7AA" fontSize="9.5" fontWeight="800">EXP</text>
            </g>

            {/* AVEIRO (HUB) */}
            <g className="mapa-etiqueta">
              <rect x="28" y="123" width="68" height="24" rx="7" fill="#F5820B" filter="url(#neonGlow)" />
              <text x="36" y="139" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1.2">AVEIRO</text>
            </g>
          </g>

          {/* Veículo 1: Rota Internacional Europa */}
          <g className="mapa-van-europa">
            <circle r="12" fill="rgba(56,189,248,0.25)" />
            <circle r="6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.8" />
            <circle r="2" fill="#FFFFFF" />
          </g>

          {/* Veículo 2: Expresso Rota Norte (Porto) */}
          <g className="mapa-van-porto">
            <circle r="9" fill="rgba(245,130,11,0.3)" />
            <circle r="4.5" fill="#F5820B" stroke="#FFFFFF" strokeWidth="1.4" />
          </g>

          {/* Veículo 3: Expresso Rota Sul (Lisboa) */}
          <g className="mapa-van-lisboa">
            <circle r="9" fill="rgba(255,178,89,0.3)" />
            <circle r="4.5" fill="#FFB259" stroke="#FFFFFF" strokeWidth="1.4" />
          </g>
        </svg>
      </div>

      {/* Live Interactive Detail Card abaixo do mapa (completamente desimpedido) */}
      <div className="mapa-active-route-bar">
        <div className="mapa-active-tag">
          <span className="mapa-active-pulse" />
          <span>ROTA SELECIONADA:</span>
          <strong>{activeCity.name}</strong>
        </div>
        <div className="mapa-active-meta">
          <span className="mapa-active-dist">{activeCity.dist}</span>
          <span className="mapa-active-divider">•</span>
          <span className="mapa-active-eta">ETA: {activeCity.eta}</span>
        </div>
        <div className="mapa-active-desc">{activeCity.desc}</div>
      </div>

      {/* HUD Footer Telemetry */}
      <div className="mapa-hud-footer">
        <div className="mapa-hud-metric">
          <span className="mapa-hud-icon">✦</span>
          <span>Algoritmo Heurístico Preditivo</span>
        </div>
        <div className="mapa-hud-metric">
          <span className="mapa-hud-icon">⚡</span>
          <span>-22% Km Ociosos</span>
        </div>
        <div className="mapa-hud-metric">
          <span className="mapa-hud-icon">🛰️</span>
          <span>Despacho em Tempo Real</span>
        </div>
      </div>
    </div>
  );
}
