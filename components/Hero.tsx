import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="blob blob-hero-tr" />
      <div className="blob blob-hero-bl" />
      <div className="container hero-grid">
        <div>
          <div className="badge">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
            Entregas em todo o território nacional
          </div>
          <h1 className="hero-title">
            A sua encomenda, entregue <em>no tempo certo</em>.
          </h1>
          <p className="hero-sub">
            Logística inteligente. Entregas que conectam. Da recolha à porta do
            cliente, em Aveiro e em todo Portugal.
          </p>
          <div className="hero-ctas">
            <a href="#contacto" className="btn btn-primary">
              Pedir orçamento
              <svg
                width="16"
                height="16"
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
            </a>
            <a href="#como-funciona" className="link-ghost">
              Como funciona
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-value">98%</div>
              <div className="stat-label">entregas no prazo</div>
            </div>
            <div>
              <div className="stat-value">24h</div>
              <div className="stat-label">expresso nacional</div>
            </div>
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">rastreável</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-media">
            <Image
              src="/assets/prontogo-hero-van-clean.png"
              alt="Carrinha ProntoGo a atravessar a ponte em Aveiro"
              width={1200}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              className="hero-img"
            />
            <div className="hero-float">
              <Image
                src="/assets/prontogo-icone-v2.svg"
                alt=""
                width={88}
                height={88}
              />
            </div>
            <div className="route-chip">
              <span className="route-dot" />
              <span>Em rota · Aveiro → Lisboa</span>
            </div>
            <svg viewBox="0 0 360 60" className="route-path" aria-hidden="true">
              <path
                d="M20 30 C 90 6, 250 54, 340 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="2 10"
                strokeLinecap="round"
                className="dash-anim"
              />
              <circle cx="340" cy="22" r="5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
