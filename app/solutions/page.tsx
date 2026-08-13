import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../solutions.module.css";

export const metadata: Metadata = { title: "Solutions", description: "Explore OSANO solutions across Health, Hygiene and Pets.", alternates: { canonical: "/solutions" } };

const cards = [
  { title: "Osano Hygiene", tags: "Air · Water · Surface", href: "/solutions/hygiene", image: "/images/about/about-hygiene.png", position: "center 57%" },
  { title: "Osano Health", tags: "Vitality · Longevity · Balance", href: "/solutions/health", image: "/images/about/about-health.png", position: "center 48%" },
  { title: "Osano Pets", tags: "Care · Comfort · Companions", href: "/solutions/pets", image: "/images/about/about-pets.png", position: "center 46%" },
];

export default function SolutionsPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><div className={styles.heroMedia}><Image src="/images/solutions/solutions-hero.webp" alt="OSANO solutions for better everyday living" fill priority sizes="100vw" /></div><div className={styles.heroCopy}><p>OSANO SOLUTIONS</p><h1>Innovation for<br />Everyday Living.</h1><span>Thoughtfully designed solutions for better health, hygiene, and life with pets.</span><nav><Link href="#worlds">Explore Our Solutions</Link><Link href="/technology">Our Technology</Link></nav></div></section>
    <section className={styles.quote}>“Innovation should make life better.”<small>Meaningful innovation, designed for everyday life.</small></section>
    <section className={styles.worlds} id="worlds"><p>OUR WORLDS</p><h2>Innovation for<br />Every Way of Living.</h2><span>Three solutions. One vision for better everyday living.</span><div>{cards.map(({ title, tags, href, image, position }) => <article key={title}><div className={styles.cardImage}><Image src={image} alt={`${title} lifestyle`} fill sizes="(max-width: 800px) 100vw, 33vw" style={{ objectPosition: position }} unoptimized /></div><h3>{title}</h3><small>{tags}</small><Link href={href}>Explore {title.replace("Osano ", "")} →</Link></article>)}</div></section>
    <section className={styles.communityFeature}>
      <div className={styles.communityCopy}>
        <p>COMMUNITY</p>
        <h2>See how shared<br />knowledge connects<br />everyday experiences.</h2>
        <span>Community is a connective layer across Hygiene, Health and Pets—not a fourth solution world.</span>
        <Link href="/community">Explore community&nbsp; →</Link>
      </div>
      <div className={styles.communityPhoto}>
        <Image src="/images/solutions/solutions-community.webp" alt="OSANO community sharing knowledge and everyday experiences" fill sizes="(max-width: 800px) 100vw, 52vw" />
      </div>
    </section>
    <section className={styles.cta}><p>READY TO START</p><h2>Find the right OSANO solution for you.</h2><div><article><h3>Explore Solutions</h3><span>Browse our systems mapped to your specific environments.</span><Link href="/solutions">View solutions</Link></article><article><h3>Talk with Osano</h3><span>Connect directly with our biological architecture teams.</span><Link href="/contact">Start conversation</Link></article></div></section>
  </div>;
}
