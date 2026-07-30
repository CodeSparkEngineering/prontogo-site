import Image from "next/image";
import Link from "next/link";
import type { Guia } from "@/lib/guias";

export default function GuiaCard({ guia }: { guia: Guia }) {
  return (
    <Link href={`/guias/${guia.slug}`} className="guia-card">
      <div className="guia-card-media">
        <Image
          src={guia.img}
          alt={guia.imgAlt}
          width={1200}
          height={675}
          sizes="(max-width: 640px) 100vw, 360px"
        />
      </div>
      <div className="guia-card-body">
        <span className="guia-meta">{guia.minutos} min de leitura</span>
        <h3>{guia.titulo}</h3>
        <p>{guia.resumo}</p>
        <span className="guia-link">
          Ler guia
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
