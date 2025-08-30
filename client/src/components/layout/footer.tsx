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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary/10 text-white py-16">
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img src={logoUrl} alt="ehostelz.com Logo" className="w-48 h-auto filter brightness-0 invert" />
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Transform your hostel management with our innovative software solution. Streamline operations, enhance student experiences, and grow your business efficiently.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#1877F2] transition-all duration-300 backdrop-blur-sm"
                  data-testid="social-facebook"
                >
                  <SiFacebook className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-[#1877F2] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </a>
                <a 
                  href="#" 
                  className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#E4405F] transition-all duration-300 backdrop-blur-sm"
                  data-testid="social-instagram"
                >
                  <SiInstagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-[#E4405F] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </a>
                <a 
                  href="#" 
                  className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#0A66C2] transition-all duration-300 backdrop-blur-sm"
                  data-testid="social-linkedin"
                >
                  <SiLinkedin className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-[#0A66C2] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </a>
              </div>
            </div>
            
            {/* Product Section */}
            <div>
              <h3 className="font-bold text-xl mb-6 text-white relative">
                Product
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    data-testid="footer-features"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors"></span>
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('pricing')}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    data-testid="footer-pricing"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors"></span>
                    Pricing
                  </button>
                </li>
                <li>
                  <RequestDemoModal>
                    <button className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group text-left" data-testid="footer-demo">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors"></span>
                      Request Demo
                    </button>
                  </RequestDemoModal>
                </li>
                <li>
                  <YouTubeModal>
                    <button className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group text-left" data-testid="footer-watch-demo">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-accent transition-colors"></span>
                      Watch Demo
                    </button>
                  </YouTubeModal>
                </li>
              </ul>
            </div>
            
            {/* Company & Support Combined */}
            <div>
              <h3 className="font-bold text-xl mb-6 text-white relative">
                Company & Support
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    data-testid="footer-about"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    data-testid="footer-contact"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                    Contact
                  </button>
                </li>
                <li>
                  <a 
                    href="https://wa.me/923129409211?text=Hi%2C%20I%20need%20help%20with%20ehostelz.com.%20Can%20you%20assist%20me%3F" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group" 
                    data-testid="footer-help"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group" data-testid="footer-privacy">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm" data-testid="copyright">
                &copy; {new Date().getFullYear()} ehostelz.com. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Made with ❤️ in Pakistan</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Trusted by 10+ Hostels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
