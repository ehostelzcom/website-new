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
      <div className="absolute top-24 right-20 w-4 h-4 bg-primary rounded-full animate-bounce delay-500"></div>
      <div className="absolute top-40 left-32 w-6 h-6 bg-accent rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-48 right-32 w-5 h-5 bg-accent/60 rounded-full animate-pulse delay-300"></div>
      
      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center mb-20">
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
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <RequestDemoModal>
              <Button size="lg" className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 border-2 border-primary hover:border-accent shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden" data-testid="button-request-demo">
                <span className="absolute inset-0 w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 015.83 1M15 10h1a3 3 0 01-3.83-1M12 3v3m0 12v3m9-9h-3M3 12h3" />
                  </svg>
                  Request Demo
                </span>
              </Button>
            </RequestDemoModal>
          </div>
        </div>
        
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 px-2">
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/30 transition-all duration-300 min-h-[160px] flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <div className="text-2xl">🏢</div>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-center text-primary">Multi-Hostel Management</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-1">Manage unlimited properties from a single dashboard</p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-accent/30 transition-all duration-300 min-h-[160px] flex flex-col">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                <div className="text-2xl">💰</div>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-center text-accent">Automated Fee Collection</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-1">Automatic payments and instant receipt generation</p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/30 transition-all duration-300 min-h-[160px] flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <div className="text-2xl">🛏️</div>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-center text-primary">Room Availability Tracker</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-1">Instantly find vacant and occupied seats across all rooms</p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-accent/30 transition-all duration-300 min-h-[160px] flex flex-col">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                <div className="text-2xl">📊</div>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-center text-accent">Smart Analytics & Reports</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-1">Detailed insights with beautiful charts and reports</p>
            </div>
            <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary/30 transition-all duration-300 min-h-[160px] flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <div className="text-2xl">👨‍🎓</div>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-center text-primary">Student Portal</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-1">Personal dashboard for students to access their complete hostel history across multiple properties</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
