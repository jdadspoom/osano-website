import type { Technology } from "@/types/content";

const common = {
  status: "published" as const,
  gallery: [
    { kind: "image" as const, label: "Technology Detail Image" },
    { kind: "image" as const, label: "Material and Context Image" },
  ],
  video: { kind: "video" as const, label: "Technology film coming soon" },
  documents: [
    { kind: "document" as const, label: "Technical document coming soon" },
  ],
  relatedSolutionIds: [],
};

export const technologies: Technology[] = [
  {
    ...common,
    id: "oxygen",
    slug: "oxygen",
    title: "Oxygen Technology",
    eyebrow: "OSANO Technology",
    summary: "A technology platform connected to approved OSANO products.",
    description:
      "OSANO presents oxygen technology through its role in a wider context: the setting, the intended use and the experience around it.",
    principle:
      "Technology is considered as part of a complete environment, never as an isolated spectacle.",
    application:
      "Explore the approved OSANO products currently mapped to this technology platform.",
    heroMedia: { kind: "image", label: "Oxygen Technology Detail" },
    relatedProductIds: ["de8-unit", "oxy-mov3", "de8-system", "psa-3000"],
    relatedTechnologyIds: [],
    seoTitle: "Oxygen Technology | OSANO",
    seoDescription:
      "Explore the OSANO Oxygen Technology platform and its connected product range.",
  },
  {
    ...common,
    id: "hydrogen",
    slug: "hydrogen",
    title: "Hydrogen Technology",
    eyebrow: "OSANO Technology",
    summary: "Purposeful technology considered within everyday contexts.",
    description:
      "OSANO approaches hydrogen technology with clarity and restraint, focusing on approved products and the settings they are designed to support.",
    principle:
      "A precise platform, communicated without unsupported scientific or medical claims.",
    application:
      "Explore the approved OSANO product currently mapped to this technology platform.",
    heroMedia: { kind: "image", label: "Hydrogen Technology Detail" },
    relatedProductIds: ["hydrogen-hotpot"],
    relatedTechnologyIds: [],
    seoTitle: "Hydrogen Technology | OSANO",
    seoDescription:
      "Explore the OSANO Hydrogen Technology platform and its connected product.",
  },
  {
    ...common,
    id: "aqueous-ozone",
    slug: "aqueous-ozone",
    title: "Aqueous Ozone Technology",
    eyebrow: "OSANO Technology",
    summary: "A technology reference across approved hygiene and pet contexts.",
    description:
      "OSANO connects aqueous ozone technology to a range of approved products and applications, presenting the system through context rather than unsupported claims.",
    principle:
      "Precision, material awareness and a clear relationship between system and setting.",
    application:
      "Explore the approved products and published solutions mapped to this technology platform.",
    heroMedia: { kind: "image", label: "Aqueous Ozone Technology Detail" },
    relatedSolutionIds: ["air", "water-surface", "pet-owner", "grooming", "veterinary"],
    relatedProductIds: [
      "has-pro",
      "sss",
      "has-mini",
      "has",
      "wds250",
      "cdu",
      "ort",
      "osb",
      "wto",
      "wds-series",
      "hos-2-in-1",
      "wto-mini",
      "food-purifier",
      "cos",
    ],
    relatedTechnologyIds: [],
    seoTitle: "Aqueous Ozone Technology | OSANO",
    seoDescription:
      "Explore OSANO Aqueous Ozone Technology and its connected products and applications.",
  },
];

export const getTechnology = (slug: string) =>
  technologies.find(
    (technology) => technology.slug === slug && technology.status === "published",
  );
