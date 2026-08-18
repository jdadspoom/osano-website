import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingContact } from "@/components/floating-contact";
import { SiteScrollEffects } from "@/components/site-scroll-effects";
import { ScrollProgress } from "@/components/scroll-progress";
import { CardPointerEffects } from "@/components/card-pointer-effects";
import { AmbientBackgroundMotion } from "@/components/ambient-background-motion";
import { CinematicPageTransition } from "@/components/cinematic-page-transition";
import { HeroEntrance } from "@/components/hero-entrance";
import { SectionMotion } from "@/components/section-motion";
import { CtaMotion } from "@/components/cta-motion";
import { PrivacyConsent } from "@/components/privacy-consent";
import { MediaLoadEffects } from "@/components/media-load-effects";
import { absoluteUrl, siteConfig } from "@/data/site";
import "./globals.css";

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/Instrument_Serif/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Instrument_Serif/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-instrument-serif",
});

const bodoniModa = localFont({
  src: [
    {
      path: "./fonts/Bodoni_Moda/BodoniModa[opsz,wght].ttf",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "./fonts/Bodoni_Moda/BodoniModa-Italic[opsz,wght].ttf",
      weight: "400 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-bodoni-moda",
});

const notoSansThai = localFont({
  src: "./fonts/Instrument_Serif,Noto_Sans_Thai/Noto_Sans_Thai/NotoSansThai-VariableFont_wdth,wght.ttf",
  display: "swap",
  variable: "--font-noto-sans-thai",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "OSANO | Technology in Step with Everyday Life",
    template: "%s | OSANO",
  },
  description: siteConfig.defaultDescription,
  applicationName: "OSANO",
  creator: "OSANO Lifestyle Technology",
  publisher: "OSANO Lifestyle Technology",
  category: "Lifestyle technology",
  keywords: ["OSANO", "lifestyle technology", "health", "hygiene", "pet care", "well-being"],
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "OSANO | Technology in Step with Everyday Life",
    description: siteConfig.defaultDescription,
    images: [{ url: siteConfig.socialImage, alt: "OSANO" }],
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSANO | Technology in Step with Everyday Life",
    description: siteConfig.defaultDescription,
    images: [siteConfig.socialImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: siteConfig.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl(siteConfig.logo),
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      sameAs: [siteConfig.contact.facebookUrl, siteConfig.contact.instagramUrl, siteConfig.contact.tiktokUrl],
      address: { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: "OSANO Lifestyle Technology",
      url: absoluteUrl("/"),
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
      inLanguage: "en",
    },
  ];

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${bodoniModa.variable} ${notoSansThai.variable}`}
    >
      <body>
        <CinematicPageTransition />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <ScrollProgress />
        <SiteScrollEffects />
        <HeroEntrance />
        <SectionMotion />
        <CtaMotion />
        <CardPointerEffects />
        <AmbientBackgroundMotion />
        <MediaLoadEffects />
        <main id="main-content">{children}</main>
        <FloatingContact />
        <PrivacyConsent />
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
