import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, User, ChevronDown, Settings, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import logoSvg from "@assets/logo/Asset 3.svg";

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
}

export default function StudentHeader({ title, sidebarItems, activeItemId, onMenuToggle }: StudentHeaderProps) {
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
    // Navigate to profile page (placeholder)
    console.log("Profile clicked");
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
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
            </div>
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
                  {cnic && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">CNIC: {cnic}</span>
                  )}
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
                      CNIC: {cnic}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Student
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