import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../stories.module.css";
import { StoriesVideoBrowser } from "@/components/stories-video-browser";
import { StoriesArticleBrowser } from "@/components/stories-article-browser";

export const metadata: Metadata = {
  title: "Stories",
  description: "OSANO stories about context, technology and better everyday living.",
  alternates: { canonical: "/stories" },
};

type MediaProps = {
  label: string;
  kind?: "image" | "video" | "background";
  className?: string;
  duration?: string;
};

function MediaPlaceholder({ label, kind = "image", className, duration }: MediaProps) {
  const text = kind === "video" ? "VIDEO PLACEHOLDER" : kind === "background" ? "BACKGROUND IMAGE" : "IMAGE PLACEHOLDER";
  return (
    <div className={`${styles.media} ${className ?? ""}`} data-final-asset={label} data-asset-kind={kind}>
      <span>{text}</span>
      {duration && <b>{duration}</b>}
      <small>{label}</small>
    </div>
  );
}

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="stories-title" data-spatial-src="/images/stories/stories-hero.webp" data-spatial-title="Explore ideas. Inspire better living." data-spatial-copy="Ideas, experiences and stories that inspire better ways of living.">
        <Image src="/images/stories/stories-hero.webp" alt="An open book beside water and greenery in a calm living space" fill priority sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>OSANO STORIES</p>
          <h1 id="stories-title">Explore ideas.<br />Inspire better<br />living.</h1>
          <p className={styles.heroIntro}>Discover ideas, experiences, and stories that inspire better ways of living.</p>
          <Link href="#story-library" className={styles.accentButton}>Explore Stories</Link>
        </div>
      </section>

      <StoriesVideoBrowser />

      <StoriesArticleBrowser />

      <section className={styles.newsletter}>
        <h2>Join the Osano community.</h2>
        <p>Get inspiring stories, useful insights, and the latest from Osano delivered to your inbox.</p>
        <form action="#" method="post">
          <div><label htmlFor="stories-email" className={styles.srOnly}>Email address</label><input id="stories-email" name="email" type="email" placeholder="Enter your email address" required /><button type="submit">Subscribe</button></div>
          <label className={styles.consent}><input type="checkbox" required /> <span>I agree to receive communications and accept the privacy terms.</span></label>
        </form>
      </section>
    </div>
  );
}
