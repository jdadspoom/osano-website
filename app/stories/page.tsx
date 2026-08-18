import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../stories.module.css";
import { StoriesVideoBrowser } from "@/components/stories-video-browser";
import { StoriesArticleBrowser } from "@/components/stories-article-browser";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("Stories", "OSANO stories about context, technology and better everyday living.", "/stories");

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="stories-title">
        <Image src="/images/stories/stories-hero.webp" alt="An open book beside water and greenery in a calm living space" fill loading="eager" sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>OSANO STORIES</p>
          <h1 id="stories-title">Explore ideas.<br />Inspire better<br />living.</h1>
          <p className={styles.heroIntro}>Discover ideas, experiences and stories that inspire better ways of living.</p>
          <Link href="#story-library" className={styles.accentButton}>Explore Stories</Link>
        </div>
      </section>

      <StoriesVideoBrowser />

      <StoriesArticleBrowser />

      <section className={styles.newsletter}>
        <h2>Join the OSANO community.</h2>
        <p>Receive inspiring stories, useful insights and the latest from OSANO in your inbox.</p>
        <form action="#" method="post">
          <div><label htmlFor="stories-email" className={styles.srOnly}>Email address</label><input id="stories-email" name="email" type="email" placeholder="Enter your email address" required /><button type="submit">Subscribe</button></div>
          <label className={styles.consent}><input type="checkbox" required /> <span>I agree to receive communications and accept the privacy terms.</span></label>
        </form>
      </section>
    </div>
  );
}
