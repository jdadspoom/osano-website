import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import styles from "./site-footer.module.css";

const solutions=[
  ["OSANO Hygiene","/solutions/hygiene"],
  ["OSANO Health","/solutions/health"],
  ["OSANO Pets","/solutions/pets"],
] as const;

const company=[
  ["Our Story","/about"],
  ["Technology","/technology"],
  ["Community","/community"],
] as const;

export function SiteFooter(){
  return <footer className={styles.footer}>
    <div className={styles.columns}>
      <div className={styles.brand}>
        <Link href="/" aria-label="OSANO home">
          <Image src={siteConfig.logo} alt="OSANO" width={210} height={48}/>
        </Link>
        <p>Innovation designed for better everyday living.<br/>Across health, hygiene, and life with pets.</p>
      </div>
      <div className={styles.column}>
        <h2>SOLUTIONS</h2>
        {solutions.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}
      </div>
      <div className={styles.column}>
        <h2>COMPANY</h2>
        {company.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}
      </div>
      <div className={`${styles.column} ${styles.connect}`}>
        <h2>CONNECT</h2>
        <a href="tel:029525414">02-952-5414</a>
        <a href="tel:0661256694">066-125-6694 (Sales)</a>
        <a href="tel:0894585177">089-458-5177 (Customer service)</a>
        <div className={styles.socials} aria-label="Social channels">
          <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="m4.5 7 7.5 5.5L19.5 7"/></svg></a>
          <a href={siteConfig.contact.lineUrl} target="_blank" rel="noreferrer" aria-label="LINE"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11c0 4-3.6 7.2-8 7.2-1 0-1.9-.2-2.8-.5L5 19.5l1.1-3.1C4.8 15.1 4 13.2 4 11c0-4 3.6-7.2 8-7.2s8 3.2 8 7.2Z"/><path d="M8.2 10.1h7.6M8.2 13h5"/></svg></a>
          <a href={siteConfig.contact.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 20v-7h2.5l.4-3h-2.9V8.1c0-.9.3-1.6 1.7-1.6h1.4V3.8c-.4-.1-1.1-.2-2-.2-2.1 0-3.6 1.3-3.6 3.7V10H8.6v3H11v7"/></svg></a>
          <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><path d="M17.2 6.9h.01"/></svg></a>
          <a href={siteConfig.contact.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.1a3.7 3.7 0 1 1-3-3.6"/><path d="M14 4c.7 2.2 2 3.5 4 3.9"/></svg></a>
        </div>
      </div>
    </div>
    <div className={styles.legal}>
      <span className={styles.copyright}>© {new Date().getFullYear()} OSANO Lifestyle Technology. All rights reserved.</span>
      <div><span>Privacy Policy</span><span>Terms of Use</span><span>Accessibility</span></div>
    </div>
  </footer>;
}
