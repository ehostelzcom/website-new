import { Button } from "@/components/ui/button";
import RequestDemoModal from "@/components/ui/request-demo-modal";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white" data-testid="hero-title">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hostel Management
            </span>
            <span className="block mt-2">Made Simple</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="hero-subtitle">
            Everything you need to run your hostels smoothly. From student check-ins to fee collection - all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <RequestDemoModal>
              <Button size="lg" className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-full" data-testid="button-request-demo">
                Start Free Demo
              </Button>
            </RequestDemoModal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4 text-center">🏢</div>
              <h3 className="font-bold text-lg mb-3 text-center text-primary">Multiple Hostels</h3>
              <p className="text-muted-foreground text-center">Run all your hostels from one place</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-accent/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4 text-center">💰</div>
              <h3 className="font-bold text-lg mb-3 text-center text-accent">Easy Payments</h3>
              <p className="text-muted-foreground text-center">Collect fees without hassle</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4 text-center">📊</div>
              <h3 className="font-bold text-lg mb-3 text-center text-primary">Simple Reports</h3>
              <p className="text-muted-foreground text-center">See everything at a glance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
