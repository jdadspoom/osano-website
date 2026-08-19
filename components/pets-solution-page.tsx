import Image from "next/image";
import { PetsApproachCarousel } from "@/components/pets-approach-carousel";
import { PetsEverydayCare } from "@/components/pets-everyday-care";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";

export function PetsSolutionPage() {
  return (
    <div className="pets-world-page">
      <section className="pets-world-hero">
        <div className="pets-world-hero-copy">
          <p className="pets-world-kicker">OSANO PETS</p>
          <h1>Better care.<br />Better<br />together.</h1>
          <p>Thoughtful technology for the pets we love.</p>
          <a href="#pet-care-contexts">Explore pet-care contexts <span aria-hidden="true"></span></a>
        </div>
        <div className="pets-world-hero-image">
          <Image src="/images/solutions/pets/pets-hero.webp" alt="A golden retriever relaxing at home with its owner" fill loading="eager" sizes="(max-width: 760px) 100vw, 60vw" />
        </div>
      </section>

      <section className="pets-world-principle">
        <div className="pets-world-principle-image">
          <Image src="/images/solutions/pets/pets-principle.webp" alt="A pet owner gently connecting with a cat" fill sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
        <div>
          <p className="pets-world-kicker">OUR PRINCIPLE</p>
          <h2>Care begins<br />with<br />understanding.</h2>
          <p>Every pet. Every space. Every need.</p>
        </div>
      </section>

      <PetsApproachCarousel />

      <PetsEverydayCare />

      <section className="pets-together-banner" aria-labelledby="pets-together-title">
        <div className="pets-together-placeholder"><OsanoEmptyArtwork label="Life together" tone="pets" /></div>
        <div className="pets-together-shade" />
        <div className="pets-together-copy">
          <h2 id="pets-together-title">For a better life, together.</h2>
          <p>Thoughtful pet-care technology made for everyday life.</p>
          <a href="#pet-care-contexts">Explore now</a>
        </div>
      </section>
    </div>
  );
}
