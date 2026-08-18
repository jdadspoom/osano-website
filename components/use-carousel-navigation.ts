"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

export function useCarouselNavigation(itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const goTo = useCallback((requestedIndex: number) => {
    const nextIndex = Math.max(0, Math.min(itemCount - 1, requestedIndex));
    const track = trackRef.current;
    const item = itemRefs.current[nextIndex];
    setActiveIndex(nextIndex);
    if (!track || !item) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: item.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  }, [itemCount]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const syncActiveItem = () => {
      frame = 0;
      const closest = itemRefs.current.reduce(
        (best, item, index) => {
          if (!item) return best;
          const distance = Math.abs(item.offsetLeft - track.scrollLeft);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setActiveIndex(closest.index);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(syncActiveItem);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [itemCount]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(itemCount - 1);
    }
  };

  return {
    activeIndex,
    canGoPrevious: activeIndex > 0,
    canGoNext: activeIndex < itemCount - 1,
    goTo,
    previous: () => goTo(activeIndex - 1),
    next: () => goTo(activeIndex + 1),
    trackRef,
    itemRefs,
    trackProps: {
      tabIndex: 0,
      onKeyDown,
      role: "group" as const,
      "aria-roledescription": "carousel",
    },
  };
}
