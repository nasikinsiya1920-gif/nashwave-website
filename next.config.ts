import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The old Work page was replaced by Products; keep old links and search results working.
    return [{ source: "/work", destination: "/products", permanent: true }];
  },
};

export default nextConfig;
