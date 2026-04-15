import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const paths: {
    path: string;
    priority: number;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  }[] = [
      { path: "/", priority: 1, changeFrequency: "weekly" },
      { path: "/products", priority: 0.85, changeFrequency: "monthly" },
      { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
      { path: "/how-it-works", priority: 0.85, changeFrequency: "monthly" },
      { path: "/about", priority: 0.75, changeFrequency: "monthly" },
      { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
      { path: "/rental", priority: 0.9, changeFrequency: "weekly" },
      { path: "/faq", priority: 0.75, changeFrequency: "monthly" },
      { path: "/legal/privacy", priority: 0.5, changeFrequency: "yearly" },
      { path: "/legal/terms", priority: 0.5, changeFrequency: "yearly" },
      { path: "/legal/renter-agreement", priority: 0.6, changeFrequency: "yearly" },
    ];

  const now = new Date();

  return paths.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
