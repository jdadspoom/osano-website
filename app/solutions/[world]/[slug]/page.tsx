import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/detail-template";
import { getSolution, publishedSolutions } from "@/data/solutions";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedSolutions.map((solution) => ({ world: solution.world, slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[world]/[slug]">): Promise<Metadata> {
  const { world, slug } = await params;
  const solution = getSolution(world, slug);
  if (!solution) return {};
  return { title: { absolute: solution.seoTitle }, description: solution.seoDescription, alternates: { canonical: solution.route ?? "/solutions" } };
}

export default async function SolutionDetailPage({ params }: PageProps<"/solutions/[world]/[slug]">) {
  const { world, slug } = await params;
  const solution = getSolution(world, slug);
  if (!solution) notFound();
  return <DetailTemplate item={solution} />;
}
