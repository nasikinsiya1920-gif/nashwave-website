import About from "@/components/About";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import Hero from "@/components/Hero";
import MorphLogo from "@/components/MorphLogo";
import Services from "@/components/Services";
import Showreel from "@/components/Showreel";
import Tagline from "@/components/Tagline";
import WhyUs from "@/components/WhyUs";

// Homepage. CTAs here scroll to the on-page #contact section; other pages link to /contact.
export default function Home() {
  return (
    <main className="overflow-hidden bg-sand text-ink">
      <MorphLogo />
      <Hero />
      <Tagline />
      <Showreel />
      <About />
      <Services showAllLink />
      <WhyUs count={3} />
      <Approach ctaHref="#contact" />
      {/* "Brands that chose to move with us" (ClientLogos + Testimonials) is hidden on the homepage
          until real clients are available. It is still shown on /work. */}
      <Contact />
      <FinalCta ctaHref="#contact" />
    </main>
  );
}
