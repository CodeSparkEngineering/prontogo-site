import ContactForm from "@/components/ContactForm";
import FundoVivo from "@/components/home/FundoVivo";
import Icone, { type NomeIcone } from "@/components/home/Icones";
import {
  contactoEmail,
  contactoTelefone,
  contactoTelefoneDisplay,
  whatsappLink,
} from "@/lib/site";

interface Canal {
  icone: NomeIcone;
  rotulo: string;
  valor: string;
  href?: string;
  externo?: boolean;
}

const canais: Canal[] = [
  {
    icone: "whatsapp",
    rotulo: "WhatsApp · a via mais rápida",
    valor: "Falar agora",
    href: whatsappLink("Olá! Vim do site e queria pedir um orçamento."),
    externo: true,
  },
  ...(contactoTelefone
    ? [{ icone: "telefone" as const, rotulo: "Telefone", valor: contactoTelefoneDisplay, href: `tel:${contactoTelefone}` }]
    : []),
  ...(contactoEmail
    ? [{ icone: "email" as const, rotulo: "Email", valor: contactoEmail, href: `mailto:${contactoEmail}` }]
    : []),
  { icone: "local", rotulo: "Base operacional", valor: "Aveiro, Portugal" },
];

export default function Contact() {
  return (
    <section id="contacto" className="h-sec h-escuro ct">
      <FundoVivo />
      <div className="h-wrap ct-grelha">
        <div className="ct-lado" data-reveal>
          <p className="h-eyebrow">
            <span className="h-ponto" />
            Contacto
          </p>
          <h2 className="h-titulo ct-titulo">
            Pronto para <span className="h-serif h-enfase">enviar?</span>
          </h2>
          <p className="h-lead">
            Conte-nos o que a sua empresa precisa de transportar. Cada pedido
            é lido por uma pessoa e respondido em menos de 24 horas úteis, com
            uma proposta concreta e sem compromisso.
          </p>

          <ul className="ct-canais">
            {canais.map((c) => (
              <li key={c.rotulo}>
                <span className="ct-canal">
                  <Icone nome={c.icone} tamanho={46} />
                  <span className="ct-rotulo">{c.rotulo}</span>
                </span>
                {c.href ? (
                  <a
                    className="ct-valor"
                    href={c.href}
                    {...(c.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {c.valor}
                    <span className="ct-seta" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="ct-valor">{c.valor}</span>
                )}
              </li>
            ))}
          </ul>

          <p className="ct-horario">
            Segunda a sexta, 08:00 – 19:00 · Sem custos de adesão nem taxas
            ocultas
          </p>
        </div>

        <div className="ct-form" data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
