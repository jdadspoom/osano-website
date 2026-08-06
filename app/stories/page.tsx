import type { Metadata } from "next";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ArrowLink, CTASection, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { communityItems } from "@/data/community";

export const metadata: Metadata = {
  title: "Stories",
  description: "OSANO stories about context, technology and better everyday living.",
  alternates: { canonical: "/stories" },
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="OSANO Stories"
        title="Ideas for living more thoughtfully."
        summary="Perspectives on technology, context, people, pets and the small routines that shape a better everyday."
        media={{ kind: "image", label: "Editorial Stories Image" }}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Stories" }]}
      />
      <section className="stories-section section-pad">
        <div className="shell">
          <SectionHeading eyebrow="Editorial previews" title="Read the world through an OSANO lens." />
          <div className="stories-list">
            {communityItems.map((item, index) => (
              <article className="story-row" key={item.id}>
                <div className="story-index">0{index + 1}</div>
                <MediaPlaceholder media={item.heroMedia} tone={index === 1 ? "pets" : "health"} />
                <div className="story-row-copy">
                  <Eyebrow>{item.eyebrow}</Eyebrow>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <ArrowLink href={index === 1 ? "/community" : "/stories"}>Editorial feature coming soon</ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection eyebrow="Join the conversation" title="Better everyday living grows through shared ideas." />
    </>
  );
}
