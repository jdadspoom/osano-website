"use client";

import Link from "next/link";
import { DiagonalArrowIcon } from "@/components/diagonal-arrow-icon";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";
import { useCarouselNavigation } from "@/components/use-carousel-navigation";

const solutions = [
  { title: "Air Solution", description: "Breathe cleaner.", href: "/solutions/hygiene/air", tone: "air" },
  { title: "Water Solution", description: "Live cleaner.", href: "/solutions/hygiene/water-surface", tone: "water" },
  { title: "Surface Solution", description: "Cleaner touchpoints for everyday life.", href: "/solutions/hygiene/water-surface", tone: "surface" },
  { title: "Integrated Hygiene", description: "Thoughtful protection across shared spaces.", href: "/solutions/hygiene", tone: "integrated" },
];

export function HygieneSolutionsCarousel() {
  const { activeIndex, canGoPrevious, canGoNext, previous, next, trackRef, itemRefs, trackProps } = useCarouselNavigation(solutions.length);

  return (
    <section className="clean-hygiene-solutions" id="hygiene-solutions" aria-labelledby="hygiene-solutions-title">
      <div className="clean-hygiene-solutions-heading">
        <p className="clean-hygiene-kicker">OUR SOLUTION</p>
        <h2 id="hygiene-solutions-title">Designed for<br />everyday hygiene.</h2>
      </div>

      <div className="clean-hygiene-solutions-layout">
        <aside className="clean-hygiene-solutions-nav" aria-label="Solution carousel controls">
          <p aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span>/04</span></p>
          <div>
            <button type="button" onClick={previous} disabled={!canGoPrevious} aria-label="Previous solution">‹</button>
            <button type="button" onClick={next} disabled={!canGoNext} aria-label="Next solution">›</button>
          </div>
        </aside>

        <div className={`clean-hygiene-solutions-viewport${activeIndex === solutions.length - 1 ? " clean-hygiene-solutions-viewport--last" : ""}`}>
          <div className="clean-hygiene-solutions-track" ref={trackRef} {...trackProps} aria-label="Hygiene solutions">
            {solutions.map((solution, index) => (
              <article
                className={`clean-hygiene-solution-card clean-hygiene-solution-card--${solution.tone}`}
                key={solution.title}
                data-active={index === activeIndex}
                ref={(node) => { itemRefs.current[index] = node; }}
                aria-label={`${index + 1} of ${solutions.length}: ${solution.title}`}
              >
                <div className="clean-hygiene-solution-placeholder"><OsanoEmptyArtwork label={solution.title} tone="hygiene" /></div>
                <div className="clean-hygiene-solution-shade" />
                <div className="clean-hygiene-solution-card-copy">
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </div>
                <Link href={solution.href} aria-label={`Explore ${solution.title}`}><DiagonalArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
