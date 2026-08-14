"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterComparisonProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfterComparison({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
}: BeforeAfterComparisonProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after" style={{ "--comparison-position": `${position}%` } as React.CSSProperties}>
      <div className="before-after__image before-after__image--before">
        <Image src={beforeSrc} alt={beforeLabel} fill sizes="(max-width: 760px) 100vw, 1100px" />
        <span>{beforeLabel}</span>
      </div>
      <div className="before-after__image before-after__image--after">
        <Image src={afterSrc} alt={afterLabel} fill sizes="(max-width: 760px) 100vw, 1100px" />
        <span>{afterLabel}</span>
      </div>
      <div className="before-after__divider" aria-hidden="true">
        <span><b>&larr;</b><b>&rarr;</b></span>
      </div>
      <input
        className="before-after__range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={event => setPosition(Number(event.target.value))}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
      />
    </div>
  );
}
