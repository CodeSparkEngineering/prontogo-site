import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import GuiaCard from "@/components/GuiaCard";
import WhatsappButton from "@/components/WhatsappButton";
import { guias } from "@/lib/guias";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guias de logística e entregas",
  description:
    "Guias práticos sobre custos de envio, escolha de transportadora, last-mile e logística para lojas online e PMEs em Portugal.",
  alternates: { canonical: "/guias" },
};

// Blog + Breadcrumb: ajudam o Google a perceber que isto é uma coleção
// editorial e onde encaixa na hierarquia do site.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${siteUrl}/guias`,
      name: "Guias ProntoGo",
      description:
        "Guias práticos sobre logística, custos de envio e entregas em Portugal.",
      url: `${siteUrl}/guias`,
      publisher: { "@type": "Organization", name: "ProntoGo", url: siteUrl },
      blogPost: guias.map((g) => ({
        "@type": "BlogPosting",
        headline: g.titulo,
        description: g.resumo,
        url: `${siteUrl}/guias/${g.slug}`,
        datePublished: g.data,
        image: `${siteUrl}${g.img}`,
        author: { "@type": "Person", name: g.autor },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guias",
          item: `${siteUrl}/guias`,
        },
      ],
    },
  ],
};

export default function GuiasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main className="section guias-page">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="kicker">Guias</div>
            <h1>Guias de logística e entregas</h1>
            <p>
              O que aprendemos na estrada, escrito para quem tem um negócio para
              gerir e precisa que as entregas simplesmente funcionem. Sem
              jargão, com números concretos do mercado português.
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
