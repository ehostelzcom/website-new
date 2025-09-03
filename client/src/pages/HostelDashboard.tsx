import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Receipt, 
  User, 
  Building2, 
  MapPin, 
  Phone,
  ChevronDown,
  Settings
} from "lucide-react";
import logoSvg from "@assets/logo/Asset 3.svg";
import girlsHostelLogo from "@assets/logo/Asset 7.svg";
import boysHostelLogo from "@assets/logo/Asset 8.svg";

interface HostelInfo {
  hostel_id: number;
  hostel_name: string;
  hostel_type: string;
  address: string;
  city_name: string;
  province: string;
  mobile: string;
  status: "Active" | "Inactive";
}

export default function HostelDashboard() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/hostel-dashboard/:hostelId");
  const [hostelInfo, setHostelInfo] = useState<HostelInfo | null>(null);
  const [hostels, setHostels] = useState<HostelInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const hostelId = params?.hostelId ? parseInt(params.hostelId) : null;

  // Mock user data - will be replaced with real user from login
  const mockUser = {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com"
  };

  useEffect(() => {
    if (hostelId) {
      // TODO: Replace with real API call when provided
      setLoading(true);
      setTimeout(() => {
        // Mock data - will be replaced with real API
        const allHostels = [
          {
            hostel_id: 1,
            hostel_name: "Smart Hostel",
            hostel_type: "BOYS",
            address: "Near Abdul Wali Khan University, Garden Campus Toru Road",
            city_name: "Mardan",
            province: "Khyber Pakhtunkhwa",
            mobile: "03335638649",
            status: "Active"
          },
          {
            hostel_id: 2,
            hostel_name: "Smart Hostel",
            hostel_type: "GIRLS",
            address: "Near Abdul Wali Khan University, Garden Campus Toru Road",
            city_name: "Mardan",
            province: "Khyber Pakhtunkhwa",
            mobile: "03335638649",
            status: "Active"
          },
          {
            hostel_id: 3,
            hostel_name: "Swabi Hostel",
            hostel_type: "BOYS",
            address: "Main Road, Swabi",
            city_name: "Swabi",
            province: "Khyber Pakhtunkhwa",
            mobile: "03339876543",
            status: "Inactive"
          },
          {
            hostel_id: 4,
            hostel_name: "Shalimar Hostel",
            hostel_type: "GIRLS",
            address: "University Road, Peshawar",
            city_name: "Peshawar",
            province: "Khyber Pakhtunkhwa",
            mobile: "03331234567",
            status: "Active"
          }
        ] as HostelInfo[];
        
        setHostels(allHostels);
        // Set current hostel info
        const currentHostel = allHostels.find(h => h.hostel_id === hostelId);
        setHostelInfo(currentHostel || allHostels[0]);
        setLoading(false);
      }, 500);
    }
  }, [hostelId]);

  const handleLogout = () => {
    setLocation("/");
  };

  const handleProfile = () => {
    setActiveTab("profile");
  };

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "fees", label: "Fees", icon: CreditCard },
    { id: "payments", label: "Payments", icon: Receipt },
    { id: "profile", label: "Profile", icon: User },
  ];

  if (!match || !hostelId) {
    return <div>Invalid hostel ID</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#004e89] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading hostel dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <img 
            src={logoSvg} 
            alt="ehostelz.com" 
            className="h-12 w-auto"
            data-testid="img-logo"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#004e89] to-[#0066b3] text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  data-testid={`button-nav-${item.id}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Hostel Information */}
              {hostelInfo && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        {hostelInfo.hostel_name}
                      </h1>
                      <Badge 
                        variant={hostelInfo.status === "Active" ? "default" : "secondary"}
                        className={hostelInfo.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }
                      >
                        {hostelInfo.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="flex items-center">
                        <Building2 className="w-3 h-3 mr-1" />
                        {hostelInfo.hostel_type}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {hostelInfo.city_name}, {hostelInfo.province}
                      </span>
                      <span className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {hostelInfo.mobile}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    data-testid="button-user-menu"
                  >
                    <div className="w-8 h-8 bg-[#004e89] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{mockUser.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {mockUser.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {mockUser.email}
                      </p>
                    </div>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleProfile} data-testid="button-dropdown-profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} data-testid="button-dropdown-logout">
                      <User className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {/* Home Content - My Hostels */}
          {activeTab === "home" && (
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  My Hostels
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  All your registered hostels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostels.map((hostel) => (
                  <Card 
                    key={hostel.hostel_id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${hostel.hostel_id === hostelId 
                      ? 'border-[#004e89] bg-blue-50 dark:bg-blue-950/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#004e89] dark:hover:border-[#004e89]'
                    } bg-white dark:bg-gray-800`}
                    onClick={() => setLocation(`/hostel-dashboard/${hostel.hostel_id}`)}
                    data-testid={`card-hostel-${hostel.hostel_id}`}
                  >
                    <CardHeader className="pb-2 pt-3 px-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                            <img 
                              src={hostel.hostel_type === "GIRLS" ? girlsHostelLogo : boysHostelLogo}
                              alt={`${hostel.hostel_type} Hostel`}
                              className="w-7 h-7"
                            />
                          </div>
                          <CardTitle className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                            {hostel.hostel_name}
                          </CardTitle>
                        </div>
                        <Badge 
                          variant={hostel.status === "Active" ? "default" : "secondary"}
                          className={`text-xs px-2 py-0.5 ${hostel.status === "Active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {hostel.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {hostel.hostel_type}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-2 px-3 pb-3">
                      <div className="flex items-start space-x-1">
                        <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                          <p className="line-clamp-1">{hostel.address}</p>
                          <p>{hostel.city_name}, {hostel.province}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {hostel.mobile}
                        </span>
                      </div>

                      {hostel.hostel_id === hostelId && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs text-[#004e89] font-medium flex items-center">
                            ✓ Currently Selected
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-[#004e89]" />
                      <span>Total Fees</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      Rs 25,000
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This semester
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Receipt className="w-5 h-5 text-green-600" />
                      <span>Paid Amount</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      Rs 15,000
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      60% completed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-red-600" />
                      <span>Outstanding</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      Rs 10,000
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Due soon
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment History Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Chart will be implemented with real data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Fees Content */}
          {activeTab === "fees" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Fee Details
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle>Fee Structure & Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Fee table will be populated with real API data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Payments Content */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Payment History
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Payment history will be populated with real API data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Content */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Student Profile
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Profile information will be populated with real API data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}