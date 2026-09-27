import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollEffects from "@/components/ScrollEffects";
import ConversoesCliques from "@/components/ConversoesCliques";
import { siteUrl, siteTitle, siteDescription } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./home.css";

// Três famílias, cada uma com um papel: a Bricolage (variável, com eixo de
// largura) para os títulos grandes, a Instrument Serif em itálico para as
// palavras de ênfase dentro desses títulos, e a Geist para o texto corrido.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · ProntoGo",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  applicationName: "ProntoGo",
  // Geo tags para SEO local (lidos por alguns diretórios e ferramentas locais)
  other: {
    "geo.region": "PT-01",
    "geo.placename": "Aveiro",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/assets/prontogo-icone-v2.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "/",
    siteName: "ProntoGo",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/assets/prontogo-og.jpg",
        width: 1200,
        height: 630,
        alt: "Carrinha ProntoGo em Aveiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/prontogo-og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06122A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-PT"
      className={`${display.variable} ${serif.variable} ${body.variable}`}
    >
      <body>
        {/* Antes dos filhos: o efeito monta primeiro e a instância do Lenis
            já existe quando as secções arrancam os seus próprios scrubs */}
        <SmoothScroll />
        {children}
        <ScrollEffects />
        <CookieConsent />
        <ConversoesCliques />
        <Analytics />
      </body>
    </html>
  );
}
