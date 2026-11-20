import CaseStudies from "@/components/CaseStudies";
import ClientLogos from "@/components/ClientLogos";
import FinalCta from "@/components/FinalCta";
import Testimonials from "@/components/Testimonials";
import { pageMeta, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.work, path: routes.work });

export default function WorkPage() {
  return (
    <main className="overflow-hidden bg-sand text-ink">
      {/* "See the work move" showreel is hidden for now. To bring it back, import Showreel and
          render <Showreel asPage /> here, then change CaseStudies back to <CaseStudies />. */}
      <CaseStudies asPage />
      <ClientLogos />
      <Testimonials className="border-b border-plum/15 py-24 lg:py-32" />
      <FinalCta />
    </main>
  );
}
