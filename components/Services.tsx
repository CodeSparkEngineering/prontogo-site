import Image from "next/image";
import { servicos } from "@/lib/content";

export default function Services() {
  return (
    <section id="servicos" className="section section-alt section-services">
      <div className="services-bg">
        <Image
          src="/assets/prontogo-services-bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          aria-hidden="true"
        />
      </div>
      <div className="container rel">
        <div className="section-head" data-reveal>
          <div className="kicker">Serviços</div>
          <h2>Soluções logísticas para cada necessidade</h2>
          <p>
            Do estafeta urbano à distribuição nacional, adaptamos a operação ao
            seu negócio.
          </p>
        </div>
        <div className="cards-grid" data-reveal>
          {servicos.map((s) => (
            <div className="card" key={s.titulo}>
              <div className="card-media">
                <Image
                  src={s.img}
                  alt={s.imgAlt}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, 300px"
                />
              </div>
              <div className="card-body">
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
