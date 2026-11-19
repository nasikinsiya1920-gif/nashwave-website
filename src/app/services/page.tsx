import Approach from "@/components/Approach";
import FinalCta from "@/components/FinalCta";
import Services from "@/components/Services";
import { pageMeta, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.services, path: routes.services });

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-sand text-ink">
      <Services asPage />
      <Approach />
      <FinalCta />
    </main>
  );
}
