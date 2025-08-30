import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dashboardImage from "@assets/generated_images/Secure_e1_dashboard_with_top_menu_eff6b32f.png";
import loginImage from "@assets/slider images/login.jpg";
import enrollmentImage from "@assets/slider images/e5.jpg";
import financialImage from "@assets/generated_images/Financial_management_dashboard_interface_73139990.png";

const slides = [
  {
    image: dashboardImage,
    alt: "About ehostelz.com - Real Hostel Management Software"
  },
  {
    image: loginImage,
    alt: "Multiple Hostels Management in One Login"
  },
  {
    image: enrollmentImage,
    alt: "Smart Enrollment - One Time Registration System"
  },
  {
    image: financialImage,
    alt: "Automated Financial Management System"
  },
  {
    image: dashboardImage,
    alt: "Future Plans - Mobile Apps and Advanced Features"
  }
];

export default function ProductSlider() {
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

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/30 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#004e89] via-[#0066b3] to-[#ff6b35] bg-clip-text text-transparent" data-testid="slider-title">
            See ehostelz.com in Action
          </h2>
          <p className="text-muted-foreground text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed" data-testid="slider-subtitle">
            Explore our powerful features through real screenshots from our live platform
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto group">
          {/* Modern Card Container with Enhanced Shadow */}
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black/10 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            {/* Enhanced Image Container */}
            <div className="p-2">
              <div 
                className="flex transition-all duration-700 ease-out overflow-hidden rounded-2xl"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                data-testid="slider-container"
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img 
                        src={slide.image} 
                        alt={slide.alt} 
                        className="w-full h-auto transition-all duration-700 hover:scale-105 object-cover"
                        data-testid={`slide-${index}`}
                      />
                      {/* Subtle overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Modern Floating Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-2xl rounded-full opacity-0 group-hover:opacity-100 hover:border-[#004e89]/30"
            onClick={previousSlide}
            data-testid="button-previous"
          >
            <ChevronLeft className="h-6 w-6 text-[#004e89]" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-xl shadow-black/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-2xl rounded-full opacity-0 group-hover:opacity-100 hover:border-[#004e89]/30"
            onClick={nextSlide}
            data-testid="button-next"
          >
            <ChevronRight className="h-6 w-6 text-[#004e89]" />
          </Button>
          
          {/* Modern Indicator Design */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`transition-all duration-500 ease-out rounded-full p-0 border-2 ${
                  currentSlide === index 
                    ? 'w-16 h-4 bg-gradient-to-r from-[#004e89] to-[#ff6b35] scale-110 shadow-lg shadow-[#004e89]/20 border-[#004e89]/30' 
                    : 'w-4 h-4 bg-gray-300 dark:bg-gray-600 hover:bg-[#004e89]/20 hover:scale-125 border-gray-400/30 dark:border-gray-500/30'
                }`}
                onClick={() => goToSlide(index)}
                data-testid={`indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
