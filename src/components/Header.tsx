"use client";

import { useState } from "react";
import { navLinks } from "@/lib/content";

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-deep/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-end gap-10 px-5 md:px-10">
        <nav aria-label="Main" className="hidden gap-8 lg:flex">
          {navLinks.map(({ name, href }) => (
            <a key={name} href={href} className="nav-link">
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-accent hidden sm:inline-flex">
            Start a project
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
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
      {menu && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/10 bg-deep px-5 py-5 lg:hidden"
        >
          {[...navLinks, { name: "Contact", href: "#contact" }].map(({ name, href }) => (
            <a
              key={name}
              href={href}
              onClick={() => setMenu(false)}
              className="block border-b border-white/10 py-4 text-2xl font-semibold text-white"
            >
              {name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
