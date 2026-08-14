"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollLinkedTitle({ text, className }: { text: string; className?: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const characters = [...text];
  const midpoint = (characters.length - 1) / 2;

  useEffect(() => {
    const update = () => {
      frameRef.current = null;
      const title = titleRef.current;
      if (!title) return;
      const bounds = title.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const finish = window.innerHeight * 0.48;
      setProgress(Math.min(1, Math.max(0, (start - bounds.top) / (start - finish))));
    };
    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <h2
      ref={titleRef}
      className={`scroll-linked-title ${className ?? ""}`}
      aria-label={text}
      style={{ letterSpacing: `${-0.04 + (1 - progress) * 0.12}em` }}
    >
      {characters.map((character, index) => {
        const offset = index - midpoint;
        const distance = 1 - progress;
        return (
          <span
            key={`${character}-${index}`}
            aria-hidden="true"
            style={{
              opacity: 0.18 + progress * 0.82,
              filter: `blur(${distance * 5}px)`,
              transform: `translate3d(${offset * distance * 2.7}px, ${distance * 20}px, 0)`,
            }}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        );
      })}
    </h2>
  );
}
