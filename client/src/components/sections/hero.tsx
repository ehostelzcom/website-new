import { Button } from "@/components/ui/button";
import RequestDemoModal from "@/components/ui/request-demo-modal";
import ProductSlider from "@/components/sections/product-slider";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-5"></div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="hero-title">
            Smart Hostel Management
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Made Simple
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
            Manage multiple hostels, students, fees, and reports from one powerful platform. 
            Save time with automation and boost your hostel operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4" data-testid="button-start-trial">
              Start Free Trial
            </Button>
            <RequestDemoModal>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" data-testid="button-request-demo">
                Request Demo
              </Button>
            </RequestDemoModal>
          </div>
        </div>
      </div>
      
      {/* Product Slider Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="slider-title">
              See EHostelz in Action
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="slider-subtitle">
              Explore our powerful features through real screenshots
            </p>
          </div>
          <ProductSlider />
        </div>
      </div>
    </section>
  );
}
