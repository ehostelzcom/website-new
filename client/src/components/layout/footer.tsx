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
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <img src={logoUrl} alt="EHostelz Logo" className="w-60 h-auto" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Smart hostel management software that simplifies operations and enhances student experiences.
            </p>
            {/* Social Media Icons */}
            <div className="hidden md:flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                data-testid="social-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                data-testid="social-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                data-testid="social-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors"
                  data-testid="footer-features"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-white transition-colors"
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
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
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
                  className="hover:text-white transition-colors"
                  data-testid="footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
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
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm" data-testid="copyright">
            &copy; 2024 EHostelz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
