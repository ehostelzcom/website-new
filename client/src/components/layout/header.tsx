import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Calendar } from "lucide-react";
import RequestDemoModal from "@/components/ui/request-demo-modal";
import { useLocation } from "wouter";
const logoSvg = "/logo/asset-3.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 group" data-testid="logo">
              <img 
                src={logoSvg} 
                alt="ehostelz.com" 
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
              />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => scrollToSection('home')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#004e89] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-base tracking-wide group px-1 py-2"
              data-testid="nav-home"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] transition-all duration-400 group-hover:w-full shadow-sm"></span>
            </button>
            <button 
              onClick={() => scrollToSection('features-section')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#004e89] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-base tracking-wide group px-1 py-2"
              data-testid="nav-features"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] transition-all duration-400 group-hover:w-full shadow-sm"></span>
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#004e89] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-base tracking-wide group px-1 py-2"
              data-testid="nav-pricing"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] transition-all duration-400 group-hover:w-full shadow-sm"></span>
            </button>
            <button 
              onClick={() => scrollToSection('find-hostel')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#004e89] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-base tracking-wide group px-1 py-2"
              data-testid="nav-find-hostel"
            >
              Find Hostel
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] transition-all duration-400 group-hover:w-full shadow-sm"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#004e89] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-base tracking-wide group px-1 py-2"
              data-testid="nav-about"
            >
              Why ehostelz
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] transition-all duration-400 group-hover:w-full shadow-sm"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-[#004e89] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-base tracking-wide group px-1 py-2"
              data-testid="nav-contact"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] via-[#0066cc] to-[#ff6b35] transition-all duration-400 group-hover:w-full shadow-sm"></span>
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Button 
                onClick={() => window.open("/student-login", "_blank")}
                className="bg-[#004e89] hover:bg-[#003a6b] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                data-testid="button-student-login-header"
              >
                <User className="w-4 h-4" />
                Student Login
              </Button>
            </div>
            <div className="hidden md:block">
              <RequestDemoModal>
                <Button 
                  className="bg-[#ff6b35] hover:bg-[#e55a2e] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  data-testid="button-request-demo-header"
                >
                  <Calendar className="w-4 h-4" />
                  Request Demo
                </Button>
              </RequestDemoModal>
            </div>
            
            {/* Modern Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden w-10 h-10 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-sm" 
                  data-testid="button-menu"
                >
                  <Menu className="h-5 w-5 text-[#004e89]" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gray-900/96 dark:bg-gray-900/96 backdrop-blur-xl border-l border-gray-700/60 dark:border-gray-700/60">
                <div className="flex flex-col space-y-4 mt-10">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-left text-white dark:text-gray-100 hover:text-[#4a8bc2] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-xl py-4 px-2 border-b border-white/20 dark:border-gray-700/40 hover:border-[#4a8bc2]/50 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-t-lg"
                    data-testid="nav-mobile-home"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('features-section')}
                    className="text-left text-white dark:text-gray-100 hover:text-[#4a8bc2] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-xl py-4 px-2 border-b border-white/20 dark:border-gray-700/40 hover:border-[#4a8bc2]/50 hover:bg-white/10 dark:hover:bg-gray-800/30"
                    data-testid="nav-mobile-features"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('pricing')}
                    className="text-left text-white dark:text-gray-100 hover:text-[#4a8bc2] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-xl py-4 px-2 border-b border-white/20 dark:border-gray-700/40 hover:border-[#4a8bc2]/50 hover:bg-white/10 dark:hover:bg-gray-800/30"
                    data-testid="nav-mobile-pricing"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => scrollToSection('find-hostel')}
                    className="text-left text-white dark:text-gray-100 hover:text-[#4a8bc2] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-xl py-4 px-2 border-b border-white/20 dark:border-gray-700/40 hover:border-[#4a8bc2]/50 hover:bg-white/10 dark:hover:bg-gray-800/30"
                    data-testid="nav-mobile-find-hostel"
                  >
                    Find Hostel
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-white dark:text-gray-100 hover:text-[#4a8bc2] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-xl py-4 px-2 border-b border-white/20 dark:border-gray-700/40 hover:border-[#4a8bc2]/50 hover:bg-white/10 dark:hover:bg-gray-800/30"
                    data-testid="nav-mobile-about"
                  >
                    Why ehostelz
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-white dark:text-gray-100 hover:text-[#4a8bc2] dark:hover:text-[#4a8bc2] transition-all duration-400 font-semibold text-xl py-4 px-2 border-b border-white/20 dark:border-gray-700/40 hover:border-[#4a8bc2]/50 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-b-lg"
                    data-testid="nav-mobile-contact"
                  >
                    Contact
                  </button>
                  <div className="pt-6 space-y-4">
                    <Button 
                      onClick={() => {window.open("/student-login", "_blank"); setIsOpen(false);}}
                      className="w-full bg-[#004e89] hover:bg-[#003a6b] text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      data-testid="nav-mobile-student-login"
                    >
                      <User className="w-5 h-5" />
                      Student Login
                    </Button>
                    <RequestDemoModal>
                      <Button 
                        className="w-full bg-[#ff6b35] hover:bg-[#e55a2e] text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        data-testid="nav-mobile-request-demo"
                        onClick={() => setIsOpen(false)}
                      >
                        <Calendar className="w-5 h-5" />
                        Request Demo
                      </Button>
                    </RequestDemoModal>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
