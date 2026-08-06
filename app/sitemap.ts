import type { MetadataRoute } from "next";
import { publishedRoutes } from "@/data/routes";
import { absoluteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publishedRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
