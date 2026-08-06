import { navigation } from "../data/navigation.ts";
import { products } from "../data/products.ts";
import { solutions, publishedSolutions } from "../data/solutions.ts";
import { technologies } from "../data/technologies.ts";
import { worlds } from "../data/worlds.ts";

const errors = [];

const publishedRoutes = [
  "/",
  "/about",
  "/solutions",
  "/technology",
  "/stories",
  "/community",
  "/contact",
  ...worlds.map((world) => `/solutions/${world.slug}`),
  ...publishedSolutions.flatMap((solution) =>
    solution.route ? [solution.route] : [],
  ),
  ...technologies.map((technology) => `/technology/${technology.slug}`),
  ...products.map((product) => `/products/${product.slug}`),
];

const pendingRouteCandidates = [
  "/solutions/health/oxygen-therapy",
  "/solutions/health/hydrogen-therapy",
  "/products/qrs",
];

function assertUnique(label, values) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) {
    errors.push(`${label} contains duplicates: ${[...new Set(duplicates)].join(", ")}`);
  }
}

function checkReferences(owner, ids, validIds, referenceType) {
  for (const id of ids) {
    if (!validIds.has(id)) {
      errors.push(`${owner} references unknown ${referenceType} ID: ${id}`);
    }
  }
}

assertUnique("World IDs", worlds.map((item) => item.id));
assertUnique("World slugs", worlds.map((item) => item.slug));
assertUnique("Solution IDs", solutions.map((item) => item.id));
assertUnique("Solution slugs", solutions.map((item) => item.slug));
assertUnique("Product IDs", products.map((item) => item.id));
assertUnique("Product slugs", products.map((item) => item.slug));
assertUnique("Technology IDs", technologies.map((item) => item.id));
assertUnique("Technology slugs", technologies.map((item) => item.slug));
assertUnique("Published routes", publishedRoutes);

const solutionIds = new Set(solutions.map((item) => item.id));
const productIds = new Set(products.map((item) => item.id));
const technologyIds = new Set(technologies.map((item) => item.id));

for (const item of [...solutions, ...products, ...technologies, ...worlds]) {
  checkReferences(item.id, item.relatedSolutionIds, solutionIds, "solution");
  checkReferences(item.id, item.relatedProductIds, productIds, "product");
  checkReferences(item.id, item.relatedTechnologyIds, technologyIds, "technology");
}

for (const item of navigation) {
  if (!publishedRoutes.includes(item.href)) {
    errors.push(`Navigation links to a route outside the published inventory: ${item.href}`);
  }
}

for (const item of solutions.filter((solution) => solution.status !== "published")) {
  if (item.route !== null) {
    errors.push(`Non-published solution ${item.id} must not expose a route.`);
  }
}

for (const route of pendingRouteCandidates) {
  if (publishedRoutes.includes(route)) {
    errors.push(`Pending route is present in the public route inventory: ${route}`);
  }
  if (navigation.some((item) => item.href === route)) {
    errors.push(`Pending route is present in navigation: ${route}`);
  }
}

if (errors.length) {
  console.error("OSANO content validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `OSANO content validation passed: ${publishedRoutes.length} published routes, ${products.length} products, ${solutions.length} solution records and ${technologies.length} technologies.`,
);
