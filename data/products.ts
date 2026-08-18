import type { Product, ProductCategory } from "@/types/content";

type ProductSeed = {
  slug: string;
  title: string;
  category: ProductCategory;
  relatedSolutionIds: string[];
  relatedTechnologyIds: string[];
};

const seeds: ProductSeed[] = [
  { slug: "de8-unit", title: "DE8 Unit", category: "oxygen", relatedSolutionIds: ["oxygen-wellness"], relatedTechnologyIds: ["oxygen"] },
  { slug: "oxy-mov3", title: "Oxy MOV3", category: "oxygen", relatedSolutionIds: ["oxygen-wellness"], relatedTechnologyIds: ["oxygen"] },
  { slug: "de8-system", title: "DE8 System", category: "oxygen", relatedSolutionIds: ["oxygen-wellness"], relatedTechnologyIds: ["oxygen"] },
  { slug: "psa-3000", title: "PSA-3000", category: "oxygen", relatedSolutionIds: ["oxygen-wellness"], relatedTechnologyIds: ["oxygen"] },
  { slug: "hydrogen-hotpot", title: "Hydrogen Hotpot", category: "hydrogen", relatedSolutionIds: ["hydrogen-wellness"], relatedTechnologyIds: ["hydrogen"] },
  { slug: "has-pro", title: "HAS Pro", category: "air", relatedSolutionIds: ["air", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "sss", title: "SSS", category: "air", relatedSolutionIds: ["air", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "has-mini", title: "HAS Mini", category: "air", relatedSolutionIds: ["air", "pet-owner"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "has", title: "HAS", category: "air", relatedSolutionIds: ["air", "pet-owner"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "wds250", title: "WDS250", category: "pet-professional", relatedSolutionIds: ["grooming", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "cdu", title: "CDU", category: "pet-professional", relatedSolutionIds: ["grooming", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "ort", title: "ORT", category: "water-hygiene", relatedSolutionIds: ["water-surface", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "osb", title: "OSB", category: "water-hygiene", relatedSolutionIds: ["water-surface", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "wto", title: "WTO", category: "water-hygiene", relatedSolutionIds: ["water-surface", "grooming", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "wds-series", title: "WDS Series", category: "water-hygiene", relatedSolutionIds: ["water-surface", "grooming", "veterinary"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "hos-2-in-1", title: "HOS 2-in-1", category: "water-hygiene", relatedSolutionIds: ["water-surface", "pet-owner", "grooming"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "wto-mini", title: "WTO Mini", category: "water-hygiene", relatedSolutionIds: ["water-surface", "pet-owner"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "food-purifier", title: "Food Purifier", category: "water-hygiene", relatedSolutionIds: ["water-surface", "pet-owner"], relatedTechnologyIds: ["aqueous-ozone"] },
  { slug: "cos", title: "COS", category: "water-hygiene", relatedSolutionIds: ["water-surface", "pet-owner", "grooming"], relatedTechnologyIds: ["aqueous-ozone"] },
];

const categoryLabels: Record<ProductCategory, string> = {
  oxygen: "Oxygen Product",
  hydrogen: "Hydrogen Product",
  air: "Air Product",
  "pet-professional": "Pet Professional Product",
  "water-hygiene": "Water and Hygiene Product",
};

export const products: Product[] = seeds.map((seed) => ({
  id: seed.slug,
  slug: seed.slug,
  title: seed.title,
  eyebrow: categoryLabels[seed.category],
  summary: `${seed.title} is an approved OSANO product within the ${categoryLabels[seed.category].toLowerCase()} collection.`,
  description:
    "This product page provides the approved relationship between product, solution and technology. Detailed specifications, imagery and documentation will be added when confirmed.",
  status: "published",
  category: seed.category,
  context:
    "OSANO begins with the environment and intended use, helping each product sit within a clear, considered solution rather than an isolated catalogue.",
  approach:
    "Confirmed product details will be introduced here as approved. Until then, this page intentionally avoids unverified specifications, certifications and performance claims.",
  heroMedia: { kind: "image", label: `${seed.title} Product Image` },
  gallery: [
    { kind: "image", label: "Product Detail Image" },
    { kind: "image", label: "Product in Context Image" },
  ],
  video: { kind: "video", label: "Product film coming soon" },
  documents: [
    { kind: "document", label: "Product document coming soon" },
  ],
  relatedSolutionIds: seed.relatedSolutionIds,
  relatedProductIds: [],
  relatedTechnologyIds: seed.relatedTechnologyIds,
  seoTitle: `${seed.title} | OSANO Products`,
  seoDescription: `Explore ${seed.title}, its related OSANO solutions and approved technology connections.`,
}));

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug && product.status === "published");
