"use client";

import { useMemo, useState } from "react";
import styles from "@/app/stories.module.css";

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

function VideoSurface({ video, compact = false }: { video: StoryVideo; compact?: boolean }) {
  if (video.videoUrl) return <video controls={!compact} muted={compact} preload={compact ? "none" : "metadata"} poster={video.posterUrl} src={video.videoUrl} className={compact ? styles.videoThumbMedia : styles.videoPlayer} />;
  return <div className={compact ? styles.videoThumbPlaceholder : styles.videoPlaceholder}><span className={styles.playIcon} aria-hidden="true">▶</span>{!compact && <small>VIDEO READY</small>}<b>{video.duration}</b></div>;
}

export function StoriesVideoBrowser() {
  const [filter, setFilter] = useState("All stories");
  const [sort, setSort] = useState("latest");
  const filtered = useMemo(() => {
    const list = filter === "All stories" ? videos : videos.filter(video => video.category === filter);
    return [...list].sort((a, b) => sort === "latest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
  }, [filter, sort]);
  const [selectedId, setSelectedId] = useState(videos[0].id);
  const active = filtered.find(video => video.id === selectedId) ?? filtered[0];

  const chooseFilter = (nextFilter: string) => {
    setFilter(nextFilter);
    const first = nextFilter === "All stories" ? videos[0] : videos.find(video => video.category === nextFilter);
    if (first) setSelectedId(first.id);
  };

  return <section className={styles.videoBrowser} id="story-library">
    <div className={styles.filters} aria-label="Video filters">
      <div className={styles.filterChips}>{filters.map(label => <button type="button" className={filter === label ? styles.activeChip : undefined} onClick={() => chooseFilter(label)} key={label}>{label}</button>)}</div>
      <label className={styles.sortLabel}>Sort by:<select aria-label="Sort videos" value={sort} onChange={event => setSort(event.target.value)}><option value="latest">Latest</option><option value="oldest">Oldest</option></select></label>
    </div>
    {active ? <div className={styles.videoBrowserGrid}>
      <article className={styles.mainVideo}>
        <div className={styles.mainVideoSurface}><VideoSurface video={active} /></div>
        <p className={styles.orangeLabel}>{active.category}</p><h2>{active.title}</h2><p>{active.description}</p>
      </article>
      <aside className={styles.videoQueue} aria-label="More videos">{filtered.map(video => <button type="button" key={video.id} className={video.id === active.id ? styles.activeVideoItem : undefined} onClick={() => setSelectedId(video.id)} aria-current={video.id === active.id ? "true" : undefined}>
        <span className={styles.videoThumb}><VideoSurface video={video} compact /></span>
        <span><small>{video.category}</small><strong>{video.title}</strong><em>{video.duration}</em></span>
      </button>)}</aside>
    </div> : <p className={styles.emptyVideos}>No prototype videos in this category yet.</p>}
  </section>;
}
