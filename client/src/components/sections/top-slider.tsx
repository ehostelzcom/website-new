import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import VideoModal from "@/components/ui/video-modal";
import dashboardImage from "@assets/generated_images/Hostel_management_dashboard_interface_300de500.png";
import studentImage from "@assets/generated_images/Student_management_software_interface_e1523600.png";
import roomImage from "@assets/generated_images/Room_management_system_interface_8d15d0a1.png";
import financialImage from "@assets/generated_images/Financial_analytics_dashboard_interface_33f4ce90.png";

const slides = [
  {
    image: dashboardImage,
    alt: "ehostelz.com Dashboard Overview",
    title: "Complete Hostel Management Dashboard",
    subtitle: "Manage multiple hostels, students, and operations from one powerful platform"
  },
  {
    image: studentImage,
    alt: "Student Management Interface", 
    title: "Smart Student Management",
    subtitle: "Register students once, manage across all hostels with ease"
  },
  {
    image: roomImage,
    alt: "Room Management System",
    title: "Intelligent Room Allocation", 
    subtitle: "Automated room and seat management with real-time availability"
  },
  {
    image: financialImage,
    alt: "Financial Reports and Analytics",
    title: "Advanced Reports & Analytics",
    subtitle: "Comprehensive insights into fees, expenses, and hostel performance"
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
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[460px] lg:h-[560px] overflow-hidden bg-gray-100 dark:bg-gray-900 mt-4">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        data-testid="top-slider-container"
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            {/* Background Image with Simple Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-16 lg:px-24">
                <div className="max-w-3xl text-white">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight" data-testid={`slide-title-${index}`}>
                    {slide.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed" data-testid={`slide-subtitle-${index}`}>
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="text-lg px-8 py-4 bg-primary text-white hover:bg-primary/90"
                      onClick={scrollToFeatures}
                      data-testid={`slide-cta-${index}`}
                    >
                      Explore Features
                    </Button>
                    <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" title="ehostelz.com Platform Demo">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="text-lg px-8 py-4 border-white text-white bg-white/10 hover:bg-white hover:text-black" 
                        data-testid={`slide-demo-${index}`}
                      >
                        <Play className="w-5 h-5 mr-2" />
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
      
      {/* Navigation Arrows with Tooltips */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
              onClick={previousSlide}
              data-testid="button-previous-top"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
              onClick={nextSlide}
              data-testid="button-next-top"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-4 h-4 rounded-full p-0 transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-110' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`top-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}