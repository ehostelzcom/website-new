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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Settings,
  Star,
  Menu
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import logoSvg from "@assets/logo/Asset 3.svg";
import girlsHostelLogo from "@assets/logo/Asset 7.svg";
import boysHostelLogo from "@assets/logo/Asset 8.svg";

interface HostelInfo {
  user_id?: number;
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
  conference_logo_url: string;
  student_hostel_status?: string;
}

interface FeePaymentData {
  hostel_id: number;
  user_id?: number;
  serial: string;
  legend: string;
  label: string;
  amount: number;
}

interface ChartData {
  status: boolean;
  code: number;
  totals: {
    total_fees: number;
    total_payments: number;
    total_balance: number;
  };
  months: Array<{ serial: number; label: string; payable: number; paid: number }>;
}

interface RatingData {
  [key: string]: number;
}

// Star Rating Component
const StarRating = ({ rating, onRatingChange, questionId }: { rating: number; onRatingChange: (questionId: string, rating: number) => void; questionId: string }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(questionId, star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none transition-colors duration-200"
          data-testid={`star-${questionId}-${star}`}
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {rating > 0 ? `${rating}/5` : "Not rated"}
      </span>
    </div>
  );
};

export default function HostelDashboard() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/hostel-dashboard/:hostelId");
  const [hostelInfo, setHostelInfo] = useState<HostelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [ratings, setRatings] = useState<RatingData>({});
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [error, setError] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | string | null>(null);
  const [years, setYears] = useState<Array<{ key: number | string; value: number | string }>>([]);
  const [yearsLoading, setYearsLoading] = useState(false);
  const [yearChanging, setYearChanging] = useState(false);
  
  // Allotments state
  const [selectedAllotment, setSelectedAllotment] = useState<string | null>(null);
  const [allotments, setAllotments] = useState<Array<{ allotment_id: string; value: string }>>([]);
  const [allotmentsLoading, setAllotmentsLoading] = useState(false);
  const [allotmentChanging, setAllotmentChanging] = useState(false);

  const hostelId = params?.hostelId ? parseInt(params.hostelId) : null;

  useEffect(() => {
    const fetchStudentHostel = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Get user_id from localStorage (stored during login)
        const userId = localStorage.getItem("student_user_id");
        if (!userId) {
          setError("Please login first");
          setLocation("/student-login");
          return;
        }

        // Call student hostels API
        const response = await fetch(`/api/student-hostels/${userId}`);
        const data = await response.json();

        if (data.status && data.code === 200) {
          // Set hostel info from API response
          setHostelInfo(data.data);
        } else {
          setError(data.message || "Failed to fetch hostel data");
        }
      } catch (error) {
        console.error("Error fetching student hostel:", error);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentHostel();
  }, [hostelId, setLocation]);

  // Fetch years on component mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        setYearsLoading(true);
        const response = await fetch('/api/years');
        const data = await response.json();
        
        if (data.status && data.code === 200) {
          // Add overall option for all-time values at the beginning
          const yearsWithOverall = [
            { key: "overall", value: "overall" },
            ...data.data
          ];
          setYears(yearsWithOverall);
          // Set default year to Overall
          setSelectedYear('overall');
        }
      } catch (error) {
        console.error("Error fetching years:", error);
      } finally {
        setYearsLoading(false);
      }
    };

    const fetchAllotments = async () => {
      if (!hostelInfo?.user_id || !hostelInfo?.hostel_id) return;
      
      try {
        setAllotmentsLoading(true);
        const response = await fetch(`/api/student-allotments/${hostelInfo.user_id}/${hostelInfo.hostel_id}`);
        const data = await response.json();
        
        if (data.status && data.code === 200) {
          // Add overall option for all allotments at the beginning
          const allotmentsWithOverall = [
            { allotment_id: "overall", value: "All Allotments" },
            ...data.data
          ];
          setAllotments(allotmentsWithOverall);
          // Select "All Allotments" by default
          setSelectedAllotment("overall");
        }
      } catch (error) {
        console.error("Error fetching allotments:", error);
      } finally {
        setAllotmentsLoading(false);
      }
    };

    fetchYears();
    fetchAllotments();
  }, [hostelInfo]);

  // Handle year change with beautiful loading animation
  const handleYearChange = (value: string) => {
    setYearChanging(true);
    
    // Small delay for smooth loading experience
    setTimeout(() => {
      if (value === "overall") {
        setSelectedYear(null); // No year parameter = overall values
      } else {
        setSelectedYear(parseInt(value));
      }
      setYearChanging(false);
    }, 400);
  };

  // Handle allotment change with beautiful loading animation
  const handleAllotmentChange = (value: string) => {
    setAllotmentChanging(true);
    
    // Small delay for smooth loading experience
    setTimeout(() => {
      if (value === "overall") {
        setSelectedAllotment(null); // No allotment parameter = all allotments
      } else {
        setSelectedAllotment(value);
      }
      setAllotmentChanging(false);
    }, 400);
  };

  // Fetch chart data when hostel info, selected year, or selected allotment changes
  useEffect(() => {
    const fetchChartData = async () => {
      if (!hostelInfo?.user_id || !hostelInfo?.hostel_id) return;
      
      try {
        setChartLoading(true);
        setChartError("");
        
        // Build URL with optional parameters
        let apiUrl = `/api/student-dashboard-fees-payments/${hostelInfo.user_id}/${hostelInfo.hostel_id}`;
        const params = [];
        
        if (selectedYear) {
          params.push(`year=${selectedYear}`);
        }
        
        if (selectedAllotment) {
          params.push(`allotment_id=${selectedAllotment}`);
        }
        
        if (params.length > 0) {
          apiUrl += `?${params.join('&')}`;
        }
        
        // Call dashboard fees/payments API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status && data.code === 200) {
          setChartData(data);
        } else {
          setChartError(data.message || "Failed to fetch chart data");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setChartError("Network error. Please try again.");
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [hostelInfo, selectedYear, selectedAllotment]);

  // Helper function to format Pakistani Rupees
  const formatCurrency = (amount: number): string => {
    return `Rs ${amount.toLocaleString()}`;
  };

  // Helper function to combine fees and payments data for charts
  const getCombinedChartData = () => {
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize all 12 months with zero values
    const monthsMap = new Map();
    monthOrder.forEach(month => {
      monthsMap.set(month, { month, payable: 0, paid: 0 });
    });
    
    if (chartData && chartData.months) {
      // Process months data from new API format
      chartData.months.forEach(monthData => {
        if (monthsMap.has(monthData.label)) {
          monthsMap.set(monthData.label, {
            month: monthData.label,
            payable: monthData.payable,
            paid: monthData.paid
          });
        }
      });
    }
    
    // Return all 12 months in correct order
    return monthOrder.map(month => monthsMap.get(month));
  };

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (!chartData || !chartData.months) return { totalFees: 0, totalPaid: 0, outstanding: 0 };
    
    const totalFees = chartData.months.reduce((sum, month) => sum + month.payable, 0);
    const totalPaid = chartData.months.reduce((sum, month) => sum + month.paid, 0);
    const outstanding = totalFees - totalPaid;
    
    return { totalFees, totalPaid, outstanding };
  };

  const handleLogout = () => {
    setLocation("/student-login");
  };

  const handleProfile = () => {
    setActiveTab("profile");
  };

  const handleHostelCardClick = () => {
    if (hostelInfo) {
      setLocation(`/hostel-dashboard/${hostelInfo.hostel_id}`);
      // When clicking on hostel card, go to dashboard page
      setActiveTab("dashboard");
    }
  };

  const handleRatingChange = (questionId: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleRatingSubmit = async () => {
    setIsSubmittingRating(true);
    // TODO: Submit ratings to API
    setTimeout(() => {
      setIsSubmittingRating(false);
      // Show success message or handle response
      console.log("Ratings submitted:", ratings);
    }, 1000);
  };

  const ratingQuestions = [
    { id: "cleanliness", question: "How would you rate the cleanliness of the hostel?" },
    { id: "staff", question: "How helpful and friendly is the staff?" },
    { id: "facilities", question: "How would you rate the hostel facilities?" },
    { id: "security", question: "How secure do you feel at this hostel?" },
    { id: "food", question: "How would you rate the food quality?" },
    { id: "wifi", question: "How would you rate the WiFi and internet connectivity?" },
    { id: "location", question: "How convenient is the hostel location?" },
    { id: "overall", question: "Overall, how would you rate your experience?" }
  ];

  // Check if we should show sidebar and hostel info
  const showSidebar = activeTab !== "home";
  const showHostelInfo = activeTab !== "home";

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "fees", label: "Fees", icon: CreditCard },
    { id: "payments", label: "Payments", icon: Receipt },
    { id: "rating", label: "Rating", icon: Star },
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
      {/* Desktop Sidebar - Conditional */}
      {showSidebar && (
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
      )}

      {/* Mobile Sidebar - Sheet Component */}
      {showSidebar && (
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
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === item.id
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
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-white/10">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              {showSidebar && (
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(true)}
                    className="mr-2"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>
              )}

              {/* Hostel Information - Conditional */}
              {showHostelInfo && hostelInfo && (
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
              )}
              
              {/* Show logo on Home page when sidebar is hidden */}
              {!showSidebar && (
                <div className="flex items-center">
                  <img 
                    src={logoSvg} 
                    alt="ehostelz.com" 
                    className="h-10 w-auto"
                    data-testid="img-header-logo"
                  />
                </div>
              )}
              
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
                    <span className="font-medium">{hostelInfo?.presenter_name || "Student"}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {hostelInfo?.presenter_name || "Student"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {hostelInfo?.user_role || "Student"} - {hostelInfo?.hostel_name}
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

              {hostelInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card 
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl"
                    onClick={handleHostelCardClick}
                    data-testid={`card-hostel-${hostelInfo.hostel_id}`}
                  >
                    <div className="p-4">
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img 
                              src={hostelInfo.hostel_type === "Boys" ? girlsHostelLogo : boysHostelLogo}
                              alt={`${hostelInfo.hostel_type} Hostel`}
                              className="w-8 h-8"
                            />
                          </div>
                          
                          {/* Hostel Name and Type */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {hostelInfo.hostel_name}
                              </h3>
                              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                                <User className="w-4 h-4" />
                                <span>{hostelInfo.hostel_type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <Badge className="bg-blue-600 hover:bg-blue-600 text-white text-sm px-3 py-1 flex-shrink-0">
                          {hostelInfo.student_hostel_status || "Active"}
                        </Badge>
                      </div>

                      {/* Location Info */}
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {hostelInfo.hostel_city_name}
                          </p>
                          <p className="text-xs leading-relaxed">
                            {hostelInfo.hostel_address}
                          </p>
                        </div>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {hostelInfo.hostel_mobile_no}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">No hostel data found</p>
                </div>
              )}
            </div>
          )}

          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard Overview
                </h2>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Allotment Dropdown */}
                  <div className="flex items-center space-x-2">
                    <Select
                      value={selectedAllotment || "overall"}
                      onValueChange={handleAllotmentChange}
                      disabled={allotmentsLoading || allotmentChanging}
                    >
                      <SelectTrigger className="w-48 h-8 text-sm">
                        <SelectValue placeholder="All Allotments" />
                      </SelectTrigger>
                      <SelectContent>
                        {allotments.map((allotment) => (
                          <SelectItem key={allotment.allotment_id} value={allotment.allotment_id}>
                            {allotment.allotment_id === "overall" ? "All Allotments" : allotment.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year Dropdown */}
                  <div className="flex items-center space-x-2">
                    <Select
                      value={selectedYear?.toString() || "overall"}
                      onValueChange={handleYearChange}
                      disabled={yearsLoading || yearChanging}
                    >
                      <SelectTrigger className="w-32 h-8 text-sm">
                        <SelectValue placeholder="Overall" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.key} value={year.value.toString()}>
                            {year.value === "overall" ? "Overall" : year.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {(chartLoading || yearChanging || allotmentChanging) ? (
                <div className="text-center py-8">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {(yearChanging || allotmentChanging) ? "Filtering data..." : "Loading dashboard data..."}
                    </p>
                  </div>
                </div>
              ) : chartError ? (
                <div className="text-center py-8">
                  <p className="text-red-600 dark:text-red-400">{chartError}</p>
                </div>
              ) : (
                <>
                  {/* Summary Cards */}
                  
                  {/* Totals Summary Cards */}
                  {chartData && chartData.totals && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* Total Fees */}
                      <Card className="shadow-lg border border-red-300 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-red-800 dark:text-red-200">Total Fees</p>
                              <p className="text-3xl font-bold text-red-900 dark:text-red-100">
                                {formatCurrency(chartData.totals.total_fees)}
                              </p>
                            </div>
                            <div className="w-12 h-12 bg-red-300 dark:bg-red-700 rounded-full flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-red-700 dark:text-red-300" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Total Payments */}
                      <Card className="shadow-lg border border-green-300 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Payments</p>
                              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                                {formatCurrency(chartData.totals.total_payments)}
                              </p>
                            </div>
                            <div className="w-12 h-12 bg-green-300 dark:bg-green-700 rounded-full flex items-center justify-center">
                              <Receipt className="w-6 h-6 text-green-700 dark:text-green-300" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Balance */}
                      <Card className={`shadow-md border ${
                        chartData.totals.total_balance === 0 
                          ? 'border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20'
                          : chartData.totals.total_balance > 0
                          ? 'border-orange-100 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
                          : 'border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`text-sm font-medium ${
                                chartData.totals.total_balance === 0 
                                  ? 'text-gray-700 dark:text-gray-300'
                                  : chartData.totals.total_balance > 0
                                  ? 'text-orange-700 dark:text-orange-300'
                                  : 'text-blue-700 dark:text-blue-300'
                              }`}>Balance</p>
                              <p className={`text-2xl font-bold ${
                                chartData.totals.total_balance === 0 
                                  ? 'text-gray-800 dark:text-gray-200'
                                  : chartData.totals.total_balance > 0
                                  ? 'text-orange-800 dark:text-orange-200'
                                  : 'text-blue-800 dark:text-blue-200'
                              }`}>
                                {formatCurrency(Math.abs(chartData.totals.total_balance))}
                                {chartData.totals.total_balance > 0 ? ' Due' : chartData.totals.total_balance < 0 ? ' Credit' : ''}
                              </p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              chartData.totals.total_balance === 0 
                                ? 'bg-gray-200 dark:bg-gray-800/50'
                                : chartData.totals.total_balance > 0
                                ? 'bg-orange-200 dark:bg-orange-800/50'
                                : 'bg-blue-200 dark:bg-blue-800/50'
                            }`}>
                              <Building2 className={`w-6 h-6 ${
                                chartData.totals.total_balance === 0 
                                  ? 'text-gray-600 dark:text-gray-400'
                                  : chartData.totals.total_balance > 0
                                  ? 'text-orange-600 dark:text-orange-400'
                                  : 'text-blue-600 dark:text-blue-400'
                              }`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Chart */}
                  <div className="w-full">
                    {/* Fees vs Payments Bar Chart */}
                    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2" style={{ color: '#004e89' }}>
                          <BarChart3 className="w-6 h-6" style={{ color: '#004e89' }} />
                          Monthly Financial Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-4 md:p-6">
                        {chartData ? (
                          <div className="w-full overflow-x-auto">
                            <ResponsiveContainer width="100%" height={350} minWidth={300}>
                              <BarChart 
                                data={getCombinedChartData()}
                                margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                                barCategoryGap="20%"
                              >
                                <defs>
                                  <linearGradient id="payableGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7} />
                                  </linearGradient>
                                  <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid 
                                  strokeDasharray="3 3" 
                                  stroke="#e5e7eb" 
                                  strokeOpacity={0.6}
                                />
                                <XAxis 
                                  dataKey="month" 
                                  tick={{ fontSize: 12, fill: '#6b7280' }}
                                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                                  tickLine={{ stroke: '#d1d5db' }}
                                />
                                <YAxis 
                                  tickFormatter={(value) => `Rs ${(value/1000)}k`}
                                  tick={{ fontSize: 12, fill: '#6b7280' }}
                                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                                  tickLine={{ stroke: '#d1d5db' }}
                                />
                                <Tooltip 
                                  formatter={(value: number, name: string, props: any) => {
                                    const monthLabel = props.payload?.label || '';
                                    const dataKey = props.dataKey;
                                    const label = dataKey === 'payable' ? `${monthLabel} Payable` : `${monthLabel} Paid`;
                                    return [formatCurrency(value), label];
                                  }}
                                  labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                                  contentStyle={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    fontSize: '14px'
                                  }}
                                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                />
                                <Legend 
                                  verticalAlign="top"
                                  height={50}
                                  wrapperStyle={{ paddingBottom: '30px', fontSize: '14px' }}
                                  iconType="circle"
                                />
                                <Bar 
                                  dataKey="payable" 
                                  fill="url(#payableGradient)" 
                                  name="Payable Fees"
                                  radius={[4, 4, 0, 0]}
                                  maxBarSize={40}
                                />
                                <Bar 
                                  dataKey="paid" 
                                  fill="url(#paidGradient)" 
                                  name="Paid Fees"
                                  radius={[4, 4, 0, 0]}
                                  maxBarSize={40}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        ) : (
                          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 dark:text-gray-400 font-medium">
                                Loading chart data...
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                  </div>
                </>
              )}
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

          {/* Rating Content */}
          {activeTab === "rating" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Rate Your Experience
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Help other students by sharing your honest feedback about {hostelInfo?.hostel_name}
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Hostel Rating Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {ratingQuestions.map((question, index) => (
                      <div key={question.id} className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {index + 1}. {question.question}
                        </h3>
                        <StarRating
                          rating={ratings[question.id] || 0}
                          onRatingChange={handleRatingChange}
                          questionId={question.id}
                        />
                      </div>
                    ))}

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-end space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setRatings({})}
                          disabled={isSubmittingRating}
                        >
                          Clear All Ratings
                        </Button>
                        <Button
                          onClick={handleRatingSubmit}
                          disabled={isSubmittingRating || Object.keys(ratings).length === 0}
                          className="bg-gradient-to-r from-[#004e89] to-[#0066b3] hover:from-[#003a6b] hover:to-[#004e89] text-white"
                        >
                          {isSubmittingRating ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            "Submit Rating"
                          )}
                        </Button>
                      </div>
                    </div>
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