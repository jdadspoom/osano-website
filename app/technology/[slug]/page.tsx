import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail-template";
import { getTechnology, technologies } from "@/data/technologies";

export const dynamicParams = false;

export function generateStaticParams() {
  return technologies.map((technology) => ({ slug: technology.slug }));
}

export async function generateMetadata({ params }: PageProps<"/technology/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) return {};
  return { title: { absolute: technology.seoTitle }, description: technology.seoDescription, alternates: { canonical: `/technology/${technology.slug}` } };
}

export default async function TechnologyDetailPage({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) notFound();
  return <DetailTemplate item={technology} />;
}
