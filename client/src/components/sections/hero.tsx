import { Button } from "@/components/ui/button";
import RequestDemoModal from "@/components/ui/request-demo-modal";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-10 text-gray-900 dark:text-white" data-testid="hero-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seamless Hostel Management Solutions
            </span>
          </h1>
          <p className="text-2xl lg:text-3xl xl:text-4xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed" data-testid="hero-subtitle">
            Transform how you manage hostels with our powerful platform. Handle student admissions, room allocations, fee collections, expense tracking, staff management, and detailed reporting - all from one comprehensive dashboard that saves you time and money.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <RequestDemoModal>
              <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full" data-testid="button-request-demo">
                Start Free Demo
              </Button>
            </RequestDemoModal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6 text-center">🏢</div>
              <h3 className="font-bold text-2xl mb-4 text-center text-primary">Multi-Hostel Management</h3>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">Efficiently manage unlimited hostels, rooms, and properties from a single powerful dashboard. Scale your business without complexity.</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-accent/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6 text-center">💰</div>
              <h3 className="font-bold text-2xl mb-4 text-center text-accent">Automated Fee Collection</h3>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">Streamline payment processes with automatic fee calculations, online payments, and instant receipt generation. Never miss a payment again.</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-6xl mb-6 text-center">📊</div>
              <h3 className="font-bold text-2xl mb-4 text-center text-primary">Smart Analytics & Reports</h3>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">Get detailed insights on occupancy, revenue, expenses, and performance with beautiful charts and comprehensive reporting tools.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
