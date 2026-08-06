import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={geist.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
