import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import logoUrl from "@assets/logo/Asset 3.svg";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoUrl} alt="EHostelz Logo" className="w-8 h-8" />
              <span className="text-xl font-bold">EHostelz</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Smart hostel management software that simplifies operations and enhances student experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-foreground transition-colors"
                  data-testid="footer-features"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-foreground transition-colors"
                  data-testid="footer-pricing"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-demo">
                  Demo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-api">
                  API
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-foreground transition-colors"
                  data-testid="footer-about"
                >
                  About
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-careers">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-blog">
                  Blog
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-foreground transition-colors"
                  data-testid="footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-docs">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors" data-testid="footer-terms">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm" data-testid="copyright">
            &copy; 2024 EHostelz. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="social-facebook"
            >
              <SiFacebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="social-instagram"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="social-linkedin"
            >
              <SiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
