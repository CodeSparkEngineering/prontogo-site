import Image from "next/image";

export default function About() {
  return (
    <section id="sobre" className="section section-alt">
      <div className="container split-grid">
        <div className="about-media" data-reveal>
          <Image
            src="/assets/prontogo-equipa.webp"
            alt="Equipa ProntoGo a carregar encomendas na carrinha, numa rua de Aveiro"
            width={1100}
            height={1100}
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
            <span>A nossa equipa · Aveiro, Portugal</span>
          </div>
        </div>
        <div data-reveal>
          <div className="kicker">Sobre nós</div>
          <h2>Nascida em Aveiro, feita para Portugal inteiro</h2>
          <p className="about-p">
            A ProntoGo nasceu de uma constatação simples: quem tem um negócio
            pequeno em Aveiro merece o mesmo nível de serviço que uma grande
            marca em Lisboa — e raramente o consegue. As transportadoras
            grandes tratam-nos como número; as pequenas nem sempre chegam
            onde é preciso.
          </p>
          <p className="about-p">
            Somos uma empresa jovem, e fazemos disso uma vantagem: conhecemos
            as ruas onde entregamos, respondemos sem passar por três
            departamentos e adaptamos a operação ao ritmo de quem servimos.
            Crescemos com os nossos clientes, não apesar deles.
          </p>
          <div className="pills">
            <span className="pill">📍 Sede em Aveiro</span>
            <span className="pill">E-commerce, PMEs e particulares</span>
          </div>
        </div>
      </div>
    </section>
  );
}
