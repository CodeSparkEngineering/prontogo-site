// Conjunto de ícones do site (grelha de 32, traço de 1,8). Estilo em dois
// tons: uma forma de base translúcida (.ic-base), o contorno a currentColor
// (.ic-linha) e um único elemento cheio a laranja (.ic-acento). Os traços
// escuros por cima do laranja usam .ic-furo. As cores vivem em home.css, por
// isso o mesmo ícone serve em fundo escuro e claro.

export type NomeIcone =
  | "rota-ia"
  | "km"
  | "prova"
  | "janela"
  | "expresso"
  | "carrinha"
  | "continente"
  | "dedicada"
  | "porta"
  | "paletes"
  | "loja"
  | "whatsapp"
  | "telefone"
  | "email"
  | "local";

const DESENHOS: Record<NomeIcone, React.ReactNode> = {
  "rota-ia": (
    <>
      <circle cx="16" cy="16" r="13" className="ic-base" />
      <path className="ic-linha" d="M5 24c5 0 5-8 11-8s6-8 11-8" />
      <circle cx="5" cy="24" r="2.6" className="ic-cheio" />
      <circle cx="27" cy="8" r="2.6" className="ic-cheio" />
      <rect x="11.5" y="11.5" width="9" height="9" rx="2.8" className="ic-acento" />
      <path
        className="ic-furo-cheio"
        d="M16 12.9c.3 1.6 1.2 2.5 2.8 2.8-1.6.3-2.5 1.2-2.8 2.8-.3-1.6-1.2-2.5-2.8-2.8 1.6-.3 2.5-1.2 2.8-2.8z"
      />
    </>
  ),
  km: (
    <>
      <path className="ic-base" d="M4 22a12 12 0 0 1 24 0z" />
      <path className="ic-linha" d="M4 22a12 12 0 0 1 24 0M8.2 14.3l1.5 1.1M16 10v1.9M23.8 14.3l-1.5 1.1" />
      <path className="ic-linha" d="M16 22l-4.6-5.6" />
      <circle cx="16" cy="22" r="1.9" className="ic-cheio" />
      <circle cx="25" cy="25" r="5.4" className="ic-acento" />
      <path className="ic-furo" d="M25 22.3v5M22.8 25.2l2.2 2.2 2.2-2.2" />
    </>
  ),
  prova: (
    <>
      <rect x="6.5" y="3" width="15" height="25" rx="3.6" className="ic-base" />
      <rect x="6.5" y="3" width="15" height="25" rx="3.6" className="ic-linha" />
      <path className="ic-linha" d="M12 6.6h4" />
      <path className="ic-linha ic-linha--acento" d="M9.8 17c1.2-3 2.2-3 3.1 0s2 3 3 0" />
      <circle cx="23" cy="23" r="6" className="ic-acento" />
      <path className="ic-furo" d="M20.4 23.1l1.8 1.8 3.4-3.6" />
    </>
  ),
  janela: (
    <>
      <circle cx="16" cy="16" r="12.5" className="ic-base" />
      <circle cx="16" cy="16" r="12.5" className="ic-linha" />
      <path className="ic-acento" d="M16 16V6.2A9.8 9.8 0 0 1 24.5 11.1Z" />
      <path className="ic-linha" d="M16 16l-4 3.4" />
      <circle cx="16" cy="16" r="1.8" className="ic-cheio" />
    </>
  ),
  expresso: (
    <>
      <circle cx="18" cy="16" r="12" className="ic-base" />
      <path className="ic-acento" d="M19.5 3 9 18h7l-2 11 11-15.5h-7.2z" />
      <path className="ic-linha" d="M2.5 11h5M1.5 16.5h4M3.5 22h4" />
    </>
  ),
  carrinha: (
    <>
      <path className="ic-base" d="M3 9.5A2.5 2.5 0 0 1 5.5 7H19v15H3zM19 12h5.6l4.4 5v5H19z" />
      <path className="ic-linha" d="M3 9.5A2.5 2.5 0 0 1 5.5 7H19v15H3zM19 12h5.6l4.4 5v5H19z" />
      <rect x="3" y="14" width="16" height="3.2" className="ic-acento" />
      <circle cx="9" cy="23.5" r="3.2" className="ic-cheio" />
      <circle cx="23.5" cy="23.5" r="3.2" className="ic-cheio" />
    </>
  ),
  continente: (
    <>
      <circle cx="14" cy="17.5" r="11" className="ic-base" />
      <circle cx="14" cy="17.5" r="11" className="ic-linha" />
      <path
        className="ic-linha"
        d="M3 17.5h22M14 6.5c3.2 3 4.8 6.7 4.8 11s-1.6 8-4.8 11c-3.2-3-4.8-6.7-4.8-11s1.6-8 4.8-11z"
      />
      <path
        className="ic-acento ic-acento--anel"
        d="M24.5 2.5A5 5 0 0 1 29.5 7.5c0 3.8-5 8.2-5 8.2s-5-4.4-5-8.2a5 5 0 0 1 5-5z"
      />
      <circle cx="24.5" cy="7.6" r="1.7" className="ic-furo-cheio" />
    </>
  ),
  dedicada: (
    <>
      <circle cx="13" cy="19" r="10" className="ic-base" />
      <path className="ic-linha ic-linha--tracejada" d="M5.5 25.5c6 0 3.5-9.5 10-9.5 4.5 0 5-4 9-5" />
      <circle cx="5.5" cy="25.5" r="2.6" className="ic-cheio" />
      <path className="ic-linha" d="M24.5 27V4.5" />
      <path className="ic-acento" d="M24.5 4.5h6l-2.1 3.3 2.1 3.3h-6z" />
    </>
  ),
  porta: (
    <>
      <path className="ic-base" d="M3.5 14 14.5 5l11 9v14h-22z" />
      <path className="ic-linha" d="M3.5 14 14.5 5l11 9v14h-22z" />
      <path className="ic-linha" d="M10 28v-7.5h5V28" />
      <rect x="17" y="17.5" width="12.5" height="11" rx="1.8" className="ic-acento ic-acento--anel" />
      <path className="ic-furo" d="M23.2 17.5v4.2" />
    </>
  ),
  paletes: (
    <>
      <rect x="3.5" y="13" width="11.5" height="10" rx="1.6" className="ic-base" />
      <rect x="17" y="13" width="11.5" height="10" rx="1.6" className="ic-base" />
      <rect x="3.5" y="13" width="11.5" height="10" rx="1.6" className="ic-linha" />
      <rect x="17" y="13" width="11.5" height="10" rx="1.6" className="ic-linha" />
      <rect x="10.2" y="3.2" width="11.5" height="9.8" rx="1.6" className="ic-acento ic-acento--anel" />
      <path className="ic-furo" d="M16 3.2v3.6" />
      <path className="ic-linha" d="M2.5 26h27M6.5 26v3M16 26v3M25.5 26v3" />
    </>
  ),
  loja: (
    <>
      <path className="ic-base" d="M6 14v14h20V14z" />
      <path className="ic-linha" d="M6 14v14h20V14M13 28v-7h6v7" />
      <path
        className="ic-acento"
        d="M3.5 12 6.2 5h19.6l2.7 7c0 2-1.6 3.4-3.4 3.4-1.9 0-3.4-1.4-3.4-3.4 0 2-1.5 3.4-3.4 3.4h-.6c-1.9 0-3.4-1.4-3.4-3.4 0 2-1.5 3.4-3.4 3.4S3.5 14 3.5 12z"
      />
      <path className="ic-furo" d="M12.3 5.5 11.5 12M19.7 5.5l.8 6.5" />
    </>
  ),
  whatsapp: (
    <>
      <path className="ic-base" d="M16 3.5a12.5 12.5 0 0 0-10.9 18.7L3.5 28.5l6.5-1.7A12.5 12.5 0 1 0 16 3.5z" />
      <path className="ic-linha" d="M16 3.5a12.5 12.5 0 0 0-10.9 18.7L3.5 28.5l6.5-1.7A12.5 12.5 0 1 0 16 3.5z" />
      <path
        className="ic-acento"
        d="M11.6 10.6c.5-1.1 1.7-1.1 2.2 0l.9 2c.3.6.1 1.2-.4 1.6l-.7.6c.9 1.7 2.2 3 3.9 3.9l.6-.7c.4-.5 1-.7 1.6-.4l2 .9c1.1.5 1.1 1.7 0 2.2-1.2.7-2.7.8-4 .3a13 13 0 0 1-6.4-6.4c-.5-1.3-.4-2.8.3-4z"
      />
    </>
  ),
  telefone: (
    <>
      <circle cx="16" cy="16" r="13" className="ic-base" />
      <path
        className="ic-acento"
        d="M9 8.6c.8-1.2 2.3-1.2 3 0l1.4 2.6c.4.7.2 1.5-.3 2l-1.1 1c1.3 2.7 3.3 4.7 6 6l1-1.1c.5-.5 1.3-.7 2-.3l2.6 1.4c1.2.7 1.2 2.2 0 3-1.7 1.1-3.8 1.3-5.6.6a17.5 17.5 0 0 1-9.6-9.6c-.7-1.8-.5-3.9.6-5.6z"
      />
      <path className="ic-linha" d="M18.5 5.5a8.5 8.5 0 0 1 8 8M18 9.8a4.2 4.2 0 0 1 4.2 4.2" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="7" width="24" height="19" rx="3.4" className="ic-base" />
      <rect x="3" y="7" width="24" height="19" rx="3.4" className="ic-linha" />
      <path className="ic-linha" d="M4.5 9.5 15 17l10.5-7.5" />
      <circle cx="26.5" cy="7.5" r="4.6" className="ic-acento ic-acento--anel" />
    </>
  ),
  local: (
    <>
      <ellipse cx="16" cy="27.5" rx="8" ry="2.4" className="ic-base" />
      <path
        className="ic-acento"
        d="M16 2.8a9.2 9.2 0 0 1 9.2 9.2c0 6.6-9.2 15.6-9.2 15.6S6.8 18.6 6.8 12A9.2 9.2 0 0 1 16 2.8z"
      />
      <circle cx="16" cy="12" r="3.4" className="ic-furo-cheio" />
    </>
  ),
};

interface Props {
  nome: NomeIcone;
  /** Tamanho da placa em px (o desenho ocupa ~56%) */
  tamanho?: number;
  /** Placa clara, para fundos cor de papel */
  claro?: boolean;
  className?: string;
}

export default function Icone({ nome, tamanho = 56, claro, className }: Props) {
  return (
    <span
      className={`ic-placa${claro ? " ic-placa--claro" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--ic": `${tamanho}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="ic-svg">
        {DESENHOS[nome]}
      </svg>
    </span>
  );
}
