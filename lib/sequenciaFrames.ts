// Sequência de frames em canvas, "esfregada" pelo scroll — a técnica dos sites
// tipo Apple: em vez de um <video> a saltar de currentTime em currentTime
// (que depende de keyframes e deixa cair frames, sobretudo em iOS), cada
// frame é uma imagem WebP já descodificada e o desenho é um drawImage.
//
// Carregamento progressivo em três níveis, para o scrub funcionar quase de
// imediato e ir ganhando definição:
//   nível 1 — um frame em cada 4 (mais o último)
//   nível 2 — um frame em cada 2
//   nível 3 — todos
// Em mobile fica-se pelo nível 2 (metade dos bytes, como o "skip odd frames"
// do site de referência). Enquanto o frame exato não chega, desenha-se o
// carregado mais próximo.

export interface OpcoesSequencia {
  /** Prefixo do URL, ex. "/assets/xp-frames-v1/xp-" */
  base: string;
  /** Número total de frames (000 … total-1) */
  total: number;
  ext?: string;
  digitos?: number;
  /** Descarregas em paralelo */
  concorrencia?: number;
}

export type Nivel = 1 | 2 | 3;

export class SequenciaFrames {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly opcoes: Required<OpcoesSequencia>;
  private readonly imagens: (HTMLImageElement | null)[];
  private readonly pedidos = new Set<number>();
  private fila: number[] = [];
  private nivel = 0;
  private ativos = 0;
  private alvo = 0;
  private desenhado = -1;
  private destruida = false;
  private readonly observador: ResizeObserver | null;

  constructor(canvas: HTMLCanvasElement, opcoes: OpcoesSequencia) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.opcoes = {
      ext: ".webp",
      digitos: 3,
      concorrencia: 6,
      ...opcoes,
    };
    this.imagens = new Array<HTMLImageElement | null>(opcoes.total).fill(null);

    this.observador =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => this.redimensionar());
    this.observador?.observe(canvas);
    this.redimensionar();
  }

  /** Garante que o carregamento chega (pelo menos) ao nível pedido. */
  carregarAte(nivel: Nivel) {
    if (this.destruida || nivel <= this.nivel) return;
    const { total } = this.opcoes;
    const passos: Record<Nivel, (i: number) => boolean> = {
      1: (i) => i % 4 === 0 || i === total - 1,
      2: (i) => i % 2 === 0,
      3: () => true,
    };
    for (let n = (this.nivel + 1) as Nivel; n <= nivel; n++) {
      for (let i = 0; i < total; i++) {
        if (passos[n](i) && !this.pedidos.has(i)) {
          this.pedidos.add(i);
          this.fila.push(i);
        }
      }
    }
    this.nivel = nivel;
    this.bombear();
  }

  /** Desenha o frame correspondente ao progresso [0..1]. */
  desenhar(progresso: number) {
    if (this.destruida) return;
    this.alvo = Math.max(0, Math.min(1, progresso));
    const idx = Math.round(this.alvo * (this.opcoes.total - 1));
    const escolhido = this.maisProximo(idx);
    if (escolhido < 0 || escolhido === this.desenhado) return;
    this.pintar(escolhido);
  }

  destruir() {
    this.destruida = true;
    this.observador?.disconnect();
    this.fila = [];
    this.imagens.fill(null);
  }

  private bombear() {
    while (
      !this.destruida &&
      this.ativos < this.opcoes.concorrencia &&
      this.fila.length
    ) {
      const i = this.fila.shift()!;
      this.ativos++;
      void this.carregarImagem(i).finally(() => {
        this.ativos--;
        this.bombear();
      });
    }
  }

  private async carregarImagem(i: number) {
    const { base, digitos, ext } = this.opcoes;
    const img = new Image();
    img.decoding = "async";
    img.src = `${base}${String(i).padStart(digitos, "0")}${ext}`;
    try {
      await img.decode();
    } catch {
      return; // 404 ou falha de rede: fica o vizinho mais próximo
    }
    if (this.destruida) return;
    this.imagens[i] = img;
    // Se este frame está mais perto do alvo do que o desenhado, atualiza já
    this.desenhar(this.alvo);
  }

  /** Índice do frame carregado mais próximo de idx, ou -1 se nenhum. */
  private maisProximo(idx: number) {
    const { total } = this.opcoes;
    for (let d = 0; d < total; d++) {
      if (idx - d >= 0 && this.imagens[idx - d]) return idx - d;
      if (idx + d < total && this.imagens[idx + d]) return idx + d;
    }
    return -1;
  }

  private redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(this.canvas.clientWidth * dpr);
    const h = Math.round(this.canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.desenhado = -1;
      if (this.imagens.some(Boolean)) this.desenhar(this.alvo);
    }
  }

  // object-fit: cover
  private pintar(i: number) {
    const img = this.imagens[i];
    const ctx = this.ctx;
    if (!img || !ctx) return;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const escala = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth * escala;
    const dh = img.naturalHeight * escala;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    this.desenhado = i;
  }
}
