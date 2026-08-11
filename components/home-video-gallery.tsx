"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/app/home.module.css";

type HomeVideo = { id: string; title: string; label: string; src: string | null; poster: string | null };

// Replace src/poster paths here when the final video files arrive.
const homeVideos: HomeVideo[] = [
  { id: "osano-philosophy", title: "The OSANO Philosophy", label: "PHILOSOPHY VIDEO", src: null, poster: "/images/home/home-health.png" },
  { id: "better-living", title: "Technology for Better Living", label: "BETTER LIVING VIDEO", src: null, poster: "/images/home/home-community-01.webp" },
  { id: "everyday-innovation", title: "Innovation in Everyday Life", label: "EVERYDAY INNOVATION VIDEO", src: null, poster: "/images/home/home-community-04.webp" },
];

export function HomeVideoGallery() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const progressRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<HomeVideo | null>(null);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const previousIndex = (activeIndex - 1 + homeVideos.length) % homeVideos.length;
  const nextIndex = (activeIndex + 1) % homeVideos.length;

  useEffect(() => {
    if (!selectedVideo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedVideo(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [selectedVideo]);

  useEffect(() => {
    if (selectedVideo || isAutoPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsedRef.current += now - previous;
      previous = now;
      if (elapsedRef.current >= 6500) {
        elapsedRef.current = 0;
        if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
        setActiveIndex((current) => (current + 1) % homeVideos.length);
        return;
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${elapsedRef.current / 6500})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, isAutoPaused, selectedVideo]);

  const resetProgress = () => { elapsedRef.current = 0; if (progressRef.current) progressRef.current.style.transform = "scaleX(0)"; };
  const move = (direction: -1 | 1) => { resetProgress(); setActiveIndex((current) => (current + direction + homeVideos.length) % homeVideos.length); };

  const card = (video: HomeVideo, index: number, position: "previous" | "current" | "next") => (
    <button
      type="button"
      className={`${styles.videoCard} ${styles[position]}`}
      onClick={() => position === "current" ? setSelectedVideo(video) : move(position === "previous" ? -1 : 1)}
      data-final-asset={video.label}
      data-video-id={video.id}
      aria-label={position === "current" ? `Open ${video.title}` : `Show ${video.title}`}
      key={video.id}
      style={video.poster ? { backgroundImage: `url('${video.poster}')` } : undefined}
    >
      {!video.poster && <span className={styles.videoPlaceholder}>VIDEO PLACEHOLDER<small>{video.label}</small></span>}
      {position === "current" && <><span className={styles.videoPlay} aria-hidden="true" /><span className={styles.videoCaption}><small>{String(index + 1).padStart(2, "0")}</small>{video.title}</span></>}
    </button>
  );

  return (
    <>
      <div
        className={styles.videoGallery}
        onMouseEnter={() => setIsAutoPaused(true)}
        onMouseLeave={() => setIsAutoPaused(false)}
        onFocusCapture={() => setIsAutoPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsAutoPaused(false);
        }}
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => { if (pointerStart.current === null) return; const distance = event.clientX - pointerStart.current; if (Math.abs(distance) > 55) move(distance > 0 ? -1 : 1); pointerStart.current = null; }}
      >
        {card(homeVideos[previousIndex], previousIndex, "previous")}
        <div className={styles.philosophyCopy}>
          <p className={styles.kicker}>What about <strong>OSANO</strong></p>
          <h2>Technology should improve the way people live, not simply solve problems.</h2>
          <p className={styles.attribution}>— THE OSANO PHILOSOPHY</p>
        </div>
        {card(homeVideos[activeIndex], activeIndex, "current")}
        {card(homeVideos[nextIndex], nextIndex, "next")}
        <div className={styles.videoControls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous video">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next video">→</button>
        </div>
        <span className={styles.videoAutoProgress} aria-hidden="true"><i ref={progressRef} style={{ transform: "scaleX(0)" }} /></span>
      </div>

      {selectedVideo && createPortal(
        <div className={styles.videoModal} role="dialog" aria-modal="true" aria-labelledby="home-video-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedVideo(null); }}>
          <div className={styles.videoModalPanel}>
            <button ref={closeRef} type="button" className={styles.videoClose} onClick={() => setSelectedVideo(null)} aria-label="Close video">×</button>
            <h2 id="home-video-title">{selectedVideo.title}</h2>
            {selectedVideo.src ? <video controls autoPlay poster={selectedVideo.poster ?? undefined}><source src={selectedVideo.src} /></video> : <div className={styles.modalPlaceholder} data-final-asset={selectedVideo.label}><span>VIDEO PLACEHOLDER</span><small>{selectedVideo.label}</small><p>Video will be available soon.</p></div>}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
