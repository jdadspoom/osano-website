"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "@/app/home.module.css";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";

type HomeVideo = { id: string; title: string; label: string; description: string; duration: string; src: string | null; poster: string | null };

// Replace src/poster paths here when the final video files arrive.
const homeVideos: HomeVideo[] = [
  { id: "osano-philosophy", title: "The OSANO philosophy", label: "PHILOSOPHY VIDEO", description: "Why better technology begins with the way people live.", duration: "02:48", src: null, poster: "/images/home/home-about-01.webp" },
  { id: "better-living", title: "Technology for better living", label: "BETTER LIVING VIDEO", description: "Considered systems designed around everyday environments.", duration: "03:16", src: null, poster: "/images/home/home-about-02.webp" },
  { id: "everyday-innovation", title: "Innovation in everyday life", label: "EVERYDAY INNOVATION VIDEO", description: "A quieter, more human approach to purposeful innovation.", duration: "02:31", src: null, poster: "/images/home/home-about-03.webp" },
];

export function HomeVideoGallery() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const progressRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<HomeVideo | null>(null);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const activeVideo = homeVideos[activeIndex];

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
        <button type="button" className={styles.editorialFilm} onClick={() => setSelectedVideo(activeVideo)} data-final-asset={activeVideo.label} aria-label={`Open ${activeVideo.title}`} key={activeVideo.id}>
          {activeVideo.poster && <span className={styles.editorialFilmImage} style={{ backgroundImage: `url('${activeVideo.poster}')` }} aria-hidden="true" />}
          {!activeVideo.poster && <span className={styles.videoPlaceholder}><OsanoEmptyArtwork label={activeVideo.title} kind="video" /></span>}
          <span className={styles.editorialFilmShade} aria-hidden="true" />
          <span className={styles.videoPlay} aria-hidden="true" />
          <span className={styles.editorialFilmMeta}><small>FEATURED FILM</small><strong>{activeVideo.title}</strong><em>{activeVideo.duration}</em></span>
        </button>
        <aside className={styles.editorialChapters} aria-label="Film chapters">
          <header><p className={styles.kicker}><span>What about</span><span className={styles.philosophyWordmark}><Image src="/brand/OSANO_Master_Logo_Black.svg" alt="OSANO" fill sizes="112px" unoptimized /></span></p><h2>Technology should improve the way people live.</h2></header>
          <div className={styles.chapterList}>{homeVideos.map((video, index) => <button type="button" key={video.id} className={index === activeIndex ? styles.activeChapter : undefined} onClick={() => { resetProgress(); setActiveIndex(index); }} aria-current={index === activeIndex ? "true" : undefined}>
            <small>{String(index + 1).padStart(2, "0")}</small><span><strong>{video.title}</strong><em>{video.description}</em></span><b>{video.duration}</b>{index === activeIndex && <i aria-hidden="true"><span ref={progressRef} style={{ transform: "scaleX(0)" }} /></i>}
          </button>)}</div>
        </aside>
      </div>

      {selectedVideo && createPortal(
        <div className={styles.videoModal} role="dialog" aria-modal="true" aria-labelledby="home-video-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedVideo(null); }}>
          <div className={styles.videoModalPanel}>
            <button ref={closeRef} type="button" className={styles.videoClose} onClick={() => setSelectedVideo(null)} aria-label="Close video">×</button>
            <h2 id="home-video-title">{selectedVideo.title}</h2>
            {selectedVideo.src ? <video controls autoPlay poster={selectedVideo.poster ?? undefined}><source src={selectedVideo.src} /></video> : <div className={styles.modalPlaceholder} data-final-asset={selectedVideo.label}><OsanoEmptyArtwork label={selectedVideo.title} kind="video" /></div>}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
