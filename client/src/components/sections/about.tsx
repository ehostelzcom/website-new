import { CheckCircle, Target, Users, Clock, Shield, Calendar, TrendingUp, BarChart3, DollarSign, Smartphone, Monitor, Cloud } from "lucide-react";

export default function About() {
  const benefits = [
    {
      icon: Cloud,
      title: "100% Cloud-Based",
      description: "Access anywhere, anytime with secure cloud infrastructure. No server maintenance required!",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Shield,
      title: "🔒 Security",
      description: "Enterprise-grade encryption protects your sensitive student and financial data 24/7",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Smartphone,
      title: "📱 Mobile Optimized",
      description: "Perfect experience on phones, tablets, and desktops. Manage hostels on-the-go!",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Target,
      title: "Centralized Management",
      description: "Manage all your hostels, branches from one powerful platform. No need to juggle multiple systems – everything you need is available under a single login.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: TrendingUp,
      title: "Scalable & Flexible",
      description: "Whether you run one small hostel or multiple large branches, ehostelz.com adapts to your needs and grows with you.",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Calendar,
      title: "Monthly Transaction Cycle",
      description: "Every financial activity, including fees, payments, expenses, and staff salaries, is automatically managed and tracked on a monthly basis. This makes it easy to monitor cash flow, plan budgets, and maintain complete transparency.",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Clock,
      title: "Save Time with Automation",
      description: "Routine tasks like fee generation, seat allotments, and report preparation are automated, freeing up your time to focus on growing your business.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: BarChart3,
      title: "Transparent Reporting & Analytics",
      description: "Get accurate insights through detailed reports and visual dashboards covering fees, expenses, salaries, and occupancy.",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: DollarSign,
      title: "Affordable & User-Friendly",
      description: "A simple, intuitive interface that anyone can use, backed by pricing that makes professional hostel management accessible to all.",
      color: "bg-emerald-500/10 text-emerald-600"
    }
  ];

  const stats = [
    { value: "10+", label: "Hostels Managed", icon: "🏢" },
    { value: "1000+", label: "Students Served", icon: "👨‍🎓" },
    { value: "99.9%", label: "Uptime", icon: "⚡" },
    { value: "24/7", label: "Support", icon: "🛟" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="about-title">
            Why Choose ehostelz.com?
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-testid="about-subtitle">
            ehostelz.com empowers hostel owners with automation, centralized management, and clear monthly tracking—making operations smoother, faster, and more transparent than ever.
          </p>
        </div>

        {/* Benefits Cards - Full Width Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-750 dark:to-gray-700 p-8 shadow-2xl border-0 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500" data-testid={`benefit-${index}`}>
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${benefit.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h4 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300" data-testid={`benefit-title-${index}`}>
                    {benefit.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" data-testid={`benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Mission Statement - Full Width */}
        <div className="bg-primary py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="mission-title">
              Our Mission
            </h3>
            <p className="text-xl text-white/90 leading-relaxed" data-testid="mission-description">
              To become the world's leading property management platform by providing innovative, 
              user-friendly solutions that transform how properties operate and serve their communities.
            </p>
          </div>
        </div>

        {/* Stats Section - Full Width */}
        <div className="py-16 px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group" data-testid={`stat-${index}`}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300" data-testid={`stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium" data-testid={`stat-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Plans Section */}
        <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="future-plans-title">
                Future Plans
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" data-testid="future-plans-subtitle">
                We're continuously innovating to bring you the most advanced hostel management solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hostel Owners App */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-primary/5 dark:from-gray-800 dark:via-gray-750 dark:to-gray-700 p-8 shadow-2xl border-0 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500" data-testid="future-owners-app">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Monitor className="w-10 h-10" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h4 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300" data-testid="owners-app-title">
                    Hostel Owners App
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" data-testid="owners-app-description">
                    We are developing a dedicated app for hostel owners where you can monitor all your hostel activities, track real-time occupancy, manage finances, and oversee operations from anywhere.
                  </p>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* Mobile App */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-accent/5 dark:from-gray-800 dark:via-gray-750 dark:to-gray-700 p-8 shadow-2xl border-0 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500" data-testid="future-mobile-app">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Smartphone className="w-10 h-10" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h4 className="font-bold text-2xl mb-4 text-gray-900 dark:text-white group-hover:text-accent transition-colors duration-300" data-testid="mobile-app-title">
                    ehostelz.com Mobile App
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" data-testid="mobile-app-description">
                    A comprehensive mobile application is coming soon with enhanced features, offline capabilities, student portal access, and streamlined hostel management tools for ultimate convenience.
                  </p>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
