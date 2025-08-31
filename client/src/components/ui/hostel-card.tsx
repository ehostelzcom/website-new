import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Users, Star, Bed, Eye } from "lucide-react";
import type { Hostel } from "@/pages/SearchResults";
import asset7 from "@assets/logo/Asset 7.svg";
import asset8 from "@assets/logo/Asset 8.svg";

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
  
  // Get province and city names
  const province = provinces.find(p => p.id === hostel.province_id);
  const city = cities.find(c => c.id === hostel.city_id);
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary/30 bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:-translate-y-1" onClick={onClick}>
      <div className="p-6">
        <div className="flex items-center justify-between gap-6">
          {/* Left Section - Logo and Basic Info */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={logo} 
                alt={`${hostel.name} logo`}
                className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200 shadow-md"
              />
              <div className="absolute -top-2 -right-2">
                <Badge 
                  variant={hostel.type === "Boys" ? "default" : "secondary"}
                  className="text-xs font-semibold shadow-sm"
                >
                  {hostel.type}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-3">
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                  {hostel.name}
                </h3>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-base font-semibold text-yellow-600 dark:text-yellow-400">4.5</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">(24 reviews)</span>
                  </div>
                </div>
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{city?.title || 'Unknown City'}, {province?.title || 'Unknown Province'}</span>
                </div>
              </div>
              
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {hostel.address}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Section - Contact and Action */}
          <div className="flex flex-col items-end gap-4 min-w-0">
            {/* Contact Info */}
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  {hostel.mobile}
                </span>
              </div>
              {hostel.phone && (
                <div className="flex items-center gap-2 justify-end">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {hostel.phone}
                  </span>
                </div>
              )}
            </div>
            
            {/* Action Button */}
            <Button 
              size="lg"
              className="group-hover:bg-primary group-hover:text-white bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary/20 hover:border-primary transition-all duration-200 px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg"
              data-testid={`button-view-seats-${hostel.id}`}
            >
              <Bed className="w-5 h-5 mr-2" />
              Check Vacant Seats
              <Eye className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}