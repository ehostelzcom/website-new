import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Home as HomeIcon, 
  BarChart3, 
  CreditCard, 
  Receipt, 
  User, 
  Building2, 
  MapPin, 
  Phone,
  Settings,
  Star,
  Menu,
  LogOut,
  Users,
  ChevronDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoSvg from "@assets/logo/Asset 3.svg";
import girlsHostelLogo from "@assets/logo/Asset 7.svg";
import boysHostelLogo from "@assets/logo/Asset 8.svg";

// Types for student hostel data (matches API response)
interface StudentHostelData {
  user_id: number;
  hostel_id: number;
  hostel_name: string;
  hostel_type: string;
  hostel_address: string;
  hostel_city_name: string;
  hostel_mobile_no: string;
  presenter_name: string;
  user_mobile_no: string;
  user_role: string;
  user_role_id: number;
  user_city_name: string;
  user_cnic: string;
  user_address: string;
  mime_type: string;
  file_name: string;
  presenter_image_url: string;
  student_hostel_status: string;
  hostel_review_counts: number;
  hostel_avg_rating: number;
}

interface StudentHostelResponse {
  status: boolean;
  code: number;
  data: StudentHostelData;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  const finalStudentUserId = studentUserId || '101';

  // Fetch student hostels data using real API
  const { data: hostelData, isLoading, error } = useQuery<StudentHostelResponse>({
    queryKey: ['/api/student-hostels', finalStudentUserId],
    enabled: !!finalStudentUserId,
  });

  const handleHostelClick = (hostelData: StudentHostelData) => {
    // Store hostel_id in localStorage for dashboard use
    localStorage.setItem("hostel_id", hostelData.hostel_id.toString());
    // Navigate to dashboard (user_id already in localStorage from login)
    setLocation(`/dashboard`);
  };

  const handleLogout = () => {
    // Clear all stored user data
    localStorage.removeItem("student_user_id");
    localStorage.removeItem("student_full_name");
    localStorage.removeItem("student_cnic");
    localStorage.removeItem("hostel_id");
    
    setLocation("/student-login");
  };


  // Get user data from localStorage
  const fullName = localStorage.getItem("student_full_name") || "Student";
  const cnic = localStorage.getItem("student_cnic") || "";

  // Navigation items
  const sidebarItems = [
    { id: "home", label: "Home", icon: HomeIcon, route: "/home" },
    { id: "dashboard", label: "Dashboard", icon: BarChart3, route: "/dashboard" },
    { id: "fees", label: "Fees", icon: CreditCard, route: "/fees" },
    { id: "payments", label: "Payments", icon: Receipt, route: "/payments" },
    { id: "rating", label: "Rating", icon: Star, route: "/home" },
    { id: "profile", label: "Profile", icon: User, route: "/home" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/10">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <img 
                src={logoSvg} 
                alt="ehostelz.com" 
                className="h-10 w-auto"
                data-testid="img-header-logo"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Hostels
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All your registered hostels
                </p>
              </div>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                  data-testid="button-user-menu"
                >
                  <div className="w-8 h-8 bg-[#004e89] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="font-medium block">{fullName}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {fullName}
                    </p>
                    {cnic && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {cnic}
                      </p>
                    )}
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleLogout} data-testid="button-dropdown-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#004e89]"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your hostels...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400">Failed to load hostel information</p>
              </div>
            </div>
          ) : hostelData?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl"
                onClick={() => handleHostelClick(hostelData.data)}
                data-testid={`card-hostel-${hostelData.data.hostel_id}`}
              >
                <div className="p-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img 
                          src={hostelData.data.hostel_type === "Boys" ? boysHostelLogo : girlsHostelLogo}
                          alt={`${hostelData.data.hostel_type} Hostel`}
                          className="w-8 h-8"
                        />
                      </div>
                      
                      {/* Hostel Name and Type */}
                      <div className="flex-1">
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {hostelData.data.hostel_name}
                          </h3>
                          {/* Rating under hostel name */}
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {hostelData.data.hostel_avg_rating.toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({hostelData.data.hostel_review_counts} reviews)
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                            <User className="w-4 h-4" />
                            <span>{hostelData.data.hostel_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <Badge className="bg-blue-600 hover:bg-blue-600 text-white text-sm px-3 py-1 flex-shrink-0">
                      {hostelData.data.student_hostel_status || "Active"}
                    </Badge>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {hostelData.data.hostel_city_name}
                      </p>
                      <p className="text-xs leading-relaxed">
                        {hostelData.data.hostel_address}
                      </p>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex items-center space-x-2 mt-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {hostelData.data.hostel_mobile_no}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Hostels Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You are not registered in any hostels yet.
                </p>
              </div>
            </div>
          )}
      </main>
    </div>
  );
}