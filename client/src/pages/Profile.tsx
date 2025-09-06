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
            <div className="space-y-3">
              {/* Compact Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-4 text-white">
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 border-2 border-white/30">
                    <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                      {profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold truncate">{profile.full_name}</h1>
                    <p className="text-blue-100 text-sm">ID: {profile.user_id} • {profile.department_name}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-blue-200">Joined</p>
                    <p className="text-white font-medium">{formatDate(profile.created_at).split(',')[0]}</p>
                  </div>
                </div>
              </div>

              {/* Compact Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-blue-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Father</p>
                      <p className="text-sm font-medium truncate">{profile.father_name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-green-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Mobile</p>
                      <p className="text-sm font-medium">{profile.mobile_no}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-purple-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">CNIC</p>
                      <p className="text-sm font-medium">{profile.cnic}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3 h-3 text-orange-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm font-medium">{profile.gender}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3 h-3 text-red-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Religion</p>
                      <p className="text-sm font-medium">{profile.religion}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3 h-3 text-indigo-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">Hostel</p>
                      <p className="text-sm font-medium truncate">{profile.hostel_name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Section Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Address */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <h3 className="font-semibold text-sm">Address</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Home</p>
                      <p className="font-medium">{profile.address}, {profile.city_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="font-medium">{profile.location}</p>
                    </div>
                  </div>
                </Card>

                {/* Guardian */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-purple-600" />
                    <h3 className="font-semibold text-sm">Guardian</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">{profile.guardian_relation}</p>
                      <p className="font-medium">{profile.guardian_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="font-medium">{profile.guardian_mobile_no}</p>
                    </div>
                  </div>
                </Card>

                {/* Academic */}
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-orange-600" />
                    <h3 className="font-semibold text-sm">Academic</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Institute</p>
                      <p className="font-medium">{profile.institute_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Registration</p>
                      <p className="font-medium">{profile.registration_number}</p>
                    </div>
                  </div>
                </Card>
              </div>
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