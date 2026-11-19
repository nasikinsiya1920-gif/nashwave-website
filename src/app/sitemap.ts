import type { MetadataRoute } from "next";
import { routes, services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    page(routes.home, 1),
    page(routes.about, 0.8),
    page(routes.services, 0.9),
    ...services.map((s) => page(routes.service(s.slug), 0.8)),
    page(routes.work, 0.7),
    page(routes.contact, 0.8),
    page(routes.privacy, 0.2),
    page(routes.terms, 0.2),
  ];
}
