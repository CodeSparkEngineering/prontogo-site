import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="section section-alt">
      <div className="container split-grid">
        <div className="about-media" data-reveal>
          <Image
            src="/assets/prontogo-armazem.png"
            alt="Operação ProntoGo no armazém"
            width={1200}
            height={900}
            sizes="(max-width: 768px) 100vw, 520px"
            className="about-img"
          />
          <div className="about-badge">
            <Image
              src="/assets/prontogo-icone-v2.svg"
              alt=""
              width={24}
              height={24}
            />
            <span>Centro de operações · Aveiro</span>
          </div>
        </div>
        <div data-reveal>
          <div className="kicker">Sobre nós</div>
          <h2>Nascida em Aveiro, feita para Portugal inteiro</h2>
          <p className="about-p">
            A ProntoGo é uma empresa jovem e tecnológica de logística e entregas
            rápidas, sediada na região de Aveiro. Combinamos rotas otimizadas,
            rastreamento em tempo real e uma equipa dedicada para levar cada
            encomenda ao destino — no tempo certo.
          </p>
          <p className="about-p">
            Trabalhamos lado a lado com e-commerce, PMEs e particulares, com a
            flexibilidade de quem conhece o terreno e a ambição de quem quer
            conectar todo o país.
          </p>
          <div className="pills">
            <span className="pill">📍 Aveiro, Portugal</span>
            <span className="pill">Cobertura nacional</span>
            <span className="pill">Tecnologia própria</span>
          </div>
        </div>
      </div>
    </section>
  );
}
