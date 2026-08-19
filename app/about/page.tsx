import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../about.module.css";
import { siteConfig } from "@/data/site";
import { ScrollLinkedTitle } from "@/components/scroll-linked-title";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("About OSANO", siteConfig.statement, "/about");

export default function AboutPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><Image src="/images/about/about-hero.png" alt="Family sharing an OSANO-inspired everyday moment" fill loading="eager" sizes="100vw" className={styles.heroPhoto} /><div className={styles.heroCopy}><p className={styles.label}>ABOUT OSANO</p><h1>The Innovative<br />Lifestyle</h1><p>Meaningful innovation for better everyday living.</p><a href="#purpose" className={styles.primary}>Explore our philosophy</a></div></section>
    <section className={styles.purpose} id="purpose">
      <div className={styles.purposeCopy}>
        <p className={styles.label}>OUR PURPOSE</p>
        <h2>Inspired by life.<br />Driven by purpose.</h2>
        <p>We exist to help people, pets and the spaces we live in thrive together. Progress is most meaningful when it improves what matters every day.</p>
      </div>
      <blockquote className={styles.purposeQuote}>
        <span>“Innovation<br />should make life<br />better.”</span>
        <cite><Image src="/brand/OSANO_Master_Logo_Black.svg" alt="OSANO" width={78} height={20} /></cite>
      </blockquote>
    </section>
    <section className={styles.story}>
      <p className={styles.label}>OUR STORY</p>
      <header>
        <ScrollLinkedTitle text="Better living is a relationship." />
        <p>Everyday well-being connects people, living environments and pets.<br />OSANO studies context before shaping a practical way forward.</p>
      </header>
      <ol className={styles.storySteps}>
        <li>
          <span className={styles.storyNumber}>01</span>
          <span className={styles.storyIcon} aria-hidden="true"><Image src="/images/about/story/understand.png" alt="" width={64} height={64} /></span>
          <h3>Understanding</h3>
          <p>Begin by listening to people, routines and the environments around them.</p>
        </li>
        <li>
          <span className={styles.storyNumber}>02</span>
          <span className={styles.storyIcon} aria-hidden="true"><Image src="/images/about/story/connect.png" alt="" width={64} height={64} /></span>
          <h3>Connecting</h3>
          <p>Connect the relationships between people, routines and environments.</p>
        </li>
        <li>
          <span className={styles.storyNumber}>03</span>
          <span className={styles.storyIcon} aria-hidden="true"><Image src="/images/about/story/home.png" alt="" width={64} height={64} /></span>
          <h3>Applying</h3>
          <p>Turn insight into practical solutions for everyday life.</p>
        </li>
      </ol>
    </section>
    <section className={styles.aboutCommunity}>
      <div className={styles.communityCopy}>
        <p className={styles.label}>COMMUNITY</p>
        <h2>Knowledge becomes<br />useful when people can<br />apply it.</h2>
        <p>Community connects the three worlds through knowledge,<br />activities, membership and consultation.</p>
        <Link href="/community" className={styles.primary}>Explore our community&nbsp;</Link>
      </div>
      <div className={styles.communityImage}>
        <Image
          src="/images/about/about-community.png"
          alt="OSANO community discussing ideas together"
          fill
          sizes="(max-width: 900px) 100vw, 52vw"
        />
      </div>
    </section>
  </div>;
}
