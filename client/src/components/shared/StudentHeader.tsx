import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Menu, User, ChevronDown, Settings, LogOut, Building2, MapPin, Phone } from "lucide-react";
import { useLocation } from "wouter";
import logoSvg from "@assets/logo/Asset 3.svg";

interface HostelInfo {
  hostel_id: number;
  hostel_name: string;
  hostel_type: string;
  hostel_address: string;
  hostel_city_name: string;
  hostel_mobile_no: string;
  presenter_name: string;
  user_role: string;
}

interface StudentHeaderProps {
  title: string;
  sidebarItems: Array<{
    id: string;
    label: string;
    icon: any;
    route: string;
  }>;
  activeItemId: string;
  onMenuToggle: () => void;
  hostelInfo?: HostelInfo;
  showHostelInfo?: boolean;
}

export default function StudentHeader({ title, sidebarItems, activeItemId, onMenuToggle, hostelInfo, showHostelInfo = false }: StudentHeaderProps) {
  const [, setLocation] = useLocation();
  
  // Get user data from localStorage
  const fullName = localStorage.getItem("student_full_name") || "Student";
  const cnic = localStorage.getItem("student_cnic") || "";

  const handleLogout = () => {
    // Clear all stored user data
    localStorage.removeItem("student_user_id");
    localStorage.removeItem("student_full_name");
    localStorage.removeItem("student_cnic");
    localStorage.removeItem("hostel_id");
    
    // Redirect to login
    setLocation("/student-login");
  };

  const handleProfile = () => {
    // Navigate to profile page
    setLocation("/profile");
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/10">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onMenuToggle}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Hostel Information - Conditional */}
            {showHostelInfo && hostelInfo ? (
              <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#ff6b35]/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#ff6b35]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {hostelInfo.hostel_name}
                    </h1>
                    <Badge 
                      variant="default"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="flex items-center">
                      <Building2 className="w-3 h-3 mr-1" />
                      {hostelInfo.hostel_type}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hostelInfo.hostel_city_name}
                    </span>
                    <span className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {hostelInfo.hostel_mobile_no}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
            )}
          </div>

          {/* User Dropdown */}
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
                <DropdownMenuItem onClick={handleProfile} data-testid="button-dropdown-profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
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
  );
}