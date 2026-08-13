"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/community.module.css";

const insights = [
  {
    label: "FEATURED STORY",
    title: "Creating a Better Living Environment at Home",
    description: "Discover how thoughtful innovation can become part of everyday living at home.",
    image: "/images/community/community-feature.webp",
  },
  {
    label: "WORKSHOP RECAP",
    title: "Highlights from Our Latest Workshop",
    description: "Ideas, conversations and practical lessons shared by the OSANO community.",
    image: "/images/community/community-workshop.webp",
  },
  {
    label: "PRACTICAL GUIDE",
    title: "Everyday Guide to Aqueous Ozone",
    description: "A practical introduction to using aqueous ozone in everyday environments.",
    image: "/images/community/P04-COMMUNITY-STORY-GUIDE-3x2-v01.webp",
  },
  {
    label: "VIDEO INSIGHT",
    title: "What companion animals need for longevity",
    description: "Explore thoughtful approaches to comfort, care and better living with pets.",
    image: "/images/community/P04-COMMUNITY-STORY-VIDEO-16x9-v01.webp",
  },
];

export function CommunityInsightsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex(index => (index + 1) % insights.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const active = insights[activeIndex];
  const remaining = insights.filter((_, index) => index !== activeIndex);

  return <div className={styles.insightsCarousel} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
    <Link href="/stories" className={styles.insightFeature} key={active.image}>
      <Image src={active.image} alt={active.title} fill sizes="(max-width: 800px) 100vw, 58vw" priority={activeIndex === 0} />
      <div className={styles.featureCopy}><p>{active.label}</p><h3>{active.title}</h3><span>{active.description}</span></div>
    </Link>
    <aside>{remaining.map(item => {
      const index = insights.indexOf(item);
      return <button type="button" key={item.title} onClick={() => setActiveIndex(index)} aria-label={`Show ${item.title} as featured story`}>
        <span className={styles.insightThumb}><Image src={item.image} alt="" fill sizes="110px" /></span>
        <span><small>{item.label}</small>{item.title}</span>
      </button>;
    })}</aside>
    <div className={styles.insightDots} aria-label="Choose community insight">{insights.map((item, index) => <button type="button" key={item.title} className={index === activeIndex ? styles.activeDot : ""} onClick={() => setActiveIndex(index)} aria-label={`Show slide ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} />)}</div>
  </div>;
}
