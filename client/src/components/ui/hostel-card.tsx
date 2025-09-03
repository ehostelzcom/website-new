import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Bed, Eye, Settings, Banknote } from "lucide-react";
import type { Hostel } from "@/pages/SearchResults";
import asset7 from "@assets/logo/Asset 7.svg";
import asset8 from "@assets/logo/Asset 8.svg";
import FacilitiesModal from "./facilities-modal";
import RentsModal from "./rents-modal";

interface Province {
  id: number;
  title: string;
}

interface City {
  id: number;
  title: string;
  province_id: number;
}

interface HostelCardProps {
  hostel: Hostel;
  index: number;
  provinces: Province[];
  cities: City[];
  onClick: () => void;
}

export default function HostelCard({ hostel, index, provinces, cities, onClick }: HostelCardProps) {
  // Alternate between Asset 7 and Asset 8 based on index
  const logo = index % 2 === 0 ? asset7 : asset8;
  
  // Province and city names are already strings in the API response
  const provinceName = hostel.province;
  const cityName = hostel.city_name;
  
  // Modal states
  const [facilitiesModalOpen, setFacilitiesModalOpen] = useState(false);
  const [rentsModalOpen, setRentsModalOpen] = useState(false);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary/30 bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:-translate-y-1" onClick={(e) => {
      // Only trigger onClick if clicking on the card itself, not on modal buttons
      if (!facilitiesModalOpen && !rentsModalOpen) {
        onClick();
      }
    }}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={logo} 
                alt={`${hostel.hostel_name} logo`}
                className="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute -top-1 -right-1">
                <Badge 
                  variant={hostel.hostel_type.toUpperCase() === "BOYS" ? "default" : "secondary"}
                  className="text-xs font-medium px-1.5 py-0.5"
                >
                  {hostel.hostel_type}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Rating */}
            <div className="mb-2">
              <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-tight truncate">
                {hostel.hostel_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">{hostel.rating || "4.5"}</span>
                </div>
                <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 px-2 py-0.5">
                  Available
                </Badge>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="truncate">{hostel.location}, {cityName}</span>
            </div>
            
            {/* Contact */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-gray-900 dark:text-white truncate">{hostel.mobile}</span>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-100 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                  </svg>
                  <span className="text-xs font-medium text-gray-900 dark:text-white truncate">{hostel.whatsapp}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Primary Action */}
              <Button 
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 text-xs"
                data-testid={`button-view-seats-${hostel.hostel_id || 0}`}
              >
                <Bed className="w-3 h-3 mr-2" />
                Check Vacant Seats
                <Eye className="w-3 h-3 ml-2" />
              </Button>
              
              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 py-1 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFacilitiesModalOpen(true);
                  }}
                  data-testid={`button-facilities-${hostel.hostel_id || 0}`}
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Facilities
                </Button>
                
                <Button 
                  size="sm"
                  variant="outline"
                  className="text-xs border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 py-1 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRentsModalOpen(true);
                  }}
                  data-testid={`button-rents-${hostel.hostel_id || 0}`}
                >
                  <Banknote className="w-3 h-3 mr-1" />
                  Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Modals */}
      <FacilitiesModal
        hostel={hostel}
        open={facilitiesModalOpen}
        onOpenChange={(open) => {
          setFacilitiesModalOpen(open);
          // Ensure we don't trigger card click when modal closes
          if (!open) {
            setTimeout(() => {
              // Small delay to prevent any event bubbling
            }, 100);
          }
        }}
      />
      
      <RentsModal
        hostel={hostel}
        open={rentsModalOpen}
        onOpenChange={(open) => {
          setRentsModalOpen(open);
          // Ensure we don't trigger card click when modal closes
          if (!open) {
            setTimeout(() => {
              // Small delay to prevent any event bubbling
            }, 100);
          }
        }}
      />
    </Card>
  );
}