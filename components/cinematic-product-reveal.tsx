"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CinematicProductRevealProps = {
  eyebrow: string;
  title: string;
  summary: string;
  imageSrc?: string;
  collectionLabel: string;
};

export function CinematicProductReveal({
  eyebrow,
  title,
  summary,
  imageSrc,
  collectionLabel,
}: CinematicProductRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -bounds.top / distance)));
    };
    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="product-reveal"
      style={{ "--product-progress": progress } as React.CSSProperties}
      aria-labelledby="product-reveal-title"
    >
      <div className="product-reveal__sticky">
        <div className="product-reveal__media" aria-hidden="true">
          {imageSrc ? (
            <Image src={imageSrc} alt="" fill priority sizes="100vw" />
          ) : (
            <div className="product-reveal__placeholder">
              <span>{title.slice(0, 3).toUpperCase()}</span>
              <i />
              <small>Product imagery coming soon</small>
            </div>
          )}
        </div>
        <div className="product-reveal__shade" aria-hidden="true" />
        <div className="product-reveal__glint" aria-hidden="true" />
        <div className="product-reveal__intro">
          <p>{eyebrow}</p>
          <h1 id="product-reveal-title">{title}</h1>
          <span>{summary}</span>
        </div>
        <div className="product-reveal__detail">
          <small>01 / {collectionLabel}</small>
          <h2>Technology,<br />refined for living.</h2>
          <a href="#product-details">Discover the approach <span aria-hidden="true">&darr;</span></a>
        </div>
        <div className="product-reveal__progress" aria-hidden="true"><span /></div>
        <p className="product-reveal__prototype">{imageSrc ? "Prototype imagery" : "Image placeholder"}</p>
      </div>
    </section>
  );
}
