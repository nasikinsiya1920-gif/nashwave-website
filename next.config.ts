import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The old Work page was replaced by Products; keep old links and search results working.
    // Old service pages (six services merged into four) point to the service that replaced them.
    const oldServices: Record<string, string> = {
      "brand-creative": "logo-branding",
      "brand-assets-design": "logo-branding",
      "media-content-production": "social-media",
      "social-community": "social-media",
      "websites-digital-products": "websites",
      "web-apps-data-automation": "digital-solutions",
    };
    return [
      { source: "/work", destination: "/products", permanent: true },
      ...Object.entries(oldServices).map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
