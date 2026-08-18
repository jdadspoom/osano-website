import { products } from "./products";
import { publishedSolutions } from "./solutions";
import { technologies } from "./technologies";
import { worlds } from "./worlds";

export const publishedRoutes = [
  "/",
  "/about",
  "/solutions",
  "/technology",
  "/stories",
  "/community",
  "/contact",
  "/privacy",
  ...worlds.map((world) => `/solutions/${world.slug}`),
  ...publishedSolutions.flatMap((solution) =>
    solution.route ? [solution.route] : [],
  ),
  ...technologies.map((technology) => `/technology/${technology.slug}`),
  ...products.map((product) => `/products/${product.slug}`),
];

export const pendingRouteCandidates = [
  "/solutions/health/oxygen-therapy",
  "/solutions/health/hydrogen-therapy",
  "/products/qrs",
];
