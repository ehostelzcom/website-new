import { CheckCircle } from "lucide-react";

export default function About() {
  const benefits = [
    {
      title: "Centralized Management",
      description: "Manage all your hostels from one powerful platform"
    },
    {
      title: "Time-Saving Automation",
      description: "Automate fees, allotments, and reporting processes"
    },
    {
      title: "Student-Friendly",
      description: "Seamless hostel transfers with single registration"
    }
  ];

  const stats = [
    { value: "500+", label: "Hostels Managed" },
    { value: "10k+", label: "Students Served" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="about-title">
              Why Choose EHostelz?
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="about-subtitle">
              Digitizing hostel management with simplicity and efficiency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-6" data-testid="mission-title">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-lg mb-6" data-testid="mission-description">
                To become the No.1 hostel management software worldwide by providing innovative, 
                user-friendly solutions that transform how hostels operate and serve their communities.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start" data-testid={`benefit-${index}`}>
                    <CheckCircle className="text-green-500 mt-1 mr-3 h-5 w-5" />
                    <div>
                      <h4 className="font-semibold" data-testid={`benefit-title-${index}`}>
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground" data-testid={`benefit-description-${index}`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Professional team working on software solutions" 
                className="rounded-xl shadow-lg w-full"
                data-testid="about-image"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="text-3xl font-bold text-primary mb-2" data-testid={`stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground" data-testid={`stat-label-${index}`}>
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
