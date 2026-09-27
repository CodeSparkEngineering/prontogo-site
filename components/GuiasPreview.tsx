import Link from "next/link";
import GuiaCard from "@/components/GuiaCard";
import { guias } from "@/lib/guias";

// Amostra dos guias na homepage, com link para a listagem completa.
export default function GuiasPreview() {
  if (guias.length === 0) return null;

  return (
    <section id="guias" className="h-sec h-claro gp">
      <div className="h-wrap">
        <div className="h-cabeca gp-cabeca">
          <div>
            <p className="h-eyebrow">
              <span className="h-ponto" />
              Guias
            </p>
            <h2 className="h-titulo">
              Logística explicada{" "}
              <span className="h-serif h-enfase">sem jargão.</span>
            </h2>
          </div>
          <Link href="/guias" className="h-btn h-btn--linha-escura">
            Ver todos os guias
            <span className="h-btn-seta" aria-hidden="true">→</span>
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
