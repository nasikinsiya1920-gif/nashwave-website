"use client";

import { useSearchParams } from "next/navigation";
import Contact from "./Contact";

/** Reads ?service=<slug> (or several, comma-separated) from the URL and pre-selects them in the contact form. */
export default function ContactFromParams() {
  const param = useSearchParams().get("service") ?? "";
  const slugs = param.split(",").map((s) => s.trim()).filter(Boolean);
  // `key` remounts the form if the query changes, so the pre-selected services update.
  return <Contact key={param || "none"} asPage serviceSlugs={slugs} />;
}
