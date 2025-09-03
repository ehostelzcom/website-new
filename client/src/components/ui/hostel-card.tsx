import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Bed, Eye, Settings, Banknote, Wifi, Shield, UtensilsCrossed, Sun } from "lucide-react";
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
        <div className="flex items-start justify-between gap-6">
          {/* Left Section - Logo and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img 
                src={logo} 
                alt={`${hostel.hostel_name} logo`}
                className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200 shadow-md"
              />
              <div className="absolute -top-2 -right-2">
                <Badge 
                  variant={hostel.hostel_type.toUpperCase() === "BOYS" ? "default" : "secondary"}
                  className="text-xs font-semibold shadow-sm"
                >
                  {hostel.hostel_type}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-3">
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                  {hostel.hostel_name}
                </h3>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-base font-semibold text-yellow-600 dark:text-yellow-400">{hostel.rating || "4.2"}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">(24 reviews)</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">
                    Available
                  </Badge>
                </div>
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{hostel.location}, {cityName}, {provinceName}</span>
                </div>
              </div>
              
              {/* Address */}
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Address</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {hostel.address}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {hostel.wifi === 1 && (
                  <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                    <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Wi-Fi</span>
                  </div>
                )}
                {hostel.security === 1 && (
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md border border-green-200 dark:border-green-800">
                    <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-300">Security</span>
                  </div>
                )}
                {hostel.food === 1 && (
                  <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md border border-orange-200 dark:border-orange-800">
                    <UtensilsCrossed className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Food</span>
                  </div>
                )}
                {hostel.solar_system === 1 && (
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md border border-yellow-200 dark:border-yellow-800">
                    <Sun className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Solar</span>
                  </div>
                )}
              </div>

            </div>
          </div>
          
          {/* Right Section - Action Buttons */}
          <div className="flex flex-col gap-3 min-w-0">
            {/* Primary Action Button */}
            <Button 
              size="lg"
              className="group-hover:bg-primary group-hover:text-white bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary/20 hover:border-primary transition-all duration-200 px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg"
              data-testid={`button-view-seats-${hostel.hostel_id || 0}`}
            >
              <Bed className="w-5 h-5 mr-2" />
              Check Vacant Seats
              <Eye className="w-5 h-5 ml-2" />
            </Button>
            
            {/* Secondary Action Buttons */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200 py-2 text-sm font-medium shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFacilitiesModalOpen(true);
                  }}
                  data-testid={`button-facilities-${hostel.hostel_id || 0}`}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Facilities
                </Button>
              </div>
              
              <div className="flex-1">
                <Button 
                  size="sm"
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-all duration-200 py-2 text-sm font-medium shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRentsModalOpen(true);
                  }}
                  data-testid={`button-rents-${hostel.hostel_id || 0}`}
                >
                  <Banknote className="w-4 h-4 mr-1" />
                  Pricing
                </Button>
                
                {/* Contact Information - Under Pricing Button */}
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-primary" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {hostel.mobile}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382"/>
                    </svg>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {hostel.whatsapp}
                    </span>
                  </div>
                </div>
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