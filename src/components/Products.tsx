import Image from "next/image";
import {
  getService,
  liveProductCategories as categories,
  productsPage as copy,
  routes,
  type ProductCategory,
  type ProductItem,
} from "@/lib/content";
import Reveal from "./Reveal";
import { Label, LinkArrow, PAGE_TOP, Title } from "./ui";

/**
 * /products: what we've built and run, one section per service area (content: productCategories in
 * content.ts). Categories without items are hidden, including from the "Jump to" links.
 * Layouts: "showcase" (browser + phone mockups), "profiles" (social profile cards), "gallery" (brand images).
 */
export default function Products() {
  return (
    <>
      <section className={`px-5 pb-16 md:px-10 lg:px-16 lg:pb-24 ${PAGE_TOP}`}>
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <Label>{copy.label}</Label>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <Title asPage className="display-title services-title">
              {copy.title.map((line, i) => (
                <Reveal key={line} as="span" variant="line" delay={i * 110}>
                  {line}
                </Reveal>
              ))}
            </Title>
            <Reveal as="p" delay={260} className="max-w-sm text-base leading-7 text-ink/58 lg:pb-2">
              {copy.intro}
            </Reveal>
          </div>
          {categories.length > 1 && (
            <Reveal delay={360} className="mt-12">
              <nav aria-label={copy.jumpLabel} className="flex flex-wrap items-center gap-3">
                <span className="mr-2 text-[10px] font-bold uppercase tracking-[.2em] text-ink/45">
                  {copy.jumpLabel}
                </span>
                {categories.map((c) => (
                  <a key={c.id} href={`#${c.id}`} className="product-chip">
                    {c.title}
                  </a>
                ))}
              </nav>
            </Reveal>
          )}
        </div>
      </section>

      {categories.map((category, i) => (
        <CategorySection key={category.id} category={category} number={i + 1} />
      ))}
    </>
  );
}

function CategorySection({ category, number }: { category: ProductCategory; number: number }) {
  const service = getService(category.service);
  return (
    <section
      id={category.id}
      className={`scroll-mt-20 border-t border-plum/15 px-5 py-20 md:px-10 lg:px-16 lg:py-28 ${
        number % 2 === 0 ? "bg-sand-deep" : "bg-sand"
      }`}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <Reveal as="span" className="text-[11px] font-bold tracking-[.2em] text-coral">
              {String(number).padStart(2, "0")}
            </Reveal>
            <h2 className="product-category-title mt-3">
              <Reveal as="span" variant="line">
                {category.title}
              </Reveal>
            </h2>
            <Reveal as="p" delay={150} className="mt-5 max-w-xl text-base leading-7 text-ink/60">
              {category.intro}
            </Reveal>
          </div>
          {service && (
            <Reveal delay={220} className="lg:pb-2">
              <LinkArrow href={routes.service(service.slug)}>
                {copy.serviceLink}: {service.title}
              </LinkArrow>
            </Reveal>
          )}
        </div>

        {category.layout === "showcase" && (
          <div className="grid gap-20 lg:gap-28">
            {category.items.map((item, i) => (
              // Alternate sides across the whole page, not only within one category.
              <Showcase key={item.name} item={item} flip={(number + i) % 2 === 0} />
            ))}
          </div>
        )}
        {category.layout === "profiles" && (
          <div className="grid gap-8 md:grid-cols-2">
            {category.items.map((item, i) => (
              <Profile key={item.name} item={item} delay={(i % 2) * 120} />
            ))}
          </div>
        )}
        {category.layout === "gallery" && (
          <div className="grid gap-20">
            {category.items.map((item) => (
              <Gallery key={item.name} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Name, address, description, tags and buttons — shared by every layout. */
function Details({ item, external = true }: { item: ProductItem; external?: boolean }) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <div>
      <h3 className="text-3xl font-semibold leading-none tracking-[-.04em] md:text-4xl">{item.name}</h3>
      {item.url && (
        <a
          href={item.url}
          {...ext}
          className="mt-3 inline-block text-sm font-semibold text-plum underline-offset-4 hover:underline"
        >
          {item.urlLabel} <span aria-hidden="true">↗</span>
        </a>
      )}
      <p className="mt-5 max-w-lg text-base leading-7 text-ink/65">{item.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li key={tag} className="product-tag">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        {item.url && (
          <a href={item.url} {...ext} className="btn-accent">
            {item.visitLabel ?? `${copy.visit} ${item.urlLabel}`}
          </a>
        )}
        {item.ctas?.map((cta) => (
          <a key={cta.label} href={cta.href} {...ext} className="btn-outline-dark">
            {cta.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/** Website / web app: desktop screenshot in a browser frame with the phone view overlapping it. */
function Showcase({ item, flip }: { item: ProductItem; flip: boolean }) {
  return (
    <article className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <Reveal className={`product-mockup ${flip ? "lg:order-2" : ""}`}>
        {item.images.desktop && (
          <div className="browser-frame">
            <div className="browser-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <b>{item.urlLabel}</b>
            </div>
            <Image
              src={item.images.desktop}
              alt={`${item.name} website on desktop`}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        )}
        {item.images.phone && (
          <div className="phone-frame">
            <Image
              src={item.images.phone}
              alt={`${item.name} on a phone`}
              width={585}
              height={996}
              sizes="(min-width: 1024px) 200px, 34vw"
              className="block h-auto w-full"
            />
          </div>
        )}
      </Reveal>
      <Reveal delay={150} className={flip ? "lg:order-1" : ""}>
        <Details item={item} />
      </Reveal>
    </article>
  );
}

/** Social page: profile screenshot in a phone frame next to the details. */
function Profile({ item, delay }: { item: ProductItem; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="grid h-full items-center gap-8 rounded-[2rem] border border-plum/15 bg-white/60 p-6 sm:grid-cols-[180px_1fr] md:p-8">
        {item.images.phone && (
          <div className="phone-frame phone-frame--static">
            <Image
              src={item.images.phone}
              alt={`${item.name} Instagram profile`}
              width={585}
              height={996}
              sizes="180px"
              className="block h-auto w-full"
            />
          </div>
        )}
        <Details item={item} />
      </article>
    </Reveal>
  );
}

/** Branding project: details, then pages from the brand guideline. */
function Gallery({ item }: { item: ProductItem }) {
  return (
    <article>
      <Reveal>
        <Details item={item} />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {item.images.gallery?.map((src, i) => (
          <Reveal key={src} delay={(i % 2) * 120}>
            <Image
              src={src}
              alt={`${item.name} ${copy.gallerySuffix}, page ${i + 1}`}
              width={1440}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="block h-auto w-full rounded-[1.5rem] border border-plum/10"
            />
          </Reveal>
        ))}
      </div>
    </article>
  );
}
