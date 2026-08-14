"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ViewerItem = { src: string; title: string; copy: string; rect: DOMRect };

export function SpatialImageViewer() {
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<ViewerItem[]>([]);
  const [index, setIndex] = useState(0);
  const active = items[index];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const openFromElement = (element: HTMLElement) => {
      const elements = [...document.querySelectorAll<HTMLElement>("[data-spatial-src]")];
      const nextItems = elements
        .map(item => ({
          src: item.dataset.spatialSrc ?? "",
          title: item.dataset.spatialTitle ?? "OSANO",
          copy: item.dataset.spatialCopy ?? "",
          rect: item.getBoundingClientRect(),
        }))
        .filter(item => item.src);
      const nextIndex = Math.max(0, elements.indexOf(element));
      setItems(nextItems);
      setIndex(Math.min(nextIndex, nextItems.length - 1));
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest("a,button,input,select,textarea")) return;
      const trigger = target.closest<HTMLElement>("[data-spatial-src]");
      if (trigger) openFromElement(trigger);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches("[data-spatial-src]")) return;
      event.preventDefault();
      openFromElement(target);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!active || !frameRef.current) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const frame = frameRef.current;
    const mobile = window.innerWidth <= 700;
    const edge = mobile ? 20 : 48;
    const targetWidth = Math.min(1200, window.innerWidth - edge * 2);
    const targetHeight = Math.min(window.innerHeight - (mobile ? 190 : 180), targetWidth * 0.66);
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = Math.max(mobile ? 70 : 34, (window.innerHeight - targetHeight) / 2 - 24);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
      frame.animate(
        [
          { left: `${active.rect.left}px`, top: `${active.rect.top}px`, width: `${active.rect.width}px`, height: `${active.rect.height}px`, borderRadius: "12px" },
          { left: `${targetLeft}px`, top: `${targetTop}px`, width: `${targetWidth}px`, height: `${targetHeight}px`, borderRadius: "18px" },
        ],
        { duration: 620, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" },
      );
    } else {
      Object.assign(frame.style, {
        left: `${targetLeft}px`,
        top: `${targetTop}px`,
        width: `${targetWidth}px`,
        height: `${targetHeight}px`,
      });
    }

    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setItems([]);
      if (event.key === "ArrowLeft") setIndex(current => (current - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") setIndex(current => (current + 1) % items.length);
    };
    window.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keyboard);
    };
  }, [active, items.length]);

  const move = (direction: -1 | 1) => {
    setIndex(current => (current + direction + items.length) % items.length);
  };

  if (!mounted || !active) return null;
  return createPortal(
    <div
      className="spatial-viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spatial-viewer-title"
      onMouseDown={event => {
        if (event.target === event.currentTarget) setItems([]);
      }}
      onTouchStart={event => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={event => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
        touchStart.current = null;
      }}
    >
      <button ref={closeRef} type="button" className="spatial-viewer__close" onClick={() => setItems([])} aria-label="Close image viewer">
        &times;
      </button>
      <div ref={frameRef} className="spatial-viewer__frame" key={active.src}>
        <Image src={active.src} alt={active.title} fill sizes="100vw" className="spatial-viewer__image" priority />
      </div>
      <footer className="spatial-viewer__caption">
        <span>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        <div>
          <h2 id="spatial-viewer-title">{active.title}</h2>
          {active.copy && <p>{active.copy}</p>}
        </div>
      </footer>
      {items.length > 1 && (
        <nav className="spatial-viewer__controls" aria-label="Image navigation">
          <button type="button" onClick={() => move(-1)} aria-label="Previous image">&larr;</button>
          <button type="button" onClick={() => move(1)} aria-label="Next image">&rarr;</button>
        </nav>
      )}
    </div>,
    document.body,
  );
}
