import type { Solution } from "@/types/content";

const common = {
  gallery: [
    { kind: "image" as const, label: "Solution Context Image" },
    { kind: "image" as const, label: "Everyday Application Image" },
  ],
  video: { kind: "video" as const, label: "Solution Film Coming Soon" },
  documents: [
    { kind: "document" as const, label: "Solution Document Coming Soon" },
  ],
  relatedSolutionIds: [],
};

export const solutions: Solution[] = [
  {
    ...common,
    id: "air",
    slug: "air",
    title: "Air Solutions",
    eyebrow: "OSANO Hygiene",
    summary: "A considered approach to the air within everyday spaces.",
    description:
      "Air moves through every shared moment. OSANO brings a context-led perspective to indoor environments, balancing purposeful systems with the way a space is actually used.",
    status: "published",
    world: "hygiene",
    route: "/solutions/hygiene/air",
    context:
      "Homes and shared environments change throughout the day. A useful air solution begins with the people, activities and spatial conditions it needs to support.",
    approach:
      "OSANO considers the whole setting first, then connects relevant products and technologies without turning the space into a technical showcase.",
    heroMedia: { kind: "image", label: "Air and Architecture Image" },
    relatedProductIds: ["has-pro", "sss", "has-mini", "has"],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "Air Solutions | OSANO Hygiene",
    seoDescription:
      "Discover OSANO Air Solutions, designed around the changing needs of everyday indoor environments.",
  },
  {
    ...common,
    id: "water-surface",
    slug: "water-surface",
    title: "Water and Surface Solutions",
    eyebrow: "OSANO Hygiene",
    summary: "Connected thinking for water, surfaces and daily routines.",
    description:
      "Water and surfaces are part of countless everyday interactions. OSANO shapes solutions around where those interactions happen and what the context requires.",
    status: "published",
    world: "hygiene",
    route: "/solutions/hygiene/water-surface",
    context:
      "Different settings bring different patterns of use. The starting point is a clear understanding of place, routine and responsibility.",
    approach:
      "OSANO connects appropriate systems into a cohesive environment, keeping the experience clear, practical and human-centred.",
    heroMedia: { kind: "image", label: "Water and Material Image" },
    relatedProductIds: [
      "ort",
      "osb",
      "wto",
      "wds-series",
      "hos-2-in-1",
      "wto-mini",
      "food-purifier",
      "cos",
    ],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "Water and Surface Solutions | OSANO Hygiene",
    seoDescription:
      "Explore OSANO solutions connecting water, surfaces and considered everyday routines.",
  },
  {
    ...common,
    id: "pet-owner",
    slug: "pet-owner",
    title: "Pet Owner Solutions",
    eyebrow: "OSANO Pets",
    summary: "Thoughtful support for the spaces people and pets share.",
    description:
      "Living well with pets is about shared routines, familiar spaces and everyday care. OSANO starts with that relationship.",
    status: "published",
    world: "pets",
    route: "/solutions/pets/pet-owner",
    context:
      "Pet-friendly living brings together comfort, cleanliness and the practical rhythm of caring for a family member.",
    approach:
      "OSANO connects relevant products to the household context while keeping technology calm, approachable and part of the background.",
    heroMedia: { kind: "image", label: "Shared Home Lifestyle Image" },
    relatedProductIds: ["has-mini", "has", "wto-mini", "food-purifier", "hos-2-in-1", "cos"],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "Pet Owner Solutions | OSANO Pets",
    seoDescription:
      "Explore thoughtful OSANO solutions for the everyday spaces shared by people and pets.",
  },
  {
    ...common,
    id: "grooming",
    slug: "grooming",
    title: "Grooming Solutions",
    eyebrow: "OSANO Pets",
    summary: "Considered systems for professional pet-care routines.",
    description:
      "Grooming settings depend on repeatable routines, clear working spaces and care for every animal moving through them.",
    status: "published",
    world: "pets",
    route: "/solutions/pets/grooming",
    context:
      "Professional grooming combines close contact, water use and changing activity throughout the day.",
    approach:
      "OSANO connects relevant products around workflow and setting, creating a more coherent foundation for professional care.",
    heroMedia: { kind: "image", label: "Professional Grooming Context Image" },
    relatedProductIds: ["wds250", "cdu", "wto", "wds-series", "hos-2-in-1", "cos"],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "Grooming Solutions | OSANO Pets",
    seoDescription:
      "Discover OSANO solutions shaped around the routines and environments of professional pet grooming.",
  },
  {
    ...common,
    id: "veterinary",
    slug: "veterinary",
    title: "Veterinary Solutions",
    eyebrow: "OSANO Pets",
    summary: "Context-aware support for professional animal-care environments.",
    description:
      "Veterinary settings bring people, animals and professional routines together. OSANO approaches the environment with precision and care.",
    status: "published",
    world: "pets",
    route: "/solutions/pets/veterinary",
    context:
      "Professional animal-care spaces have distinct workflows and responsibilities, with each area serving a different purpose.",
    approach:
      "OSANO considers the setting as a connected whole and identifies relevant products without introducing unapproved medical claims.",
    heroMedia: { kind: "image", label: "Veterinary Environment Image" },
    relatedProductIds: ["has-pro", "sss", "wds250", "cdu", "ort", "osb", "wto", "wds-series"],
    relatedTechnologyIds: ["aqueous-ozone"],
    seoTitle: "Veterinary Solutions | OSANO Pets",
    seoDescription:
      "Explore OSANO solutions for the connected spaces and workflows of professional animal care.",
  },
  {
    ...common,
    id: "oxygen-wellness",
    slug: "oxygen-therapy",
    title: "Oxygen Wellness Use Cases",
    eyebrow: "OSANO Health",
    summary: "Public title and route await claim approval.",
    description: "Internal content structure only. This item is not publicly available.",
    status: "pending",
    world: "health",
    route: null,
    context: "Pending approval.",
    approach: "Pending approval.",
    heroMedia: { kind: "image", label: "Pending Media" },
    relatedProductIds: ["de8-unit", "oxy-mov3", "de8-system", "psa-3000"],
    relatedTechnologyIds: ["oxygen"],
    seoTitle: "Pending",
    seoDescription: "Pending approval.",
  },
  {
    ...common,
    id: "hydrogen-wellness",
    slug: "hydrogen-therapy",
    title: "Hydrogen Wellness Use Cases",
    eyebrow: "OSANO Health",
    summary: "Public title and route await claim approval.",
    description: "Internal content structure only. This item is not publicly available.",
    status: "pending",
    world: "health",
    route: null,
    context: "Pending approval.",
    approach: "Pending approval.",
    heroMedia: { kind: "image", label: "Pending Media" },
    relatedProductIds: ["hydrogen-hotpot"],
    relatedTechnologyIds: ["hydrogen"],
    seoTitle: "Pending",
    seoDescription: "Pending approval.",
  },
  {
    ...common,
    id: "qrs",
    slug: "qrs",
    title: "QRS",
    eyebrow: "Pending route",
    summary: "No approved sub-page exists in the current sitemap.",
    description: "Internal record only. Product detail and route are pending.",
    status: "pending",
    world: "health",
    route: null,
    context: "Pending approval.",
    approach: "Pending approval.",
    heroMedia: { kind: "image", label: "Pending Media" },
    relatedProductIds: [],
    relatedTechnologyIds: [],
    seoTitle: "Pending",
    seoDescription: "Pending approval.",
  },
];

export const publishedSolutions = solutions.filter(
  (solution) => solution.status === "published",
);

export const getSolution = (world: string, slug: string) =>
  publishedSolutions.find(
    (solution) => solution.world === world && solution.slug === slug,
  );
