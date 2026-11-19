import type { Metadata } from "next";
import { site } from "./content";

/** Builds per-page metadata (title, description, canonical URL and share image) from content.ts values. */
export function pageMetadata({
  title,
  description,
  path,
  image = site.shareImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
