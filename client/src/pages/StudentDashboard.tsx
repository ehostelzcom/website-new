import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Phone, Settings, LogOut } from "lucide-react";
import logoSvg from "@assets/logo/Asset 3.svg";
import girlsHostelLogo from "@assets/logo/Asset 7.svg";
import boysHostelLogo from "@assets/logo/Asset 8.svg";

interface StudentHostel {
  hostel_id: number;
  hostel_name: string;
  hostel_type: string;
  address: string;
  city_name: string;
  province: string;
  mobile: string;
  status: "Active" | "Inactive";
}

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [hostels, setHostels] = useState<StudentHostel[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for now - will be replaced with real API
  useEffect(() => {
    setLoading(true);
    // TODO: Replace with real API call when provided
    setTimeout(() => {
      setHostels([
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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleHostelClick = (hostel: StudentHostel) => {
    // Navigate to individual hostel dashboard
    setLocation(`/hostel-dashboard/${hostel.hostel_id}`);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoSvg} 
                alt="ehostelz.com" 
                className="h-10 w-auto"
                data-testid="img-logo"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Student Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your hostel registrations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-400 hover:text-[#004e89]"
                data-testid="button-profile"
              >
                <Settings className="w-4 h-4 mr-2" />
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Hostels
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Click on any hostel card to access your dashboard
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hostels.map((hostel) => (
              <Card 
                key={hostel.hostel_id}
                className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-[#004e89] dark:hover:border-[#004e89] bg-white dark:bg-gray-800"
                onClick={() => handleHostelClick(hostel)}
                data-testid={`card-hostel-${hostel.hostel_id}`}
              >
                <CardHeader className="pb-2 pt-3 px-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-8 h-8 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                      <img 
                        src={hostel.hostel_type === "GIRLS" ? girlsHostelLogo : boysHostelLogo}
                        alt={`${hostel.hostel_type} Hostel`}
                        className="w-5 h-5"
                      />
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
                  <CardTitle className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {hostel.hostel_name}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-gray-500" />
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

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <Button 
                      size="sm" 
                      className="w-full h-7 text-xs bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004e89] text-white"
                    >
                      View Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && hostels.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Hostels Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You are not registered in any hostels yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}