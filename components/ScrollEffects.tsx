"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Efeitos conduzidos pelo scroll (GSAP ScrollTrigger), em três famílias:
//
// [data-reveal]            fade + subida ao entrar no viewport, uma vez.
//                          Grelhas conhecidas revelam os filhos em cascata.
// [data-reveal="scrub"]    o mesmo, mas ATADO ao scroll: o progresso da
//                          animação é a posição de scroll (recua se o
//                          visitante recuar). Aplicado por omissão aos
//                          cabeçalhos de secção (.section-head).
// [data-parallax="6"]      a imagem/vídeo dentro da moldura desloca-se mais
//                          devagar do que a página (valor = % de deslocação).
//                          O movimento vai para a propriedade CSS `translate`
//                          via variável --py, sem tocar em `transform` — os
//                          zooms de hover em CSS continuam a funcionar.
//
// Com prefers-reduced-motion não há animação: o CSS mostra tudo via .on.
// Vive no layout e corre de novo a cada mudança de rota.
const GRELHAS =
  ".cards-grid,.steps-grid,.features,.numbers-grid,.guias-grid";
const SCRUB_POR_OMISSAO = ".section-head";

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const molduras = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach((el) => el.classList.add("on"));
      return;
    }

    const ctx = gsap.context(() => {
      reveals.forEach((el) => {
        const modo =
          el.dataset.reveal ||
          (el.matches(SCRUB_POR_OMISSAO) ? "scrub" : "once");

        if (modo === "scrub") {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "top 62%",
                scrub: true,
              },
            },
          );
          return;
        }

        const filhos = el.matches(GRELHAS)
          ? (Array.from(el.children) as HTMLElement[])
          : null;

        if (filhos && filhos.length > 1) {
          // O contentor aparece já; os filhos entram em cascata
          gsap.set(el, { opacity: 1, y: 0 });
          gsap.fromTo(
            filhos,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        }
      });

      molduras.forEach((moldura) => {
        const media = moldura.querySelector<HTMLElement>("img,video");
        if (!media) return;
        const forca = Number(moldura.dataset.parallax) || 6;
        gsap.fromTo(
          media,
          { "--py": `${-forca}%` },
          {
            "--py": `${forca}%`,
            ease: "none",
            scrollTrigger: {
              trigger: moldura,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
