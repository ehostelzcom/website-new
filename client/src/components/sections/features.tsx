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
  MapPin,
  Star,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Monitor
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
    icon: BarChart3,
    title: "Dashboard",
    description: "Individual hostel dashboard with real-time statistics, student data, seat availability, financial overview, and monthly analytics charts.",
    color: "text-blue-600",
    bgColor: "bg-blue-600"
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
    icon: TrendingUp,
    title: "Profit Take Out",
    description: "Track monthly profit distributions to owners with detailed payment method records including cash, bank transfers, and digital payments.",
    color: "text-purple-600",
    bgColor: "bg-purple-600"
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
    icon: Monitor,
    title: "Student Portal",
    description: "Personal dashboard for students to access their entire hostel history across multiple properties. One login provides lifetime access to all hostels using ehostelz.com with complete records of allotments, fees, payments, and fines.",
    color: "text-blue-500",
    bgColor: "bg-blue-500"
  },
  {
    icon: MapPin,
    title: "Room & Seat Tracker",
    description: "Real-time occupancy monitoring with visual floor plans, vacancy alerts, and availability dashboard.",
    color: "text-teal-600",
    bgColor: "bg-teal-600"
  },
  {
    icon: Star,
    title: "User Ratings",
    description: "Rating system allowing hostels to collect and display user feedback with 1-5 star ratings for reputation management.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-600"
  },
  {
    icon: CheckCircle,
    title: "Students Check Out",
    description: "Streamlined checkout process with automatic fee dues verification, outstanding balance checks, and clearance confirmation.",
    color: "text-green-600",
    bgColor: "bg-green-600"
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
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200" data-testid={`feature-card-${index}`}>
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-full shadow-sm border-2 border-gray-100 dark:border-gray-500 flex items-center justify-center">
                        <IconComponent className={`${feature.color}`} size={20} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-tight" data-testid={`feature-title-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" data-testid={`feature-description-${index}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                  <IconComponent className="w-full h-full text-gray-900 dark:text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
