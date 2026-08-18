"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TransitionPhase = "idle" | "covering" | "revealing";

export function CinematicPageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const previousPath = useRef(pathname);
  const navigateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>("idle");

  const finishTransition = () => {
    setPhase("idle");
    document.body.classList.remove("route-transitioning");
    document.body.style.removeProperty("overflow");
  };

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase("revealing");
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    safetyTimer.current = setTimeout(finishTransition, 720);
  }, [pathname]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (phase !== "idle" || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      if (url.pathname === current.pathname && url.search === current.search) return;

      event.preventDefault();
      event.stopPropagation();
      document.body.classList.add("route-transitioning");
      document.body.style.overflow = "hidden";
      setPhase("covering");

      navigateTimer.current = setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: true });
        safetyTimer.current = setTimeout(() => {
          setPhase("revealing");
          safetyTimer.current = setTimeout(finishTransition, 720);
        }, 1800);
      }, 540);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [phase, router]);

  useEffect(() => () => {
    if (navigateTimer.current) clearTimeout(navigateTimer.current);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    document.body.classList.remove("route-transitioning");
    document.body.style.removeProperty("overflow");
  }, []);

  return (
    <div className={`cinematic-transition cinematic-transition--${phase}`} aria-hidden="true">
      <div className="cinematic-transition__veil" />
      <div className="cinematic-transition__brand">
        <Image src="/brand/OSANO_Master_Logo_Black.svg" alt="" width={220} height={58} loading="eager" unoptimized />
        <span>THE INNOVATIVE LIFESTYLE</span>
      </div>
    </div>
  );
}
