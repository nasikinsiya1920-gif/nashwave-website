import Image from "next/image";
import Link from "next/link";
import { footerNav as copy, routes, services, site, ui } from "@/lib/content";
import { SocialLinks } from "./ui";

export default function Footer() {
  return (
    <footer className="bg-sand px-5 py-14 text-ink md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 border-b border-plum/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_.8fr_1fr]">
          <div>
            <Link href={routes.home} aria-label={ui.homeLogoLabel} className="inline-block">
              <Image
                src="/assets/nashwave-logo-purple.svg"
                unoptimized
                alt="Nashwave"
                width={1200}
                height={334}
                className="h-auto w-[150px]"
              />
            </Link>
            <p className="mt-5 max-w-xs text-xs leading-5 text-ink/50">{copy.blurb}</p>
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
            {site.phone && site.phoneTel && <a href={`tel:${site.phoneTel}`}>{site.phone}</a>}
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
