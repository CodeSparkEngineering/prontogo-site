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
  href?: string;
  externo?: boolean;
}

// Canais vazios em lib/site.ts ficam automaticamente de fora da lista
const contactos: Contacto[] = [
  ...(contactoTelefone
    ? [
        {
          label: "Telefone",
          icon: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z"/>',
          value: contactoTelefoneDisplay,
          href: `tel:${contactoTelefone}`,
        },
      ]
    : []),
  ...(contactoWhatsapp
    ? [
        {
          label: "WhatsApp",
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
          label: "Email",
          icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
          value: contactoEmail,
          href: `mailto:${contactoEmail}`,
        },
      ]
    : []),
  {
    label: "Área de cobertura",
    icon: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    value: "Sede em Aveiro · Portugal e Europa",
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
      <div className="container split-grid rel">
        <div data-reveal>
          <div className="kicker">Contacto</div>
          <h2>Peça o seu orçamento</h2>
          <p className="contact-sub">
            Responderemos em menos de 24 horas úteis com uma proposta à medida
            da sua operação.
          </p>
          <div className="contact-list">
            {contactos.map((c) => (
              <div className="contact-item" key={c.label}>
                <div className="contact-icon">
                  <Icon d={c.icon} size={19} />
                </div>
                <div>
                  <div className="contact-label">{c.label}</div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="contact-value"
                      {...(c.externo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="contact-value">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
