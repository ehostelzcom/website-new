import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Bed, 
  CreditCard, 
  BarChart3, 
  Smartphone, 
  IdCard, 
  Calculator 
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Hostel Setup Management",
    description: "Define floors, rooms, and seats with dynamic rent structures. Complete hostel configuration in minutes.",
    color: "text-primary"
  },
  {
    icon: LayoutDashboard,
    title: "Multi-Hostel Dashboard",
    description: "Manage multiple hostels from one login with separate dashboards for each property.",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "Student Management",
    description: "Register students, staff, teachers, and wardens with comprehensive profile management.",
    color: "text-emerald-500"
  },
  {
    icon: Bed,
    title: "Room & Seat Allotment",
    description: "Quick assignment of available seats with real-time occupancy tracking.",
    color: "text-orange-500"
  },
  {
    icon: CreditCard,
    title: "Fees & Payments",
    description: "One-click monthly fee generation, partial/full payments, refunds, and PDF invoices.",
    color: "text-green-500"
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Comprehensive reporting for fees, expenses, salaries, and occupancy with visual graphs.",
    color: "text-red-500"
  },
  {
    icon: Smartphone,
    title: "Student Portal",
    description: "Students can view their history, payments, room details, and hostel information.",
    color: "text-blue-500"
  },
  {
    icon: IdCard,
    title: "Smart Enrollment",
    description: "Single registration with National ID valid across all hostels on EHostelz network.",
    color: "text-purple-500"
  },
  {
    icon: Calculator,
    title: "Expenses & Salaries",
    description: "Track daily expenses and manage staff salary payments with automated calculations.",
    color: "text-indigo-500"
  }
];

export default function Features() {
  return (
    <section id="features-section" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="features-title">
            Powerful Features for Modern Hostels
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="features-subtitle">
            Everything you need to manage hostels efficiently, from setup to reporting
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`feature-card-${index}`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className={`${feature.color} text-xl`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
