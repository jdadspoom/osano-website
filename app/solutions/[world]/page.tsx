import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection, PageHero, SectionHeading, SolutionCard, TechnologyCard } from "@/components/ui";
import { publishedSolutions } from "@/data/solutions";
import { technologies } from "@/data/technologies";
import { getWorld, worlds } from "@/data/worlds";

export const dynamicParams = false;

export function generateStaticParams() {
  return worlds.map((world) => ({ world: world.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[world]">): Promise<Metadata> {
  const { world: slug } = await params;
  const world = getWorld(slug);
  if (!world) return {};
  return {
    title: { absolute: world.seoTitle },
    description: world.seoDescription,
    alternates: { canonical: `/solutions/${world.slug}` },
  };
}

export default async function WorldPage({ params }: PageProps<"/solutions/[world]">) {
  const { world: slug } = await params;
  const world = getWorld(slug);
  if (!world) notFound();
  const relatedSolutions = publishedSolutions.filter((item) => item.world === world.world);
  const relatedTechnologies = technologies.filter((item) => world.relatedTechnologyIds.includes(item.id));

  return (
    <>
      <PageHero
        eyebrow={world.eyebrow}
        title={world.title}
        summary={world.summary}
        media={world.heroMedia}
        tone={world.accent}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: world.title }]}
      />
      <section className="editorial-split section-pad">
        <div className="shell editorial-split-grid">
          <SectionHeading eyebrow="Our perspective" title={world.principle} />
          <div className="editorial-body"><p className="lead-copy">{world.description}</p></div>
        </div>
      </section>
      <section className="section-pad selected-section">
        <div className="shell">
          <SectionHeading eyebrow="Explore the world" title={`Solutions within ${world.title}`} />
          {relatedSolutions.length > 0 ? (
            <div className="card-grid two-col">{relatedSolutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}</div>
          ) : (
            <div className="empty-state"><p>Detailed public use cases are being prepared and will appear here once approved.</p></div>
          )}
        </div>
      </section>
      {relatedTechnologies.length > 0 && (
        <section className="section-pad technology-cards">
          <div className="shell">
            <SectionHeading eyebrow="Technology connection" title="The platforms behind this OSANO world" />
            <div className="technology-grid">{relatedTechnologies.map((technology) => <TechnologyCard key={technology.id} technology={technology} />)}</div>
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
