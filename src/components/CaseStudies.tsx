import Image from "next/image";
import Link from "next/link";
import { caseStudies, caseStudiesSection as copy, getService, routes } from "@/lib/content";
import { Label, PAGE_TOP, Title } from "./ui";

/** Case-study grid for /work. Shows a "coming soon" panel while `caseStudies` in content.ts is empty. */
export default function CaseStudies({ asPage = false }: { asPage?: boolean }) {
  return (
    <section className={`bg-sand px-5 py-24 md:px-10 lg:px-16 lg:py-36 ${asPage ? PAGE_TOP : ""}`}>
      <div className="mx-auto max-w-[1400px]">
        <Label>{copy.label}</Label>
        <Title asPage={asPage} className="display-title mb-16">
          {copy.title}
        </Title>

        {caseStudies.length === 0 ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-plum/30 bg-white px-8 py-16 md:px-14 md:py-20">
            <Image
              src="/assets/nashwave-wave-mark.svg"
              unoptimized
              alt=""
              width={381}
              height={181}
              className="pointer-events-none absolute -bottom-8 -right-10 h-auto w-64 opacity-[0.08] md:w-96"
            />
            <div className="relative max-w-2xl">
              <p className="text-3xl font-semibold leading-[1.05] tracking-[-.04em] md:text-5xl">
                {copy.emptyTitle}
              </p>
              <p className="mt-5 text-base leading-7 text-ink/58">{copy.emptyCopy}</p>
              <Link href={routes.contact} className="btn-accent mt-10">
                {copy.emptyCta}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((study) => {
              const service = getService(study.service);
              const body = (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Image
                      src={study.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-6">
                    <span className="text-[10px] font-bold uppercase tracking-[.2em] text-coral">
                      {study.client}
                      {service && ` · ${service.title}`}
                    </span>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{study.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/58">{study.summary}</p>
                    {study.href && (
                      <span className="mt-5 inline-block text-[10px] font-bold uppercase tracking-[.18em] text-plum">
                        {copy.readMore}
                      </span>
                    )}
                  </div>
                </>
              );
              return (
                <article key={study.title} className="group">
                  {study.href ? <Link href={study.href}>{body}</Link> : body}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
