import type { Metadata } from "next";
import Image from "next/image";
import styles from "../about.module.css";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "About OSANO", description: siteConfig.statement, alternates: { canonical: "/about" } };

function Placeholder({ label, className }: { label: string; className?: string }) {
  return <div className={`${styles.placeholder} ${className ?? ""}`} data-final-asset={label}><span>IMAGE PLACEHOLDER</span><small>{label}</small></div>;
}

export default function AboutPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><Image src="/images/about/about-hero.webp" alt="Family sharing an OSANO-inspired everyday moment" fill priority sizes="100vw" className={styles.heroPhoto} /><div className={styles.heroCopy}><p className={styles.label}>ABOUT OSANO</p><h1>The Innovative<br />Lifestyle</h1><p>Meaningful innovation for better everyday living.</p><a href="#purpose" className={styles.primary}>Explore our philosophy</a></div></section>
    <section className={styles.purpose} id="purpose"><div><p className={styles.label}>OUR PURPOSE</p><h2>Inspired by life. Driven by purpose.</h2><p>We bring meaningful innovation into everyday life, creating smarter choices for better living.</p></div><blockquote>“Innovation should make life better.”<cite>OSANO</cite></blockquote></section>
    <section className={styles.innovation}><div><p className={styles.label}>OUR INNOVATION</p><h2>Advanced systems,<br />explained in everyday<br />language</h2><p>We operate with complete clarity. Our systems don’t hide behind scientific jargon; we publish all molecular testing datasets and lab reports freely.</p></div><ol>{[["01","Oxygen","Supporting better everyday well-being."],["02","Aqueous Ozone","A smarter approach to everyday hygiene."],["03","Hydrogen Water","Innovation for everyday wellness."]].map(([number,title,copy])=><li key={number}><b>{number}</b><span><strong>{title}</strong><small>{copy}</small></span></li>)}</ol></section>
    <section className={styles.gathering}><Placeholder label="COMMUNITY GATHERING AND FORUM PHOTO" /></section>
  </div>;
}
