import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Hostel } from "@/pages/SearchResults";
import asset8 from "@assets/logo/Asset 8.svg";

interface Facility {
  facility_id: number;
  title: string;
  description: string;
  hostel_id: number;
}

interface FacilitiesModalProps {
  hostel: Hostel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FacilitiesModal({ hostel, open, onOpenChange }: FacilitiesModalProps) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Fetch facilities when modal opens and hostel is selected
  useEffect(() => {
    if (open && hostel) {
      fetchFacilities(hostel.hostel_id || 0);
    }
  }, [open, hostel]);

  const fetchFacilities = async (hostelId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the real API
      const response = await axios.get(`/api/facilities/${hostelId}`);
      console.log("Facilities API response:", response.data);
      
      // Set the facilities data from API
      setFacilities(response.data.data || []);
    } catch (err) {
      setError("Failed to load facilities. Please try again.");
      console.error("Error fetching facilities:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh]">
        <DialogHeader className="space-y-3">
          {/* Enhanced Header with Hostel Info */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
            <DialogTitle className="text-2xl flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <span className="text-gray-900 dark:text-white">Facilities & Amenities</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
                    {hostel?.hostel_name}
                  </Badge>
                </div>
              </div>
            </DialogTitle>
            
            <DialogDescription className="text-sm text-blue-700 dark:text-blue-300">
              Explore all the facilities and amenities available at this hostel
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto px-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Loading facilities...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          ) : facilities.length > 0 ? (
            <>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Available Facilities ({facilities.length} total)
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Here are all the facilities and amenities provided by this hostel
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility) => (
                  <Card key={facility.facility_id} className="border-2 border-blue-100 dark:border-blue-800 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/30 dark:from-gray-800 dark:via-blue-900/10 dark:to-blue-800/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-base">{facility.title}</h4>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {facility.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Facilities Listed
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This hostel hasn't provided facility information yet. Please contact them directly for details.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}