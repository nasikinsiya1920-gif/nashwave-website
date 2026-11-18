import Header from "@/components/Header";
import MorphLogo from "@/components/MorphLogo";
import Hero from "@/components/Hero";
import Tagline from "@/components/Tagline";
import Showreel from "@/components/Showreel";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="overflow-hidden bg-sand text-ink">
        <Header />
        <MorphLogo />
        <Hero />
        <Tagline />
        <Showreel />
        <About />
        <Services />
        <WhyUs />
        <Approach />
        <Clients />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
