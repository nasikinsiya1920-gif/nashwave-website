import Approach from "@/components/Approach";
import Audience from "@/components/Audience";
import FinalCta from "@/components/FinalCta";
import Services from "@/components/Services";
import { pageMeta, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.services, path: routes.services });

export default function ServicesPage() {
  return (
    <main className="overflow-x-clip bg-sand text-ink">
      <Services asPage />
      <Audience />
      <Approach />
      <FinalCta />
    </main>
  );
}
