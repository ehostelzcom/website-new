import { useState, useEffect } from "react";
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
import { Bed, User, MapPin, Loader2, AlertCircle, MessageCircle, Phone, Star } from "lucide-react";
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
}

interface VacantSeatsModalProps {
  hostel: Hostel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provinces?: Province[];
  cities?: City[];
}

export default function VacantSeatsModal({ hostel, open, onOpenChange, provinces, cities }: VacantSeatsModalProps) {
  // Get province and city names
  const province = provinces?.find(p => p.id === hostel?.province_id);
  const city = cities?.find(c => c.id === hostel?.city_id);
  const [vacantSeats, setVacantSeats] = useState<VacantSeat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Group seats by room for better display
  const groupedSeats = vacantSeats.reduce((acc, seat) => {
    if (!acc[seat.room_title]) {
      acc[seat.room_title] = [];
    }
    acc[seat.room_title].push(seat);
    return acc;
  }, {} as Record<string, VacantSeat[]>);

  // Fetch vacant seats when modal opens and hostel is selected
  useEffect(() => {
    if (open && hostel) {
      fetchVacantSeats(hostel.id);
    }
  }, [open, hostel]);

  const fetchVacantSeats = async (hostelId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get(`/api/vacant-seats/${hostelId}`);
      // setVacantSeats(response.data);
      
      // Mock data for now - will be replaced with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSeats: VacantSeat[] = [
        // Ground Floor Room 1 - 6 seats
        {
          room_title: "GF-R01",
          bed_title: "B01",
          seat_title: "GF-R01-B01",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R01",
          bed_title: "B02",
          seat_title: "GF-R01-B02",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R01",
          bed_title: "B03",
          seat_title: "GF-R01-B03",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R01",
          bed_title: "B04",
          seat_title: "GF-R01-B04",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R01",
          bed_title: "B05",
          seat_title: "GF-R01-B05",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R01",
          bed_title: "B06",
          seat_title: "GF-R01-B06",
          hostel_id: hostelId
        },
        // Ground Floor Room 2 - 5 seats
        {
          room_title: "GF-R02",
          bed_title: "B01",
          seat_title: "GF-R02-B01",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R02",
          bed_title: "B02",
          seat_title: "GF-R02-B02",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R02",
          bed_title: "B03",
          seat_title: "GF-R02-B03",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R02",
          bed_title: "B04",
          seat_title: "GF-R02-B04",
          hostel_id: hostelId
        },
        {
          room_title: "GF-R02",
          bed_title: "B05",
          seat_title: "GF-R02-B05",
          hostel_id: hostelId
        },
        // First Floor Room 3 - 7 seats
        {
          room_title: "FF-R03",
          bed_title: "B01",
          seat_title: "FF-R03-B01",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B02",
          seat_title: "FF-R03-B02",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B03",
          seat_title: "FF-R03-B03",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B04",
          seat_title: "FF-R03-B04",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B05",
          seat_title: "FF-R03-B05",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B06",
          seat_title: "FF-R03-B06",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B07",
          seat_title: "FF-R03-B07",
          hostel_id: hostelId
        }
      ];
      
      setVacantSeats(mockSeats);
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
    
    const message = `Hello! I'm interested in booking a seat at ${hostel.name}.

📍 Hostel: ${hostel.name}
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[95vh]">
        <DialogHeader className="space-y-3">
          {/* Enhanced Header with Hostel Info */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 border border-primary/20">
            <DialogTitle className="text-2xl flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <img src={asset8} alt="Hostel icon" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-gray-900 dark:text-white">{hostel?.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {hostel?.type} Hostel
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
                  {city?.title || 'Unknown City'}, {province?.title || 'Unknown Province'}
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
                  onClick={() => hostel && fetchVacantSeats(hostel.id)}
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
                {Object.entries(groupedSeats).map(([roomTitle, seats]) => (
                  <Card key={roomTitle} className="border-2 border-primary/30 bg-gradient-to-br from-white via-primary/5 to-primary/10 dark:from-gray-800 dark:via-primary/10 dark:to-primary/15 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <img src={asset9} alt="Room icon" className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">Room: {roomTitle}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available beds for booking</p>
                        </div>
                        <Badge variant="default" className="ml-auto bg-primary">
                          {seats.length} seat{seats.length !== 1 ? 's' : ''}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {seats.map((seat) => (
                          <div key={seat.seat_title} className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-700 dark:to-gray-750 rounded-xl border-2 border-gray-200 dark:border-gray-600 p-4 hover:border-primary/60 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center shadow-md">
                                <Bed className="w-6 h-6 text-primary" />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-sm text-gray-900 dark:text-white">{seat.bed_title}</p>
                                <p className="text-xs text-primary font-medium mb-2">{seat.seat_title}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleWhatsAppBooking(seat)}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs py-2.5 gap-1 shadow-md hover:shadow-lg transition-all duration-200"
                                data-testid={`button-book-${seat.seat_title}`}
                              >
                                <MessageCircle className="w-3 h-3" />
                                Request Booking
                              </Button>
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
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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