import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// useAuth not needed - authentication handled at parent level
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Search, Filter, Receipt, ChevronLeft, ChevronRight } from 'lucide-react';
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
  // Get user data from localStorage for API calls
  const studentUserId = localStorage.getItem('student_user_id');
  const hostelId = localStorage.getItem('student_hostel_id');
  
  // Debug logging
  console.log('Fees component - studentUserId:', studentUserId, 'hostelId:', hostelId);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [seatFilter, setSeatFilter] = useState('all'); // This will store allotment_id
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch allotments data for seat filter dropdown
  const { data: allotmentsData } = useQuery<AllotmentsResponse>({
    queryKey: ['/api/student-allotments', studentUserId, hostelId],
    enabled: !!studentUserId && !!hostelId,
  });

  // Fetch fees data - include allotment_id if specific seat is selected
  const { data: feesData, isLoading, error } = useQuery<FeesResponse>({
    queryKey: ['/api/student-fees', studentUserId, hostelId, seatFilter !== 'all' ? seatFilter : undefined],
    queryFn: async () => {
      let url = `/api/student-fees/${studentUserId}/${hostelId}`;
      if (seatFilter !== 'all') {
        url += `?allotment_id=${seatFilter}`;
      }
      console.log('Fetching fees from URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Fees API error:', response.status, response.statusText);
        throw new Error(`Failed to fetch fees data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fees API response:', data);
      return data;
    },
    enabled: !!studentUserId && !!hostelId,
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
  }, [searchTerm, statusFilter, monthFilter, seatFilter]);

  // Only check authentication for standalone mode
  if (standalone && (!studentUserId || !hostelId)) {
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

              {/* Seat/Allotment Filter */}
              <Select value={seatFilter} onValueChange={setSeatFilter}>
                <SelectTrigger data-testid="select-seat">
                  <SelectValue placeholder="All Seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seats</SelectItem>
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
                  setSeatFilter('all');
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
                  {filteredData.length === 0 && (searchTerm || statusFilter !== 'all' || monthFilter !== 'all' || seatFilter !== 'all')
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

  // Return content with or without page wrapper based on standalone prop
  if (standalone) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {content}
        </div>
      </div>
    );
  }

  return content;
}