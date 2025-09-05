import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import RequestDemoModal from "@/components/ui/request-demo-modal";
import { useLocation } from "wouter";
import logoSvg from "@assets/logo/Asset 3.svg";

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
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="relative text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-[15px] group"
              data-testid="nav-home"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] to-[#ff6b35] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('features-section')}
              className="relative text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-[15px] group"
              data-testid="nav-features"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] to-[#ff6b35] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="relative text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-[15px] group"
              data-testid="nav-pricing"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] to-[#ff6b35] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('find-hostel')}
              className="relative text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-[15px] group"
              data-testid="nav-find-hostel"
            >
              Find Hostel
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] to-[#ff6b35] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="relative text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-[15px] group"
              data-testid="nav-about"
            >
              Why ehostelz
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] to-[#ff6b35] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="relative text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-[15px] group"
              data-testid="nav-contact"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004e89] to-[#ff6b35] transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <Button 
                onClick={() => window.open("/student-login", "_blank")}
                className="bg-[#004e89] hover:bg-[#003a6b] text-gray-200 px-4 py-2 rounded"
                data-testid="button-student-login-header"
              >
                Student Login
              </Button>
            </div>
            <div className="hidden md:block">
              <RequestDemoModal>
                <Button 
                  className="bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004e89] text-white font-semibold px-6 py-2.5 shadow-lg shadow-[#004e89]/25 hover:shadow-xl hover:shadow-[#004e89]/30 transition-all duration-300 hover:scale-105 border border-white/10 backdrop-blur-sm"
                  data-testid="button-request-demo-header"
                >
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
              <SheetContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50">
                <div className="flex flex-col space-y-6 mt-8">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-lg py-3 border-b border-gray-200/30 dark:border-gray-700/30 hover:border-[#004e89]/30"
                    data-testid="nav-mobile-home"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('features-section')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-lg py-3 border-b border-gray-200/30 dark:border-gray-700/30 hover:border-[#004e89]/30"
                    data-testid="nav-mobile-features"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('pricing')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-lg py-3 border-b border-gray-200/30 dark:border-gray-700/30 hover:border-[#004e89]/30"
                    data-testid="nav-mobile-pricing"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => scrollToSection('find-hostel')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-lg py-3 border-b border-gray-200/30 dark:border-gray-700/30 hover:border-[#004e89]/30"
                    data-testid="nav-mobile-find-hostel"
                  >
                    Find Hostel
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-lg py-3 border-b border-gray-200/30 dark:border-gray-700/30 hover:border-[#004e89]/30"
                    data-testid="nav-mobile-about"
                  >
                    Why ehostelz
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-gray-600 dark:text-gray-300 hover:text-[#004e89] dark:hover:text-[#004e89] transition-all duration-300 font-medium text-lg py-3 border-b border-gray-200/30 dark:border-gray-700/30 hover:border-[#004e89]/30"
                    data-testid="nav-mobile-contact"
                  >
                    Contact
                  </button>
                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={() => {window.open("/student-login", "_blank"); setIsOpen(false);}}
                      className="w-full bg-[#004e89] hover:bg-[#003a6b] text-gray-200 py-2 rounded"
                      data-testid="nav-mobile-student-login"
                    >
                      Student Login
                    </Button>
                    <RequestDemoModal>
                      <Button 
                        className="w-full bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004e89] text-white font-semibold py-3 shadow-lg shadow-[#004e89]/25 hover:shadow-xl transition-all duration-300"
                        data-testid="nav-mobile-request-demo"
                      >
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
