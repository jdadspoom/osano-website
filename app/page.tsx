import Link from "next/link";
import { MediaPlaceholder } from "@/components/media-placeholder";
import {
  ArrowLink,
  CTASection,
  Eyebrow,
  ProductCard,
  SectionHeading,
  TechnologyCard,
  WorldCard,
} from "@/components/ui";
import { communityItems } from "@/data/community";
import { products } from "@/data/products";
import { publishedSolutions } from "@/data/solutions";
import { technologies } from "@/data/technologies";
import { worlds } from "@/data/worlds";

export default function HomePage() {
  const selectedProducts = ["has-mini", "wto-mini", "wds250"]
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <Eyebrow>Innovation for everyday living</Eyebrow>
            <h1>
              Better living begins with <em>context.</em>
            </h1>
            <p>
              OSANO connects technology, people, pets and the places we share —
              shaping solutions around life as it is really lived.
            </p>
            <div className="hero-actions">
              <Link href="/solutions" className="button button-primary">
                Find Your Solution
              </Link>
              <Link href="/about" className="text-link">
                Discover OSANO <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract editorial composition">
            <span className="hero-disc disc-one" />
            <span className="hero-disc disc-two" />
            <span className="hero-arc" />
            <div className="hero-caption">
              <span>01</span>
              <p>Technology, thoughtfully placed within everyday life.</p>
            </div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <span>People</span><i />
          <span>Context</span><i />
          <span>Technology</span><i />
          <span>Pets</span><i />
          <span>Everyday life</span>
        </div>
      </section>

      <section className="brand-proposition section-pad">
        <div className="shell proposition-grid">
          <Eyebrow>One connected perspective</Eyebrow>
          <div>
            <h2>Innovation should feel less like an interruption, and more like it belongs.</h2>
            <p>
              OSANO is an innovation lifestyle brand that connects technology,
              context, people, pets, and better everyday living.
            </p>
          </div>
        </div>
      </section>

      <section className="worlds-section section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Three worlds, one OSANO"
            title="Designed around the ways we live together."
            intro="Each world begins with a different context, while sharing the same calm, precise and human-centred approach."
          />
          <div className="worlds-grid">
            {worlds.map((world, index) => (
              <WorldCard key={world.id} world={world} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="technology-intro section-pad">
        <div className="shell technology-intro-grid">
          <div className="technology-art">
            <MediaPlaceholder
              media={{ kind: "image", label: "Technology and Material Study" }}
              tone="technology"
            />
          </div>
          <div className="technology-copy">
            <SectionHeading
              eyebrow="Technology with purpose"
              title="Precision in service of real life."
              intro="We begin with the environment, the people within it and the outcome that matters — then consider the technology."
            />
            <div className="technology-mini-list">
              {technologies.map((technology) => (
                <ArrowLink key={technology.id} href={`/technology/${technology.slug}`}>
                  {technology.title}
                </ArrowLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="selected-section section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected connections"
            title="Products are part of a wider solution."
            intro="Explore a selection of approved OSANO products through the contexts and technology platforms they connect to."
          />
          <div className="product-grid featured-products">
            {selectedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="selected-solution-line">
            {publishedSolutions.slice(0, 3).map((solution) => (
              <ArrowLink key={solution.id} href={solution.route ?? "/solutions"}>
                {solution.title}
              </ArrowLink>
            ))}
          </div>
        </div>
      </section>

      <section className="human-story section-pad">
        <div className="shell human-story-grid">
          <div className="story-number">03</div>
          <div className="story-copy">
            <Eyebrow>Human-centred by design</Eyebrow>
            <h2>{communityItems[1].title}</h2>
            <p>{communityItems[1].summary}</p>
            <ArrowLink href="/community">Enter the OSANO community</ArrowLink>
          </div>
          <MediaPlaceholder media={communityItems[1].heroMedia} tone="pets" />
        </div>
      </section>

      <section className="technology-cards section-pad-sm">
        <div className="shell technology-grid">
          {technologies.map((technology) => (
            <TechnologyCard key={technology.id} technology={technology} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
