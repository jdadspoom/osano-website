import type { Metadata } from "next";
import Link from "next/link";
import styles from "../stories.module.css";

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

const videoItems = [
  ["TECHNOLOGY", "Understanding indoor air: what matters most", "04:32"],
  ["WELL-BEING", "Daily rituals for focus and balance", "06:18"],
  ["HEALTH", "Hydration habits that support you", "05:40"],
  ["HOME & LIVING", "Creating a space that feels like you", "09:21"],
];

const articleItems = [
  ["HYGIENE", "Creating a cleaner environment for everyday living", "Discover practical ideas for creating cleaner, healthier spaces in everyday life."],
  ["TECHNOLOGY", "Aqueous Ozone for Everyday Hygiene", "Discover practical ways Aqueous Ozone can support cleaner everyday living."],
  ["PETS", "Creating Better Spaces for Life with Pets", "Discover practical ideas for creating cleaner, more comfortable spaces for life with pets."],
  ["WELL-BEING", "Hydrogen Water for Everyday Well-Being", "Discover simple ways Hydrogen Water can become part of everyday well-being."],
];

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="stories-title">
        <MediaPlaceholder label="STORIES HERO FAMILY PHOTO" kind="background" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>STORIES &amp; KNOWLEDGE</p>
          <h1 id="stories-title">Explore ideas.<br />Inspire better living.</h1>
          <p className={styles.heroIntro}>Discover ideas, experiences, and stories that inspire better ways of living.</p>
          <Link href="#story-library" className={styles.accentButton}>Explore Stories</Link>
        </div>
      </section>

      <section className={styles.featuredStory}>
        <MediaPlaceholder label="FEATURED STORY WORKSHOP PHOTO" className={styles.featuredStoryMedia} />
        <div className={styles.featuredStoryCopy}>
          <p className={styles.orangeLabel}>FEATURED STORY</p>
          <h2>Technology meets well-being.</h2>
          <p>Explore how thoughtful technology can become part of everyday living, creating simple and meaningful ways to support better well-being.</p>
          <div className={styles.storyControls}>
            <Link href="/stories">Read the Story →</Link>
            <div><span>01 / 05</span><button type="button" aria-label="Previous featured story">‹</button><button type="button" aria-label="Next featured story">›</button></div>
          </div>
        </div>
      </section>

      <section className={styles.filters} aria-label="Story filters">
        <div className={styles.filterChips}>{["All stories", "Well-being", "Technology", "Hygiene", "Health", "Pets", "Community", "Business"].map((label, index) => <button type="button" className={index === 0 ? styles.activeChip : undefined} key={label}>{label}</button>)}</div>
        <label className={styles.sortLabel}>Sort by:<select aria-label="Sort stories" defaultValue="latest"><option value="latest">Latest</option><option value="oldest">Oldest</option></select></label>
      </section>

      <section className={styles.videoLibrary} id="story-library">
        <article className={styles.featuredVideo}>
          <MediaPlaceholder label="FEATURED VIDEO: DESIGNING A CALMER HOME" kind="video" className={styles.featuredVideoMedia} />
          <p className={styles.orangeLabel}>FEATURED VIDEO</p>
          <h2>Designing a calmer home</h2>
          <p>Simple, thoughtful ideas for a calmer everyday life.</p>
          <Link href="/stories">Watch now →</Link>
        </article>
        <div className={styles.videoList}>
          {videoItems.map(([category, title, duration]) => <article key={title}>
            <MediaPlaceholder label={`${title.toUpperCase()} VIDEO THUMBNAIL`} kind="video" duration={duration} />
            <div><p className={styles.orangeLabel}>{category}</p><h3>{title}</h3><Link href="/stories">Watch now →</Link></div>
          </article>)}
        </div>
      </section>

      <section className={styles.featuredArticle}>
        <div>
          <p className={styles.orangeLabel}>FEATURED ARTICLE</p>
          <h2>A practical guide to better living at home.</h2>
          <p>Explore how air, water, and thoughtful technology can support a healthier, more comfortable everyday living environment.</p>
          <Link href="/stories" className={styles.accentButton}>Read the guide</Link>
        </div>
        <MediaPlaceholder label="FEATURED ARTICLE ARCHITECTURAL MEDIA" className={styles.featuredArticleMedia} />
      </section>

      <section className={styles.articleList} aria-label="More stories">
        {articleItems.map(([category, title, summary]) => <article key={title}>
          <p className={styles.orangeLabel}>{category}</p>
          <div><h3>{title}</h3><p>{summary}</p></div>
          <MediaPlaceholder label={`${title.toUpperCase()} ARTICLE THUMBNAIL`} />
        </article>)}
        <button type="button" className={styles.loadMore}>Load more stories</button>
      </section>

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
