import Image from "next/image";
import Icon from "@/components/Icon";
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
        <div className="testimonials-grid">
          <div className="photo-card" data-reveal>
            <Image
              src="/assets/prontogo-cliente.webp"
              alt="Cliente a receber a sua encomenda das mãos de um estafeta ProntoGo"
              fill
              sizes="(max-width: 768px) 100vw, 280px"
            />
            <div className="photo-overlay" />
            <div className="photo-caption">
              Cada entrega é um momento de confiança.
            </div>
          </div>
          {compromissos.map((c) => (
            <div className="testimonial" key={c.titulo} data-reveal>
              <div className="compromisso-icon">
                <Icon d={c.icon} size={22} />
              </div>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
