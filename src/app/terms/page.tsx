// ⚠️ LEGAL REVIEW REQUIRED before launch — see LegalPage.tsx and `legal` / `termsPage` in content.ts.
import LegalPage from "@/components/LegalPage";
import { pageMeta, routes, termsPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.terms, path: routes.terms });

export default function TermsPage() {
  return <LegalPage {...termsPage} />;
}
