#!/usr/bin/env node
// Crawls every internal page of a running Nashwave site and checks its links.
//
//   npm run dev            (or: npm run build && npm start)
//   npm run check:links    (defaults to http://localhost:3000; pass another base URL as the first argument)
//
// Fails if any internal link returns a non-2xx status, any href is "#" or empty,
// or any #fragment link points to an id that doesn't exist on the target page.
// Every page listed in sitemap.xml is crawled too, so pages nothing links to are still checked.

const base = new URL(process.argv[2] ?? "http://localhost:3000");
const pages = new Map(); // path -> { status, ids:Set, links:[{href, from}] }
const queue = ["/"];
const problems = [];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

async function fetchPage(path) {
  const res = await fetch(new URL(path, base), { redirect: "manual" });
  const html = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
  // Only real <a href> links (not <link> tags or JSON-LD).
  const links = [...html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map((m) => decode(m[1]));
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  return { status: res.status, links, ids };
}

// Seed with every URL in the sitemap.
try {
  const xml = await (await fetch(new URL("/sitemap.xml", base))).text();
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) queue.push(new URL(loc).pathname);
} catch {
  problems.push("Could not read /sitemap.xml");
}

const fragmentChecks = [];

while (queue.length) {
  const path = queue.shift();
  if (pages.has(path)) continue;
  const page = await fetchPage(path);
  pages.set(path, page);
  if (page.status < 200 || page.status >= 300) continue;

  for (const href of page.links) {
    if (href === "" || href === "#") {
      problems.push(`${path}: link with href="${href}"`);
      continue;
    }
    if (/^(mailto:|tel:)/.test(href)) continue;
    const url = new URL(href, new URL(path, base));
    if (url.origin !== base.origin) continue; // external
    const target = url.pathname;
    if (url.hash) fragmentChecks.push({ from: path, target, id: decodeURIComponent(url.hash.slice(1)), href });
    if (!pages.has(target)) queue.push(target);
  }
}

for (const [path, { status }] of pages) {
  if (status < 200 || status >= 300) problems.push(`${path}: HTTP ${status}`);
}
for (const { from, target, id, href } of fragmentChecks) {
  const page = pages.get(target);
  if (page && page.status === 200 && !page.ids.has(id)) problems.push(`${from}: "${href}" — no element with id="${id}"`);
}

// Unknown routes must return a real 404.
const missing = await fetch(new URL("/this-page-does-not-exist", base));
if (missing.status !== 404) problems.push(`Unknown URL returned HTTP ${missing.status}, expected 404`);
const missingService = await fetch(new URL("/services/not-a-service", base));
if (missingService.status !== 404) problems.push(`Unknown service returned HTTP ${missingService.status}, expected 404`);

console.log(`Checked ${pages.size} pages on ${base.origin}:`);
for (const [path, { status, links }] of [...pages].sort()) console.log(`  ${status}  ${path}  (${links.length} links)`);

if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):`);
  for (const p of [...new Set(problems)]) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("\n✓ No broken internal links, no href=\"#\", all #anchors exist, unknown URLs return 404.");
