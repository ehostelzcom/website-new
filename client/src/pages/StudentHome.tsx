import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, BarChart3, CreditCard, Receipt, Star, User, Menu, MapPin, Phone, UserCheck } from 'lucide-react';
import logoSvg from "@assets/logo/Asset 3.svg";

// Types for student hostel data
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

export default function StudentHome() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  
  // For standalone mode, use default values if localStorage is empty (for testing)
  const finalStudentUserId = studentUserId || '101';

  // Fetch student hostels data
  const { data: hostelData, isLoading, error } = useQuery<StudentHostelResponse>({
    queryKey: ['/api/student-hostels', finalStudentUserId],
    enabled: !!finalStudentUserId,
  });

  // Navigation items
  const sidebarItems = [
    { id: "home", label: "Home", icon: Home, route: "/student-home" },
    { id: "dashboard", label: "Dashboard", icon: BarChart3, route: `/hostel-dashboard/${finalStudentUserId}` },
    { id: "fees", label: "Fees", icon: CreditCard, route: "/fees" },
    { id: "payments", label: "Payments", icon: Receipt, route: "/payments" },
    { id: "rating", label: "Rating", icon: Star, route: "/student-home" },
    { id: "profile", label: "Profile", icon: User, route: "/student-home" },
  ];

  // Get hostel logo based on type
  const getHostelLogo = (hostelType: string) => {
    // BOYS hostel should use Asset 7, GIRLS hostel should use Asset 8
    return hostelType?.toLowerCase() === 'boys' ? logoSvg : logoSvg;
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return "default";
      case 'inactive':
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 flex-col">
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
                  onClick={() => setLocation(item.route)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    item.id === "home"
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

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 lg:hidden">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <img 
              src={logoSvg} 
              alt="ehostelz.com" 
              className="h-12 w-auto"
              data-testid="img-mobile-logo"
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
                    onClick={() => {
                      setLocation(item.route);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      item.id === "home"
                        ? "bg-gradient-to-r from-[#004e89] to-[#0066b3] text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    data-testid={`button-mobile-nav-${item.id}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/10">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Hostels</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your enrolled hostel information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#004e89]"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your hostel information...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400">Failed to load hostel information</p>
              </div>
            </div>
          )}

          {hostelData?.data && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <img 
                      src={getHostelLogo(hostelData.data.hostel_type)} 
                      alt={`${hostelData.data.hostel_name} Logo`}
                      className="h-16 w-16 mx-auto"
                      data-testid="img-hostel-logo"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {hostelData.data.hostel_name}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      {hostelData.data.hostel_type}
                    </Badge>
                    <Badge 
                      variant={getStatusBadgeVariant(hostelData.data.student_hostel_status)}
                      data-testid={`badge-status-${hostelData.data.student_hostel_status.toLowerCase()}`}
                    >
                      {hostelData.data.student_hostel_status}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Address</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{hostelData.data.hostel_address}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{hostelData.data.hostel_city_name}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Contact</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{hostelData.data.hostel_mobile_no}</p>
                    </div>
                  </div>

                  {/* Presenter */}
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Presenter</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{hostelData.data.presenter_name}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004d85]"
                      onClick={() => setLocation(`/hostel-dashboard/${finalStudentUserId}`)}
                      data-testid="button-view-dashboard"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Dashboard
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setLocation('/fees')}
                        data-testid="button-view-fees"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Fees
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setLocation('/payments')}
                        data-testid="button-view-payments"
                      >
                        <Receipt className="w-4 h-4 mr-2" />
                        Payments
                      </Button>
                    </div>
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