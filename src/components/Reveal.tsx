"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades/slides its content into place the first time it scrolls into view.
 * `delay` (ms) staggers neighbours. Styling lives in globals.css (.reveal); with reduced motion,
 * or without JavaScript, the content is simply shown.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
  children,
}: {
  as?: "div" | "span" | "p" | "li";
  delay?: number;
  /** "up": fade + rise. "line": text slides up from behind a mask (heading lines). "pop": subtle rise + scale-up (media). */
  variant?: "up" | "line" | "pop";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = `reveal reveal--${variant} ${inView ? "is-in" : ""} ${className}`;
  const style = { "--reveal-delay": `${delay}ms` } as React.CSSProperties;
  return (
    <Tag ref={ref as React.Ref<never>} className={classes} style={style}>
      {variant === "line" ? <span className="reveal-line-inner">{children}</span> : children}
    </Tag>
  );
}
