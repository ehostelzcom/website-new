import { CheckCircle, Target, Users, Clock, Shield } from "lucide-react";

export default function About() {
  const benefits = [
    {
      icon: Target,
      title: "Centralized Management",
      description: "Manage all your properties from one powerful platform",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Clock,
      title: "Time-Saving Automation",
      description: "Automate fees, allotments, and reporting processes",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Users,
      title: "Student-Friendly",
      description: "Seamless property transfers with single registration",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
      color: "bg-blue-500/10 text-blue-600"
    }
  ];

  const stats = [
    { value: "500+", label: "Properties Managed", icon: "🏢" },
    { value: "10k+", label: "Students Served", icon: "👨‍🎓" },
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
            Transform your hostel management with cutting-edge technology and unmatched efficiency
          </p>
        </div>

        {/* Benefits Cards - Full Width Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300" data-testid={`benefit-${index}`}>
                <div className={`w-16 h-16 rounded-2xl ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white" data-testid={`benefit-title-${index}`}>
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed" data-testid={`benefit-description-${index}`}>
                  {benefit.description}
                </p>
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
      </div>
    </section>
  );
}
