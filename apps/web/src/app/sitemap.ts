import type { MetadataRoute } from "next";
import { CATALOGUE_PRODUCTS, CATALOGUE_FAMILIES } from "@/features/catalogue-registry";

const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rosamedical.example").replace(/\/$/, "");
const updated = new Date("2026-08-06T00:00:00.000Z");

function localizedEntries(path: string, priority: number): MetadataRoute.Sitemap {
  const english = path === "/" ? "" : path;
  const arabic = path === "/" ? "/ar" : `/ar${path}`;
  return [
    { url: `${origin}${english || "/"}`, lastModified: updated, changeFrequency: "weekly", priority },
    { url: `${origin}${arabic}`, lastModified: updated, changeFrequency: "weekly", priority: Math.max(0.5, priority - 0.1) }
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/products", "/catalogues", "/about", "/procurement-support", "/contact", "/search", "/privacy", "/terms"];
  return [
    ...staticPaths.flatMap((path) => localizedEntries(path, path === "/" ? 1 : 0.8)),
    ...CATALOGUE_FAMILIES.flatMap((family) => localizedEntries(`/products/${family.slug}`, 0.8)),
    ...CATALOGUE_PRODUCTS.flatMap((product) => localizedEntries(`/products/${product.familySlug}/${product.slug}`, 0.7))
  ];
}
