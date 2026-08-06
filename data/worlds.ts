import type { World } from "@/types/content";

const shared = {
  status: "published" as const,
  gallery: [],
  documents: [],
  relatedSolutionIds: [],
  relatedProductIds: [],
  relatedTechnologyIds: [],
};

export const worlds: World[] = [
  {
    ...shared,
    id: "health",
    slug: "health",
    title: "OSANO Health",
    eyebrow: "Everyday vitality",
    summary: "Thoughtful environments for clarity, balance and daily wellbeing.",
    description:
      "OSANO Health brings purposeful innovation into the rhythms of everyday life, with a calm focus on people, context and lasting quality.",
    world: "health",
    principle: "Balance designed around real routines.",
    accent: "health",
    heroMedia: { kind: "image", label: "Health Lifestyle Image" },
    relatedSolutionIds: ["oxygen-wellness", "hydrogen-wellness"],
    relatedTechnologyIds: ["oxygen", "hydrogen"],
    seoTitle: "OSANO Health | Everyday Wellness Solutions",
    seoDescription:
      "Explore OSANO Health, where purposeful technology supports balance, clarity and better everyday living.",
  },
  {
    ...shared,
    id: "hygiene",
    slug: "hygiene",
    title: "OSANO Hygiene",
    eyebrow: "Clean, considered spaces",
    summary: "Practical systems for the air, water and surfaces around us.",
    description:
      "OSANO Hygiene approaches clean living as a connected environment, bringing considered technology into homes, shared spaces and daily routines.",
    world: "hygiene",
    principle: "Cleanliness that feels naturally integrated.",
    accent: "hygiene",
    heroMedia: { kind: "image", label: "Hygiene Environment Image" },
    relatedSolutionIds: ["air", "water-surface"],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "OSANO Hygiene | Air, Water and Surface Solutions",
    seoDescription:
      "Explore OSANO Hygiene solutions for more considered air, water and everyday environments.",
  },
  {
    ...shared,
    id: "pets",
    slug: "pets",
    title: "OSANO Pets",
    eyebrow: "Family members, thoughtfully considered",
    summary: "Better everyday environments for pets and the people who care for them.",
    description:
      "OSANO Pets recognises animals as part of the family, connecting professional contexts and everyday care through calm, considered solutions.",
    world: "pets",
    principle: "Care shaped around shared life.",
    accent: "pets",
    heroMedia: { kind: "image", label: "Pets Lifestyle Image" },
    relatedSolutionIds: ["pet-owner", "grooming", "veterinary"],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "OSANO Pets | Thoughtful Pet Care Environments",
    seoDescription:
      "Explore OSANO Pets solutions for pet owners, grooming settings and veterinary contexts.",
  },
];

export const getWorld = (slug: string) =>
  worlds.find((world) => world.slug === slug && world.status === "published");
