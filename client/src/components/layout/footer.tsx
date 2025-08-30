import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import logoUrl from "@assets/logo/Asset 3.svg";
import RequestDemoModal from "@/components/ui/request-demo-modal";
import YouTubeModal from "@/components/ui/youtube-modal";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-6 md:col-span-2">
            <div className="mb-6">
              <img src={logoUrl} alt="ehostelz.com Logo" className="w-60 h-auto" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              ehostelz.com - hostel management software that simplifies operations and enhances student experiences.
            </p>
            {/* Social Media Icons */}
            <div className="hidden md:flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-[#1877F2] hover:text-[#1877F2]/80 transition-colors p-2 rounded-full hover:bg-blue-50"
                data-testid="social-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors p-2 rounded-full hover:bg-pink-50"
                data-testid="social-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors p-2 rounded-full hover:bg-blue-50"
                data-testid="social-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Empty space for gap */}
          <div className="hidden md:block"></div>
          
          <div className="col-span-6 md:col-span-1">
            <h3 className="font-semibold mb-4 text-gray-900">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-features"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-pricing"
                >
                  Pricing
                </button>
              </li>
              <li>
                <RequestDemoModal>
                  <button className="hover:text-foreground transition-colors text-left" data-testid="footer-demo">
                    Request Demo
                  </button>
                </RequestDemoModal>
              </li>
              <li>
                <YouTubeModal>
                  <button className="hover:text-foreground transition-colors text-left" data-testid="footer-watch-demo">
                    Watch Demo
                  </button>
                </YouTubeModal>
              </li>
            </ul>
          </div>
          
          <div className="col-span-6 md:col-span-1">
            <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-primary transition-colors"
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
                  className="hover:text-primary transition-colors"
                  data-testid="footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div className="col-span-6 md:col-span-1">
            <h3 className="font-semibold mb-4 text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a 
                  href="https://wa.me/923129409211?text=Hi%2C%20I%20need%20help%20with%20ehostelz.com.%20Can%20you%20assist%20me%3F" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-foreground transition-colors" 
                  data-testid="footer-help"
                >
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
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm" data-testid="copyright">
            &copy; {new Date().getFullYear()} ehostelz.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
