"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HeroEntrance() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = () => {};
    const timer = window.setTimeout(() => {
      const page = document.querySelector<HTMLElement>("#main-content .route-transition > *");
      if (!page) return;

      const hero = [...page.querySelectorAll<HTMLElement>(":scope > section")]
        .find((section) => section.querySelector("h1"));
      if (!hero || hero.matches(".product-reveal")) return;

      const heading = hero.querySelector<HTMLElement>("h1");
      const copy = heading?.parentElement;
      if (!heading || !copy) return;

      const copyChildren = [...copy.children].filter((element): element is HTMLElement => element instanceof HTMLElement);
      const headingIndex = copyChildren.indexOf(heading);
      const eyebrowElements = copyChildren.slice(0, Math.max(headingIndex, 0));
      const detailElements = copyChildren.slice(headingIndex + 1);
      const media = [...hero.querySelectorAll<HTMLElement>("img, video")].filter((element) => !copy.contains(element));

      hero.dataset.pageIntroduction = "true";
      heading.dataset.pageIntroductionTitle = "true";
      eyebrowElements.forEach((element, index) => {element.dataset.pageIntroductionEyebrow = "true";element.style.setProperty("--page-intro-index", String(index));});
      detailElements.forEach((element, index) => {element.dataset.pageIntroductionDetail = "true";element.style.setProperty("--page-intro-index", String(index));if (element.matches("a, button") || element.querySelector("a, button")) element.dataset.pageIntroductionCta = "true";});
      media.forEach((element) => { element.dataset.pageIntroductionMedia = "true"; });

      let frame = requestAnimationFrame(() => {frame = requestAnimationFrame(() => { hero.dataset.pageIntroductionReady = "true"; });});

      cleanup = () => {cancelAnimationFrame(frame);delete hero.dataset.pageIntroduction;delete hero.dataset.pageIntroductionReady;delete heading.dataset.pageIntroductionTitle;eyebrowElements.forEach((element) => {delete element.dataset.pageIntroductionEyebrow;element.style.removeProperty("--page-intro-index");});detailElements.forEach((element) => {delete element.dataset.pageIntroductionDetail;delete element.dataset.pageIntroductionCta;element.style.removeProperty("--page-intro-index");});media.forEach((element) => { delete element.dataset.pageIntroductionMedia; });};
    }, 250);
    return () => {window.clearTimeout(timer);cleanup();};
  }, [pathname]);

  return null;
}
