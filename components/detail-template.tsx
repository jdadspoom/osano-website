import type { Product, Solution, Technology } from "@/types/content";
import { MediaPlaceholder } from "./media-placeholder";
import { RelatedContent } from "./related-content";
import { CTASection, PageHero, SectionHeading } from "./ui";

type Detail = Product | Solution | Technology;

const isSolution = (item: Detail): item is Solution => "world" in item;
const isProduct = (item: Detail): item is Product => "category" in item;

export function DetailTemplate({ item }: { item: Detail }) {
  const tone = isSolution(item) ? item.world : isProduct(item) ? "neutral" : "technology";
  const parent = isSolution(item)
    ? { label: item.eyebrow.replace("OSANO ", ""), href: `/solutions/${item.world}` }
    : isProduct(item)
      ? { label: "Products" }
      : { label: "Technology", href: "/technology" };
  const context = isProduct(item)
    ? item.context
    : isSolution(item)
      ? item.context
      : item.principle;
  const approach = isProduct(item)
    ? item.approach
    : isSolution(item)
      ? item.approach
      : item.application;

  return (
    <>
      <PageHero
        eyebrow={item.eyebrow}
        title={item.title}
        summary={item.summary}
        media={item.heroMedia}
        tone={tone}
        breadcrumbs={[
          { label: "Home", href: "/" },
          parent,
          { label: item.title },
        ]}
      />

      <section className="editorial-split section-pad">
        <div className="shell editorial-split-grid">
          <SectionHeading eyebrow="The context" title={context} />
          <div className="editorial-body">
            <p className="lead-copy">{item.description}</p>
            <div className="fine-rule" />
            <h3>The OSANO approach</h3>
            <p>{approach}</p>
          </div>
        </div>
      </section>

      <section className="media-story section-pad-sm">
        <div className="shell media-story-grid">
          {item.gallery.map((media, index) => (
            <MediaPlaceholder key={`${media.label}-${index}`} media={media} tone={tone} />
          ))}
        </div>
      </section>

      <section className="document-section section-pad-sm">
        <div className="shell document-grid">
          {item.video && <MediaPlaceholder media={item.video} tone={tone} />}
          {item.documents.map((document, index) => (
            <MediaPlaceholder
              key={`${document.label}-${index}`}
              media={document}
              tone={tone}
            />
          ))}
        </div>
      </section>

      <RelatedContent
        productIds={item.relatedProductIds}
        solutionIds={item.relatedSolutionIds}
        technologyIds={item.relatedTechnologyIds}
      />
      <CTASection />
    </>
  );
}
