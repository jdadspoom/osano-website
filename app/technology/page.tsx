import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../technology.module.css";
import { TechnologyApplications, TechnologySteps } from "@/components/technology-interactive";
import { createPageMetadata } from "@/lib/seo";

export const metadata:Metadata=createPageMetadata("Technology", "Explore OSANO technology platforms and their approved product connections.", "/technology");
const technologies=[
  {symbol:"O₂",title:"Oxygen",description:"Supporting everyday well-being through oxygen technology designed for comfortable living environments.",tags:["Indoor Air Quality","Night Recovery"],image:"/images/technology/technology-oxygen.png",href:"/technology/oxygen",action:"Explore Oxygen Technology"},
  {symbol:"O₃",title:"Aqueous Ozone",description:"Aqueous ozone technology designed to support effective everyday hygiene across water and surface applications.",tags:["Natural Sanitisation","Food-safe Applications"],image:"/images/technology/technology-ozone.png",href:"/technology/aqueous-ozone",action:"Explore Aqueous Ozone Technology"},
  {symbol:"H₂",title:"OSANO Hydrogen Science",description:"Hydrogen water technology designed to become part of a considered daily hydration routine.",tags:["Hydrogen-rich Water","Daily Hydration"],image:"/images/technology/technology-hydrogen.png",href:"/technology/hydrogen",action:"Explore Hydrogen Water Technology"},
];
export default function TechnologyPage(){return <div className={styles.page}>
  <section className={styles.hero}><div className={styles.heroMedia}><Image src="/images/technology/technology-hero.webp" alt="Water and micro-bubble technology" fill loading="eager" sizes="100vw" /></div><div className={styles.heroCopy}><p className={styles.eyebrow}>TECHNOLOGY OVERVIEW</p><h1>Technology designed<br/>for better living.</h1><p>Explore the technologies behind OSANO and discover how oxygen, aqueous ozone and hydrogen water can become part of better everyday living.</p><a href="#our-technologies">Explore technologies</a></div></section>
  <section className={styles.technologySection} id="our-technologies"><header className={styles.sectionHeader}><p className={styles.eyebrow}>OUR TECHNOLOGIES</p><h2>Different in nature. Better together.</h2></header><div className={styles.cardGrid}>{technologies.map(item=><article className={styles.card} key={item.title}><div className={styles.cardMedia}><Image src={item.image} alt={`${item.title} technology`} fill sizes="(max-width:700px) 100vw,33vw" /></div><div className={styles.cardTitle}><span>{item.symbol}</span><h3>{item.title}</h3></div><p>{item.description}</p><div className={styles.tags}>{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={item.href}>{item.action}</Link></article>)}</div></section>
  <section className={styles.exploreSection}><header className={styles.sectionHeader}><p className={styles.eyebrow}>EXPLORE THE TECHNOLOGY</p><h2>Understand each technology step by step.</h2></header><TechnologySteps/></section>
  <section className={styles.videoSection}><div className={styles.videoIntro}><p className={styles.eyebrow}>GUIDED VIDEO</p><h2>See the technology<br/>in action.</h2><p>A guided introduction to the core principles, real-world applications and practical considerations behind our technologies.</p><Link href="#technology-video">Watch the video</Link></div><div className={styles.videoMedia}><span>▶</span><b>Watch now →</b></div><ol className={styles.videoChapters} id="technology-video"><li><span>01</span>Core principles</li><li><span>02</span>Real-world applications</li><li><span>03</span>Choosing the right format</li></ol></section>
  <section className={styles.applicationsSection}><header className={styles.sectionHeader}><p className={styles.eyebrow}>PRACTICAL APPLICATIONS</p><h2>Real-world uses that matter.</h2></header><TechnologyApplications/></section>
</div>}
