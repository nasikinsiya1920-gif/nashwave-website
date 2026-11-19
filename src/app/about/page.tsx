import About from "@/components/About";
import Approach from "@/components/Approach";
import FinalCta from "@/components/FinalCta";
import WhyUs from "@/components/WhyUs";
import { pageMeta, reasons, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.about, path: routes.about });

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-sand text-ink">
      <About asPage />
      <WhyUs count={reasons.length} />
      <Approach />
      <FinalCta />
    </main>
  );
}
