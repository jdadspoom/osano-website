"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import styles from "./scroll-expand.module.css";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start || 0.000001), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

type ScrollExpandProps = {
  src: string;
  poster?: string;
  title?: ReactNode;
  scrollHint?: string;
  children?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  className?: string;
  style?: CSSProperties;
};

export function ScrollExpand({
  src,
  poster,
  title,
  scrollHint = "Scroll to explore",
  children,
  startWidth = 72,
  startHeight = 66,
  startRadius = 28,
  mediaZoom = 1.12,
  scrollDistance = 0.85,
  holdDistance = 0.18,
  smoothing = 0.1,
  overlayScrim = 0.32,
  className = "",
  style,
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const eased = smoothstep(0, 1, progress);
    const width = startWidth + (100 - startWidth) * eased;
    const height = startHeight + (100 - startHeight) * eased;
    const insetX = Math.max(0, (100 - width) / 2);
    const insetY = Math.max(0, (100 - height) / 2);
    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${startRadius * (1 - eased)}px)`;
    media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * eased})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${overlayScrim * eased}`;
    if (titleRef.current) {
      const out = smoothstep(0.34, 0.78, progress);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-24 * out}px, 0) scale(${1 + 0.05 * out})`;
    }
    if (hintRef.current) {
      const out = smoothstep(0, 0.12, progress);
      hintRef.current.style.opacity = `${1 - out}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * out}px, 0)`;
    }
    if (overlayRef.current) {
      const incoming = smoothstep(0.66, 0.96, progress);
      overlayRef.current.style.opacity = `${incoming}`;
      overlayRef.current.style.transform = `translate3d(0, ${20 * (1 - incoming)}px, 0)`;
      overlayRef.current.style.pointerEvents = incoming > 0.9 ? "auto" : "none";
    }
  }, [mediaZoom, overlayScrim, startHeight, startRadius, startWidth]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stageHeight = window.innerHeight;
    let current = reducedMotion ? 1 : 0;
    let target = current;
    let frame = 0;

    const measure = () => {
      stageHeight = window.innerHeight;
      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * (1 + scrollDistance + holdDistance)}px`;
    };
    const readProgress = () => {
      if (reducedMotion) return 1;
      return clamp(-track.getBoundingClientRect().top / (stageHeight * scrollDistance), 0, 1);
    };
    const tick = () => {
      const follow = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * follow;
      if (Math.abs(target - current) < 0.0004) current = target;
      applyProgress(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const update = () => {
      target = readProgress();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      measure();
      current = target = readProgress();
      applyProgress(current);
    };

    measure();
    applyProgress(current);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
    };
  }, [applyProgress, holdDistance, scrollDistance, smoothing]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className}`} style={style}>
      <div ref={trackRef} className={styles.track}>
        <div ref={stageRef} className={styles.stage}>
          <div ref={frameRef} className={styles.frame}>
            <video ref={mediaRef} className={styles.media} autoPlay muted loop playsInline poster={poster} preload="metadata">
              <source src={src} type="video/mp4" />
            </video>
            <div ref={scrimRef} className={styles.scrim} />
            <div ref={overlayRef} className={styles.overlay}>{children}</div>
          </div>
          {title && <div ref={titleRef} className={styles.title}>{title}</div>}
          {scrollHint && <div ref={hintRef} className={styles.hint}>{scrollHint}</div>}
        </div>
      </div>
    </div>
  );
}
