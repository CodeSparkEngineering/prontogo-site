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

  // Contagem de palavras de todo o conteúdo do artigo, blocos e perguntas
  // frequentes incluídas — sinal de profundidade que o Google e os motores
  // de resposta valorizam.
  const palavrasFaq = (guia.faq ?? []).reduce(
    (t, f) => t + `${f.pergunta} ${f.resposta}`.split(/\s+/).length,
    0
  );
  const palavras = palavrasFaq + guia.blocos.reduce((total, b) => {
    const texto =
      b.tipo === "lista"
        ? b.itens.join(" ")
        : b.tipo === "tabela"
          ? [...b.cabecalho, ...b.linhas.flat()].join(" ")
          : b.tipo === "destaque"
            ? `${b.titulo} ${b.texto}`
            : b.tipo === "citacao"
              ? b.texto
              : b.texto;
    return total + texto.split(/\s+/).length;
  }, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guia.titulo,
        description: guia.resumo,
        image: `${siteUrl}${guia.img}`,
        datePublished: guia.data,
        dateModified: guia.data,
        wordCount: palavras,
        timeRequired: `PT${guia.minutos}M`,
        inLanguage: "pt-PT",
        articleSection: "Logística",
        author: {
          "@type": "Person",
          name: guia.autor,
          worksFor: { "@type": "Organization", name: "ProntoGo" },
        },
        publisher: {
          "@type": "Organization",
          name: "ProntoGo",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/assets/prontogo-icone-v2.svg`,
          },
        },
        mainEntityOfPage: `${siteUrl}/guias/${guia.slug}`,
      },
      // Perguntas do artigo em FAQPage: é o formato que os motores de
      // resposta mais citam, e torna o guia elegível a rich results.
      ...(guia.faq && guia.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: guia.faq.map((f) => ({
                "@type": "Question",
                name: f.pergunta,
                acceptedAnswer: { "@type": "Answer", text: f.resposta },
              })),
            },
          ]
        : []),
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
          {
            "@type": "ListItem",
            position: 3,
            name: guia.titulo,
            item: `${siteUrl}/guias/${guia.slug}`,
          },
        ],
      },
    ],
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
          <nav className="guia-breadcrumb" aria-label="Navegação estrutural">
            <Link href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <Link href="/guias">Guias</Link>
            <span aria-hidden="true">›</span>
            <span className="guia-breadcrumb-atual">{guia.titulo}</span>
          </nav>
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
            {guia.servico && (
              <p className="guia-servico-link">
                <Link href={guia.servico.href}>
                  {guia.servico.texto} →
                </Link>
              </p>
            )}
          </article>

          {guia.faq && guia.faq.length > 0 && (
            <section className="guia-faq">
              <h2>Perguntas frequentes</h2>
              <div className="faq-list">
                {guia.faq.map((f) => (
                  <details className="faq-item" key={f.pergunta}>
                    <summary>
                      <h3>{f.pergunta}</h3>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p>{f.resposta}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

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
