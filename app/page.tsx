import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";
import { HomeVideoGallery } from "@/components/home-video-gallery";
import { JoinCommunityButton } from "@/components/join-community-button";
import { HomeScrollEffects } from "@/components/home-scroll-effects";
import { resolvePublicImage } from "@/lib/public-image";
import { ScrollExpand } from "@/components/scroll-expand";

const worlds = [
  { title: "Osano Hygiene", tone: "hygiene", icon: "/images/home/icons/home-hygiene-icon.svg", tags: ["Air", "Water", "Surface"], href: "/solutions/hygiene", image: resolvePublicImage("images/home/home-hygiene"), position: "center 58%" },
  { title: "Osano Health", tone: "health", icon: "/images/home/icons/home-health-icon.svg", tags: ["Vitality", "Longevity", "Balance"], href: "/solutions/health", image: resolvePublicImage("images/home/home-health"), position: "68% 48%" },
  { title: "Osano Pets", tone: "pets", icon: "/images/home/icons/home-pets-icon.svg", tags: ["Care", "Comfort", "Companions"], href: "/solutions/pets", image: resolvePublicImage("images/home/home-pets"), position: "center 50%" },
] as const;

const communityItems = [
  { title: "Learning by doing together", image: "/images/home/home-community-01.webp", position: "center" },
  { title: "Clear guidance in context", image: "/images/home/home-community-02.webp", position: "58% center" },
  { title: "Shared experiences of real solutions", image: "/images/home/home-community-03.webp", position: "center" },
  { title: "Shared knowledge for longevity", image: "/images/home/home-community-04.webp", position: "55% center" },
] as const;

const homeTechnologies = [
  { title: "Oxygen Systems", image: "/images/home/technology/technology-oxygen.png", alt: "Oxygen O2 water molecule", copy: "Elevating cellular nourishment, concentration, and night-time sleep restoration in the bedroom." },
  { title: "Aqueous Ozone", image: "/images/home/technology/technology-ozone.png", alt: "Aqueous ozone O3 water molecule", copy: "A natural sanitizer that deconstructs pathogens on surfaces instantly, reverting to pure oxygen." },
  { title: "Hydrogen Science", image: "/images/home/technology/technology-hydrogen.png", alt: "Hydrogen H2 water molecule", copy: "Providing active antioxidant pathways that support full-body recovery and metabolic efficiency." },
] as const;

export default function HomePage() {
  return (
    <div className={styles.page} data-home-page>
      <HomeScrollEffects />
      <ScrollExpand
        src="/videos/home-hero.mp4"
        poster="/images/home/home-hero.webp"
        title={<Image src="/brand/OSANO_Master_Logo_Black.svg" alt="OSANO" width={430} height={100} priority />}
      >
        <div className={styles.expandHeroCopy}>
          <div className={styles.expandWordmark}>
            <Image src="/brand/OSANO_Master_Logo_Black.svg" alt="OSANO" fill sizes="310px" priority />
          </div>
          <h1>The Innovative<br />Lifestyle</h1>
          <div className={styles.heroActions}>
            <Link href="/solutions" className={styles.primaryButton}>Discover our solutions</Link>
            <Link href="/technology" className={styles.glassButton}>Our Technology</Link>
          </div>
        </div>
      </ScrollExpand>
      <section className={`${styles.hero} ${styles.mobileHero}`} aria-labelledby="home-title">
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/home/home-hero.webp"
          aria-label="Family enjoying a considered OSANO living environment"
        >
          <source src="/videos/home-hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <div className={styles.logoPlaceholder}>
            <Image src="/brand/OSANO_Master_Logo_Black.svg" alt="OSANO" fill sizes="310px" priority />
          </div>
          <h1 id="home-title">The Innovative<br />Lifestyle</h1>
          <div className={styles.heroActions}>
            <Link href="/solutions" className={styles.primaryButton}>Discover our solutions</Link>
            <Link href="/technology" className={styles.glassButton}>Our Technology</Link>
          </div>
        </div>
      </section>

      <section className={styles.philosophy} data-home-reveal>
        <HomeVideoGallery />
      </section>

      <section className={styles.worldSection} data-home-reveal>
        <p className={styles.eyebrow}>CURATED SYSTEMS</p>
        <h2>Solutions for every part of life</h2>
        <div className={styles.worldGrid}>
          {worlds.map(({ title, tone, icon, tags, href, image, position }) => <article className={styles.worldCard} data-tone={tone} key={title}>
            <div className={styles.worldImage}>
              <Image src={image} alt={`${title} lifestyle setting`} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectPosition: position }} unoptimized />
            </div>
            <span className={styles.worldIcon}><Image src={icon} alt="" width={38} height={38} unoptimized /></span>
            <div className={styles.worldBody}>
              <h3>{title}</h3><div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link href={href}>Explore {title.replace("Osano ", "")} <b>→</b></Link>
            </div>
          </article>)}
        </div>
      </section>

      <section className={styles.community} data-home-reveal>
        <h2>Community</h2><p>Learning, sharing, and growing together for a better tomorrow.</p>
        <JoinCommunityButton />
        <div className={styles.communityGrid}>
          <div className={styles.communityFeature}>
            <Image src="/images/home/home-community-feature.webp" alt="OSANO community sharing ideas together" fill sizes="(max-width: 900px) 100vw, 65vw" />
            <div><h3>Conversation<br />that make knowledge<br />easier apply</h3><Link href="/community">join conversation&nbsp; →</Link></div>
          </div>
          <div className={styles.communityList}>{communityItems.map(({ title, image, position }) => <Link href="/community" key={title}><span className={styles.communityThumb}><Image src={image} alt="" fill sizes="135px" style={{ objectPosition: position }} /></span><span><b>{title}</b><small>read stories&nbsp; →</small></span></Link>)}</div>
        </div>
      </section>

      <section className={styles.tech} data-home-reveal>
        <p className={styles.eyebrow}>ADVANCED SYSTEMS</p><h2>Understand the technology. Explore the ingredients.</h2>
        <div className={styles.techGrid}>{homeTechnologies.map(({ title, image, alt, copy }) => <article key={title}><div className={styles.bubble}><Image src={image} alt={alt} fill sizes="260px" /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className={styles.cta} data-home-reveal>
        <p className={styles.eyebrow}>READY TO START</p><h2>Close the conversation that fits you</h2>
        <div className={styles.ctaGrid}>{[["Explore Solutions", "Browse our systems for your specific environments.", "/solutions", "View solutions"], ["Read Stories", "Gain insights from real-world applications and experts.", "/stories", "View stories"], ["Talk with Osano", "Connect with our design and technical support teams.", "/contact", "Start conversation"]].map(([title,copy,href,label]) => <article key={title}><h3>{title}</h3><p>{copy}</p><Link href={href}>{label}</Link></article>)}</div>
      </section>
    </div>
  );
}
