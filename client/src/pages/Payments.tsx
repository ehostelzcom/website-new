import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Search, Filter, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
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
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  const hostelId = localStorage.getItem('student_hostel_id');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [allotmentFilter, setAllotmentFilter] = useState('all'); // This will store allotment_id
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch allotments data for seat filter dropdown
  const { data: allotmentsData } = useQuery<AllotmentsResponse>({
    queryKey: ['/api/student-allotments', studentUserId, hostelId],
    enabled: !!studentUserId && !!hostelId,
  });

  // Fetch payments data - include allotment_id if specific allotment is selected
  const { data: paymentsData, isLoading, error } = useQuery<PaymentsResponse>({
    queryKey: ['/api/student-payments', studentUserId, hostelId, allotmentFilter !== 'all' ? allotmentFilter : undefined],
    queryFn: async () => {
      let url = `/api/student-payments/${studentUserId}/${hostelId}`;
      if (allotmentFilter !== 'all') {
        url += `?allotment_id=${allotmentFilter}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch payments data: ${response.status} ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!studentUserId && !!hostelId,
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
  if (standalone && (!studentUserId || !hostelId)) {
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
      {/* Header - only show in standalone mode */}
      {standalone && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Records</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your hostel payment transactions and history
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
              Filter and search through your payment records
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
                  data-testid="input-search-payments"
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
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Due Date</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Fee Amount</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Discount</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Payable</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Paid</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Balance</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Method</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Type</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Status</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Date</TableHead>
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
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-gray-400" />
                              {formatDate(payment.created_at)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(payment.fee_amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(payment.discount)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(payment.payable_amount)}
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                            {formatCurrency(payment.payment_amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={payment.remaining_balance > 0 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                              {formatCurrency(payment.remaining_balance)}
                            </span>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          data-testid="button-prev-page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          data-testid="button-next-page"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
    </>
  );

  if (standalone) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
}