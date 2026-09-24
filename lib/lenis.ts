import type Lenis from "lenis";

// Instância única do Lenis (smooth scroll), partilhada com quem precisa de
// rolar a página por código. Fica null com prefers-reduced-motion e antes de
// o SmoothScroll montar — nesses casos os helpers recorrem ao scroll nativo.
let instancia: Lenis | null = null;

export function definirLenis(lenis: Lenis | null) {
  instancia = lenis;
}

export function obterLenis() {
  return instancia;
}

interface OpcoesRolar {
  /** Salta sem animação */
  imediato?: boolean;
  /** Duração da animação em segundos (só com Lenis ativo) */
  duracao?: number;
}

// Rola até uma posição (px), um seletor ("#contacto") ou um elemento.
// O Lenis respeita o scroll-margin-top dos alvos; o caminho nativo também.
export function rolarPara(
  alvo: number | string | HTMLElement,
  opcoes: OpcoesRolar = {},
) {
  if (instancia) {
    instancia.scrollTo(alvo, {
      immediate: opcoes.imediato,
      duration: opcoes.duracao,
    });
    return;
  }
  const reduzMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const behavior: ScrollBehavior =
    opcoes.imediato || reduzMotion ? "auto" : "smooth";
  if (typeof alvo === "number") {
    window.scrollTo({ top: alvo, behavior });
    return;
  }
  const el =
    typeof alvo === "string"
      ? document.getElementById(alvo.replace(/^#/, ""))
      : alvo;
  el?.scrollIntoView({ behavior });
}
