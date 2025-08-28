import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ProductSlider from "@/components/sections/product-slider";
import Features from "@/components/sections/features";
import Pricing from "@/components/sections/pricing";
import About from "@/components/sections/about";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductSlider />
        <Features />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
