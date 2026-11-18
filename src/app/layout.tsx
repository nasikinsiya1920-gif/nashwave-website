import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/assets/nashwave-ocean.jpg", alt: "Nashwave — Turn the Tide. Move the Business." }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/nashwave-ocean.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#061B24",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
