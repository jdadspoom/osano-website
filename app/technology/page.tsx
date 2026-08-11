import type { Metadata } from "next";
import Link from "next/link";
import styles from "../technology.module.css";

export const metadata: Metadata = {
  title: "Technology",
  description: "Explore OSANO technology platforms and their approved product connections.",
  alternates: { canonical: "/technology" },
};

type PlaceholderProps = {
  label: string;
  detail?: string;
  kind?: "image" | "video" | "icon";
  className?: string;
};

function AssetPlaceholder({ label, detail, kind = "image", className = "" }: PlaceholderProps) {
  return (
    <div className={`${styles.placeholder} ${className}`} data-final-asset={label} data-asset-kind={kind}>
      <span className={styles.placeholderIcon} aria-hidden="true" />
      <strong>{label}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}

const technologies = [
  {
    symbol: "O₂",
    title: "Oxygen",
    description: "Supporting everyday well-being through oxygen technology designed for comfortable living environments.",
    tags: ["Indoor Air Quality", "Night Recovery"],
    asset: "Osano Oxygen System Mechanism",
    detail: "Micro-bubbles and molecular water flows rendering",
    href: "/technology/oxygen",
    action: "Explore Oxygen Technology",
  },
  {
    symbol: "O₃",
    title: "Aqueous Ozone",
    description: "Aqueous Ozone technology designed to support effective everyday hygiene across water and surface applications.",
    tags: ["Natural Sanitization", "Food Grade"],
    asset: "Osano Aqueous Ozone Generation",
    detail: "Electrolysis and ozone generation illustration",
    href: "/technology/aqueous-ozone",
    action: "Explore Aqueous Ozone Technology",
  },
  {
    symbol: "H₂",
    title: "Osano Hydrogen Science",
    description: "Hydrogen Water technology designed to support everyday well-being through hydrogen-rich drinking water.",
    tags: ["Antioxidant Flow", "Longevity Support"],
    asset: "Hydrogen Water",
    detail: "Molecular hydrogen water visualization",
    href: "/technology/hydrogen",
    action: "Explore Hydrogen Water Technology",
  },
];

export default function TechnologyPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="technology-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>TECHNOLOGY OVERVIEW</p>
          <h1 id="technology-title">Technology designed<br />for better living.</h1>
          <p>Explore the technologies behind OSANO and discover how Oxygen, Aqueous Ozone, and Hydrogen Water can become part of better everyday living.</p>
        </div>
        <AssetPlaceholder className={styles.heroMedia} label="Technology Hero Placeholder" detail="Micro-bubbles and molecular water flows rendering high-purity oxygen science" />
      </section>

      <section className={styles.technologySection}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>OUR TECHNOLOGIES</p>
          <h2>Different in nature. Better together.</h2>
        </header>
        <div className={styles.cardGrid}>
          {technologies.map((technology) => (
            <article className={styles.card} key={technology.title}>
              <AssetPlaceholder className={styles.cardMedia} label={technology.asset} detail={technology.detail} />
              <div className={styles.cardTitle}><span>{technology.symbol}</span><h3>{technology.title}</h3></div>
              <p>{technology.description}</p>
              <div className={styles.tags}>{technology.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link href={technology.href}>{technology.action}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.exploreSection}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>EXPLORE THE TECHNOLOGY</p>
          <h2>Understand each technology step by step.</h2>
        </header>
        <div className={styles.tabs} role="tablist" aria-label="Technology explanation steps">
          <button type="button" className={styles.activeTab} role="tab" aria-selected="true">1. Principle</button>
          <button type="button" role="tab" aria-selected="false">2. Application</button>
          <button type="button" role="tab" aria-selected="false">3. Format</button>
        </div>
        <div className={styles.principleGrid}>
          <div className={styles.principleRing}><span>Core Principle</span></div>
          <div className={styles.principleCopy}>
            <h3>Principle: How the Technology Works</h3>
            <p>Every technology starts with a core scientific principle. This layer explains how it works, from its fundamental properties to real-world applications.</p>
            <ul><li>Core scientific principles and key reactions explained clearly.</li><li>Key properties and molecular behaviors under everyday environmental conditions.</li></ul>
          </div>
          <aside><small>YOU ARE VIEWING</small><strong>Principle</strong><p>Start here to understand the core principles behind how each technology works.</p></aside>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.videoIntro}>
          <p className={styles.eyebrow}>GUIDED VIDEO</p>
          <h2>See the technology<br />in action.</h2>
          <p>A guided introduction to the core principles, real-world applications, and practical considerations behind our technologies.</p>
          <Link href="#technology-video">Watch the Video</Link>
        </div>
        <AssetPlaceholder className={styles.videoMedia} kind="video" label="Knowledge Video Placeholder" detail="Video duration 12 minutes. Guided walkthrough with Dr. Keith Sterling" />
        <ol className={styles.videoChapters} id="technology-video">
          <li><span>01</span>Core Principles</li><li><span>02</span>Real-world Applications</li><li><span>03</span>Choosing the Right Format</li>
        </ol>
      </section>

      <section className={styles.applicationsSection}>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>PRACTICAL APPLICATIONS</p>
          <h2>Real-world uses that matter.</h2>
        </header>
        <div className={styles.applicationGrid}>
          <div className={styles.applicationTabs}><button type="button" className={styles.activeApplication}>OSANO Hygiene</button><button type="button">Osano Health</button><button type="button">Osano Pet</button></div>
          <article className={styles.applicationCard}>
            <h3>Smarter everyday hygiene with Aqueous Ozone</h3>
            <p>Explore how Aqueous Ozone can be applied across everyday hygiene needs, from surfaces and food preparation to water-related applications.</p>
            <div className={styles.tags}><span>Surface Spray</span><span>Food Preparation</span><span>Air Hygiene</span></div>
            <AssetPlaceholder className={styles.applicationMedia} label="Active Hygiene Solution Showcase" detail="Conceptual render of integrated home wellness utilities" />
          </article>
        </div>
      </section>
    </div>
  );
}
