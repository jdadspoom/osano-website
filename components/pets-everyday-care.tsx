"use client";

import Image from "next/image";
import { useState } from "react";

const careModes = [
  { title: "Home\nEveryday\nCare", image: "/images/solutions/pets/pets-parent.webp", alt: "A pet parent caring for a dog at home" },
  { title: "Grooming\nHygiene &\nComfort", image: "/images/solutions/pets/pets-grooming.webp", alt: "A professional grooming consultation" },
  { title: "Veterinary\nProfessional\nCare", image: "/images/solutions/pets/pets-veterinary.webp", alt: "A veterinary care consultation" },
];

export function PetsEverydayCare() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="pets-everyday-care" aria-labelledby="pets-everyday-care-title">
      <div className="pets-everyday-care-heading">
        <h2 id="pets-everyday-care-title">Made for<br />everyday care</h2>
        <p>Technology that fits naturally into their world</p>
      </div>

      <div className="pets-everyday-care-panel">
        <div className="pets-everyday-care-image">
          <Image
            key={careModes[activeIndex].image}
            src={careModes[activeIndex].image}
            alt={careModes[activeIndex].alt}
            fill
            sizes="(max-width: 760px) 100vw, 70vw"
          />
        </div>
        <div className="pets-everyday-care-tabs" role="tablist" aria-label="Everyday pet care contexts">
          {careModes.map((mode, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              key={mode.title}
            >
              {mode.title.split("\n").map((line) => <span key={line}>{line}</span>)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
