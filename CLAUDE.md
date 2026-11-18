# CLAUDE.md

Marketing site for Nashwave (nashwave.tech) — media marketing & digital solutions. Tagline: "Turn the Tide. Move the Business."

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), deployed on Netlify from GitHub.
- Single page (`src/app/page.tsx`) composed of section components in `src/components/`.
- Fonts via `next/font/google`: DM Sans (body, `--font-dm-sans`) and Sora 800 (hero wordmark, `--font-sora`).

## Conventions
- Copy lives in `src/lib/content.ts`; components only handle layout.
- Use the theme tokens from `globals.css` (`plum`, `coral`, `coral-soft`, `ink`, `sand`, `sand-deep`, `deep`, `teal`) — no new hard-coded hex values.
- Bespoke styles/animations (service cards, kinetic icons, marquee, cursors, morph logo) are plain CSS classes in `globals.css`.
- Images via `next/image`; SVGs use `unoptimized`.
- Client components (`"use client"`) only where there is state or pointer/scroll logic: Header, MorphLogo, Hero, Tagline, Showreel, Clients, Contact.
- Contact form posts to Netlify Forms via `/__forms.html`; keep `public/__forms.html` fields in sync with `Contact.tsx`.
- Always run `npm run build` before pushing.
