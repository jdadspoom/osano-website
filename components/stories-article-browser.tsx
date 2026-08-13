"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/app/stories.module.css";

type StoryArticle = {
  id: string;
  category: string;
  title: string;
  summary: string;
  body: string[];
  recommended?: boolean;
  imageUrl?: string;
};

const articles: StoryArticle[] = [
  { id: "better-home", category: "Well-being", title: "A practical guide to better living at home.", summary: "Explore how air, water, and thoughtful technology can support a healthier, more comfortable everyday living environment.", body: ["Better living begins with understanding the routines and environments that shape each day.", "Thoughtful choices around air, water and the way a space is used can make well-being feel natural rather than complicated.", "This prototype article will be replaced with the final editorial content when it is ready."], recommended: true },
  { id: "cleaner-environment", category: "Hygiene", title: "Creating a cleaner environment for everyday living", summary: "Discover practical ideas for creating cleaner, healthier spaces in everyday life.", body: ["A clean environment should support everyday life without adding unnecessary complexity.", "This guide explores simple habits and technologies that can work together across frequently used spaces."], recommended: true },
  { id: "aqueous-ozone", category: "Technology", title: "Aqueous Ozone for Everyday Hygiene", summary: "Discover practical ways Aqueous Ozone can support cleaner everyday living.", body: ["Aqueous ozone offers a different way to think about everyday hygiene.", "The article introduces the technology, useful contexts and practical considerations for daily use."], recommended: true },
  { id: "life-with-pets", category: "Pets", title: "Creating Better Spaces for Life with Pets", summary: "Discover practical ideas for cleaner, more comfortable spaces for life with pets.", body: ["Living well with pets means considering comfort, cleanliness and shared routines together.", "Small environmental improvements can support both companion animals and the people around them."], recommended: true },
  { id: "hydrogen-water", category: "Health", title: "Hydrogen Water for Everyday Well-Being", summary: "Discover simple ways Hydrogen Water can become part of everyday well-being.", body: ["Hydration is one of the simplest foundations of everyday well-being.", "This prototype article explores how hydrogen water may fit into a thoughtful daily routine."], recommended: true },
  { id: "shared-knowledge", category: "Community", title: "When shared knowledge becomes useful", summary: "See how experience and conversation can turn ideas into practical choices.", body: ["Knowledge becomes more useful when people can connect it to real situations.", "Community learning creates space to compare experiences and discover practical ways forward."] },
  { id: "healthy-workplace", category: "Business", title: "Thoughtful environments for healthier work", summary: "Ideas for creating comfortable, supportive spaces throughout the working day.", body: ["Work environments influence focus, comfort and everyday experience.", "A thoughtful approach brings people, routines and environmental systems into the same conversation."] },
];

const filters = ["All articles", "Well-being", "Technology", "Hygiene", "Health", "Pets", "Community", "Business"];
const PAGE_SIZE = 5;

function ArticleArtwork({ article }: { article: StoryArticle }) {
  return article.imageUrl ? <img src={article.imageUrl} alt="" /> : <span aria-hidden="true">ARTICLE IMAGE</span>;
}

export function StoriesArticleBrowser() {
  const articleListRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("All articles");
  const [page, setPage] = useState(0);
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [openArticle, setOpenArticle] = useState<StoryArticle | null>(null);
  const recommended = articles.filter(article => article.recommended);
  const filtered = useMemo(() => filter === "All articles" ? articles : articles.filter(article => article.category === filter), [filter]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const featured = recommended[recommendedIndex];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!openArticle) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpenArticle(null); };
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [openArticle]);

  const changeFilter = (value: string) => { setFilter(value); setPage(0); };
  const moveRecommended = (direction: number) => setRecommendedIndex(index => (index + direction + recommended.length) % recommended.length);
  const changePage = (nextPage: number) => {
    setPage(nextPage);
    window.requestAnimationFrame(() => articleListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return <section className={styles.articleBrowser} id="featured-article">
    <div className={styles.recommendedArticle}>
      <div className={styles.recommendedArtwork}><ArticleArtwork article={featured} /></div>
      <div className={styles.recommendedShade} />
      <div className={styles.recommendedCopy}><p>RECOMMENDED ARTICLE</p><h2>{featured.title}</h2><span>{featured.summary}</span><button type="button" onClick={() => setOpenArticle(featured)}>Read the guide</button></div>
      <div className={styles.recommendedControls}><span>{String(recommendedIndex + 1).padStart(2, "0")} / {String(recommended.length).padStart(2, "0")}</span><button type="button" onClick={() => moveRecommended(-1)} aria-label="Previous recommended article">‹</button><button type="button" onClick={() => moveRecommended(1)} aria-label="Next recommended article">›</button></div>
    </div>

    <div className={styles.articleFilters} aria-label="Article filters">{filters.map(value => <button type="button" key={value} className={filter === value ? styles.activeArticleFilter : undefined} onClick={() => changeFilter(value)}>{value}</button>)}</div>
    <div className={styles.articleCards} ref={articleListRef}>{visible.map(article => <article key={article.id}><div className={styles.articleCardCopy}><p>{article.category}</p><h3>{article.title}</h3><span>{article.summary}</span><button type="button" onClick={() => setOpenArticle(article)}>Read the story →</button></div><div className={styles.articleCardArtwork}><ArticleArtwork article={article} /></div></article>)}</div>
    <div className={styles.articlePagination}><button type="button" onClick={() => changePage(Math.max(0, page - 1))} disabled={page === 0} aria-label="Previous five articles">←</button><span>{page + 1} / {pageCount}</span><button type="button" onClick={() => changePage(Math.min(pageCount - 1, page + 1))} disabled={page >= pageCount - 1} aria-label="Next five articles">→</button></div>

    {mounted && openArticle && createPortal(<div className={styles.articleModal} role="dialog" aria-modal="true" aria-labelledby="article-modal-title" onMouseDown={event => { if (event.target === event.currentTarget) setOpenArticle(null); }}><article><button type="button" className={styles.articleModalClose} onClick={() => setOpenArticle(null)} aria-label="Close article">×</button><p>{openArticle.category}</p><h2 id="article-modal-title">{openArticle.title}</h2><strong>{openArticle.summary}</strong>{openArticle.body.map(paragraph => <span key={paragraph}>{paragraph}</span>)}</article></div>, document.body)}
  </section>;
}
