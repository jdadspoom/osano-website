import type { Metadata } from "next";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CTASection, PageHero, SectionHeading, TechnologyCard } from "@/components/ui";
import { technologies } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Technology",
  description: "Explore OSANO technology platforms and their approved product connections.",
  alternates: { canonical: "/technology" },
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="OSANO Technology"
        title="Precision that stays connected to purpose."
        summary="Technology matters when it responds to a real place, a real routine and a real need. OSANO keeps those connections visible."
        media={{ kind: "image", label: "Technology Material Study" }}
        tone="technology"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology" }]}
      />
      <section className="editorial-split section-pad">
        <div className="shell editorial-split-grid">
          <SectionHeading eyebrow="Our approach" title="Science-aware, human-centred." />
          <div className="editorial-body">
            <p className="lead-copy">We communicate approved technology relationships with clarity and restraint, avoiding unsupported specifications and claims.</p>
            <p>The result is a calmer way to understand how a platform connects to a product, a solution and the wider OSANO world.</p>
          </div>
        </div>
      </section>
      <section className="technology-overview section-pad-sm">
        <div className="shell technology-grid">
          {technologies.map((technology) => <TechnologyCard key={technology.id} technology={technology} />)}
        </div>
      </section>
      <section className="material-section section-pad">
        <div className="shell media-story-grid">
          <MediaPlaceholder media={{ kind: "image", label: "Refraction and Glass Study" }} tone="technology" />
          <MediaPlaceholder media={{ kind: "image", label: "Precision Material Detail" }} tone="technology" />
        </div>
      </section>
      <CTASection title="Connect the right technology to the context that matters." />
    </>
  );
}
