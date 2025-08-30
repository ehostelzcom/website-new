import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dashboardImage from "@assets/generated_images/Secure_dashboard_interface_redesign_b32b56ab.png";
import studentImage from "@assets/generated_images/Secure_student_data_interface_adca6447.png";
import roomImage from "@assets/generated_images/Secure_room_management_interface_b828af5a.png";
import allotmentImage from "@assets/generated_images/Secure_allotments_feedback_interface_8820174e.png";

const slides = [
  {
    image: dashboardImage,
    alt: "ehostelz.com Dashboard Overview"
  },
  {
    image: studentImage,
    alt: "Student Management Interface"
  },
  {
    image: roomImage,
    alt: "Room Management System"
  },
  {
    image: allotmentImage,
    alt: "Student Allotments and Feedback"
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
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="slider-title">
            See ehostelz.com in Action
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="slider-subtitle">
            Explore our powerful features through real screenshots
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              data-testid="slider-container"
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-full h-auto"
                    data-testid={`slide-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            onClick={previousSlide}
            data-testid="button-previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            onClick={nextSlide}
            data-testid="button-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-3 h-3 rounded-full p-0 ${
                  currentSlide === index ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground'
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
