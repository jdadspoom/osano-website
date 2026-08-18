import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = title.includes("OSANO") ? title : `${title} | OSANO`;
  return {
    title: title.includes("OSANO") ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      url: path,
      images: [{ url: siteConfig.socialImage, width: 1200, height: 630, alt: "OSANO Lifestyle Technology" }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [siteConfig.socialImage] },
  };
}
