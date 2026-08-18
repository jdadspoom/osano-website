"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navigation, solutionNavigation } from "@/data/navigation";
import { products } from "@/data/products";
import { publishedSolutions } from "@/data/solutions";
import { technologies } from "@/data/technologies";
import { worlds } from "@/data/worlds";
import { siteConfig } from "@/data/site";
import { storySearchItems } from "@/data/stories";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === href : pathname.startsWith(href);

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (isOpen || isSearchOpen || currentY < 90) setIsHeaderHidden(false);
      else if (currentY > previousY + 5) setIsHeaderHidden(true);
      else if (currentY < previousY - 5) setIsHeaderHidden(false);
      previousY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen, isSearchOpen]);

  const searchItems = useMemo(() => {
    const items = [
      ...navigation,
      ...worlds.map((item) => ({ label: item.title, href: `/solutions/${item.slug}` })),
      ...publishedSolutions.flatMap((item) =>
        item.route ? [{ label: item.title, href: item.route }] : [],
      ),
      ...technologies.map((item) => ({ label: item.title, href: `/technology/${item.slug}` })),
      ...products.map((item) => ({ label: item.title, href: `/products/${item.slug}` })),
      ...storySearchItems,
    ];

    return items.filter(
      (item, index) => items.findIndex((candidate) => candidate.href === item.href && candidate.label === item.label) === index,
    );
  }, []);

  const searchResults = query.trim()
    ? searchItems
        .filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 8)
    : searchItems.slice(0, 8);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(false);
      setIsSolutionsOpen(false);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const closeMobileNavigation = () => setIsOpen(false);

  return (
    <header className={`site-header${isHeaderHidden ? " site-header--hidden" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label="OSANO home">
          <Image
            src={siteConfig.logo}
            alt="OSANO"
            width={184}
            height={42}
            loading="eager"
          />
        </Link>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map((item) =>
            item.href === "/solutions" ? (
              <div
                className="desktop-nav-group"
                key={item.href}
                data-open={isSolutionsOpen}
                onPointerLeave={() => setIsSolutionsOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setIsSolutionsOpen(false);
                }}
              >
                <Link
                  href={item.href}
                  className={isActive(pathname, item.href) ? "active" : undefined}
                  aria-current={pathname === item.href ? "page" : undefined}
                  aria-expanded={isSolutionsOpen}
                  onPointerEnter={() => setIsSolutionsOpen(true)}
                  onFocus={() => setIsSolutionsOpen(true)}
                >
                  {item.label}
                  <span className="nav-chevron" aria-hidden="true">⌄</span>
                </Link>
                <div className="solutions-dropdown">
                  {solutionNavigation.map((solution) => (
                    <Link
                      key={solution.href}
                      href={solution.href}
                      onClick={(event) => {
                        setIsSolutionsOpen(false);
                        event.currentTarget.blur();
                      }}
                    >
                      {solution.label.replace(/^OSANO\s+/i, "")}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "active" : undefined}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="header-utilities">
          <span className="language-label" aria-label="Current language: English">
            EN <span aria-hidden="true"></span>
          </span>
          <button
            type="button"
            className="search-toggle"
            aria-label={isSearchOpen ? "Close search" : "Search"}
            aria-expanded={isSearchOpen}
            aria-controls="site-search"
            onClick={() => {
              setIsSearchOpen((current) => !current);
              setIsOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.25" />
              <path d="m15.25 15.25 4.5 4.5" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setIsOpen((current) => !current);
            setIsSearchOpen(false);
          }}
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
          <div className="mobile-nav-primary">
            <p>EXPLORE OSANO</p>
            {navigation.filter((item) => item.href !== "/solutions").map((item, index) => (
              <Link key={item.href} href={item.href} tabIndex={isOpen ? 0 : -1} className={isActive(pathname, item.href) ? "active" : undefined} onPointerDown={closeMobileNavigation} onClick={closeMobileNavigation}>
                <span>{String(index + 1).padStart(2, "0")}</span>{item.label}<b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
          <section className="mobile-nav-worlds" aria-labelledby="mobile-solutions-title">
            <header><div><p>OUR WORLDS</p><h2 id="mobile-solutions-title">Solutions</h2></div><Link href="/solutions" tabIndex={isOpen ? 0 : -1} onPointerDown={closeMobileNavigation} onClick={closeMobileNavigation}>View all</Link></header>
            {solutionNavigation.map((solution, index) => (
              <Link key={solution.href} href={solution.href} tabIndex={isOpen ? 0 : -1} data-world={solution.label.replace(/^OSANO\s+/i, "").toLowerCase()} onPointerDown={closeMobileNavigation} onClick={closeMobileNavigation}>
                <small>0{index + 1}</small><strong>{solution.label.replace(/^OSANO\s+/i, "")}</strong><span>{index === 0 ? "Well-being · Balance" : index === 1 ? "Air · Water · Surface" : "Care · Comfort · Companions"}</span><b aria-hidden="true">→</b>
              </Link>
            ))}
          </section>
          <div className="mobile-nav-footer">
            <span>ENGLISH · OSANO</span>
            <button
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                setIsOpen(false);
                setIsSearchOpen(true);
              }}
            >
              Search OSANO
            </button>
          </div>
        </nav>
      </div>

      <section
        id="site-search"
        className="site-search"
        data-open={isSearchOpen}
        aria-hidden={!isSearchOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsSearchOpen(false);
        }}
      >
        <div className="shell search-inner">
          <label htmlFor="site-search-input">Search OSANO</label>
          <input
            id="site-search-input"
            type="search"
            value={query}
            placeholder="Products, solutions, technology..."
            tabIndex={isSearchOpen ? 0 : -1}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="search-results" aria-live="polite">
            {searchResults.length ? (
              searchResults.map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  tabIndex={isSearchOpen ? 0 : -1}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setQuery("");
                  }}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))
            ) : (
              <p>No matching OSANO page found.</p>
            )}
          </div>
        </div>
      </section>
    </header>
  );
}
