"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, svg } from "animejs";

// Mapa de rotas estilizado e animado (anime.js): as linhas desenham-se a
// partir do hub de Aveiro, os pontos acendem em cascata e um "ponto-carrinha"
// laranja percorre a rota para a Europa em loop. Arranca quando a secção
// entra no viewport; com prefers-reduced-motion fica estático (tudo visível).
export default function RotasMapa() {
  const raizRef = useRef<HTMLDivElement>(null);

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

        // Linhas desenham-se em cascata a partir do hub
        const linhas = svg.createDrawable(
          raiz.querySelectorAll<SVGPathElement>(".mapa-linha"),
        );
        animate(linhas, {
          draw: ["0 0", "0 1"],
          duration: 1400,
          delay: stagger(240),
          ease: "inOutQuad",
        });

        // Pontos acendem com um pequeno pop
        animate(raiz.querySelectorAll(".mapa-no"), {
          scale: [0, 1],
          duration: 480,
          delay: stagger(170, { start: 480 }),
          ease: "outBack",
        });

        // Carrinha (ponto laranja) viaja até à Europa em loop
        const caminho = raiz.querySelector<SVGPathElement>("#rotaEuropa");
        const van = raiz.querySelector(".mapa-van");
        if (caminho && van) {
          const percurso = svg.createMotionPath(caminho);
          animate(van, {
            ...percurso,
            duration: 5200,
            delay: 1700,
            loop: true,
            ease: "inOutSine",
          });
        }
      },
      { threshold: 0.35 },
    );
    io.observe(raiz);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mapa-rotas" ref={raizRef} aria-hidden="true">
      <svg viewBox="0 0 520 400" fill="none">
        {/* grelha de pontos subtil, para o ar de "mapa tech" */}
        <defs>
          <pattern id="mapaGrelha" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(255,255,255,.06)" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#mapaGrelha)" />

        {/* rotas (desenham-se com anime.js) */}
        <g stroke="rgba(255,178,89,.85)" strokeWidth="2.4" strokeLinecap="round">
          <path className="mapa-linha" d="M130 150 C 135 118, 141 98, 150 80" />
          <path className="mapa-linha" d="M130 150 C 165 140, 196 134, 232 128" />
          <path className="mapa-linha" d="M130 150 C 145 180, 156 204, 170 230" />
          <path className="mapa-linha" d="M170 230 C 151 264, 133 296, 120 330" />
          <path
            className="mapa-linha"
            id="rotaEuropa"
            d="M130 150 C 225 88, 345 66, 468 88"
            strokeWidth="3"
          />
        </g>

        {/* nós da rede */}
        <g className="mapa-nos">
          <circle className="mapa-no" cx="150" cy="80" r="6" fill="#FFB259" />
          <circle className="mapa-no" cx="232" cy="128" r="6" fill="#FFB259" />
          <circle className="mapa-no" cx="170" cy="230" r="6" fill="#FFB259" />
          <circle className="mapa-no" cx="120" cy="330" r="6" fill="#FFB259" />
          <circle className="mapa-no" cx="468" cy="88" r="7" fill="#FFB259" />
          {/* hub Aveiro com pulso */}
          <circle className="mapa-hub-halo" cx="130" cy="150" r="14" fill="rgba(245,130,11,.25)" />
          <circle className="mapa-no mapa-hub" cx="130" cy="150" r="8" fill="#F5820B" />
        </g>

        {/* etiquetas */}
        <g fill="#C7D4E8" fontSize="12" fontFamily="inherit" fontWeight="600" letterSpacing="1">
          <text x="162" y="76">PORTO</text>
          <text x="244" y="124">VISEU</text>
          <text x="182" y="236">COIMBRA</text>
          <text x="132" y="336">LISBOA</text>
          <text x="424" y="72">EUROPA</text>
          <text x="88" y="176" fill="#fff" fontWeight="800">AVEIRO</text>
        </g>

        {/* carrinha: ponto laranja com brilho, viaja pela rota da Europa */}
        <g className="mapa-van">
          <circle r="10" fill="rgba(245,130,11,.3)" />
          <circle r="5" fill="#F5820B" stroke="#fff" strokeWidth="1.4" />
        </g>
      </svg>
    </div>
  );
}
