import Link from "next/link";
import GuiaCard from "@/components/GuiaCard";
import { guias } from "@/lib/guias";

// Amostra dos guias na homepage, com link para a listagem completa.
export default function GuiasPreview() {
  if (guias.length === 0) return null;

  return (
    <section id="guias" className="section">
      <div className="container">
        <div className="section-head guias-head" data-reveal>
          <div>
            <div className="kicker">Guias</div>
            <h2>Logística explicada sem jargão</h2>
          </div>
          <Link href="/guias" className="guia-ver-todos">
            Ver todos os guias
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
          </Link>
        </div>
        <div className="guias-grid" data-reveal>
          {guias.slice(0, 3).map((guia) => (
            <GuiaCard key={guia.slug} guia={guia} />
          ))}
        </div>
      </div>
    </section>
  );
}
