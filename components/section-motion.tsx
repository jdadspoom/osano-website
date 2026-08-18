"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SectionMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup=()=>{};
    const timer=window.setTimeout(()=>{
      const page = document.querySelector<HTMLElement>("#main-content .route-transition > *");
      if (!page) return;
      const sections = [...page.querySelectorAll<HTMLElement>(":scope > section")].slice(1);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const compactOrTouch = window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
      const parallaxMedia: HTMLElement[] = [];

      sections.forEach(section => {
      section.dataset.sectionMotion = "true";
      if (reducedMotion || compactOrTouch) return;
      const candidates = [...section.querySelectorAll<HTMLElement>("img")].filter(image => {
        if (image.closest("article, button, a, [class*='card'], [class*='Card'], [class*='carousel'], [class*='Carousel']")) return false;
        const rect = image.getBoundingClientRect();
        return rect.width >= Math.min(520, window.innerWidth * .55) && rect.height >= 260;
      });
      const image = candidates.sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
      if (image) {
        image.dataset.sectionParallax = "true";
        parallaxMedia.push(image);
      }
      });

      if (reducedMotion || compactOrTouch || !parallaxMedia.length) {cleanup=()=>sections.forEach(section => { delete section.dataset.sectionMotion; });return;}

      let frame = 0;
      const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      parallaxMedia.forEach(image => {
        const host = image.parentElement ?? image;
        const rect = host.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const progress = Math.max(-1, Math.min(1, distance / (window.innerHeight + rect.height)));
        image.style.setProperty("--section-parallax-y", `${(progress * -14).toFixed(2)}px`);
      });
      };
      const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
      update();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);

      cleanup=()=>{if (frame) cancelAnimationFrame(frame);window.removeEventListener("scroll", requestUpdate);window.removeEventListener("resize", requestUpdate);sections.forEach(section => { delete section.dataset.sectionMotion; });parallaxMedia.forEach(image => { delete image.dataset.sectionParallax; image.style.removeProperty("--section-parallax-y"); });};
    },250);
    return()=>{window.clearTimeout(timer);cleanup();};
  }, [pathname]);

  return null;
}
