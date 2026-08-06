export type ContentStatus = "published" | "draft" | "pending";

export type WorldId = "health" | "hygiene" | "pets";

export type MediaPlaceholder = {
  kind: "image" | "video" | "document";
  label: string;
  src?: string;
  alt?: string;
};

export type SeoFields = {
  seoTitle: string;
  seoDescription: string;
};

export type ContentBase = SeoFields & {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  status: ContentStatus;
  heroMedia: MediaPlaceholder;
  gallery: MediaPlaceholder[];
  video?: MediaPlaceholder;
  documents: MediaPlaceholder[];
  relatedSolutionIds: string[];
  relatedProductIds: string[];
  relatedTechnologyIds: string[];
};

export type World = ContentBase & {
  world: WorldId;
  principle: string;
  accent: "health" | "hygiene" | "pets";
};

export type Solution = ContentBase & {
  world: WorldId;
  context: string;
  approach: string;
  route: string | null;
};

export type ProductCategory =
  | "oxygen"
  | "hydrogen"
  | "air"
  | "pet-professional"
  | "water-hygiene";

export type Product = ContentBase & {
  category: ProductCategory;
  context: string;
  approach: string;
};

export type Technology = ContentBase & {
  principle: string;
  application: string;
};

export type CommunityItem = ContentBase & {
  dateLabel: string;
  category: string;
};
