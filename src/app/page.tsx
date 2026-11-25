import About from "@/components/About";
import Approach from "@/components/Approach";
import Audience from "@/components/Audience";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import Hero from "@/components/Hero";
import MorphLogo from "@/components/MorphLogo";
import Services from "@/components/Services";
import Tagline from "@/components/Tagline";
import WhyUs from "@/components/WhyUs";

// Homepage. CTAs here scroll to the on-page #contact section; other pages link to /contact.
export default function Home() {
  return (
    <main className="overflow-x-clip bg-sand text-ink">
      <MorphLogo />
      <Hero />
      <Tagline />
      {/* "See the work move" showreel is hidden for now — re-add <Showreel /> here (and its import) to show it. */}
      <About />
      <Services showAllLink />
      <Audience ctaHref="#contact" />
      <WhyUs count={3} />
      <Approach ctaHref="#contact" />
      {/* "Brands that chose to move with us" (ClientLogos + Testimonials) is hidden on the homepage
          until real clients are available (ClientLogos is not used on any page right now). */}
      <Contact />
      <FinalCta ctaHref="#contact" />
    </main>
  );
}
