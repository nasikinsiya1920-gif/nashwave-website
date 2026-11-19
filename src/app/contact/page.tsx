import { Suspense } from "react";
import Contact from "@/components/Contact";
import ContactFromParams from "@/components/ContactFromParams";
import { pageMeta, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.contact, path: routes.contact });

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-ink text-white">
      {/* useSearchParams (for ?service=<slug>) must sit inside Suspense so the page can still be pre-rendered. */}
      <Suspense fallback={<Contact asPage />}>
        <ContactFromParams />
      </Suspense>
    </main>
  );
}
