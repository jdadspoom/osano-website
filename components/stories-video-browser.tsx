"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/app/stories.module.css";
import { OsanoEmptyArtwork } from "@/components/osano-empty-artwork";

type StoryVideo = {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  /** Direct HTTPS media URL, such as a Vercel Blob public URL. */
  videoUrl?: string;
  /** Optional direct HTTPS poster URL. */
  posterUrl?: string;
};

// Add public Vercel media URLs to videoUrl and posterUrl when final assets are ready.
const videos: StoryVideo[] = [
  { id: "calmer-home", category: "Well-being", title: "Designing a calmer home", description: "Simple, thoughtful ideas for a calmer everyday life.", duration: "07:12", date: "2026-08-12" },
  { id: "indoor-air", category: "Technology", title: "Understanding indoor air: what matters most", description: "A practical look at indoor air and the small choices that shape everyday comfort.", duration: "04:32", date: "2026-08-10" },
  { id: "daily-rituals", category: "Well-being", title: "Daily rituals for focus and balance", description: "Simple routines that make space for focus, rest and balance.", duration: "06:18", date: "2026-08-08" },
  { id: "hydration", category: "Health", title: "Hydration habits that support you", description: "Everyday hydration ideas designed to support energy and well-being.", duration: "05:40", date: "2026-08-06" },
  { id: "your-space", category: "Hygiene", title: "Creating a space that feels like you", description: "Thoughtful ways to keep everyday spaces calm, clean and comfortable.", duration: "09:21", date: "2026-08-04" },
  { id: "pets-comfort", category: "Pets", title: "Comfortable spaces for life with pets", description: "Explore practical choices that support pets and the people who live with them.", duration: "08:05", date: "2026-08-02" },
  { id: "shared-learning", category: "Community", title: "Learning through shared experiences", description: "Community members exchange useful ideas for better everyday living.", duration: "05:54", date: "2026-07-30" },
  { id: "better-business", category: "Business", title: "Better environments for better work", description: "How thoughtful environments can support people throughout the working day.", duration: "06:42", date: "2026-07-28" },
];

const filters = ["All stories", "Well-being", "Technology", "Hygiene", "Health", "Pets", "Community", "Business"];

function FilterIcon({ label }: { label: string }) {
  const paths: Record<string, React.ReactNode> = {
    "All stories": <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    "Well-being": <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />,
    Technology: <><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 9h6v6H9zM12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    Hygiene: <><path d="M7 19h10M9 19v-5l3-3 3 3v5M12 11V5" /><path d="M9 7h6" /></>,
    Health: <><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" /><path d="M8 12h2l1-2 2 4 1-2h2" /></>,
    Pets: <><circle cx="8" cy="8" r="2" /><circle cx="16" cy="8" r="2" /><circle cx="5" cy="13" r="2" /><circle cx="19" cy="13" r="2" /><path d="M8 18c0-2 1.8-4 4-4s4 2 4 4c0 1.2-1 2-2.2 2h-3.6C9 20 8 19.2 8 18Z" /></>,
    Community: <><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3.5 20c.4-4 2.3-6 5.5-6s5.1 2 5.5 6M15 15c3 0 4.5 1.7 5 4.5" /></>,
    Business: <><rect x="4" y="7" width="16" height="12" rx="2" /><path d="M9 7V4h6v3M4 12h16M10 12v2h4v-2" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[label]}</svg>;
}

function VideoSurface({ video, compact = false }: { video: StoryVideo; compact?: boolean }) {
  if (video.videoUrl) return <video controls={!compact} muted={compact} preload={compact ? "none" : "metadata"} poster={video.posterUrl} src={video.videoUrl} className={compact ? styles.videoThumbMedia : styles.videoPlayer} />;
  return <div className={compact ? styles.videoThumbPlaceholder : styles.videoPlaceholder}><OsanoEmptyArtwork label={video.title} kind="video" /></div>;
}

export function StoriesVideoBrowser() {
  const [filter, setFilter] = useState("All stories");
  const [sort, setSort] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => {
    const list = filter === "All stories" ? videos : videos.filter(video => video.category === filter);
    return [...list].sort((a, b) => sort === "latest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
  }, [filter, sort]);
  const [selectedId, setSelectedId] = useState(videos[0].id);
  const active = filtered.find(video => video.id === selectedId) ?? filtered[0];

  useEffect(() => {
    const closeSort = (event: PointerEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSortOpen(false); };
    document.addEventListener("pointerdown", closeSort);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("pointerdown", closeSort); window.removeEventListener("keydown", closeOnEscape); };
  }, []);

  const chooseFilter = (nextFilter: string) => {
    setFilter(nextFilter);
    const first = nextFilter === "All stories" ? videos[0] : videos.find(video => video.category === nextFilter);
    if (first) setSelectedId(first.id);
  };

  return <section className={styles.videoBrowser} id="story-library">
    {active ? <div className={styles.videoBrowserGrid}>
      <article className={styles.mainVideo}>
        <div className={styles.iconFilters} aria-label="Video filters">
          <div>{filters.map(label => <button type="button" className={filter === label ? styles.activeIconFilter : undefined} onClick={() => chooseFilter(label)} key={label} aria-label={label} aria-pressed={filter === label} data-label={label} title={label}><FilterIcon label={label} /></button>)}</div>
          <span className={styles.selectedFilterTitle} aria-live="polite">{filter}</span>
          <div className={styles.sortMenu} ref={sortRef}>
            <button type="button" className={styles.iconSort} aria-label={`Sort stories: ${sort}`} aria-expanded={sortOpen} aria-haspopup="menu" data-label="Sort stories" onClick={() => setSortOpen(open => !open)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h11M8 12h8M8 18h5M4 5v14M2 17l2 2 2-2" /></svg>
            </button>
            {sortOpen && <div className={styles.sortPopover} role="menu">
              <p>Sort stories</p>
              <button type="button" role="menuitemradio" aria-checked={sort === "latest"} className={sort === "latest" ? styles.activeSort : undefined} onClick={() => { setSort("latest"); setSortOpen(false); }}><span>Latest first</span><small>Newest stories</small></button>
              <button type="button" role="menuitemradio" aria-checked={sort === "oldest"} className={sort === "oldest" ? styles.activeSort : undefined} onClick={() => { setSort("oldest"); setSortOpen(false); }}><span>Oldest first</span><small>Earlier stories</small></button>
            </div>}
          </div>
        </div>
        <div className={styles.mainVideoSurface} key={`surface-${active.id}`}><VideoSurface video={active} /></div>
        <div className={styles.mainVideoCopy} key={`copy-${active.id}`}><p className={styles.orangeLabel}>{active.category}</p><h2>{active.title}</h2><p>{active.description}</p></div>
      </article>
      <aside className={styles.videoQueue} aria-label="Film chapters">
        <header className={styles.queueHeader}><span>FILM CHAPTERS</span><small>{String(filtered.length).padStart(2, "0")} STORIES</small></header>
        <div className={styles.chapterTrack} role="group" aria-roledescription="carousel" aria-label="Story video chapters" onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
          event.preventDefault();
          const currentIndex = Math.max(0, filtered.findIndex(video => video.id === active.id));
          const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? filtered.length - 1 : Math.max(0, Math.min(filtered.length - 1, currentIndex + (event.key === "ArrowRight" ? 1 : -1)));
          setSelectedId(filtered[nextIndex].id);
          event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[nextIndex]?.focus();
        }}>
          {filtered.map((video, index) => <button type="button" key={video.id} className={video.id === active.id ? styles.activeVideoItem : undefined} onClick={() => setSelectedId(video.id)} aria-pressed={video.id === active.id}>
            <span className={styles.chapterIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.chapterCopy}><small>{video.category}</small><strong>{video.title}</strong><em>{video.description}</em></span>
            <span className={styles.chapterDuration}>{video.duration}</span>
          </button>)}
        </div>
      </aside>
    </div> : <p className={styles.emptyVideos}>No videos are available in this category yet.</p>}
  </section>;
}
