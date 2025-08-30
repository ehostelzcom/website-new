import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import VideoModal from "@/components/ui/video-modal";
import dashboardImage from "@assets/generated_images/Secure_e1_dashboard_with_top_menu_eff6b32f.png";
import loginImage from "@assets/slider images/login.jpg";
import enrollmentImage from "@assets/slider images/e5.jpg";
import financialImage from "@assets/generated_images/Financial_management_dashboard_interface_73139990.png";

const slides = [
  {
    image: dashboardImage,
    alt: "About ehostelz.com",
    title: "Welcome to ehostelz.com",
    subtitle: "We are dedicated to revolutionizing hostel management with real, professional software solutions that simplify operations and enhance efficiency for hostel owners across Pakistan"
  },
  {
    image: loginImage,
    alt: "Multiple Hostels Management", 
    title: "Manage Multiple Hostels in One Login",
    subtitle: "Control all your hostel branches from a single dashboard - no more juggling multiple systems or accounts"
  },
  {
    image: enrollmentImage,
    alt: "Smart Enrollment System",
    title: "Smart Enrollment - One Time Registration", 
    subtitle: "Register students once in ehostelz.com and seamlessly manage them across all your hostel locations"
  },
  {
    image: financialImage,
    alt: "Automated Financial Management",
    title: "Automated Financial Management",
    subtitle: "Monthly transaction cycles with automated fee generation, expense tracking, and salary management - complete financial transparency"
  },
  {
    image: dashboardImage,
    alt: "Future Plans",
    title: "Future Plans & Innovation",
    subtitle: "Coming soon: Mobile apps for owners and students, advanced analytics, and AI-powered insights to take your hostel management to the next level"
  }
];

export default function TopSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[490px] lg:h-[590px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 mt-4">
      <div 
        className="flex transition-all duration-1000 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        data-testid="top-slider-container"
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full group">
            {/* Background Image with Modern Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Multi-layered Modern Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#004e89]/80 via-black/60 to-[#ff6b35]/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            
            {/* Content Overlay with Enhanced Typography */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-8 lg:px-24">
                <div className="max-w-4xl text-white">
                  {/* Enhanced Title with Modern Typography */}
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-[0.9] tracking-tight bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-lg" data-testid={`slide-title-${index}`}>
                    {slide.title}
                  </h1>
                  {/* Enhanced Subtitle with Better Spacing */}
                  <p className="text-xl lg:text-2xl text-gray-100/90 mb-10 leading-relaxed font-light max-w-3xl backdrop-blur-sm" data-testid={`slide-subtitle-${index}`}>
                    {slide.subtitle}
                  </p>
                  {/* Modern Button Design */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Button 
                      size="lg" 
                      className="text-lg px-10 py-5 bg-gradient-to-r from-[#004e89] to-[#0066b3] text-white hover:from-[#003a6b] hover:to-[#004e89] shadow-2xl shadow-[#004e89]/30 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                      onClick={scrollToFeatures}
                      data-testid={`slide-cta-${index}`}
                    >
                      Explore Features
                    </Button>
                    <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" title="ehostelz.com Platform Demo">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="text-lg px-10 py-5 border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 hover:border-white/50" 
                        data-testid={`slide-demo-${index}`}
                      >
                        <Play className="w-6 h-6 mr-3" />
                        Watch Demo
                      </Button>
                    </VideoModal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modern Glassmorphism Navigation Arrows */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-110 hover:border-white/40 rounded-full"
              onClick={previousSlide}
              data-testid="button-previous-top"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-black/80 backdrop-blur-sm border-white/20">
            <p className="text-white">Previous</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-110 hover:border-white/40 rounded-full"
              onClick={nextSlide}
              data-testid="button-next-top"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-black/80 backdrop-blur-sm border-white/20">
            <p className="text-white">Next</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Modern Glassmorphism Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-black/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`transition-all duration-500 ease-out rounded-full p-0 border ${
              currentSlide === index 
                ? 'w-12 h-3 bg-gradient-to-r from-[#004e89] to-[#ff6b35] scale-110 shadow-lg border-white/30' 
                : 'w-3 h-3 bg-white/30 hover:bg-white/50 hover:scale-125 border-white/20'
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`top-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}