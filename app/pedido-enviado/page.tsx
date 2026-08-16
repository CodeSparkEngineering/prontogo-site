import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { contactoWhatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pedido enviado",
  description:
    "Recebemos o seu pedido de orçamento. A equipa ProntoGo responde em menos de 24 horas úteis.",
  alternates: { canonical: "/pedido-enviado" },
  // Página de confirmação: existe só para quem acaba de submeter o formulário
  // e para o Google Ads medir conversões. Fora do índice para não competir
  // com a homepage nos resultados de pesquisa.
  robots: { index: false, follow: false },
};

export default function PedidoEnviadoPage() {
  return (
    <main className="nf-page">
      <Image
        src="/assets/prontogo-icone-v2.svg"
        alt="ProntoGo"
        width={64}
        height={64}
      />
      <div className="success-icon" aria-hidden="true">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1>Pedido enviado!</h1>
      <p>
        Obrigado pelo contacto. A nossa equipa vai analisar o seu pedido e
        responder em menos de 24 horas úteis com uma proposta à medida da sua
        operação.
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {contactoWhatsapp && (
          <a
            href={contactoWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Falar agora no WhatsApp
          </a>
        )}
        <Link href="/" className="btn btn-ghost">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
