import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../solutions.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Solutions", "Explore OSANO solutions across Health, Hygiene and Pets.", "/solutions");

const cards = [
  { title: "OSANO Hygiene", tags: "Air · Water · Surface", href: "/solutions/hygiene", image: "/images/about/about-hygiene.png", position: "center 57%" },
  { title: "OSANO Health", tags: "Vitality · Longevity · Balance", href: "/solutions/health", image: "/images/about/about-health.png", position: "center 48%" },
  { title: "OSANO Pets", tags: "Care · Comfort · Companions", href: "/solutions/pets", image: "/images/about/about-pets.png", position: "center 46%" },
];

export default function SolutionsPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><div className={styles.heroMedia}><Image src="/images/solutions/solutions-hero.webp" alt="OSANO solutions for better everyday living" fill loading="eager" sizes="100vw" /></div><div className={styles.heroCopy}><p>OSANO SOLUTIONS</p><h1>Innovation for<br />everyday living.</h1><span>Thoughtfully designed solutions for better health, hygiene and life with pets.</span><nav><Link href="#worlds">Explore our solutions</Link><Link href="/technology">Our technology</Link></nav></div></section>
    <section className={styles.quote}>“Innovation should make life better.”<small>Meaningful innovation, designed for everyday life.</small></section>
    <section className={styles.worlds} id="worlds"><p>OUR WORLDS</p><h2>Innovation for<br />every way of living.</h2><span>Three solutions. One vision for better everyday living.</span><div>{cards.map(({ title, tags, href, image, position }) => <article key={title}><div className={styles.cardImage}><Image src={image} alt={`${title} lifestyle`} fill sizes="(max-width: 800px) calc(100vw - 40px), 33vw" style={{ objectPosition: position }} /></div><h3>{title}</h3><small>{tags}</small><Link className={styles.worldLink} href={href}><span>Explore {title.replace("OSANO ", "")}</span><span aria-hidden="true">→</span></Link></article>)}</div></section>
    <section className={styles.communityFeature}>
      <div className={styles.communityCopy}>
        <p>COMMUNITY</p>
        <h2>See how shared<br />knowledge connects<br />everyday experiences.</h2>
        <span>Community is a connective layer across Hygiene, Health and Pets—not a fourth solution world.</span>
        <Link href="/community">Explore community&nbsp;</Link>
      </div>
      <div className={styles.communityPhoto}>
        <Image src="/images/solutions/solutions-community.webp" alt="OSANO community sharing knowledge and everyday experiences" fill sizes="(max-width: 800px) 100vw, 52vw" />
      </div>
    </section>
    <section className={styles.cta}><p>READY TO START</p><h2>Find the right OSANO solution for you.</h2><div><article><h3>Explore solutions</h3><span>Browse systems designed around specific environments.</span><Link href="/solutions">View solutions</Link></article><article><h3>Talk with OSANO</h3><span>Connect directly with our design and technical teams.</span><Link href="/contact">Start a conversation</Link></article></div></section>
  </div>;
}
