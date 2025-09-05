import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Phone, Settings, LogOut, Building2 } from "lucide-react";
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

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  
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
    setLocation(`/hostel-dashboard/${finalStudentUserId}`);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    setLocation("/student-login");
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

        {isLoading ? (
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
        ) : error ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Failed to Load
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Failed to load hostel information. Please try again.
            </p>
          </div>
        ) : hostelData?.data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-[#004e89] dark:hover:border-[#004e89] bg-white dark:bg-gray-800"
              onClick={() => handleHostelClick(hostelData.data)}
              data-testid={`card-hostel-${hostelData.data.hostel_id}`}
            >
              <CardHeader className="pb-2 pt-3 px-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                      <img 
                        src={hostelData.data.hostel_type.toLowerCase() === "girls" ? girlsHostelLogo : boysHostelLogo}
                        alt={`${hostelData.data.hostel_type} Hostel`}
                        className="w-7 h-7"
                      />
                    </div>
                    <CardTitle className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                      {hostelData.data.hostel_name}
                    </CardTitle>
                  </div>
                  <Badge 
                    variant={hostelData.data.student_hostel_status === "Active" ? "default" : "secondary"}
                    className={`text-xs px-2 py-0.5 ${hostelData.data.student_hostel_status === "Active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {hostelData.data.student_hostel_status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {hostelData.data.hostel_type}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 px-3 pb-3">
                <div className="flex items-start space-x-1">
                  <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                    <p className="line-clamp-1">{hostelData.data.hostel_address}</p>
                    <p>{hostelData.data.hostel_city_name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {hostelData.data.hostel_mobile_no}
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
          </div>
        ) : (
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