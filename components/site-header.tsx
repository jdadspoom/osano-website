"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === href : pathname.startsWith(href);

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label="OSANO home">
          <Image
            src={siteConfig.logo}
            alt="OSANO"
            width={184}
            height={42}
            priority
          />
        </Link>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? "active" : undefined}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={siteConfig.primaryCta.href} className="header-cta">
          {siteConfig.primaryCta.label}
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-navigation"
        data-open={isOpen}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={isOpen ? 0 : -1}
              className={isActive(pathname, item.href) ? "active" : undefined}
              onClick={() => setIsOpen(false)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.primaryCta.href}
            className="button button-primary mobile-cta"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
          >
            {siteConfig.primaryCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
