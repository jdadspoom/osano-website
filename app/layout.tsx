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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "OSANO | Technology in Step with Everyday Life",
    description: siteConfig.defaultDescription,
    images: [{ url: siteConfig.socialImage, alt: "OSANO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSANO | Technology in Step with Everyday Life",
    description: siteConfig.defaultDescription,
    images: [siteConfig.socialImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${notoSansThai.variable}`}
    >
      <body>
        <CinematicPageTransition />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <ScrollProgress />
        <SiteScrollEffects />
        <CardPointerEffects />
        <AmbientBackgroundMotion />
        <main id="main-content">{children}</main>
        <FloatingContact />
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
