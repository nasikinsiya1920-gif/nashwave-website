// ⚠️ LEGAL REVIEW REQUIRED before launch — see LegalPage.tsx and `legal` / `privacyPage` in content.ts.
import LegalPage from "@/components/LegalPage";
import { pageMeta, privacyPage, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.privacy, path: routes.privacy });

export default function PrivacyPage() {
  return <LegalPage {...privacyPage} />;
}
