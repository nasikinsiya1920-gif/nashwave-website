// Small shared building blocks used across sections.

export function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "text-white/55" : "text-plum/65"}`}>
      <span className={light ? "bg-coral" : "bg-plum"} />
      {children}
    </div>
  );
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
    <a href={href} className={`arrow-link ${light ? "text-white" : "text-plum"}`}>
      {children}
      <b aria-hidden="true">→</b>
    </a>
  );
}

export function KineticIcon({ type }: { type: number }) {
  return (
    <div className={`kinetic-icon kinetic-icon--${type + 1}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
