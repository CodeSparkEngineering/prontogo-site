import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import {
  contactoEmail,
  contactoTelefone,
  contactoTelefoneDisplay,
  contactoWhatsapp,
} from "@/lib/site";

interface Contacto {
  label: string;
  icon: string;
  value: string;
  sub?: string;
  href?: string;
  externo?: boolean;
}

const contactos: Contacto[] = [
  ...(contactoTelefone
    ? [
        {
          label: "Telefone Direto",
          sub: "Atendimento imediato",
          icon: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z"/>',
          value: contactoTelefoneDisplay,
          href: `tel:${contactoTelefone}`,
        },
      ]
    : []),
  ...(contactoWhatsapp
    ? [
        {
          label: "WhatsApp Expresso",
          sub: "Conversa em direto",
          icon: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.9-.9L3 20.5l1.6-4.9A8.4 8.4 0 0 1 3.6 11.5a8.4 8.4 0 0 1 8.4-8.4 8.4 8.4 0 0 1 9 8.4z"/>',
          value: "Fale connosco agora",
          href: contactoWhatsapp,
          externo: true,
        },
      ]
    : []),
  ...(contactoEmail
    ? [
        {
          label: "Email Comercial",
          sub: "Propostas e faturas",
          icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
          value: contactoEmail,
          href: `mailto:${contactoEmail}`,
        },
      ]
    : []),
  {
    label: "Base Operacional",
    sub: "Hub logístico central",
    icon: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    value: "Aveiro, Portugal · Envio para Toda a Europa",
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="section section-contact">
      <div className="contact-bg">
        <Image
          src="/assets/prontogo-contact-bg.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          aria-hidden="true"
        />
      </div>
      <div className="blob blob-contact-tl" />
      <div className="blob blob-dark-br" />

      <div className="container split-grid rel">
        <div data-reveal>
          {/* Trust Live Badge */}
          <div className="contact-live-badge">
            <span className="contact-live-dot" />
            <span>RESPOSTA RÁPIDA • &lt; 24H ÚTEIS</span>
          </div>

          <h2>Peça o seu orçamento personalizado</h2>
          <p className="contact-sub">
            Conte-nos o que precisa de transportar. A nossa equipa analisa o
            trajeto e envia uma cotação transparente e sem compromisso.
          </p>

          {/* Cartões de canais de contacto */}
          <div className="contact-list-modern">
            {contactos.map((c) => (
              <div className="contact-card-item" key={c.label}>
                <div className="contact-icon-box">
                  <Icon d={c.icon} size={20} />
                </div>
                <div className="contact-card-info">
                  <div className="contact-label-row">
                    <span className="contact-card-label">{c.label}</span>
                    {c.sub && <span className="contact-card-sub">{c.sub}</span>}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="contact-card-value"
                      {...(c.externo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {c.value}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <div className="contact-card-value static">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Apoio ao Cliente & Garantias */}
          <div className="contact-guarantees">
            <div className="contact-guarantee-item">
              <span className="contact-guarantee-icon">⚡</span>
              <span>Sem custos de adesão ou taxas ocultas</span>
            </div>
            <div className="contact-guarantee-item">
              <span className="contact-guarantee-icon">🕒</span>
              <span>Horário Operacional: Seg – Sex: 08:00 – 19:00</span>
            </div>
          </div>
        </div>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
