import Image from "next/image";
import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <div className="footer-brand">
          <Link href="/" aria-label="OSANO home">
            <Image
              src={siteConfig.logo}
              alt="OSANO"
              width={210}
              height={48}
            />
          </Link>
          <p>{siteConfig.statement}</p>
        </div>
        {Object.entries(footerNavigation).map(([title, items]) => (
          <div className="footer-column" key={title}>
            <p className="footer-label">{title}</p>
            {items.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="footer-column footer-contact">
          <p className="footer-label">Start a conversation</p>
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
            {siteConfig.contact.phone}
          </a>
          <span>{siteConfig.contact.address}</span>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} OSANO</span>
        <span>Innovation for better everyday living</span>
      </div>
    </footer>
  );
}
