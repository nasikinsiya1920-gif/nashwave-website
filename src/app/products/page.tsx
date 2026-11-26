import FinalCta from "@/components/FinalCta";
import Products from "@/components/Products";
import { pageMeta, routes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...pageMeta.products, path: routes.products });

export default function ProductsPage() {
  return (
    <main className="overflow-x-clip bg-sand text-ink">
      <Products />
      <FinalCta />
    </main>
  );
}
