import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TopSlider from "@/components/sections/top-slider";
import Hero from "@/components/sections/hero";
import FindHostel from "@/components/sections/find-hostel";
import Features from "@/components/sections/features";
import Pricing from "@/components/sections/pricing";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import WhatsAppChat from "@/components/ui/whatsapp-chat";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TopSlider />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FindHostel />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
}
