import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "wouter";
// useAuth not needed - authentication handled at parent level
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CalendarDays, Search, Filter, Receipt, ChevronLeft, ChevronRight, Home, BarChart3, CreditCard, Star, User, Menu } from 'lucide-react';
import logoSvg from "@assets/logo/Asset 3.svg";
import { format } from 'date-fns';

// Types for fee data
interface FeeRecord {
  serial_no: number;
  seat_title: string;
  month_of: string;
  due_date: string;
  fee_amount: number;
  discount: number;
  payable_amount: number;
  total_payment: number;
  remaining_balance: number;
  payment_status: string;
  badge_state: string;
  badge_icon: string;
  created_at: string;
  hostel_id: number;
}

interface FeesResponse {
  status: boolean;
  code: number;
  data: FeeRecord[];
}

interface AllotmentRecord {
  allotment_id: string;
  value: string;
}

interface AllotmentsResponse {
  status: boolean;
  code: number;
  data: AllotmentRecord[];
}

interface FeesProps {
  standalone?: boolean; // Whether this is a standalone page or embedded in dashboard
}

export default function Fees({ standalone = true }: FeesProps) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  const hostelId = localStorage.getItem('student_hostel_id');
  
  // For standalone mode, use default values if localStorage is empty (for testing)
  const finalStudentUserId = studentUserId || '101';
  const finalHostelId = hostelId || '2';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [allotmentFilter, setAllotmentFilter] = useState('all'); // This will store allotment_id
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch allotments data for seat filter dropdown
  const { data: allotmentsData } = useQuery<AllotmentsResponse>({
    queryKey: ['/api/student-allotments', finalStudentUserId, finalHostelId],
    enabled: !!finalStudentUserId && !!finalHostelId,
  });

  // Fetch fees data - include allotment_id if specific allotment is selected
  const { data: feesData, isLoading, error } = useQuery<FeesResponse>({
    queryKey: ['/api/student-fees', finalStudentUserId, finalHostelId, allotmentFilter !== 'all' ? allotmentFilter : undefined],
    enabled: !!finalStudentUserId && !!finalHostelId,
  });

  // Get unique values for filters
  const uniqueMonths = Array.from(
    new Set(feesData?.data?.map(fee => fee.month_of) || [])
  ).sort();
  
  // uniqueSeats removed - now using allotments API data

  const uniqueStatuses = Array.from(
    new Set(feesData?.data?.map(fee => fee.payment_status) || [])
  ).sort();

  // Filter and search logic (seat filtering now done server-side via API)
  const filteredData = feesData?.data?.filter(fee => {
    const matchesSearch = 
      fee.seat_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.month_of.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.payment_status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || fee.payment_status === statusFilter;
    const matchesMonth = monthFilter === 'all' || fee.month_of === monthFilter;
    // Seat filtering removed - now handled by API with allotment_id parameter
    
    return matchesSearch && matchesStatus && matchesMonth;
  }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toLocaleString('en-PK')}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Get badge variant based on status
  const getBadgeVariant = (badgeState: string) => {
    switch (badgeState) {
      case 'success':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'danger':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, monthFilter, allotmentFilter]);

  // Only check authentication for standalone mode if we have no fallback values
  if (standalone && (!finalStudentUserId || !finalHostelId)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please log in to view fees.</p>
        </div>
      </div>
    );
  }

  const content = (
    <>
      {/* Header - only show in standalone mode */}
      {standalone && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fee Records</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your hostel fee payments and transactions
          </p>
        </div>
      )}

        {/* Filters Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <CardDescription>
              Filter and search through your fee records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by seat, month, status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-fees"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger data-testid="select-payment-status">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Month Filter */}
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger data-testid="select-month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {uniqueMonths.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* All Allotments Filter */}
              <Select value={allotmentFilter} onValueChange={setAllotmentFilter}>
                <SelectTrigger data-testid="select-allotment">
                  <SelectValue placeholder="All Allotments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Allotments</SelectItem>
                  {allotmentsData?.data?.map((allotment) => (
                    <SelectItem key={allotment.allotment_id} value={allotment.allotment_id}>
                      {allotment.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setMonthFilter('all');
                  setAllotmentFilter('all');
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} records
          </p>
          {searchTerm && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search results for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Table Card */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading fee records...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">Failed to load fee records</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Please try again later</p>
              </div>
            ) : currentData.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredData.length === 0 && (searchTerm || statusFilter !== 'all' || monthFilter !== 'all' || allotmentFilter !== 'all')
                    ? 'No records match your filters'
                    : 'No fee records found'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Serial</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Fee Amount</TableHead>
                      <TableHead className="text-right">Discount</TableHead>
                      <TableHead className="text-right">Payable</TableHead>
                      <TableHead className="text-right">Paid</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.map((fee) => (
                      <TableRow key={fee.serial_no} data-testid={`row-fee-${fee.serial_no}`}>
                        <TableCell className="font-medium">{fee.serial_no}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-gray-400" />
                            {fee.seat_title}
                          </div>
                        </TableCell>
                        <TableCell>{fee.month_of}</TableCell>
                        <TableCell>{formatDate(fee.due_date)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(fee.fee_amount)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          {fee.discount > 0 ? `-${formatCurrency(fee.discount)}` : '-'}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(fee.payable_amount)}
                        </TableCell>
                        <TableCell className="text-right font-medium text-blue-600">
                          {formatCurrency(fee.total_payment)}
                        </TableCell>
                        <TableCell className="text-right">
                          {fee.remaining_balance > 0 ? (
                            <span className="text-red-600 font-medium">
                              {formatCurrency(fee.remaining_balance)}
                            </span>
                          ) : (
                            <span className="text-green-600">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(fee.badge_state)}>
                            {fee.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {format(new Date(fee.created_at), 'dd MMM yyyy')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                data-testid="button-previous-page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                      data-testid={`button-page-${pageNum}`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                data-testid="button-next-page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
    </>
  );

  // Navigation items
  const sidebarItems = [
    { id: "home", label: "Home", icon: Home, route: "/home" },
    { id: "dashboard", label: "Dashboard", icon: BarChart3, route: "/dashboard" },
    { id: "fees", label: "Fees", icon: CreditCard, route: "/fees" },
    { id: "payments", label: "Payments", icon: Receipt, route: "/payments" },
    { id: "rating", label: "Rating", icon: Star, route: "/home" },
    { id: "profile", label: "Profile", icon: User, route: "/home" },
  ];

  // Return content with or without page wrapper based on standalone prop
  if (standalone) {
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
                      item.id === "fees"
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
                        item.id === "fees"
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
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fee Records</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View and manage your hostel fee payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 lg:p-6">
            {content}
          </main>
        </div>
      </div>
    );
  }

  return content;
}