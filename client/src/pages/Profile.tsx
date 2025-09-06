import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Building2, 
  GraduationCap, 
  Users, 
  CreditCard,
  HomeIcon,
  Menu,
  UserCheck,
  Heart,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StudentHeader from '@/components/shared/StudentHeader';

interface ProfileData {
  user_id: number;
  full_name: string;
  father_name: string;
  cnic: string;
  mobile_no: string;
  whatsapp_no: string;
  gender: string;
  religion: string;
  address: string;
  city_name: string;
  location: string;
  created_at: string;
  hostel_name: string;
  guardian_name: string;
  guardian_address: string;
  guardian_mobile_no: string;
  guardian_relation: string;
  institute_name: string;
  department_name: string;
  registration_number: string;
}

interface ProfileResponse {
  status: boolean;
  code: number;
  data: ProfileData[];
}

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

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get user and hostel IDs from localStorage
  const finalStudentUserId = localStorage.getItem('student_user_id') || '101';
  const finalHostelId = localStorage.getItem('hostel_id') || '2';

  // Fetch student hostel info for header
  const { data: hostelData } = useQuery({
    queryKey: ['student-hostels', finalStudentUserId],
    queryFn: async () => {
      const response = await fetch(`/api/student-hostels/${finalStudentUserId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hostel data');
      }
      return response.json();
    },
    enabled: !!finalStudentUserId,
  });

  const hostelInfo: HostelInfo = hostelData?.data ? {
    hostel_id: hostelData.data.hostel_id,
    hostel_name: hostelData.data.hostel_name,
    hostel_type: hostelData.data.hostel_type,
    hostel_address: hostelData.data.hostel_address,
    hostel_city_name: hostelData.data.hostel_city_name,
    hostel_mobile_no: hostelData.data.hostel_mobile_no,
    presenter_name: hostelData.data.presenter_name,
    user_role: hostelData.data.user_role,
  } : {
    hostel_id: 0,
    hostel_name: '',
    hostel_type: '',
    hostel_address: '',
    hostel_city_name: '',
    hostel_mobile_no: '',
    presenter_name: '',
    user_role: '',
  };

  // Fetch profile data
  const { data: profileData, isLoading } = useQuery<ProfileResponse>({
    queryKey: ['student-profile', finalStudentUserId, finalHostelId],
    queryFn: async () => {
      const response = await fetch(`/api/student-profile/${finalStudentUserId}/${finalHostelId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      return response.json();
    },
    enabled: !!finalStudentUserId && !!finalHostelId,
  });

  const profile = profileData?.data?.[0];

  // Navigation items
  const sidebarItems = [
    { id: "home", label: "Home", icon: HomeIcon, route: "/home" },
    { id: "dashboard", label: "Dashboard", icon: Building2, route: "/dashboard" },
    { id: "fees", label: "Fees", icon: CreditCard, route: "/fees" },
    { id: "payments", label: "Payments", icon: CreditCard, route: "/payments" },
    { id: "rating", label: "Rating", icon: Building2, route: "/rating" },
    { id: "profile", label: "Profile", icon: User, route: "/profile" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const showHostelInfo = !!hostelInfo.hostel_name;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col">
        <nav className="flex-1 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Student Portal
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => window.location.href = item.route}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    item.id === "profile"
                      ? "bg-gradient-to-r from-[#004e89] to-[#0066b3] text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  data-testid={`button-desktop-nav-${item.id}`}
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
        <SheetContent side="left" className="p-0 w-64">
          <nav className="h-full bg-white dark:bg-gray-800">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Student Portal
              </h2>
            </div>
            <div className="p-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      window.location.href = item.route;
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      item.id === "profile"
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
        {/* Student Header */}
        <StudentHeader 
          title="Student Profile"
          sidebarItems={sidebarItems}
          activeItemId="profile"
          onMenuToggle={() => setSidebarOpen(true)}
          hostelInfo={hostelInfo}
          showHostelInfo={showHostelInfo}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <HomeIcon className="w-4 h-4" />
            <span>/</span>
            <span>Profile</span>
          </div>

          {/* Page Title */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Student Profile
              </CardTitle>
            </CardHeader>
          </Card>

          {isLoading ? (
            /* Loading State */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[...Array(4)].map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1 animate-pulse"></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : profile ? (
            /* Profile Content */
            <div className="space-y-4">
              {/* Profile Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-white/20">
                    <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                      {profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                    <p className="text-blue-100 text-lg">Student ID: {profile.user_id}</p>
                    <p className="text-blue-200 mt-1">{profile.institute_name}</p>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Personal Details - Takes 2 columns */}
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <User className="w-4 h-4 text-gray-500" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Father's Name</p>
                          <p className="font-medium text-gray-900 dark:text-white truncate">{profile.father_name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">CNIC</p>
                          <p className="font-medium text-gray-900 dark:text-white">{profile.cnic}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Mobile</p>
                          <p className="font-medium text-gray-900 dark:text-white">{profile.mobile_no}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">WhatsApp</p>
                          <p className="font-medium text-gray-900 dark:text-white">{profile.whatsapp_no}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <UserCheck className="w-4 h-4 text-gray-500" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                          <p className="font-medium text-gray-900 dark:text-white">{profile.gender}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Heart className="w-4 h-4 text-gray-500" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Religion</p>
                          <p className="font-medium text-gray-900 dark:text-white">{profile.religion}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-sm text-green-700 dark:text-green-300">Joined</p>
                          <p className="font-semibold text-green-800 dark:text-green-200">{formatDate(profile.created_at)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="text-sm text-purple-700 dark:text-purple-300">Current Hostel</p>
                          <p className="font-semibold text-purple-800 dark:text-purple-200">{profile.hostel_name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Address & Guardian Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Address Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Home Address</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.address}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{profile.city_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Current Location</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                      Guardian Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <User className="w-4 h-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Guardian Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.guardian_name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{profile.guardian_relation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Contact</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.guardian_mobile_no}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Academic Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="w-5 h-5 text-orange-600" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Institute</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{profile.institute_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{profile.department_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Registration</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.registration_number}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* No Data State */
            <Card>
              <CardContent className="py-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Profile Data
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Unable to load profile information at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}