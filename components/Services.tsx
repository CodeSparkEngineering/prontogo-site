"use client";

import Image from "next/image";
import { servicos } from "@/lib/content";
import { EVENTO_SIMULACAO } from "@/components/Simulador";

export default function Services() {
  // Ao clicar num serviço, leva ao formulário com o tipo de serviço já
  // escolhido e a mensagem começada — reaproveita o mesmo evento do
  // simulador. O href="#contacto" garante o scroll (suave, via CSS) mesmo
  // sem JavaScript.
  function pedir(titulo: string) {
    window.dispatchEvent(
      new CustomEvent(EVENTO_SIMULACAO, {
        detail: {
          servico: titulo,
          mensagem: `Olá! Tenho interesse no serviço de "${titulo}". Gostaria de pedir um orçamento.`,
        },
      })
    );
  }

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
            <a
              className="card"
              key={s.titulo}
              href="#contacto"
              onClick={() => pedir(s.titulo)}
              aria-label={`Pedir orçamento para ${s.titulo}`}
            >
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
                <span className="card-cta">
                  Pedir orçamento
                  <svg
                    width="15"
                    height="15"
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
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
