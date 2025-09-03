import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, User, MapPin, Loader2, AlertCircle, MessageCircle, Phone, Star, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Hostel } from "@/pages/SearchResults";
import asset8 from "@assets/logo/Asset 8.svg";
import asset9 from "@assets/logo/Asset 9.svg";

interface Province {
  id: number;
  title: string;
}

interface City {
  id: number;
  title: string;
  province_id: number;
}

// Vacant seat data structure
export interface VacantSeat {
  room_title: string;
  bed_title: string;
  seat_title: string;
  hostel_id: number;
  total_counts?: number;
  counts?: number;
}

interface VacantSeatsModalProps {
  hostel: Hostel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provinces?: Province[];
  cities?: City[];
}

export default function VacantSeatsModal({ hostel, open, onOpenChange, provinces, cities }: VacantSeatsModalProps) {
  // Province and city names are already strings in the API response
  const provinceName = hostel?.province;
  const cityName = hostel?.city_name;
  const [vacantSeats, setVacantSeats] = useState<VacantSeat[]>([]);
  const [loading, setLoading] = useState(false);
  const [requestedSeats, setRequestedSeats] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Group seats by room for better display with total counts
  const groupedSeats = vacantSeats.reduce((acc, seat) => {
    if (!acc[seat.room_title]) {
      acc[seat.room_title] = { 
        seats: [], 
        total_counts: seat.total_counts || 0,
        counts: seat.counts || 0
      };
    }
    acc[seat.room_title].seats.push(seat);
    return acc;
  }, {} as Record<string, { seats: VacantSeat[], total_counts: number, counts: number }>);

  // Fetch vacant seats when modal opens and hostel is selected
  useEffect(() => {
    if (open && hostel) {
      fetchVacantSeats(hostel.hostel_id || 0);
    }
  }, [open, hostel]);

  const fetchVacantSeats = async (hostelId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the real API
      const response = await axios.get(`/api/vacant-seats/${hostelId}`);
      
      // Check if response has the expected structure
      if (!response.data || !response.data.vacantSeats || !Array.isArray(response.data.vacantSeats)) {
        console.error("Invalid API response structure:", response.data);
        setError("Invalid response from server");
        return;
      }
      
      // Use the server's already transformed data
      const transformedSeats: VacantSeat[] = response.data.vacantSeats;
      
      // Set the vacant seats data
      setVacantSeats(transformedSeats);
    } catch (err) {
      setError("Failed to load vacant seats. Please try again.");
      console.error("Error fetching vacant seats:", err);
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp booking function
  const handleWhatsAppBooking = (seat: VacantSeat) => {
    if (!hostel) return;
    
    const seatKey = `${seat.room_title}-${seat.bed_title}-${seat.seat_title}`;
    
    // Add to requested seats immediately for visual feedback
    setRequestedSeats(prev => new Set(prev).add(seatKey));
    
    const message = `Hello! I'm interested in booking a seat at ${hostel.hostel_name}.

📍 Hostel: ${hostel.hostel_name}
🏠 Address: ${hostel.address}
🛏️ Room: ${seat.room_title}
🛏️ Bed: ${seat.bed_title}
🎯 Seat: ${seat.seat_title}

Please let me know about availability and booking process. Thank you!`;
    
    // Format mobile number for WhatsApp (remove any formatting)
    const mobileNumber = hostel.mobile.replace(/[^0-9]/g, '');
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${mobileNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Booking Request Sent!",
      description: `Your request for ${seat.room_title} - ${seat.seat_title} has been sent via WhatsApp.`,
      duration: 3000,
    });
    
    // Reset button state after 3 seconds
    setTimeout(() => {
      setRequestedSeats(prev => {
        const newSet = new Set(prev);
        newSet.delete(seatKey);
        return newSet;
      });
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] max-h-[95vh]">
        <DialogHeader className="space-y-3">
          {/* Enhanced Header with Hostel Info */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 border border-primary/20">
            <DialogTitle className="text-2xl flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                <img src={asset8} alt="Hostel icon" className="w-10 h-10" />
              </div>
              <div>
                <span className="text-gray-900 dark:text-white">{hostel?.hostel_name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {hostel?.hostel_type} Hostel
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-yellow-600 dark:text-yellow-400">4.5</span>
                  </div>
                </div>
              </div>
            </DialogTitle>
            
            {/* Location Information */}
            <div className="space-y-2">
              <DialogDescription className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {hostel?.location}, {cityName}, {provinceName}
                </span>
              </DialogDescription>
              <DialogDescription className="flex items-start gap-2 text-sm ml-6">
                <span className="text-gray-600 dark:text-gray-400">
                  {hostel?.address}
                </span>
              </DialogDescription>
              <DialogDescription className="flex items-center gap-2 text-sm ml-6">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  {hostel?.mobile}
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 max-h-[65vh] overflow-y-auto px-1">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Loading vacant seats...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => hostel && fetchVacantSeats(hostel.hostel_id || 0)}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : Object.keys(groupedSeats).length > 0 ? (
            <>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Available Seats ({vacantSeats.length} total)
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Click "Request Booking" to contact hostel via WhatsApp
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {Object.entries(groupedSeats).map(([roomTitle, roomData]) => (
                  <Card key={roomTitle} className="border-2 border-primary/30 bg-gradient-to-br from-white via-primary/5 to-primary/10 dark:from-gray-800 dark:via-primary/10 dark:to-primary/15 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <img src={asset9} alt="Room icon" className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{roomTitle} ({roomData.total_counts} Seaters - {roomData.counts} Vacant Seats)</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available beds for booking</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <Badge variant="outline" className="text-xs text-gray-600 dark:text-gray-400">
                            {roomData.seats.length}/{roomData.total_counts} available
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                        {roomData.seats.map((seat) => (
                          <div key={seat.seat_title} className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-2 hover:border-primary/50 hover:shadow-md transition-all duration-200 group">
                            <div className="flex flex-col items-center gap-1.5">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Bed className="w-4 h-4 text-primary" />
                              </div>
                              <div className="text-center min-h-[32px] flex flex-col justify-center">
                                <p className="font-medium text-xs text-gray-900 dark:text-white leading-tight">{seat.bed_title}</p>
                                <p className="text-xs text-primary font-medium">{seat.seat_title}</p>
                              </div>
                              {(() => {
                                const seatKey = `${seat.room_title}-${seat.bed_title}-${seat.seat_title}`;
                                const isRequested = requestedSeats.has(seatKey);
                                
                                return (
                                  <Button
                                    size="sm"
                                    onClick={() => handleWhatsAppBooking(seat)}
                                    disabled={isRequested}
                                    className={`w-full text-xs py-1.5 px-2 h-7 transition-all duration-200 ${
                                      isRequested 
                                        ? "bg-emerald-600 text-white cursor-default hover:bg-emerald-600" 
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                    data-testid={`button-book-${seat.seat_title}`}
                                  >
                                    {isRequested ? (
                                      <>
                                        <Check className="w-3 h-3" />
                                      </>
                                    ) : (
                                      <>
                                        <MessageCircle className="w-3 h-3" />
                                      </>
                                    )}
                                  </Button>
                                );
                              })()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Bed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Vacant Seats
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This hostel is currently full. Please check back later or contact them directly.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4" />
            <span>Contact: {hostel?.mobile}</span>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}