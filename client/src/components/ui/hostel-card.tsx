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
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary/30 bg-white dark:bg-gray-800 rounded-xl overflow-hidden" onClick={onClick}>
      <CardHeader className="p-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={logo} 
              alt={`${hostel.name} logo`}
              className="w-14 h-14 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-transform duration-200"
            />
            <Badge 
              variant={hostel.type === "Boys" ? "default" : "secondary"}
              className="absolute -top-2 -right-2 text-xs"
            >
              {hostel.type}
            </Badge>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">
              {hostel.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">4.5</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">(24 reviews)</span>
            </div>
            {/* Province and City */}
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{city?.title || 'Unknown City'}, {province?.title || 'Unknown Province'}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 pt-0">
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {hostel.address}
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {hostel.mobile}
            </span>
          </div>
          
          {/* Action Button */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200"
              data-testid={`button-view-seats-${hostel.id}`}
            >
              <Bed className="w-4 h-4 mr-2" />
              Check Vacant Seats
              <Eye className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}