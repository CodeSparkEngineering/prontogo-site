import SiteHeader from "@/components/SiteHeader";
import ScrollExperience from "@/components/ScrollExperience";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Differentials from "@/components/Differentials";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import GuiasPreview from "@/components/GuiasPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsappButton from "@/components/WhatsappButton";
import {
  siteUrl,
  siteDescription,
  contactoEmail,
  contactoTelefone,
  contactoWhatsapp,
} from "@/lib/site";
import { servicos, perguntasFrequentes } from "@/lib/content";

// Dados estruturados (schema.org) para SEO local — rich results no Google.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ProntoGo",
  slogan: "Logística inteligente. Entregas que conectam.",
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/assets/prontogo-icone-v2.svg`,
  image: `${siteUrl}/assets/prontogo-og.jpg`,
  ...(contactoTelefone ? { telephone: contactoTelefone } : {}),
  ...(contactoEmail ? { email: contactoEmail } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aveiro",
    addressCountry: "PT",
  },
  areaServed: { "@type": "Country", name: "Portugal" },
  ...(contactoWhatsapp ? { sameAs: [contactoWhatsapp] } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de logística",
    itemListElement: servicos.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.titulo,
        description: s.texto,
        areaServed: "PT",
      },
    })),
  },
};

// FAQPage: elegível para rich results no Google e fonte direta de citações
// em motores de resposta (AI Overviews, ChatGPT, Perplexity).
// WebSite: identifica a entidade do site (sitelinks e knowledge panel).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ProntoGo",
      description: siteDescription,
      inLanguage: "pt-PT",
      publisher: { "@type": "Organization", name: "ProntoGo", url: siteUrl },
    },
    {
      "@type": "FAQPage",
      mainEntity: perguntasFrequentes.map((f) => ({
        "@type": "Question",
        name: f.pergunta,
        acceptedAnswer: { "@type": "Answer", text: f.resposta },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escapar "<" impede que conteúdo do JSON feche a tag <script>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main>
        <ScrollExperience />
        <Services />
        <HowItWorks />
        <Differentials />
        <About />
        <Testimonials />
        <GuiasPreview />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsappButton />
      <ScrollReveal />
    </>
  );
}
