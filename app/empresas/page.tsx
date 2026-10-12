import type { Metadata } from "next";
import Image from "next/image";
import EmpresasForm from "@/components/EmpresasForm";
import FundoVivo from "@/components/home/FundoVivo";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata: Metadata = {
  title: "Entrega dedicada para empresas",
  description:
    "Entrega dedicada para empresas, a partir de Aveiro: uma carrinha só para a sua carga, à hora marcada, sem transbordos, até 640 kg. Peça uma proposta em um minuto.",
  alternates: { canonical: "/empresas" },
};

// O que a operação faz hoje — os mesmos factos da homepage, sem promessas
// novas (ver lib/content.ts e lib/precos.ts).
const BENEFICIOS = [
  {
    titulo: "Uma carrinha só para a sua carga",
    texto: "Sem paragens nem outras entregas pelo caminho.",
  },
  {
    titulo: "À hora que marcar",
    texto: "Partimos de Sangalhos (Anadia), recolhemos onde a carga estiver e entregamos direto no destino.",
  },
  {
    titulo: "Até 640 kg, sem o peso mexer no preço",
    texto: "Do envelope à palete, sem transbordos nem centros de triagem.",
  },
  {
    titulo: "Rota fixa contratada",
    texto:
      "Viatura e condutor afetos à sua operação, a partir de 20 operações por mês.",
  },
  {
    titulo: "Preço fechado antes da recolha",
    texto: "Por viagem e por escrito, sem sobretaxas nem taxas escondidas.",
  },
];

// Landing dos anúncios: uma só coisa para fazer — preencher o formulário. Por
// isso o cabeçalho não tem o menu do site (SiteHeader levaria o visitante
// para a homepage).
export default function EmpresasPage() {
  return (
    <>
      <header className="hd is-solido">
        <nav className="hd-barra" aria-label="Principal">
          <a href="/" className="hd-marca">
            <Image
              src="/assets/prontogo-icone-v2.svg"
              alt=""
              width={34}
              height={34}
              priority
            />
            <span className="hd-palavra">
              Pronto<span>Go</span>
            </span>
          </a>
          <a href="#pedido" className="hd-cta lp-cta">
            Pedir proposta
            <span aria-hidden="true" className="hd-cta-seta">
              →
            </span>
          </a>
        </nav>
      </header>

      <main>
        <section className="h-escuro lp">
          <FundoVivo />
          <div className="h-wrap lp-grelha">
            <div className="lp-intro">
              <p className="h-eyebrow">
                <span className="h-ponto" />
                Para empresas · Aveiro → Portugal e Europa
              </p>
              <h1 className="h-titulo lp-titulo">
                Entrega dedicada para a sua empresa
              </h1>
              <p className="h-lead">
                Diga-nos o que precisa de mover e com que frequência. Quem
                recolhe é quem entrega, e respondemos com uma proposta em
                menos de 24 horas úteis.
              </p>
            </div>

            <div className="lp-form">
              <EmpresasForm />
            </div>

            <ul className="lp-benef">
              {BENEFICIOS.map((b) => (
                <li key={b.titulo}>
                  <svg
                    className="lp-visto"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>
                    <strong>{b.titulo}</strong>
                    {b.texto}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappButton />
    </>
  );
}
