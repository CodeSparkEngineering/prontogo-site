import Image from "next/image";
import { depoimentos } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">Depoimentos</div>
          <h2>Quem confia na ProntoGo</h2>
        </div>
        <div className="testimonials-grid">
          <div className="photo-card" data-reveal>
            <Image
              src="/assets/prontogo-entrega.webp"
              alt="Estafeta ProntoGo a entregar uma encomenda em Aveiro"
              fill
              sizes="(max-width: 768px) 100vw, 280px"
            />
            <div className="photo-overlay" />
            <div className="photo-caption">
              Cada entrega é um momento de confiança.
            </div>
          </div>
          {depoimentos.map((t) => (
            <figure className="testimonial" key={t.nome} data-reveal>
              <div className="stars">★★★★★</div>
              <blockquote>“{t.texto}”</blockquote>
              <figcaption>
                <div className="avatar">{t.iniciais}</div>
                <div>
                  <div className="t-name">{t.nome}</div>
                  <div className="t-role">{t.cargo}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
