import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Users, Star, Bed, Eye } from "lucide-react";
import type { Hostel } from "@/pages/SearchResults";
import asset7 from "@assets/logo/Asset 7.svg";
import asset8 from "@assets/logo/Asset 8.svg";

interface HostelCardProps {
  hostel: Hostel;
  index: number;
  onClick: () => void;
}

export default function HostelCard({ hostel, index, onClick }: HostelCardProps) {
  // Alternate between Asset 7 and Asset 8 based on index
  const logo = index % 2 === 0 ? asset7 : asset8;
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 bg-white dark:bg-gray-800" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={logo} 
                alt={`${hostel.name} logo`}
                className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {hostel.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={hostel.type === "Boys" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {hostel.type}
                  </Badge>
                  {/* Placeholder for future rating */}
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {hostel.address}
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {hostel.mobile}
              </span>
            </div>
            {hostel.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {hostel.phone}
                </span>
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
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