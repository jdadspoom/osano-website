import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../community.module.css";
import { CommunityInsightsCarousel } from "@/components/community-insights-carousel";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("OSANO Community", "A space for learning, conversation and participation around better everyday living.", "/community");

const pillars = [
  ["/images/community/icon/community-icon-learn.svg", "Learn", "Discover ideas, knowledge and practical insights for better living."],
  ["/images/community/icon/community-icon-share.svg", "Share", "Share experiences, perspectives and real-life applications."],
  ["/images/community/icon/community-icon-connect.svg", "Connect", "Exchange practical guidance on safety, environmental comfort and thoughtful care for pets."],
];

export default function CommunityPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroMedia}><Image src="/images/community/community-hero.webp" alt="People connecting through the OSANO community" fill loading="eager" sizes="100vw" /></div>
      <div className={styles.heroCopy}><p>CONNECT / SHARE / GROW</p><h1>OSANO<br />Community</h1><span>A space to connect, share and discover better ways of living through innovation.</span><nav><Link href="#learning">Explore activities</Link><Link href="/technology">Our technology</Link></nav></div>
    </section>
    <section className={styles.pillars}>
      <h2>Learn. Share. Connect.</h2><p>A community built around ideas, experiences and better ways of living.</p>
      <div>{pillars.map(([icon, title, copy]) => <article key={title}><header><i><Image src={icon} alt="" width={18} height={18} /></i><h3>{title}</h3></header><span>{copy}</span></article>)}</div>
    </section>
    <section className={styles.learning} id="learning">
      <div><p>INTERACTIVE LEARNING</p><h2>Learn by experiencing.</h2><span>Join workshops and activities designed to turn ideas into practical, everyday experiences.</span><Link href="#activities">Explore Activities</Link></div>
      <div className={styles.learningMedia}><Image src="/images/community/community-learning.webp" alt="An interactive OSANO community learning session" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
    </section>
    <section className={styles.activities} id="activities"><h2>Upcoming activities</h2><div className={styles.table}><b>Date</b><b>Title</b><b>Format</b><b>Location</b><b>Status</b>{[["14 Oct 2026", "Discover hydrogen water", "Live interactive", "Digital portal", "Open"], ["28 Oct 2026", "Discover aqueous ozone", "Hands-on lab", "OSANO Hub", "Filling fast"], ["12 Nov 2026", "Safe air and pet longevity", "Lecture and panel", "Digital portal", "Open"]].flatMap(row => row.map(value => <span key={`${row[0]}-${value}`}>{value}</span>))}</div></section>
    <section className={styles.insights}>
      <h2>Real insights from our community.</h2>
      <CommunityInsightsCarousel />
    </section>
    <section className={styles.knowledge}><h2>Knowledge for better living.</h2><div>{pillars.map(([, title, copy], index) => <article key={title}><p>0{index + 1} / {title.toUpperCase()}</p><h3>{index === 0 ? "Everyday knowledge" : index === 1 ? "Shared experiences" : "Meaningful connections"}</h3><span>{copy}</span></article>)}</div></section>
  </div>;
}
