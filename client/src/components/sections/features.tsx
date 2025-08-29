import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserPlus, 
  Bed, 
  CreditCard, 
  Receipt, 
  Calculator, 
  UserCog, 
  FileBarChart, 
  MapPin
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Multi-Hostel Dashboard",
    description: "Unified control center to manage multiple hostels from one login with separate dashboards for each property.",
    color: "text-primary",
    bgColor: "bg-primary"
  },
  {
    icon: Building2,
    title: "Hostel Setup Management",
    description: "Define floors, rooms, and seats with dynamic rent structures. Complete hostel configuration in minutes.",
    color: "text-accent",
    bgColor: "bg-accent"
  },
  {
    icon: Users,
    title: "Student Management",
    description: "Comprehensive student database with profile management, document storage, and history tracking.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-600"
  },
  {
    icon: UserPlus,
    title: "Smart Enrollment",
    description: "Streamlined admission process with National ID integration valid across all EHostelz network hostels.",
    color: "text-purple-600",
    bgColor: "bg-purple-600"
  },
  {
    icon: Bed,
    title: "Room & Seat Allotment",
    description: "Intelligent seat assignment with real-time availability tracking and automated vacancy management.",
    color: "text-orange-600",
    bgColor: "bg-orange-600"
  },
  {
    icon: CreditCard,
    title: "Fees & Payments",
    description: "Automated monthly fee generation, partial/full payments processing, and instant PDF receipt generation.",
    color: "text-green-600",
    bgColor: "bg-green-600"
  },
  {
    icon: Receipt,
    title: "Refund & Student Fines",
    description: "Efficient refund processing and fine management with automatic calculations and penalty tracking.",
    color: "text-red-600",
    bgColor: "bg-red-600"
  },
  {
    icon: Calculator,
    title: "Utility Expenses & Daily Expenses",
    description: "Track electricity, water, maintenance costs and daily operational expenses with detailed categorization.",
    color: "text-blue-600",
    bgColor: "bg-blue-600"
  },
  {
    icon: UserCog,
    title: "Employee Enrollment & Salaries",
    description: "Staff management system with automated salary calculations, attendance tracking, and payroll processing.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-600"
  },
  {
    icon: FileBarChart,
    title: "Reports & Analytics Generate PDF",
    description: "Comprehensive reporting suite with visual analytics, financial summaries, and professional PDF generation.",
    color: "text-pink-600",
    bgColor: "bg-pink-600"
  },
  {
    icon: MapPin,
    title: "Room & Seat Tracker",
    description: "Real-time occupancy monitoring with visual floor plans, vacancy alerts, and availability dashboard.",
    color: "text-teal-600",
    bgColor: "bg-teal-600"
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300" data-testid={`feature-card-${index}`}>
                <div className={`w-14 h-14 ${feature.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className={`${feature.color}`} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white" data-testid={`feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed" data-testid={`feature-description-${index}`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
