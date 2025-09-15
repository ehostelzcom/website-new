import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const logoUrl = "/logo/asset-3.svg";
import { 
  Building2, 
  Users, 
  Smartphone, 
  CreditCard, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Rocket,
  Heart,
  Globe,
  TrendingUp,
  Code,
  Home,
  Calendar,
  Award,
  Zap,
  Shield
} from "lucide-react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "10+", label: "Hostels Managed", icon: Building2 },
    { number: "500+", label: "Students Served", icon: Users },
    { number: "5+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Shield }
  ];

  const testimonials = [
    {
      quote: "ehostelz.com revolutionized our daily operations. From room assignments to fee collection, everything is automated and transparent. Our administrative workload decreased by 70%!",
      author: "Fawad Smart Hostel Warden",
      role: "Mardan"
    },
    {
      quote: "The student portal and automated notifications transformed our hostel management. Parents get real-time updates, and our fee collection improved dramatically. It's a game-changer!",
      author: "Shehzad Islamabad Boys Hostel Warden", 
      role: "Islamabad"
    },
    {
      quote: "Managing 200+ students was overwhelming until we adopted ehostelz.com. The comprehensive dashboard and reporting features made our operations smooth and efficient.",
      author: "Zaka Ullah, Khyber Hostel",
      role: "Peshawar"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Section with Logo */}
      <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 supports-[backdrop-filter]:bg-white/70">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 group" data-testid="about-logo">
                <img 
                  src={logoUrl} 
                  alt="ehostelz.com" 
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                />
              </div>
            </div>
            <div className="flex items-center">
              <a 
                href="/"
                className="text-gray-700 hover:text-[#004e89] transition-all duration-300 font-semibold text-base"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className={`text-center max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Revolutionizing
              </span>
              <br />
              <span className="text-slate-800">Hostel Management</span>
            </h1>
            
            <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>
            
            <p className="text-2xl md:text-3xl text-slate-700 font-light max-w-4xl mx-auto leading-relaxed mb-12" data-testid="main-description">
              Pakistan's most innovative hostel management ecosystem, where technology meets hospitality to create seamless experiences for owners and students alike.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Rocket className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <Button variant="outline" className="border-2 border-slate-300 px-8 py-4 text-lg rounded-full hover:bg-slate-100 transition-all duration-300">
                Watch Our Story
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-slate-800 mb-1">{stat.number}</div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-gradient-x bg-300% filter drop-shadow-lg">
                  Our Vision & Mission
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="border-none shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden group">
                <CardContent className="p-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-700/20"></div>
                  <div className="relative z-10">
                    <Target className="w-16 h-16 mb-6 group-hover:rotate-12 transition-transform duration-500" />
                    <h3 className="text-4xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-white via-white/90 to-accent bg-clip-text text-transparent animate-gradient-x bg-300% filter drop-shadow-lg">
                        Find Faster, Manage Smarter
                      </span>
                    </h3>
                    <p className="text-xl leading-relaxed opacity-95 mb-6">
                      Our revolutionary slogan encapsulates our core mission: empowering students to discover their ideal accommodation with unprecedented speed, while enabling hostel owners to manage their properties with intelligent, cutting-edge technology.
                    </p>
                    <div className="flex items-center text-lg font-semibold">
                      <Heart className="w-5 h-5 mr-2 text-pink-300" />
                      Transforming Lives, One Hostel at a Time
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-800">For Students</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Discover your perfect home away from home with our intelligent search engine, comprehensive reviews, and seamless booking experience. Your entire hostel journey, beautifully organized in one place.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-800">For Owners</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Transform your hostel operations with our comprehensive management suite. From automated billing to intelligent analytics, experience the future of hospitality management today.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Story */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-100 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6" data-testid="founder-title">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-gradient-x bg-300% filter drop-shadow-lg">
                  The Visionary Behind the Revolution
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-8">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <span className="text-6xl font-black text-white">KK</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-4xl font-bold text-slate-800 mb-2" data-testid="founder-name">Khalid Khan</h3>
                <p className="text-xl text-primary font-semibold mb-4">Founder</p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                    <Code className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-slate-600 font-medium">Software Engineer</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-slate-600 font-medium">Since 2014</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                    <Home className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-slate-600 font-medium">Smart Hostel Owner</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
                      <h4 className="text-2xl font-bold text-slate-800">The Genesis of Innovation</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      In 2020, while establishing Smart Hostel in Mardan, Khalid Khan experienced firsthand the challenges of manual hostel management. As a seasoned software developer with over a decade of experience, he recognized an opportunity to revolutionize the industry through technology.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Rocket className="w-8 h-8 text-blue-500 mr-3" />
                      <h4 className="text-2xl font-bold text-slate-800">From Problem to Solution</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      What began as a personal solution in 2022 has evolved into Pakistan's most comprehensive hostel management ecosystem. Through continuous innovation and deep understanding of industry needs, ehostelz.com was born to serve the entire hostel community.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Globe className="w-8 h-8 text-purple-500 mr-3" />
                      <h4 className="text-2xl font-bold text-slate-800">Vision for Tomorrow</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      Today, Khalid continues to lead ehostelz.com's mission to transform how hostels operate and how students find their ideal accommodations. His vision extends beyond software – it's about creating meaningful connections and experiences.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Future Roadmap */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-800 mb-6" data-testid="future-title">Pioneering the Future</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our commitment to innovation drives us to continuously evolve and expand our platform with cutting-edge features that anticipate tomorrow's needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="border-none shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white">
                    <Smartphone className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-500" />
                    <h3 className="text-3xl font-bold mb-4">Mobile Revolution</h3>
                    <p className="text-green-100 text-lg">
                      Experience the future in your pocket with our upcoming mobile applications for both Android and iOS platforms.
                    </p>
                  </div>
                  <div className="p-8 bg-white">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Phase 1: Student-focused features with advanced hostel discovery</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Phase 2: Complete owner management suite integration</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-slate-700">Real-time notifications and seamless user experience</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white">
                    <CreditCard className="w-16 h-16 mb-4 group-hover:rotate-12 transition-transform duration-500" />
                    <h3 className="text-3xl font-bold mb-4">Financial Innovation</h3>
                    <p className="text-orange-100 text-lg">
                      Revolutionizing payment processes with secure, instant, and convenient online payment solutions.
                    </p>
                  </div>
                  <div className="p-8 bg-white">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-slate-700">Instant fee payments through web and mobile platforms</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-slate-700">Bank-grade security with multiple payment options</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-orange-500 mr-3" />
                        <span className="text-slate-700">Automated billing and financial reporting systems</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-purple-900">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-16">What Our Community Says</h2>
            
            <div className="relative">
              <Card className="border-none shadow-2xl bg-white/10 backdrop-blur-md text-white overflow-hidden">
                <CardContent className="p-12">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">
                    "{testimonials[currentSlide].quote}"
                  </blockquote>
                  <div>
                    <div className="text-xl font-semibold">{testimonials[currentSlide].author}</div>
                    <div className="text-blue-200">{testimonials[currentSlide].role}</div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to Transform Your Experience?</h2>
            <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed">
              Join thousands of students and hostel owners who have already discovered the power of ehostelz.com. Your journey towards smarter hostel management starts here.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="student-cta"
              >
                <Users className="w-5 h-5 mr-2" />
                Student Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="demo-cta"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Request Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center">
              <div className="flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">Trusted by 10+ Hostels Across Pakistan</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        `
      }} />
    </div>
  );
}