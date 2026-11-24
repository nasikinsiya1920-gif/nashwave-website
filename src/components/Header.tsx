"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, routes, ui } from "@/lib/content";
import { MENU_EVENT } from "@/lib/events";

/**
 * Site header. On the homepage the logo is the scroll-morphing <MorphLogo /> (rendered by the page),
 * so the header leaves that slot empty; every other page gets a static white logo linking home.
 */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === routes.home;
  const [menu, setMenu] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenu(false), [pathname]);

  // While the menu is open: tell the homepage logo (it docks into the bar instead of floating over
  // the menu), stop the page behind it from scrolling, and close it on Escape or a desktop-width resize.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: menu }));
    if (!menu) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setMenu(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menu]);

  const isActive = (match: string | null) => match !== null && (pathname === match || pathname.startsWith(`${match}/`));

  const links = [...navLinks, { name: ui.mobileContact, href: routes.contact, match: routes.contact }];

  // The mobile menu sits next to (not inside) <header>: the header's backdrop blur would otherwise
  // make the menu's "fixed" positioning relative to the 76px bar instead of the screen.
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-deep/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between gap-10 px-5 md:px-10">
          {isHome ? (
            <span aria-hidden="true" />
          ) : (
            <Link href={routes.home} aria-label={ui.homeLogoLabel} className="block w-[112px] sm:w-[136px]">
              <Image
                src="/assets/nashwave-logo-white.svg"
                unoptimized
                priority
                alt="Nashwave"
                width={1200}
                height={334}
                className="h-auto w-full"
              />
            </Link>
          )}
          <div className="flex items-center gap-10">
            <nav aria-label="Main" className="hidden gap-8 lg:flex">
              {navLinks.map(({ name, href, match }) => (
                <Link
                  key={name}
                  href={href}
                  aria-current={isActive(match) ? "page" : undefined}
                  className={`nav-link ${isActive(match) ? "is-active" : ""}`}
                >
                  {name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link href={routes.contact} className="btn-accent hidden sm:inline-flex">
                {ui.startProject}
              </Link>
              <button
                type="button"
                aria-label={ui.toggleNav}
                aria-expanded={menu}
                aria-controls="mobile-nav"
                onClick={() => setMenu(!menu)}
                className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 lg:hidden"
              >
                <span className="h-px w-4 bg-white" />
                <span className="h-px w-4 bg-white" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {menu && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 top-[76px] z-50 overflow-y-auto overscroll-contain border-t border-white/10 bg-deep px-5 py-5 lg:hidden"
        >
          {links.map(({ name, href, match }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setMenu(false)}
              aria-current={isActive(match) ? "page" : undefined}
              className={`block border-b border-white/10 py-4 text-2xl font-semibold ${
                isActive(match) ? "text-coral-soft" : "text-white"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
