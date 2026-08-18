"use client";

import { useEffect } from "react";

export function MediaLoadEffects() {
  useEffect(() => {
    const mark = (image: HTMLImageElement) => {
      if (image.closest("header, footer, .privacy-consent") || image.src.endsWith(".svg")) return;
      image.dataset.mediaState = image.complete && image.naturalWidth > 0 ? "ready" : "loading";
    };
    let observer: MutationObserver | undefined;
    const onLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) event.target.dataset.mediaState = "ready";
    };
    const onError = (event: Event) => {
      if (event.target instanceof HTMLImageElement) event.target.dataset.mediaState = "error";
    };
    const timer = window.setTimeout(() => {
      [...document.images].forEach(mark);
      observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof HTMLImageElement) mark(node);
        else if (node instanceof HTMLElement) node.querySelectorAll("img").forEach(mark);
      })));
      observer.observe(document.body, { childList: true, subtree: true });
      document.addEventListener("load", onLoad, true);
      document.addEventListener("error", onError, true);
    }, 250);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      document.removeEventListener("load", onLoad, true);
      document.removeEventListener("error", onError, true);
    };
  }, []);
  return null;
}
