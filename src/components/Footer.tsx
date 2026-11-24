import Link from "next/link";
import { contactPeople, contacts, footerNav as copy, routes, services, site } from "@/lib/content";
import FooterLogo from "./FooterLogo";
import { SocialLinks } from "./ui";

/**
 * Site footer: the big looping logo, then the links. On screens tall enough to show all of it,
 * the page above lifts away like a curtain to reveal it (see FooterLogo and globals.css).
 */
export default function Footer() {
  return (
    <footer className="site-footer bg-sand px-5 pb-10 pt-12 text-ink md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <FooterLogo />
        <div className="grid gap-10 border-b border-plum/15 pb-10 pt-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_.8fr_1fr]">
          <div>
            <p className="max-w-xs text-sm leading-6 text-ink/55">{copy.blurb}</p>
          </div>
          <div className="footer-col">
            <b>{copy.servicesTitle}</b>
            {services.map((s) => (
              <Link key={s.slug} href={routes.service(s.slug)}>
                {s.title}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <b>{copy.companyTitle}</b>
            {copy.company.map(({ name, href }) => (
              <Link key={name} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <b>{copy.connectTitle}</b>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {contacts.map((person) => (
              <div key={person.tel} className="mt-5">
                <span className="block text-xs font-semibold text-ink/75">{person.name}</span>
                <span className="block text-[9px] font-bold uppercase tracking-[.16em] text-plum/65">
                  {person.role}
                </span>
                <a
                  href={`tel:${person.tel}`}
                  aria-label={`${contactPeople.callLabel} ${person.name}`}
                  className="!mt-1"
                >
                  {person.phone}
                </a>
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`${contactPeople.emailLabel} ${person.name}`}
                  className="!mt-1"
                >
                  {person.email}
                </a>
              </div>
            ))}
            <SocialLinks />
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-[9px] font-bold uppercase tracking-[.16em] text-ink/35 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {copy.rights}
          </span>
          <span className="flex gap-2">
            <Link href={routes.privacy} className="hover:text-plum">
              {copy.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={routes.terms} className="hover:text-plum">
              {copy.terms}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
