import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import GuiaCard from "@/components/GuiaCard";
import WhatsappButton from "@/components/WhatsappButton";
import { guias } from "@/lib/guias";

export const metadata: Metadata = {
  title: "Guias de logística e entregas",
  description:
    "Guias práticos sobre custos de envio, escolha de transportadora, last-mile e logística para lojas online e PMEs em Portugal.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <>
      <SiteHeader />
      <main className="section guias-page">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="kicker">Guias</div>
            <h2>Logística explicada sem jargão</h2>
            <p>
              O que aprendemos na estrada, escrito para quem tem um negócio para
              gerir e precisa que as entregas simplesmente funcionem.
            </p>
          </div>
          <div className="guias-grid">
            {guias.map((guia) => (
              <GuiaCard key={guia.slug} guia={guia} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </>
  );
}
