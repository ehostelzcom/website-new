import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Banknote, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Hostel } from "@/pages/SearchResults";

interface Rent {
  title: string;
  amount: number;
}

interface RentsModalProps {
  hostel: Hostel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RentsModal({ hostel, open, onOpenChange }: RentsModalProps) {
  const [rents, setRents] = useState<Rent[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Fetch rents when modal opens and hostel is selected
  useEffect(() => {
    if (open && hostel) {
      fetchRents(hostel.hostel_id || 0);
    }
  }, [open, hostel]);

  const fetchRents = async (hostelId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the real API
      const response = await axios.get(`/api/rents/${hostelId}`);
      console.log("Rents API response:", response.data);
      
      // Set the rents data from API
      setRents(response.data.data || []);
    } catch (err) {
      setError("Failed to load pricing information. Please try again.");
      console.error("Error fetching rents:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader className="space-y-3">
          {/* Enhanced Header with Hostel Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
            <DialogTitle className="text-2xl flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                <Banknote className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <span className="text-gray-900 dark:text-white">Pricing & Rates</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
                    {hostel?.hostel_name}
                  </Badge>
                </div>
              </div>
            </DialogTitle>
            
            <DialogDescription className="text-sm text-green-700 dark:text-green-300">
              View all pricing options and rental rates for different accommodation types
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto px-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Loading pricing information...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          ) : rents.length > 0 ? (
            <>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <Banknote className="w-5 h-5" />
                  Pricing Options ({rents.length} available)
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Choose from different accommodation types based on your budget and preferences
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50 dark:bg-green-900/20 hover:bg-green-50 dark:hover:bg-green-900/20">
                      <TableHead className="w-16 text-center font-semibold text-green-900 dark:text-green-100">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-green-900 dark:text-green-100 min-w-[200px]">
                        Accommodation Type
                      </TableHead>
                      <TableHead className="font-semibold text-green-900 dark:text-green-100 text-right">
                        Monthly Rate
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rents.map((rent, index) => (
                      <TableRow 
                        key={index} 
                        className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700"
                      >
                        <TableCell className="text-center font-medium text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                              <Banknote className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {rent.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(rent.amount)}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            per month
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Banknote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Pricing Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pricing details are not available yet. Please contact the hostel directly for rates and availability.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}