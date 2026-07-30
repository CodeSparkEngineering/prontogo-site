import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import GuiaCard from "@/components/GuiaCard";
import GuiaConteudo from "@/components/GuiaConteudo";
import WhatsappButton from "@/components/WhatsappButton";
import { guias, guiaPorSlug, outrosGuias } from "@/lib/guias";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guia = guiaPorSlug(slug);
  if (!guia) return {};
  return {
    title: guia.titulo,
    description: guia.resumo,
    alternates: { canonical: `/guias/${guia.slug}` },
    openGraph: {
      type: "article",
      title: guia.titulo,
      description: guia.resumo,
      url: `/guias/${guia.slug}`,
      publishedTime: guia.data,
      images: [{ url: guia.img, width: 1200, height: 675, alt: guia.imgAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: guia.titulo,
      description: guia.resumo,
      images: [guia.img],
    },
  };
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guia = guiaPorSlug(slug);
  if (!guia) notFound();

  const relacionados = outrosGuias(guia.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guia.titulo,
    description: guia.resumo,
    image: `${siteUrl}${guia.img}`,
    datePublished: guia.data,
    dateModified: guia.data,
    author: { "@type": "Person", name: guia.autor },
    publisher: {
      "@type": "Organization",
      name: "ProntoGo",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/prontogo-icone-v2.svg`,
      },
    },
    mainEntityOfPage: `${siteUrl}/guias/${guia.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main className="guia-page">
        <div className="container guia-wrap">
          <Link href="/guias" className="guia-voltar">
            ← Todos os guias
          </Link>
          <div className="guia-cabecalho">
            <span className="guia-meta">
              {guia.dataDisplay} · {guia.minutos} min de leitura · {guia.autor}
            </span>
            <h1>{guia.titulo}</h1>
            <p className="guia-resumo">{guia.resumo}</p>
          </div>
          <div className="guia-hero">
            <Image
              src={guia.img}
              alt={guia.imgAlt}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 900px) 100vw, 860px"
            />
          </div>
          <article className="guia-corpo">
            <GuiaConteudo blocos={guia.blocos} />
          </article>

          <div className="guia-cta">
            <h2>Precisa de uma solução de entregas?</h2>
            <p>
              Diga-nos o que envia, para onde e com que frequência. Respondemos
              em menos de 24 horas úteis com uma proposta à medida.
            </p>
            <Link href="/#contacto" className="btn btn-primary">
              Pedir orçamento gratuito
            </Link>
          </div>

          {relacionados.length > 0 && (
            <section className="guia-relacionados">
              <h2>Leia também</h2>
              <div className="guias-grid">
                {relacionados.map((g) => (
                  <GuiaCard key={g.slug} guia={g} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </>
  );
}
