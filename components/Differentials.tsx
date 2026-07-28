import Image from "next/image";
import Icon from "@/components/Icon";
import { diferenciais, numeros } from "@/lib/content";

export default function Differentials() {
  return (
    <section id="diferenciais" className="section section-dark">
      <div className="blob blob-dark-br" />
      <div className="container rel">
        <div className="split-grid">
          <div data-reveal>
            <div className="kicker">Porquê a ProntoGo</div>
            <h2>
              Velocidade com confiança, do primeiro ao último quilómetro
            </h2>
            <div className="features">
              {diferenciais.map((d) => (
                <div className="feature" key={d.titulo}>
                  <div className="feature-icon">
                    <Icon d={d.icon} size={19} />
                  </div>
                  <div>
                    <div className="feature-title">{d.titulo}</div>
                    <div className="feature-text">{d.texto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal>
            <div className="diff-visual">
              <Image
                src="/assets/prontogo-rotas.webp"
                alt="Vista aérea do canal de Aveiro com uma carrinha ProntoGo em rota"
                width={1280}
                height={720}
                sizes="(max-width: 768px) 100vw, 520px"
                className="diff-img"
              />
              <div className="diff-img-badge">
                <span className="route-dot" />
                <span>Monitorização em tempo real</span>
              </div>
            </div>
            <div className="numbers-grid">
              {numeros.map((n) => (
                <div className="number-tile" key={n.legenda}>
                  <div className="number-value">{n.valor}</div>
                  <div className="number-label">{n.legenda}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
