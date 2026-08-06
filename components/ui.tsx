import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/data/site";
import type { Product, Solution, Technology, World } from "@/types/content";
import { MediaPlaceholder } from "./media-placeholder";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  summary,
  media,
  tone = "neutral",
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  media: { kind: "image" | "video" | "document"; label: string; src?: string; alt?: string };
  tone?: "health" | "hygiene" | "pets" | "technology" | "neutral";
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="page-hero" data-tone={tone}>
      <div className="shell page-hero-grid">
        <div className="page-hero-copy">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p className="hero-summary">{summary}</p>
        </div>
        <MediaPlaceholder media={media} tone={tone} priority />
      </div>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="arrow-link">
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function WorldCard({ world, index }: { world: World; index: number }) {
  return (
    <article className="world-card" data-tone={world.accent}>
      <div className="card-index">0{index + 1}</div>
      <div>
        <Eyebrow>{world.eyebrow}</Eyebrow>
        <h3>{world.title}</h3>
        <p>{world.summary}</p>
        <ArrowLink href={`/solutions/${world.slug}`}>Explore {world.title}</ArrowLink>
      </div>
    </article>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  if (!solution.route) return null;
  return (
    <article className="content-card" data-tone={solution.world}>
      <MediaPlaceholder media={solution.heroMedia} tone={solution.world} />
      <div className="content-card-copy">
        <Eyebrow>{solution.eyebrow}</Eyebrow>
        <h3>{solution.title}</h3>
        <p>{solution.summary}</p>
        <ArrowLink href={solution.route}>View solution</ArrowLink>
      </div>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-card-visual">
        <span>{product.title.slice(0, 2).toUpperCase()}</span>
      </div>
      <div>
        <Eyebrow>{product.eyebrow}</Eyebrow>
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <ArrowLink href={`/products/${product.slug}`}>Discover {product.title}</ArrowLink>
      </div>
    </article>
  );
}

export function TechnologyCard({ technology }: { technology: Technology }) {
  return (
    <article className="technology-card">
      <div className="technology-number">{technology.title.charAt(0)}</div>
      <div>
        <Eyebrow>{technology.eyebrow}</Eyebrow>
        <h3>{technology.title}</h3>
        <p>{technology.summary}</p>
        <ArrowLink href={`/technology/${technology.slug}`}>Explore technology</ArrowLink>
      </div>
    </article>
  );
}

export function CTASection({
  eyebrow = "A more considered next step",
  title = "Find the OSANO solution that fits your context.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="cta-section">
      <div className="shell cta-inner">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
        </div>
        <div className="cta-actions">
          <Link href={siteConfig.primaryCta.href} className="button button-light">
            {siteConfig.primaryCta.label}
          </Link>
          <Link href={siteConfig.secondaryCta.href} className="button button-outline-light">
            {siteConfig.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}
