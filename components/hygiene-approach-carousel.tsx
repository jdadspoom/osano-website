"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DiagonalArrowIcon } from "@/components/diagonal-arrow-icon";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";
import { useCarouselNavigation } from "@/components/use-carousel-navigation";

const approachCards = [
  { title: "Kitchen", caption: "Clean water", image: "/images/solutions/hygiene/hygiene-kitchen.png", href: "/solutions/hygiene/water-surface" },
  { title: "Bathroom", caption: "Everyday hygiene", image: "/images/solutions/hygiene/hygiene-bathroom.png", href: "/solutions/hygiene/water-surface" },
  { title: "Living Space", caption: "Cleaner environment", image: "/images/solutions/hygiene/hygiene-living-space.png", href: "/solutions/hygiene/air" },
  { title: "Entryway", caption: "Context preview", prototype: true },
  { title: "Shared Space", caption: "Context preview", prototype: true },
];

export function HygieneApproachCarousel() {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(() => new Set());
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { canGoPrevious, canGoNext, previous, next, trackRef, itemRefs, trackProps } = useCarouselNavigation(approachCards.length);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedCards((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            const index = Number((entry.target as HTMLElement).dataset.cardIndex);
            if (entry.isIntersecting) next.add(index);
            else next.delete(index);
          });
          return next;
        });
      },
      { root: track, threshold: 0.38 },
    );

    itemRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, [itemRefs, trackRef]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="clean-hygiene-approach" aria-labelledby="hygiene-approach-title" ref={sectionRef}>
      <header className="clean-hygiene-approach-heading">
        <p className="clean-hygiene-kicker">OUR APPROACH</p>
        <h2 id="hygiene-approach-title">Hygiene, built into life</h2>
      </header>

      <div className="clean-hygiene-approach-viewport">
        <div className="clean-hygiene-approach-track" ref={trackRef} {...trackProps} aria-label="Hygiene contexts">
          {approachCards.map((card, index) => (
            <article
              className={`clean-hygiene-approach-card${card.prototype ? " clean-hygiene-approach-card--prototype" : ""}${isSectionVisible && revealedCards.has(index) ? " clean-hygiene-approach-card--revealed" : ""}`}
              key={card.title}
              data-card-index={index}
              ref={(node) => { itemRefs.current[index] = node; }}
              aria-label={`${index + 1} of ${approachCards.length}: ${card.title}`}
            >
              {card.image ? (
                <Image src={card.image} alt={`${card.title} hygiene context`} fill sizes="(max-width: 760px) 82vw, 30vw" />
              ) : (
                <div className="clean-hygiene-approach-placeholder"><OsanoEmptyArtwork label={card.title} tone="hygiene" /></div>
              )}
              <div className="clean-hygiene-approach-card-copy">
                <h3>{card.title}</h3>
                <p>{card.caption}</p>
                {card.href ? (
                  <Link href={card.href} aria-label={`Explore ${card.title}`}><DiagonalArrowIcon /></Link>
                ) : (
                  <span aria-hidden="true"><DiagonalArrowIcon /></span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="clean-hygiene-approach-footer">
        <div>
          <button type="button" onClick={previous} disabled={!canGoPrevious} aria-label="Previous hygiene context">‹</button>
          <button type="button" onClick={next} disabled={!canGoNext} aria-label="Next hygiene context">›</button>
        </div>
        <p>Less effort. More protection.</p>
      </footer>
    </section>
  );
}
