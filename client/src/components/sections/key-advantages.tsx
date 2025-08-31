import { Cloud, Shield, Smartphone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestDemoModal from "@/components/ui/request-demo-modal";

const advantages = [
  {
    icon: Cloud,
    title: "100% Cloud-Based",
    subtitle: "Access Anywhere, Anytime",
    description: "No servers to maintain, no software to install. Access your hostel management system from any device, anywhere in the world with just an internet connection.",
    benefits: [
      "99.9% uptime guarantee",
      "Automatic updates & backups",
      "Zero maintenance costs",
      "Instant global access"
    ],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    iconBg: "bg-blue-500/20"
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    subtitle: "Your Data, Completely Protected",
    description: "Enterprise-grade encryption and security protocols protect your sensitive student and financial data. We comply with international data protection standards.",
    benefits: [
      "256-bit SSL encryption",
      "Daily secure backups",
      "GDPR compliance ready",
      "Multi-factor authentication"
    ],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    iconBg: "bg-green-500/20"
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    subtitle: "Perfect on Every Device",
    description: "Beautifully designed interface that works flawlessly on smartphones, tablets, and desktops. Manage your hostels on-the-go with the same powerful features.",
    benefits: [
      "Mobile-optimized interface",
      "Touch-friendly controls",
      "Offline data viewing",
      "Cross-platform compatibility"
    ],
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    iconBg: "bg-purple-500/20"
  }
];

export default function KeyAdvantages() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white" data-testid="advantages-title">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x bg-300%">
              Why Choose ehostelz.com?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-testid="advantages-subtitle">
            Built for the modern world with cutting-edge technology and uncompromising security
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${advantage.bgGradient} border-2 border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                data-testid={`advantage-card-${index}`}
              >
                {/* Card Content */}
                <div className="relative z-10 p-8 lg:p-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 ${advantage.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 bg-gradient-to-r ${advantage.gradient} bg-clip-text text-transparent`} />
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900 dark:text-white" data-testid={`advantage-title-${index}`}>
                    {advantage.title}
                  </h3>
                  <p className={`text-lg font-semibold mb-4 bg-gradient-to-r ${advantage.gradient} bg-clip-text text-transparent`}>
                    {advantage.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed" data-testid={`advantage-description-${index}`}>
                    {advantage.description}
                  </p>
                  
                  {/* Benefits List */}
                  <ul className="space-y-3 mb-6">
                    {advantage.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 bg-gradient-to-r ${advantage.gradient} bg-clip-text text-transparent flex-shrink-0`} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm lg:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Experience the Future of Hostel Management
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of hostel owners who trust ehostelz.com for their daily operations
            </p>
            <RequestDemoModal>
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" data-testid="cta-demo-button">
                <span className="flex items-center gap-2">
                  Start Your Free Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </RequestDemoModal>
          </div>
        </div>
      </div>
    </section>
  );
}