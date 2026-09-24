"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { definirLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll com Lenis, ligado ao ScrollTrigger do GSAP. É isto que dá a
// sensação de "tudo sincronizado": a posição de scroll é interpolada (lerp)
// em vez de saltar a cada tique da roda, e todas as animações de scroll leem
// essa mesma posição. O Lenis corre dentro do ticker do GSAP para partilhar
// o mesmo relógio.
//
// No toque o scroll fica nativo (syncTouch:false) — em mobile o smooth
// artificial atrapalha mais do que ajuda. Com prefers-reduced-motion não
// arranca nada: scroll e âncoras 100% nativos.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      // Contentores com scroll próprio (tabelas, chips horizontais) rolam
      // nativamente quando ainda têm espaço para rolar
      allowNestedScroll: true,
    });
    definirLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (tempo: number) => lenis.raf(tempo * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // A barra de endereço em mobile redimensiona o viewport a cada scroll;
    // recalcular os triggers nesse momento provoca saltos.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Âncoras da própria página: rolar suavemente em vez do salto nativo.
    // Links para outra página (ex. /#servicos a partir de /guias) seguem o
    // caminho normal do browser.
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname !== location.pathname || !url.hash) return;
      let alvo: HTMLElement | null = null;
      try {
        alvo = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!alvo) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(alvo);
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      definirLenis(null);
    };
  }, []);

  return null;
}
