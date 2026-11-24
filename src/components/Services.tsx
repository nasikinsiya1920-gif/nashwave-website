import Link from "next/link";
import { routes, services, servicesSection, ui, type Service } from "@/lib/content";
import Reveal from "./Reveal";
import { Label, LinkArrow, PAGE_TOP, Title } from "./ui";

/**
 * Grid of service cards, each linking to its detail page.
 * Homepage: all 6 + "Explore all services". /services: all 6 as the page opener.
 * Service detail: the other 5 under a different heading.
 * The title can be one string or an array of lines (each line stays on one line). Text and cards
 * reveal as they scroll into view.
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
  title?: string | readonly string[];
  intro?: string | null;
  showAllLink?: boolean;
  asPage?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-24 md:px-10 lg:px-16 lg:py-36 ${asPage ? PAGE_TOP : ""} ${className}`}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <Label>{label}</Label>
        </Reveal>
        <div className="mb-12 grid gap-6 lg:mb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <Title asPage={asPage} className="display-title services-title">
            {(typeof title === "string" ? [title] : title).map((line, i) => (
              <Reveal key={line} as="span" variant="line" delay={i * 110}>
                {line}
              </Reveal>
            ))}
          </Title>
          {intro && (
            <Reveal as="p" delay={260} className="max-w-sm text-base leading-7 text-ink/58 lg:pb-2">
              {intro}
            </Reveal>
          )}
        </div>
        <div className="grid border-l border-t border-plum/15 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ slug, number, title: serviceTitle, copy }, i) => (
            <Reveal key={slug} delay={(i % 3) * 90} className="flex">
              <article className="service-card group w-full">
                <span className="text-[10px] font-bold tracking-[.2em] text-coral">{number}</span>
                <div>
                  <h3>{serviceTitle}</h3>
                  <p>{copy}</p>
                  <Link href={routes.service(slug)} aria-label={`${ui.learnMoreLabel} ${serviceTitle}`}>
                    {ui.learnMore}
                  </Link>
                </div>
              </article>
            </Reveal>
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
