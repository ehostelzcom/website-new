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
    <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 hover:scale-[1.02] bg-gradient-to-br from-white via-gray-50/50 to-primary/5 dark:from-gray-800 dark:via-gray-700/50 dark:to-primary/10 shadow-lg hover:shadow-primary/20 overflow-hidden" onClick={onClick}>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary/10 via-white to-primary/5 dark:from-primary/20 dark:via-gray-800 dark:to-primary/10 p-6 border-b border-primary/10">
        <div className="flex items-center gap-4">
          {/* Enhanced logo presentation */}
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-600 shadow-lg border-2 border-white dark:border-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img 
                src={logo} 
                alt={`${hostel.name} logo`}
                className="w-10 h-10 object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -top-2 -right-2">
              <Badge 
                variant={hostel.type === "Boys" ? "default" : "secondary"}
                className={`text-xs font-semibold shadow-lg ${hostel.type === "Boys" ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'} text-white border-0`}
              >
                {hostel.type}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 mb-1">
              {hostel.name}
            </h3>
            {/* Enhanced rating section */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">4.5</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">(24 reviews)</span>
              </div>
              <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                Available
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Enhanced Address Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Location</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {hostel.address}
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Contact Info */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Mobile</p>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {hostel.mobile}
                </span>
              </div>
            </div>
            {hostel.phone && (
              <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">Landline</p>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {hostel.phone}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Action Button */}
          <div className="pt-2">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold text-sm py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] border-0"
              data-testid={`button-view-seats-${hostel.id}`}
            >
              <Bed className="w-5 h-5 mr-2" />
              Check Vacant Seats
              <Eye className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}