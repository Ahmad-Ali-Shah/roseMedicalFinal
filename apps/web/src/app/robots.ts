import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rosamedical.example").replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/account", "/login", "/forgot-password", "/reset-password"]
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin
  };
}
