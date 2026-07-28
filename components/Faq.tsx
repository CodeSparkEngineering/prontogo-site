import { perguntasFrequentes } from "@/lib/content";

// Secção FAQ em <details>/<summary> nativos: acessível, sem JavaScript,
// e com o texto completo no HTML — o que os crawlers e motores de resposta
// precisam de ler. O schema FAQPage correspondente vive em app/page.tsx.
export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Perguntas frequentes</div>
          <h2>Tudo o que precisa de saber</h2>
        </div>
        <div className="faq-list" data-reveal>
          {perguntasFrequentes.map((item) => (
            <details className="faq-item" key={item.pergunta}>
              <summary>
                <h3>{item.pergunta}</h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
