import { perguntasFrequentes } from "@/lib/content";

// Secção FAQ em <details>/<summary> nativos: acessível, sem JavaScript,
// e com o texto completo no HTML — o que os crawlers e motores de resposta
// precisam de ler. O schema FAQPage correspondente vive em app/page.tsx.
// As classes faq-list/faq-item são partilhadas com as FAQ dos guias.
export default function Faq() {
  return (
    <section id="faq" className="h-sec h-claro-2 fq">
      <div className="h-wrap fq-grelha">
        <div className="fq-lado">
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Perguntas frequentes
          </p>
          <h2 className="h-titulo">
            Respostas diretas,{" "}
            <span className="h-serif h-enfase">para decidir sem rodeios.</span>
          </h2>
        </div>
        <div className="faq-list">
          {perguntasFrequentes.map((item) => (
            <details className="faq-item" key={item.pergunta}>
              <summary>
                <h3>{item.pergunta}</h3>
                <span className="faq-mais" aria-hidden="true" />
              </summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
