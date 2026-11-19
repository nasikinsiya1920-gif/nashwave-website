// Small shared building blocks used across sections.
import Link from "next/link";
import { routes, socialLinks, ui } from "@/lib/content";

/** Extra top padding for a section that opens a page, so it clears the fixed 76px header. */
export const PAGE_TOP = "pt-40 lg:pt-48";

export function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "text-white/55" : "text-plum/65"}`}>
      <span className={light ? "bg-coral" : "bg-plum"} />
      {children}
    </div>
  );
}

/** Section heading: an h1 when the section opens a page, otherwise an h2. */
export function Title({
  asPage = false,
  className = "display-title",
  children,
}: {
  asPage?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = asPage ? "h1" : "h2";
  return <Tag className={className}>{children}</Tag>;
}

export function LinkArrow({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`arrow-link ${light ? "text-white" : "text-plum"}`}>
      {children}
      <b aria-hidden="true">→</b>
    </Link>
  );
}

export function KineticIcon({ type }: { type: number }) {
  // The CSS defines three icon animations; further cards reuse them in order.
  return (
    <div className={`kinetic-icon kinetic-icon--${(type % 3) + 1}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

/** Social profile links. Empty URLs in content.ts are filtered out, so nothing renders until they're set. */
export function SocialLinks({ className = "" }: { className?: string }) {
  if (socialLinks.length === 0) return null;
  return (
    <div className={className}>
      {socialLinks.map(({ name, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ))}
    </div>
  );
}

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label={ui.breadcrumbLabel} className="breadcrumbs">
      <ol>
        <li>
          <Link href={routes.home}>{ui.breadcrumbHome}</Link>
        </li>
        <li>
          <Link href={routes.services}>{ui.breadcrumbServices}</Link>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function PlaceholderTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1 text-[9px] font-bold uppercase tracking-[.16em] ${
        light ? "border-white/35 text-white/60" : "border-plum/35 text-plum/70"
      }`}
    >
      {ui.placeholderTag} · {children}
    </span>
  );
}
