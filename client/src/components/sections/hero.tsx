import { Button } from "@/components/ui/button";
import RequestDemoModal from "@/components/ui/request-demo-modal";

export default function Hero() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white" data-testid="hero-title">
            Transform Your Hostel Operations with
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Smart Management Solutions
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
            Streamline hostel management with our comprehensive platform. Handle multiple properties, 
            student enrollment, fee collection, and detailed reporting - all from one intuitive dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <RequestDemoModal>
              <Button size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl transform hover:scale-105 transition-all duration-200" data-testid="button-request-demo">
                🚀 Get Started - Request Demo
              </Button>
            </RequestDemoModal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-semibold mb-2">Multi-Hostel Support</h3>
              <p className="text-sm text-muted-foreground">Manage unlimited hostels from one dashboard</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Smart Automation</h3>
              <p className="text-sm text-muted-foreground">Automate fee collection and reporting</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground">Detailed insights and performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
