import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import VideoModal from "@/components/ui/video-modal";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
    alt: "EHostelz Dashboard Overview",
    title: "Complete Hostel Management Dashboard",
    subtitle: "Manage multiple hostels, students, and operations from one powerful platform",
    gradient: "from-blue-600/90 to-purple-700/90",
    accent: "bg-blue-500"
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
    alt: "Student Management Interface", 
    title: "Smart Student Management",
    subtitle: "Register students once, manage across all hostels with ease",
    gradient: "from-emerald-600/90 to-teal-700/90",
    accent: "bg-emerald-500"
  },
  {
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
    alt: "Room Management System",
    title: "Intelligent Room Allocation", 
    subtitle: "Automated room and seat management with real-time availability",
    gradient: "from-orange-600/90 to-red-700/90",
    accent: "bg-orange-500"
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800",
    alt: "Financial Reports and Analytics",
    title: "Advanced Reports & Analytics",
    subtitle: "Comprehensive insights into fees, expenses, and hostel performance",
    gradient: "from-violet-600/90 to-indigo-700/90", 
    accent: "bg-violet-500"
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
    <section className="relative w-full h-[650px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      <div 
        className="flex transition-transform duration-1000 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        data-testid="top-slider-container"
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            {/* Background Image with Modern Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000 ease-out hover:scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>
            </div>
            
            {/* Modern Content Layout */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="text-white space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                      <div className={`w-2 h-2 rounded-full ${slide.accent} mr-2 animate-pulse`}></div>
                      Feature Spotlight
                    </div>
                    
                    <h1 className="text-3xl lg:text-5xl xl:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent" data-testid={`slide-title-${index}`}>
                      {slide.title}
                    </h1>
                    
                    <p className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-lg" data-testid={`slide-subtitle-${index}`}>
                      {slide.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        size="lg" 
                        className={`text-lg px-8 py-4 ${slide.accent} text-white hover:opacity-90 shadow-2xl transform hover:scale-105 transition-all duration-300`}
                        onClick={scrollToFeatures}
                        data-testid={`slide-cta-${index}`}
                      >
                        Explore Features
                      </Button>
                      <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" title="EHostelz Platform Demo">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="text-lg px-8 py-4 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 group" 
                          data-testid={`slide-demo-${index}`}
                        >
                          <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                          Watch Demo
                        </Button>
                      </VideoModal>
                    </div>
                  </div>
                  
                  {/* Feature Card */}
                  <div className="hidden lg:block">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                      <div className="space-y-4">
                        <div className={`w-16 h-16 ${slide.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                          <div className="text-2xl text-white font-bold">{index + 1}</div>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {slide.title.split(' ').slice(0, 2).join(' ')}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Experience the future of hostel management with our advanced technology platform.
                        </p>
                        <div className="flex items-center space-x-2 pt-2">
                          <div className={`w-2 h-2 rounded-full ${slide.accent} animate-pulse`}></div>
                          <span className="text-xs text-gray-400 uppercase tracking-wider">Live System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modern Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-xl rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        onClick={previousSlide}
        data-testid="button-previous-top"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost" 
        size="icon"
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-xl rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        onClick={nextSlide}
        data-testid="button-next-top"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Modern Slide Indicators */}
      <div className="absolute bottom-6 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
        {slides.map((slide, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`transition-all duration-500 rounded-full p-0 ${
              currentSlide === index 
                ? `w-8 h-3 ${slide.accent} shadow-lg` 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`top-indicator-${index}`}
          />
        ))}
        
        {/* Slide Counter */}
        <div className="ml-3 text-white/70 text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </section>
  );
}