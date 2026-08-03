import Image from "next/image";
import { compromissos } from "@/lib/content";

// Secção de compromissos de serviço. Nasceu como secção de depoimentos;
// voltará a sê-lo quando houver clientes reais com testemunhos autênticos.
export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head head-center" data-reveal>
          <div className="kicker">O nosso compromisso</div>
          <h2>O que pode esperar de nós</h2>
        </div>
        <div className="compromissos-grid">
          {compromissos.map((c) => (
            <div className="compromisso" key={c.titulo} data-reveal>
              <div className="compromisso-media">
                <Image
                  src={c.img}
                  alt={c.imgAlt}
                  width={900}
                  height={675}
                  sizes="(max-width: 640px) 100vw, 360px"
                />
              </div>
              <div className="compromisso-body">
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
