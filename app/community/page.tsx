import type { Metadata } from "next";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ArrowLink, CTASection, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { communityItems } from "@/data/community";

export const metadata: Metadata = {
  title: "OSANO Community",
  description: "A space for learning, conversation and participation around better everyday living.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="OSANO Community"
        title="Learning begins with connection."
        summary="A growing space for people to share perspectives, ask better questions and explore how innovation can support everyday life."
        media={{ kind: "image", label: "Community Conversation Image" }}
        tone="health"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Community" }]}
      />
      <section className="community-intro section-pad">
        <div className="shell proposition-grid">
          <Eyebrow>People make knowledge useful</Eyebrow>
          <div><h2>From one-way information to shared understanding.</h2><p>The OSANO Community will bring together learning, conversation and participation — grounded in the realities of homes, professional settings and shared environments.</p></div>
        </div>
      </section>
      <section className="community-program section-pad-sm">
        <div className="shell">
          <SectionHeading eyebrow="Community directions" title="A place designed to grow with its members." />
          <div className="community-grid">
            {[
              ["Learn", "Clear perspectives on technology and context."],
              ["Exchange", "Thoughtful conversation across different experiences."],
              ["Participate", "Future opportunities to take part and contribute."],
            ].map(([title, copy], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="community-feature section-pad">
        <div className="shell brand-landscape-grid">
          <MediaPlaceholder media={communityItems[1].heroMedia} tone="pets" />
          <div><Eyebrow>{communityItems[1].eyebrow}</Eyebrow><h2>{communityItems[1].title}</h2><p>{communityItems[1].description}</p><ArrowLink href="/stories">Explore OSANO stories</ArrowLink></div>
        </div>
      </section>
      <CTASection eyebrow="Stay curious" title="Start a conversation about the environment you want to improve." />
    </>
  );
}
