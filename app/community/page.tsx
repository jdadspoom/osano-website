import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../community.module.css";
import { CommunityInsightsCarousel } from "@/components/community-insights-carousel";

export const metadata: Metadata = {
  title: "OSANO Community",
  description: "A space for learning, conversation and participation around better everyday living.",
  alternates: { canonical: "/community" },
};

const pillars = [
  ["/images/community/icon/community-icon-learn.svg", "Learn", "Discover ideas, knowledge, and practical insights for better living."],
  ["/images/community/icon/community-icon-share.svg", "Share", "Share experiences, perspectives, and real-life applications."],
  ["/images/community/icon/community-icon-connect.svg", "Connect", "Share specialized safety protocols, environmental comfort, and optimal pet life extension secrets."],
];

export default function CommunityPage() {
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroMedia} role="button" tabIndex={0} data-spatial-src="/images/community/community-hero.webp" data-spatial-title="Osano Community" data-spatial-copy="A space to connect, share and discover better ways of living."><Image src="/images/community/community-hero.webp" alt="People connecting through the OSANO community" fill priority sizes="100vw" /></div>
      <div className={styles.heroCopy}><p>CONNECT / SHARE / GROW</p><h1>Osano<br />Community</h1><span>A space to connect, share, and discover better ways of living through innovation.</span><nav><Link href="#learning">Explore Our Solutions</Link><Link href="/technology">Our Technology</Link></nav></div>
    </section>
    <section className={styles.pillars}>
      <h2>Learn. Share. Connect.</h2><p>A community built around ideas, experiences, and better ways of living.</p>
      <div>{pillars.map(([icon, title, copy]) => <article key={title}><header><i><Image src={icon} alt="" width={18} height={18} /></i><h3>{title}</h3></header><span>{copy}</span></article>)}</div>
    </section>
    <section className={styles.learning} id="learning">
      <div><p>INTERACTIVE LEARNING</p><h2>Learn by experiencing.</h2><span>Join workshops and activities designed to turn ideas into practical, everyday experiences.</span><Link href="#activities">Explore Activities</Link></div>
      <div className={styles.learningMedia} role="button" tabIndex={0} data-spatial-src="/images/community/community-learning.webp" data-spatial-title="Learn by experiencing" data-spatial-copy="Interactive learning that turns ideas into practical everyday experiences."><Image src="/images/community/community-learning.webp" alt="An interactive OSANO community learning session" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
    </section>
    <section className={styles.activities} id="activities"><h2>Upcoming Activities</h2><div className={styles.table}><b>Date</b><b>Title</b><b>Format</b><b>Location</b><b>Status</b>{[["Oct 14, 2026", "Discover Hydrogen Water", "Live Interactive", "Digital Portal", "Open"], ["Oct 28, 2026", "Discover Aqueous Ozone", "Hands-on Lab", "Osano Hub", "Filling Fast"], ["Nov 12, 2026", "Safe Air and Pet Longevity Ecosystems", "Lecture & Panel", "Digital Portal", "Open"]].flatMap(row => row.map(value => <span key={`${row[0]}-${value}`}>{value}</span>))}</div></section>
    <section className={styles.insights}>
      <h2>Real insights from our community.</h2>
      <CommunityInsightsCarousel />
    </section>
    <section className={styles.knowledge}><h2>Knowledge for Better Living.</h2><div>{pillars.map(([, title, copy], index) => <article key={title}><p>0{index + 1} / {title.toUpperCase()}</p><h3>{index === 0 ? "Everyday Knowledge" : index === 1 ? "Shared Experiences" : "Meaningful Connections"}</h3><span>{copy}</span></article>)}</div></section>
  </div>;
}
