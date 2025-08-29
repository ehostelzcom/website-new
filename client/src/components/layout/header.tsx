import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Building2 } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2" data-testid="logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="text-primary-foreground text-sm" />
              </div>
              <span className="text-xl font-bold text-foreground">EHostelz</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-features"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('find-hostel')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-find-hostel"
            >
              Find Hostel
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex" data-testid="button-signin">
              Sign In
            </Button>
            <Button data-testid="button-trial">
              Start Free Trial
            </Button>
            
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-mobile-home"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-mobile-features"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('pricing')}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-mobile-pricing"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => scrollToSection('find-hostel')}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-mobile-find-hostel"
                  >
                    Find Hostel
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-mobile-about"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-mobile-contact"
                  >
                    Contact
                  </button>
                  <Button variant="ghost" data-testid="nav-mobile-signin">
                    Sign In
                  </Button>
                  <Button data-testid="nav-mobile-trial">
                    Start Free Trial
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
