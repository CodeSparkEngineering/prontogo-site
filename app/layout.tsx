import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { siteUrl, siteTitle, siteDescription } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
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
  themeColor: "#0E2A56",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
