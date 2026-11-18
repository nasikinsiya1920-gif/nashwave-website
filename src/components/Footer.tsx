import Image from "next/image";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-sand px-5 py-14 text-ink md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 border-b border-plum/15 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/assets/nashwave-logo-purple.svg"
              unoptimized
              alt="Nashwave"
              width={1200}
              height={334}
              className="h-auto w-[150px]"
            />
            <p className="mt-5 max-w-xs text-xs leading-5 text-ink/50">
              Media, marketing and digital solutions that turn change into momentum.
            </p>
          </div>
          <div className="footer-col">
            <b>Services</b>
            <a href="#services">Brand &amp; Creative</a>
            <a href="#services">Media &amp; Content</a>
            <a href="#services">Digital Marketing</a>
          </div>
          <div className="footer-col">
            <b>Company</b>
            <a href="#about">About</a>
            <a href="#approach">Approach</a>
            <a href="#work">Work</a>
          </div>
          <div className="footer-col">
            <b>Connect</b>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.social.linkedin}>LinkedIn</a>
            <a href={site.social.instagram}>Instagram</a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-[9px] font-bold uppercase tracking-[.16em] text-ink/35 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Nashwave. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
