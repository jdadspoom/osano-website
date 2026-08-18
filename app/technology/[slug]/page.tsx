import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail-template";
import { getTechnology, technologies } from "@/data/technologies";
import { OxygenTechnologyPage } from "@/components/oxygen-technology-page";
import { AqueousOzoneTechnologyPage } from "@/components/aqueous-ozone-technology-page";
import { HydrogenTechnologyPage } from "@/components/hydrogen-technology-page";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return technologies.map((technology) => ({ slug: technology.slug }));
}

export async function generateMetadata({ params }: PageProps<"/technology/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) return {};
  return createPageMetadata(technology.seoTitle, technology.seoDescription, `/technology/${technology.slug}`);
}

export default async function TechnologyDetailPage({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) notFound();
  if (slug === "oxygen") return <OxygenTechnologyPage />;
  if (slug === "aqueous-ozone") return <AqueousOzoneTechnologyPage />;
  if (slug === "hydrogen") return <HydrogenTechnologyPage />;
  return <DetailTemplate item={technology} />;
}
