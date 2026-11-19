import Link from "next/link";
import { routes, services, servicesSection, ui, type Service } from "@/lib/content";
import { Label, LinkArrow, PAGE_TOP, Title } from "./ui";

/**
 * Grid of service cards, each linking to its detail page.
 * Homepage: all 6 + "Explore all services". /services: all 6 as the page opener.
 * Service detail: the other 5 under a different heading.
 */
export default function Services({
  items = services,
  label = servicesSection.label,
  title = servicesSection.title,
  intro = servicesSection.intro,
  showAllLink = false,
  asPage = false,
  id = "services",
  className = "",
}: {
  items?: Service[];
  label?: string;
  title?: string;
  intro?: string | null;
  showAllLink?: boolean;
  asPage?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`px-5 py-24 md:px-10 lg:px-16 lg:py-36 ${asPage ? PAGE_TOP : ""} ${className}`}
    >
      <div className="mx-auto max-w-[1400px]">
        <Label>{label}</Label>
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <Title asPage={asPage}>{title}</Title>
          {intro && <p className="max-w-lg self-end text-base leading-7 text-ink/58">{intro}</p>}
        </div>
        <div className="grid border-l border-t border-plum/15 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ slug, number, title: serviceTitle, copy }) => (
            <article key={slug} className="service-card group">
              <span className="text-[10px] font-bold tracking-[.2em] text-coral">{number}</span>
              <div>
                <h3>{serviceTitle}</h3>
                <p>{copy}</p>
                <Link href={routes.service(slug)} aria-label={`${ui.learnMoreLabel} ${serviceTitle}`}>
                  {ui.learnMore}
                </Link>
              </div>
            </article>
          ))}
        </div>
        {showAllLink && (
          <div className="mt-10">
            <LinkArrow href={routes.services}>{servicesSection.allLink}</LinkArrow>
          </div>
        )}
      </div>
    </section>
  );
}
