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
        <a href="mailto:hello@osanoliving.com">hello@osanoliving.com</a>
        <a href="tel:+18005550144">+1 (800) 555-0144</a>
        <div className={styles.socials} aria-label="Social channels">
          <span aria-label="Instagram placeholder" data-final-asset="OSANO INSTAGRAM URL"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M16.8 7.3h.01"/></svg></span>
          <span aria-label="X placeholder" data-final-asset="OSANO X URL"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 6 10 12M17 6 7 18"/></svg></span>
          <span aria-label="LinkedIn placeholder" data-final-asset="OSANO LINKEDIN URL"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v8M7 7v.01M11 18v-8m0 3.5c.8-2.2 6-2.7 6 1.5v3"/></svg></span>
        </div>
      </div>
    </div>
    <div className={styles.legal}>
      <span className={styles.copyright}>© {new Date().getFullYear()} OSANO Lifestyle Technology. All rights reserved.</span>
      <div><span>Privacy Policy</span><span>Terms of Use</span><span>Accessibility</span></div>
    </div>
  </footer>;
}
