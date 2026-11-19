import CaseStudies from "@/components/CaseStudies";
import ClientLogos from "@/components/ClientLogos";
import FinalCta from "@/components/FinalCta";
import Showreel from "@/components/Showreel";
import Testimonials from "@/components/Testimonials";
import { pageMeta, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.work, path: routes.work });

export default function WorkPage() {
  return (
    <main className="overflow-hidden bg-sand text-ink">
      <Showreel asPage />
      <CaseStudies />
      <ClientLogos />
      <Testimonials className="border-b border-plum/15 py-24 lg:py-32" />
      <FinalCta />
    </main>
  );
}
