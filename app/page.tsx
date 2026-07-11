import SiteHeader from "@/components/SiteHeader";
import ScrollExperience from "@/components/ScrollExperience";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Differentials from "@/components/Differentials";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { siteUrl, siteDescription } from "@/lib/site";
import { servicos } from "@/lib/content";

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
  telephone: "+351234000000",
  email: "geral@prontogo.pt",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aveiro",
    addressCountry: "PT",
  },
  areaServed: { "@type": "Country", name: "Portugal" },
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main>
        <ScrollExperience />
        <Services />
        <HowItWorks />
        <Differentials />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
