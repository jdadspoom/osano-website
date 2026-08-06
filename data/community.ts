import type { CommunityItem } from "@/types/content";

export const communityItems: CommunityItem[] = [
  {
    id: "living-with-technology",
    slug: "living-with-technology",
    title: "Technology that belongs in daily life",
    eyebrow: "OSANO Perspective",
    summary:
      "A considered look at why the best innovation often feels quietly integrated.",
    description:
      "OSANO explores the relationship between new technology, familiar routines and the environments we share.",
    status: "published",
    dateLabel: "Editorial preview",
    category: "Living",
    heroMedia: { kind: "image", label: "Editorial Image" },
    gallery: [],
    documents: [],
    relatedSolutionIds: ["air", "pet-owner"],
    relatedProductIds: [],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "Technology that belongs in daily life | OSANO Stories",
    seoDescription:
      "An OSANO perspective on technology, familiar routines and shared environments.",
  },
  {
    id: "shared-environments",
    slug: "shared-environments",
    title: "The environments we share",
    eyebrow: "OSANO Community",
    summary:
      "People, pets and places come together through small, meaningful routines.",
    description:
      "A future community story about learning from the everyday spaces that connect us.",
    status: "published",
    dateLabel: "Community preview",
    category: "Community",
    heroMedia: { kind: "image", label: "Community Image" },
    gallery: [],
    documents: [],
    relatedSolutionIds: ["pet-owner", "grooming"],
    relatedProductIds: [],
    relatedTechnologyIds: [],
    seoTitle: "The environments we share | OSANO Community",
    seoDescription:
      "A future OSANO community story about the spaces and routines that connect people and pets.",
  },
  {
    id: "context-first",
    slug: "context-first",
    title: "Start with context",
    eyebrow: "OSANO Approach",
    summary:
      "Why understanding a place and its people comes before choosing a system.",
    description:
      "A future editorial feature on OSANO's context-first approach to solutions.",
    status: "published",
    dateLabel: "Editorial preview",
    category: "Approach",
    heroMedia: { kind: "image", label: "Context and Material Image" },
    gallery: [],
    documents: [],
    relatedSolutionIds: ["water-surface", "veterinary"],
    relatedProductIds: [],
    relatedTechnologyIds: ["oxygen", "hydrogen", "aqueous-ozone"],
    seoTitle: "Start with context | OSANO Stories",
    seoDescription:
      "Explore OSANO's context-first approach to purposeful technology and everyday environments.",
  },
];
