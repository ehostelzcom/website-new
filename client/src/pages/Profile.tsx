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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                        {profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {profile.full_name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Student ID: {profile.user_id}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Father's Name</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.father_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">CNIC</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.cnic}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Number</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.mobile_no}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp Number</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.whatsapp_no}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.gender}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Religion</p>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.religion}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDate(profile.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">City</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.city_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Hostel</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.hostel_name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guardian Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Guardian Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Guardian Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.guardian_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Relation</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.guardian_relation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Number</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.guardian_mobile_no}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.guardian_address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-orange-600" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Institute</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.institute_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.department_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Registration Number</p>
                      <p className="font-medium text-gray-900 dark:text-white">{profile.registration_number}</p>
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