import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "wouter";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CalendarDays, Search, Filter, CreditCard, ChevronLeft, ChevronRight, Home, BarChart3, Receipt, Star, User, Menu } from 'lucide-react';
import logoSvg from "@assets/logo/Asset 3.svg";
import StudentHeader from "@/components/shared/StudentHeader";
import { format } from 'date-fns';

// Types for payment data
interface PaymentRecord {
  serial_no: number;
  user_name: string;
  user_cnic: number;
  seat_title: string;
  fee_amount: number;
  discount: number;
  payable_amount: number;
  payment_amount: number;
  fee_payment_status: string;
  remaining_balance: number;
  payment_method: string;
  payment_type: string;
  month_of: string;
  due_date: string;
  fee_allotment_id: number;
  payment_id: number;
  created_at: string;
  created_name: string;
  fee_id: number;
  rent_id: number;
  allotment_id: number;
  user_id: number;
  bed_id: number;
  check_in: string;
  room_title: string;
  session_start: string;
  session_end: string;
}

interface PaymentsResponse {
  status: boolean;
  code: number;
  data: PaymentRecord[];
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

interface PaymentsProps {
  standalone?: boolean; // Whether this is a standalone page or embedded in dashboard
}

export default function Payments({ standalone = true }: PaymentsProps) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  const hostelId = localStorage.getItem('hostel_id');
  
  // For standalone mode, use default values if localStorage is empty (for testing)
  const finalStudentUserId = studentUserId || '101';
  const finalHostelId = hostelId || '2';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [allotmentFilter, setAllotmentFilter] = useState('all'); // This will store allotment_id
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch allotments data for seat filter dropdown
  const { data: allotmentsData } = useQuery<AllotmentsResponse>({
    queryKey: ['/api/student-allotments', finalStudentUserId, finalHostelId],
    enabled: !!finalStudentUserId && !!finalHostelId,
  });

  // Fetch hostel information
  const { data: hostelData } = useQuery<any>({
    queryKey: ['/api/student-hostels', finalStudentUserId],
    enabled: !!finalStudentUserId
  });

  // Fetch payments data - include allotment_id if specific allotment is selected
  const { data: paymentsData, isLoading, error } = useQuery<PaymentsResponse>({
    queryKey: ['/api/student-payments', finalStudentUserId, finalHostelId, allotmentFilter],
    queryFn: async () => {
      let url = `/api/student-payments/${finalStudentUserId}/${finalHostelId}`;
      if (allotmentFilter !== 'all') {
        url += `?allotment_id=${allotmentFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!finalStudentUserId && !!finalHostelId,
  });

  // Get unique values for filters
  const uniqueMonths = Array.from(
    new Set(paymentsData?.data?.map(payment => payment.month_of) || [])
  ).sort();

  const uniqueStatuses = Array.from(
    new Set(paymentsData?.data?.map(payment => payment.fee_payment_status) || [])
  ).sort();

  // Filter and search logic (seat filtering now done server-side via API)
  const filteredData = paymentsData?.data?.filter(payment => {
    const matchesSearch = 
      payment.seat_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.month_of.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.fee_payment_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payment_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.fee_payment_status === statusFilter;
    const matchesMonth = monthFilter === 'all' || payment.month_of === monthFilter;
    
    return matchesSearch && matchesStatus && matchesMonth;
  }) || [];

  // Pagination
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
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'default';
      case 'partial':
        return 'secondary';
      case 'unpaid':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, monthFilter, allotmentFilter]);

  // Only check authentication for standalone mode
  // Only check authentication for standalone mode if we have no fallback values
  if (standalone && (!finalStudentUserId || !finalHostelId)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Please log in to view payments.</p>
        </div>
      </div>
    );
  }

  const content = (
    <>
      {/* Compact Header - only show in standalone mode */}
      {standalone && (
        <div className="mb-4">
        </div>
      )}

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span>Payments</span>
        </div>

        {/* Compact Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {/* Search Input */}
            <div className="relative col-span-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 h-8 text-sm"
                data-testid="input-search-payments"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 text-sm" data-testid="select-payment-status">
                <SelectValue placeholder="Status" />
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
              <SelectTrigger className="h-8 text-sm" data-testid="select-month">
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

            {/* Allotments Filter */}
            <Select value={allotmentFilter} onValueChange={setAllotmentFilter}>
              <SelectTrigger className="h-8 text-sm" data-testid="select-allotment">
                <SelectValue placeholder="Allotment" />
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
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setMonthFilter('all');
                setAllotmentFilter('all');
              }}
              data-testid="button-clear-filters"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Compact Results Summary */}
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} records
          </p>
          {searchTerm && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              "{searchTerm}"
            </p>
          )}
        </div>

        {/* Table Card */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading payment records...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">Failed to load payment records</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Please try again later</p>
              </div>
            ) : currentData.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredData.length === 0 && (searchTerm || statusFilter !== 'all' || monthFilter !== 'all' || allotmentFilter !== 'all')
                    ? 'No records match your filters'
                    : 'No payment records found'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 dark:bg-gray-800">
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">S.No</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Seat</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Month</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Fee Amount</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Payable</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Paid</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Method</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Type</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Created at</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.map((payment) => (
                        <TableRow 
                          key={payment.payment_id} 
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          data-testid={`row-payment-${payment.payment_id}`}
                        >
                          <TableCell className="font-medium">{payment.serial_no}</TableCell>
                          <TableCell className="font-medium text-blue-600 dark:text-blue-400">
                            {payment.seat_title}
                          </TableCell>
                          <TableCell>{payment.month_of}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(payment.fee_amount)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(payment.payable_amount)}
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(payment.payment_amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                              {payment.payment_method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                              {payment.payment_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getBadgeVariant(payment.fee_payment_status)}
                              data-testid={`badge-status-${payment.fee_payment_status.toLowerCase()}`}
                            >
                              {payment.fee_payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">
                            {formatDate(payment.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

              </>
            )}
          </CardContent>
        </Card>

        {/* Rows per page and Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Rows per page:</span>
            <Select 
              value={itemsPerPage.toString()} 
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1); // Reset to first page when changing rows per page
              }}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
        </div>
    </>
  );

  // Navigation items
  const sidebarItems = [
    { id: "home", label: "Home", icon: Home, route: "/profile" },
    { id: "dashboard", label: "Dashboard", icon: BarChart3, route: "/dashboard" },
    { id: "fees", label: "Fees", icon: CreditCard, route: "/fees" },
    { id: "payments", label: "Payments", icon: Receipt, route: "/payments" },
    { id: "rating", label: "Rating", icon: Star, route: "/rating" },
    { id: "profile", label: "Profile", icon: User, route: "/profile" },
  ];

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
                      item.id === "payments"
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
                        item.id === "payments"
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
            title=""
            sidebarItems={sidebarItems}
            activeItemId="payments"
            onMenuToggle={() => setSidebarOpen(true)}
            hostelInfo={hostelData?.data || undefined}
            showHostelInfo={!!hostelData?.data}
          />

          {/* Content */}
          <main className="flex-1 p-3 lg:p-4">
            {content}
          </main>
        </div>
      </div>
    );
  }

  return content;
}