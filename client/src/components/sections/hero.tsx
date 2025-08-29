import { Button } from "@/components/ui/button";
import RequestDemoModal from "@/components/ui/request-demo-modal";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/10 via-white via-50% to-accent/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-24 right-20 w-4 h-4 bg-primary rotate-45 animate-bounce delay-500"></div>
      <div className="absolute top-40 left-32 w-6 h-6 bg-accent rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-48 right-32 w-5 h-5 bg-accent/60 rotate-45 animate-pulse delay-300"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-10 text-gray-900 dark:text-white drop-shadow-2xl" data-testid="hero-title">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-gradient-x bg-300% filter drop-shadow-lg">
              Seamless Hostel Management Solutions
            </span>
          </h1>
          <p className="text-2xl lg:text-3xl xl:text-4xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed drop-shadow-lg" data-testid="hero-subtitle">
            <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent dark:from-gray-200 dark:via-gray-100 dark:to-gray-200">
              Transform how you manage hostels with our powerful platform. Handle student admissions, room allocations, fee collections, expense tracking, staff management, and detailed reporting - all from one comprehensive dashboard that saves you time and money.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <RequestDemoModal>
              <Button size="lg" className="text-2xl px-16 py-8 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/95 hover:via-primary/85 hover:to-primary/75 shadow-2xl transform hover:scale-110 transition-all duration-500 rounded-full border-4 border-white/20 backdrop-blur-sm relative overflow-hidden group" data-testid="button-request-demo">
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-3">
                  ✨ Start Free Demo
                </span>
              </Button>
            </RequestDemoModal>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-gradient-to-r from-primary/20 to-primary/10 hover:shadow-[0_15px_35px_rgba(0,78,137,0.2)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">🏢</div>
                <h3 className="font-bold text-lg mb-3 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Multi-Hostel Management</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">Manage unlimited hostels from a single dashboard</p>
              </div>
            </div>
            <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-gradient-to-r from-accent/20 to-accent/10 hover:shadow-[0_15px_35px_rgba(255,107,53,0.2)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">💰</div>
                <h3 className="font-bold text-lg mb-3 text-center bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Automated Fee Collection</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">Automatic payments and instant receipt generation</p>
              </div>
            </div>
            <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-gradient-to-r from-primary/20 to-primary/10 hover:shadow-[0_15px_35px_rgba(0,78,137,0.2)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">🛏️</div>
                <h3 className="font-bold text-lg mb-3 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Room Availability Tracker</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">Instantly find vacant and occupied seats across all rooms</p>
              </div>
            </div>
            <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-gradient-to-r from-accent/20 to-accent/10 hover:shadow-[0_15px_35px_rgba(255,107,53,0.2)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="font-bold text-lg mb-3 text-center bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Smart Analytics & Reports</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">Detailed insights with beautiful charts and reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
