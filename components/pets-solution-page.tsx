import Image from "next/image";
import Link from "next/link";

const careContexts = [
  {
    title: "Pet parent",
    description: "Everyday care for life together.",
    image: "/images/solutions/pets/pets-parent.webp",
    href: "/solutions/pets/pet-owner",
  },
  {
    title: "Grooming",
    description: "Smarter hygiene for professional grooming.",
    image: "/images/solutions/pets/pets-grooming.webp",
    href: "/solutions/pets/groomer",
  },
  {
    title: "Veterinary",
    description: "Technology for professional pet care.",
    image: "/images/solutions/pets/pets-veterinary.webp",
    href: "/solutions/pets/veterinary",
  },
];

export function PetsSolutionPage() {
  return (
    <main className="pets-world-page">
      <section className="pets-world-hero">
        <div className="pets-world-hero-copy">
          <p className="pets-world-kicker">OSANO PETS</p>
          <h1>Better care.<br />Better<br />together.</h1>
          <p>Thoughtful technology for the pets we love.</p>
          <a href="#pet-care-contexts">Explore pet-care contexts <span aria-hidden="true">→</span></a>
        </div>
        <div className="pets-world-hero-image">
          <Image src="/images/solutions/pets/pets-hero.webp" alt="A golden retriever relaxing at home with its owner" fill priority sizes="(max-width: 760px) 100vw, 60vw" />
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

      <section className="pets-world-approach" id="pet-care-contexts">
        <p className="pets-world-kicker">OUR APPROACH</p>
        <h2>Find the right care.</h2>
        <p>Designed for every way you care.</p>
        <div className="pets-world-card-grid">
          {careContexts.map((context) => (
            <article key={context.title}>
              <div className="pets-world-card-image">
                <Image src={context.image} alt={context.title} fill sizes="(max-width: 760px) 100vw, 30vw" />
              </div>
              <h3>{context.title}</h3>
              <p>{context.description}</p>
              <Link href={context.href}>Explore <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pets-world-closing">
        <div>
          <h2>For a better life, together.</h2>
          <p>Because their well-being is part of yours.</p>
        </div>
        <div className="pets-world-closing-image">
          <Image src="/images/solutions/pets/pets-context.webp" alt="A veterinary consultation with a pet owner" fill sizes="(max-width: 760px) 100vw, 48vw" />
        </div>
      </section>
    </main>
  );
}
