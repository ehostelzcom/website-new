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
    // Navigate to individual hostel dashboard
    setLocation(`/dashboard`);
  };

  const handleLogout = () => {
    setLocation("/student-login");
  };

  const handleProfile = () => {
    // TODO: Navigate to profile page
    console.log("Profile clicked");
  };

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
                  className="relative h-10 w-10 rounded-full bg-[#004e89] text-white hover:bg-[#003a6b]"
                  data-testid="button-user-menu"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleProfile} data-testid="menu-profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem data-testid="menu-settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
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
            <div className="max-w-md">
              <Card
                className="cursor-pointer hover:shadow-xl transition-all duration-200 hover:scale-105 border-0 shadow-lg"
                onClick={() => handleHostelClick(hostelData.data)}
                data-testid={`card-hostel-${hostelData.data.hostel_id}`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">
                    <img 
                      src={hostelData.data.hostel_type.toLowerCase() === 'boys' ? boysHostelLogo : girlsHostelLogo} 
                      alt={`${hostelData.data.hostel_name} Logo`}
                      className="h-16 w-16 mx-auto"
                      data-testid="img-hostel-logo"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {hostelData.data.hostel_name}
                  </CardTitle>
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <Badge 
                      variant="outline" 
                      className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    >
                      {hostelData.data.hostel_type}
                    </Badge>
                    <Badge 
                      variant={hostelData.data.student_hostel_status === "Active" ? "default" : "secondary"}
                      data-testid={`badge-status-${hostelData.data.student_hostel_status.toLowerCase()}`}
                    >
                      {hostelData.data.student_hostel_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{hostelData.data.hostel_address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{hostelData.data.hostel_mobile_no}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{hostelData.data.hostel_city_name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Presenter: {hostelData.data.presenter_name}</span>
                  </div>
                </CardContent>
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