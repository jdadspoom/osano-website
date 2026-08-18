"use client";

import Image from "next/image";
import Link from "next/link";
import { DiagonalArrowIcon } from "@/components/diagonal-arrow-icon";
import { useCarouselNavigation } from "@/components/use-carousel-navigation";

const careContexts = [
  { title: "Pet parent", description: "Everyday care for life together.", image: "/images/solutions/pets/pets-parent.webp", href: "/solutions/pets/pet-owner" },
  { title: "Grooming", description: "Smarter hygiene for professional grooming.", image: "/images/solutions/pets/pets-grooming.webp", href: "/solutions/pets/groomer" },
  { title: "Veterinary", description: "Technology for professional pet care.", image: "/images/solutions/pets/pets-veterinary.webp", href: "/solutions/pets/veterinary" },
  { title: "Shared spaces", description: "Thoughtful care wherever life happens.", image: "/images/solutions/pets/pets-context.webp", href: "/solutions/pets" },
];

export function PetsApproachCarousel() {
  const { activeIndex, canGoPrevious, canGoNext, previous, next, trackRef, itemRefs, trackProps } = useCarouselNavigation(careContexts.length);

  return (
    <section className="pets-approach-carousel" id="pet-care-contexts" aria-labelledby="pets-approach-title">
      <div className="pets-approach-heading">
        <p className="pets-approach-kicker">OUR APPROACH</p>
        <h2 id="pets-approach-title">Find the right care.</h2>
      </div>

      <div className="pets-approach-layout">
        <aside className="pets-approach-nav" aria-label="Pet care carousel controls">
          <div className="pets-approach-count">
            <p aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span>/04</span></p>
            <p>Designed for every way you care.</p>
          </div>
          <div className="pets-approach-controls">
            <button type="button" onClick={previous} disabled={!canGoPrevious} aria-label="Previous care context">‹</button>
            <button type="button" onClick={next} disabled={!canGoNext} aria-label="Next care context">›</button>
          </div>
        </aside>

        <div className="pets-approach-viewport">
          <div className="pets-approach-track" ref={trackRef} {...trackProps} aria-label="Pet care contexts">
            {careContexts.map((context, index) => (
              <article className="pets-approach-card" key={context.title} ref={(node) => { itemRefs.current[index] = node; }} aria-label={`${index + 1} of ${careContexts.length}: ${context.title}`}>
                <Image src={context.image} alt={context.title} fill sizes="(max-width: 760px) 80vw, 48vw" />
                <div className="pets-approach-card-shade" />
                <div className="pets-approach-card-copy">
                  <h3>{context.title}</h3>
                  <p>{context.description}</p>
                </div>
                <Link href={context.href} aria-label={`Explore ${context.title}`}><DiagonalArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
