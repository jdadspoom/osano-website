import type { Metadata } from "next";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CTASection, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About OSANO",
  description: siteConfig.statement,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OSANO"
        title="Innovation, made relevant to life."
        summary={siteConfig.statement}
        media={{ kind: "image", label: "OSANO Brand World Image" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <section className="editorial-split section-pad">
        <div className="shell editorial-split-grid">
          <SectionHeading
            eyebrow="Our point of view"
            title="The most useful innovation starts by paying attention."
          />
          <div className="editorial-body">
            <p className="lead-copy">
              OSANO looks first at people, pets, places and routines. Technology
              becomes meaningful when it is shaped around this living context.
            </p>
            <p>
              Across health, hygiene and pet care, we connect approved products and
              technology platforms into a clearer, more considered experience.
            </p>
          </div>
        </div>
      </section>
      <section className="principles section-pad-sm">
        <div className="shell principles-grid">
          {[
            ["01", "Context before complexity", "We begin with the setting and the people within it."],
            ["02", "Precision with restraint", "We communicate clearly and avoid claims that have not been confirmed."],
            ["03", "Better, together", "People, pets and environments are part of one connected everyday system."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="brand-landscape section-pad">
        <div className="shell brand-landscape-grid">
          <MediaPlaceholder media={{ kind: "image", label: "People and Place Image" }} tone="health" />
          <div>
            <Eyebrow>Contemporary, calm, connected</Eyebrow>
            <h2>A lifestyle brand shaped for the world we share now.</h2>
            <p>
              OSANO brings a contemporary Asian perspective to better everyday
              living: intelligent, precise, open and deeply aware of context.
            </p>
          </div>
        </div>
      </section>
      <CTASection title="Begin with your environment, and build the right solution from there." />
    </>
  );
}
