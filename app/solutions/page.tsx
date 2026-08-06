import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading, SolutionCard, WorldCard } from "@/components/ui";
import { publishedSolutions } from "@/data/solutions";
import { worlds } from "@/data/worlds";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Explore OSANO solutions across Health, Hygiene and Pets.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="OSANO Solutions"
        title="Start with the world around you."
        summary="Our solutions begin with a real context — a home, a professional setting, a shared routine — and connect the technology from there."
        media={{ kind: "image", label: "Connected Solution Worlds" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />
      <section className="section-pad worlds-section">
        <div className="shell">
          <SectionHeading eyebrow="Choose your context" title="Three connected OSANO worlds" />
          <div className="worlds-grid">
            {worlds.map((world, index) => <WorldCard key={world.id} world={world} index={index} />)}
          </div>
        </div>
      </section>
      <section className="section-pad selected-section">
        <div className="shell">
          <SectionHeading eyebrow="Published solutions" title="Explore solutions shaped around daily life." />
          <div className="card-grid two-col">
            {publishedSolutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
