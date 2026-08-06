import { products } from "@/data/products";
import { publishedSolutions } from "@/data/solutions";
import { technologies } from "@/data/technologies";
import { ProductCard, SectionHeading, SolutionCard, TechnologyCard } from "./ui";

export function RelatedContent({
  productIds = [],
  solutionIds = [],
  technologyIds = [],
}: {
  productIds?: string[];
  solutionIds?: string[];
  technologyIds?: string[];
}) {
  const relatedProducts = products.filter((item) => productIds.includes(item.id));
  const relatedSolutions = publishedSolutions.filter((item) =>
    solutionIds.includes(item.id),
  );
  const relatedTechnologies = technologies.filter((item) =>
    technologyIds.includes(item.id),
  );

  if (!relatedProducts.length && !relatedSolutions.length && !relatedTechnologies.length) {
    return null;
  }

  return (
    <section className="related-section section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Connected by context"
          title="Explore the wider OSANO system"
        />
        {relatedSolutions.length > 0 && (
          <div className="related-group">
            <h3 className="group-label">Related solutions</h3>
            <div className="card-grid two-col">
              {relatedSolutions.map((item) => (
                <SolutionCard key={item.id} solution={item} />
              ))}
            </div>
          </div>
        )}
        {relatedProducts.length > 0 && (
          <div className="related-group">
            <h3 className="group-label">Related products</h3>
            <div className="product-grid">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
        {relatedTechnologies.length > 0 && (
          <div className="related-group">
            <h3 className="group-label">Related technology</h3>
            <div className="technology-grid">
              {relatedTechnologies.map((item) => (
                <TechnologyCard key={item.id} technology={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
