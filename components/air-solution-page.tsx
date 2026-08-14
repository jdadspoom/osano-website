"use client";

import Link from "next/link";
import { useState } from "react";

const features = [
  { id: "air", label: "AIR HYGIENE", title: "Clean air, working quietly.", description: "Designed to support cleaner, fresher spaces — continuously." },
  { id: "odor", label: "ODOR CONTROL", title: "Freshness without distraction.", description: "Helps reduce unwanted odors and maintain a more comfortable environment." },
  { id: "care", label: "CONTINUOUS CARE", title: "Protection built into the day.", description: "Thoughtful air hygiene that works consistently in the background." },
];

const environments = [
  { title: "HOME", description: "Everyday living" },
  { title: "WORKPLACE", description: "Shared spaces" },
  { title: "PROFESSIONAL", description: "Clinics & care spaces" },
];

const products = [
  { title: "HAS Mini", description: "Compact Air Hygiene", slug: "has-mini" },
  { title: "HAS", description: "Everyday Air Hygiene", slug: "has" },
  { title: "SSS", description: "Advanced Space Solution", slug: "sss" },
  { title: "HAS Pro", description: "Professional Air Hygiene", slug: "has-pro" },
];

function AirPlaceholder({ label }: { label: string }) {
  return <div className="air-placeholder" role="img" aria-label={`${label} image placeholder`}><span>IMAGE PLACEHOLDER</span><small>{label}</small></div>;
}

export function AirSolutionPage() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <main className="air-solution-page">
      <section className="air-solution-hero">
        <div>
          <p className="air-kicker">HYGIENE AIR SOLUTIONS</p>
          <h1>Cleaner air.<br />Better spaces.</h1>
          <p>Advanced air hygiene technology designed for everyday environments.</p>
        </div>
        <AirPlaceholder label="Premium home, office or clinic environment" />
      </section>

      <section className="air-feature-panel">
        <p className="air-kicker">WHAT IT DOES</p>
        <h2>{activeFeature.title}</h2>
        <p>{activeFeature.description}</p>
        <div className="air-feature-tabs" role="tablist" aria-label="Air solution features">
          {features.map((feature) => (
            <button key={feature.id} type="button" role="tab" aria-selected={activeFeature.id === feature.id} onClick={() => setActiveFeature(feature)}>{feature.label}</button>
          ))}
        </div>
        <div className="air-feature-images">
          {features.map((feature) => <AirPlaceholder key={feature.id} label={`${feature.label} — home environment`} />)}
        </div>
      </section>

      <section className="air-environments">
        <p className="air-kicker">FIND YOUR AIR SOLUTION</p>
        <h2>Made for every space.</h2>
        <p>Find the right solution for your environment.</p>
        <div className="air-environment-grid">
          {environments.map((environment) => <article key={environment.title}>
            <AirPlaceholder label={`${environment.title} environment`} />
            <div><h3>{environment.title}</h3><p>{environment.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="air-products">
        <p className="air-kicker">OUR PRODUCTS</p>
        <h2>Find your fit.</h2>
        <div className="air-product-grid">
          {products.map((product) => <article key={product.slug}>
            <AirPlaceholder label={`${product.title} product`} />
            <div><h3>{product.title}</h3><p>{product.description}</p><Link href={`/products/${product.slug}`}>View product <span aria-hidden="true">→</span></Link></div>
          </article>)}
        </div>
      </section>
    </main>
  );
}
