"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";

// Revelação dos blocos [data-reveal] ao entrarem no viewport, com anime.js.
// Grelhas conhecidas revelam os filhos em cascata (stagger); os restantes
// blocos fazem fade+subida simples. Com prefers-reduced-motion não há
// animação — o CSS mostra tudo imediatamente via a classe .on.
const GRELHAS =
  ".cards-grid,.steps-grid,.features,.numbers-grid,.guias-grid";

export default function ScrollReveal() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      alvos.forEach((el) => el.classList.add("on"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const el = entry.target as HTMLElement;
          const filhos = el.matches(GRELHAS)
            ? (Array.from(el.children) as HTMLElement[])
            : null;

          if (filhos && filhos.length > 1) {
            // O contentor aparece já; os filhos entram em cascata
            el.style.opacity = "1";
            el.style.transform = "none";
            animate(filhos, {
              opacity: [0, 1],
              translateY: [26, 0],
              delay: stagger(90),
              duration: 650,
              ease: "outCubic",
            });
          } else {
            animate(el, {
              opacity: [0, 1],
              translateY: [26, 0],
              duration: 650,
              ease: "outCubic",
            });
          }
        });
      },
      { threshold: 0.12 },
    );

    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
