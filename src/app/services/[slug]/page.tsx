import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Approach from "@/components/Approach";
import FinalCta from "@/components/FinalCta";
import ServiceHero from "@/components/ServiceHero";
import ServiceIncludes from "@/components/ServiceIncludes";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import { getService, routes, serviceDetail, services, site, ui } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Only the 6 services in content.ts exist; any other slug renders the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.copy, path: routes.service(service.slug) });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.breadcrumbHome, item: site.url },
      { "@type": "ListItem", position: 2, name: ui.breadcrumbServices, item: `${site.url}${routes.services}` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}${routes.service(slug)}` },
    ],
  };

  return (
    <main className="overflow-hidden bg-sand text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceHero service={service} />
      <ServiceIncludes items={service.includes} />
      <Approach ctaHref={routes.contactFor(slug)} />
      <WhyUs count={3} showExtension={false} />
      <Testimonials single startIndex={index} />
      <Services
        id="other-services"
        items={others}
        label={serviceDetail.otherLabel}
        title={serviceDetail.otherTitle}
        intro={null}
        className="border-t border-plum/15"
      />
      <FinalCta ctaHref={routes.contactFor(slug)} ctaText={serviceDetail.ctaLabel} />
    </main>
  );
}
