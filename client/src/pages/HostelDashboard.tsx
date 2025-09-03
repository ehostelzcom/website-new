import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Receipt, 
  User, 
  Building2, 
  MapPin, 
  Phone,
  ArrowLeft,
  Settings,
  LogOut
} from "lucide-react";
import logoSvg from "@assets/logo/Asset 3.svg";

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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const hostelId = params?.hostelId ? parseInt(params.hostelId) : null;

  useEffect(() => {
    if (hostelId) {
      // TODO: Replace with real API call when provided
      setLoading(true);
      setTimeout(() => {
        // Mock data - will be replaced with real API
        setHostelInfo({
          hostel_id: hostelId,
          hostel_name: "Smart Hostel",
          hostel_type: "BOYS",
          address: "Near Abdul Wali Khan University, Garden Campus Toru Road",
          city_name: "Mardan", 
          province: "Khyber Pakhtunkhwa",
          mobile: "03335638649",
          status: "Active"
        });
        setLoading(false);
      }, 500);
    }
  }, [hostelId]);

  const handleBackToHostels = () => {
    setLocation("/student-dashboard");
  };

  const handleLogout = () => {
    setLocation("/");
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHostels}
                className="text-gray-600 dark:text-gray-400 hover:text-[#004e89]"
                data-testid="button-back-hostels"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Hostels
              </Button>
              
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              
              <img 
                src={logoSvg} 
                alt="ehostelz.com" 
                className="h-8 w-auto"
                data-testid="img-logo"
              />
              
              {hostelInfo && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    {hostelInfo.hostel_name}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      {hostelInfo.hostel_type}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hostelInfo.city_name}
                    </span>
                    <Badge 
                      variant={hostelInfo.status === "Active" ? "default" : "secondary"}
                      className={`text-xs ${hostelInfo.status === "Active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {hostelInfo.status}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("profile")}
                className="text-gray-600 dark:text-gray-400 hover:text-[#004e89]"
                data-testid="button-profile"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-400 hover:text-red-600"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto">
            <TabsTrigger value="home" className="flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-1">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="fees" className="flex items-center space-x-1">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Fees</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-1">
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab - Back to Hostels Cards */}
          <TabsContent value="home" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to {hostelInfo?.hostel_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Use the navigation above to access different sections of your hostel dashboard
              </p>
              <Button
                onClick={handleBackToHostels}
                className="bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004e89] text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Hostels
              </Button>
            </div>
          </TabsContent>

          {/* Dashboard Tab - Graphs */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
              
              {/* TODO: Add actual charts here */}
              <Card className="mt-6">
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
          </TabsContent>

          {/* Fees Tab - Table */}
          <TabsContent value="fees" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}