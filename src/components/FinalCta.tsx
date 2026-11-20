import Image from "next/image";
import Link from "next/link";
import { contactPeople, contacts, finalCtaSection as copy, firstName, routes, site } from "@/lib/content";
import { Label } from "./ui";

/** Closing call to action. The homepage passes "#contact"; other pages link to /contact (or a pre-filled variant). */
export default function FinalCta({
  ctaHref = routes.contact,
  ctaText = copy.cta,
}: {
  ctaHref?: string;
  ctaText?: string;
}) {
  return (
    <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-deep px-5 py-24 text-center text-white">
      <Image src="/assets/nashwave-ocean.jpg" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-[#0A3842]/60 to-plum/70" />
      <div className="relative max-w-5xl">
        <div className="flex justify-center">
          <Label light>{copy.label}</Label>
        </div>
        <h2 className="display-title">
          {copy.titleLine1}
          <br />
          <span className="text-coral-soft">{copy.titleLine2}</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-white/60">{copy.intro}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link href={ctaHref} className="btn-accent">
            {ctaText}
          </Link>
          <a href={`mailto:${site.email}`} className="text-xs text-white/70">
            {copy.emailPrefix} {site.email}
          </a>
        </div>
        <p className="mt-4 text-xs text-white/55">
          {contactPeople.ctaPrefix}{" "}
          {contacts.map((person, i) => (
            <span key={person.tel}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <a
                href={`tel:${person.tel}`}
                aria-label={`${contactPeople.callLabel} ${person.name}`}
                className="inline-block py-2 text-white/80 underline decoration-white/30 underline-offset-4 hover:text-coral-soft"
              >
                {firstName(person)}
              </a>
            </span>
          ))}
        </p>
        <p className="mt-20 text-[10px] font-bold uppercase tracking-[.25em] text-white/35">{site.tagline}</p>
      </div>
    </section>
  );
}
