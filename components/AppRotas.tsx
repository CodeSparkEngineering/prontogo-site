import RotasMapa from "@/components/RotasMapa";
import { capacidadesApp } from "@/lib/content";

// Secção sobre a app de rotas em desenvolvimento. Está deliberadamente
// marcada como "em desenvolvimento": é um projeto em curso, não um serviço
// já disponível, e o site não promete o que ainda não existe.
export default function AppRotas() {
  return (
    <section id="tecnologia" className="section section-app">
      <div className="blob blob-dark-br" />
      <div className="container split-grid rel">
        <div data-reveal>
          <div className="app-badge">
            <span className="app-badge-ponto" aria-hidden="true" />
            Em desenvolvimento
          </div>
          <h2>Uma app que pensa a rota antes de o estafeta arrancar</h2>
          <p className="app-intro">
            Estamos a construir a nossa própria aplicação de apoio à
            distribuição, com inteligência artificial a calcular a melhor
            sequência de entregas porta a porta. O objetivo é simples: cada
            encomenda chega mais cedo e com menos quilómetros pelo caminho.
          </p>
          <div className="app-lista">
            {capacidadesApp.map((c) => (
              <div className="app-item" key={c.titulo}>
                <div className="app-item-titulo">{c.titulo}</div>
                <p>{c.texto}</p>
              </div>
            ))}
          </div>
          <p className="app-nota">
            Ainda não está disponível — está a ser desenvolvida e testada na
            nossa própria operação. Quando entrar ao serviço, os clientes
            ProntoGo beneficiam sem terem de fazer nada.
          </p>
        </div>
        <div className="app-media" data-reveal>
          <RotasMapa />
        </div>
      </div>
    </section>
  );
}
