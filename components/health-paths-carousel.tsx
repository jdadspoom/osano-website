"use client";

import Image from "next/image";
import Link from "next/link";
import { DiagonalArrowIcon } from "@/components/diagonal-arrow-icon";
import { useCarouselNavigation } from "@/components/use-carousel-navigation";

const paths = [
  { title: "Oxygen", description: "Breathe better.", image: "/images/solutions/health/health-oxygen.png?v=20260814", href: "/technology/oxygen" },
  { title: "Hydrogen", description: "Hydrate better.", image: "/images/solutions/health/health-hydrogen.webp", href: "/technology/hydrogen" },
  { title: "QRS", description: "Restore balance.", image: "/images/solutions/health/health-qrs.webp", href: "/technology" },
  { title: "Daily Well-being", description: "Live in balance.", image: "/images/solutions/health/health-hero.png", href: "/solutions/health" },
];

export function HealthPathsCarousel() {
  const { activeIndex, canGoPrevious, canGoNext, previous, next, trackRef, itemRefs, trackProps } = useCarouselNavigation(paths.length);

  return (
    <section className="health-paths-carousel" id="health-paths" aria-labelledby="health-paths-title">
      <div className="health-paths-heading">
        <p>CHOOSE YOUR WELL-BEING PATH</p>
        <h2 id="health-paths-title">Find what fits<br />your everyday life.</h2>
      </div>

      <div className="health-paths-layout">
        <aside className="health-paths-nav" aria-label="Health path carousel controls">
          <p aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span>/04</span></p>
          <div>
            <button type="button" onClick={previous} disabled={!canGoPrevious} aria-label="Previous health path">‹</button>
            <button type="button" onClick={next} disabled={!canGoNext} aria-label="Next health path">›</button>
          </div>
        </aside>

        <div className="health-paths-viewport">
          <div className="health-paths-track" ref={trackRef} {...trackProps} aria-label="Health paths">
            {paths.map((path, index) => (
              <article className="health-path-card" key={path.title} ref={(node) => { itemRefs.current[index] = node; }} aria-label={`${index + 1} of ${paths.length}: ${path.title}`}>
                <Image src={path.image} alt={`${path.title} well-being context`} fill sizes="(max-width: 760px) 78vw, 45vw" />
                <div className="health-path-card-shade" />
                <div className="health-path-card-copy">
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                </div>
                <Link href={path.href} aria-label={`Explore ${path.title}`}><DiagonalArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
