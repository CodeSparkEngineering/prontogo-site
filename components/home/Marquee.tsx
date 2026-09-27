"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESTINOS = ["Aveiro", "Porto", "Coimbra", "Viseu", "Lisboa", "Europa"];

// Faixa de destinos em movimento contínuo. A velocidade e o sentido seguem o
// scroll: acelera quando se rola depressa e inverte quando se sobe. Corre no
// ticker do GSAP (o mesmo relógio do Lenis) em vez de uma animação CSS, para
// a posição nunca saltar quando o sentido muda.
export default function Marquee() {
  const pista = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const envolve = gsap.utils.wrap(-50, 0);
    const definirX = gsap.quickSetter(el, "xPercent");
    let x = 0;
    let sentido = -1;
    let extra = 0;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        sentido = self.direction === 1 ? -1 : 1;
        extra = Math.min(Math.abs(self.getVelocity()) / 90, 14);
      },
    });

    const tick = (_t: number, dt: number) => {
      extra *= 0.94;
      x = envolve(x + sentido * (1.4 + extra) * (dt / 1000));
      definirX(x);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  const linha = (
    <>
      {DESTINOS.map((d, i) => (
        <span key={d} className={`mq-item${i % 2 ? " mq-item--contorno" : ""}`}>
          {d}
          <span className="mq-sep" />
        </span>
      ))}
    </>
  );

  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-pista" ref={pista}>
        <div className="mq-grupo">{linha}</div>
        <div className="mq-grupo">{linha}</div>
      </div>
    </div>
  );
}
