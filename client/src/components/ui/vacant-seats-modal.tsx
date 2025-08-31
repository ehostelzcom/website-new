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
import { Bed, User, MapPin, Loader2, AlertCircle } from "lucide-react";
import type { Hostel } from "@/pages/SearchResults";

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
}

export default function VacantSeatsModal({ hostel, open, onOpenChange }: VacantSeatsModalProps) {
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
          room_title: "GF-R02",
          bed_title: "B01",
          seat_title: "GF-R02-B01",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B01",
          seat_title: "FF-R03-B01",
          hostel_id: hostelId
        },
        {
          room_title: "FF-R03",
          bed_title: "B03",
          seat_title: "FF-R03-B03",
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

  const handleSeatSelect = (seat: VacantSeat) => {
    // TODO: Handle seat selection/booking
    console.log("Selected seat:", seat);
    // You can add booking functionality here in the future
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Bed className="w-6 h-6 text-primary" />
            {hostel?.name} - Vacant Seats
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {hostel?.address}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
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
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Available Seats ({vacantSeats.length} total)
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click on any seat to select it
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(groupedSeats).map(([roomTitle, seats]) => (
                  <Card key={roomTitle} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Room: {roomTitle}
                        <Badge variant="outline" className="ml-auto">
                          {seats.length} seat{seats.length !== 1 ? 's' : ''}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-2">
                        {seats.map((seat) => (
                          <Button
                            key={seat.seat_title}
                            variant="outline"
                            size="sm"
                            className="h-auto p-3 flex flex-col items-center gap-1 hover:bg-primary hover:text-white transition-colors"
                            onClick={() => handleSeatSelect(seat)}
                            data-testid={`button-seat-${seat.seat_title}`}
                          >
                            <Bed className="w-4 h-4" />
                            <span className="text-xs font-medium">{seat.bed_title}</span>
                            <span className="text-xs text-gray-500">{seat.seat_title}</span>
                          </Button>
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

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}