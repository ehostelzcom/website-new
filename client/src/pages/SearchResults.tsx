import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { ArrowLeft, Search, MapPin, Phone, Users, Star, Bed } from "lucide-react";
const asset9 = "/logo/asset-9.svg";
const asset3 = "/logo/asset-3.svg";
import { useProvinces } from "@/hooks/useProvinces";
import { useCities } from "@/hooks/useCities";
import { useLocations } from "@/hooks/useLocations";
import HostelCard from "../components/ui/hostel-card";
import VacantSeatsModal from "../components/ui/vacant-seats-modal";

// Rating structure from API
interface Rating {
  rating_id: number;
  score: number;
  description: string;
  comment_suggestions: string;
}

interface UserRating {
  user_id: number;
  full_name: string;
  ratings: Rating[];
}

// Hostel type definition based on API response
export interface Hostel {
  hostel_id?: number;
  group_name: string;
  hostel_name: string;
  hostel_type: string;
  mobile: string;
  whatsapp: string;
  province: string;
  city_name: string;
  location: string;
  address: string;
  rating: number | string; // Backward compatibility
  hostel_review_counts?: number;
  hostel_avg_rating?: number;
  ratings?: UserRating[]; // New ratings data from API
  wifi?: number; // 1 = available, 0 = not available
  security?: number; // 1 = available, 0 = not available
  food?: number; // 1 = available, 0 = not available
  solar_system?: number; // 1 = available, 0 = not available
  low_rent?: number; // Minimum rent amount
  high_rent?: number; // Maximum rent amount
  rate_type?: string; // e.g., "per month", "per day"
}

interface SearchParams {
  province: string;
  city: string;
  location?: string;
}

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    province: "",
    city: "",
    location: ""
  });
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [vacantSeatsModalOpen, setVacantSeatsModalOpen] = useState(false);

  // Get URL search params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const province = urlParams.get("province") || "";
    const city = urlParams.get("city") || "";
    const location = urlParams.get("location") || "";
    
    setSearchParams({ province, city, location });
    
    // Auto-search if we have province and city
    if (province && city) {
      handleSearch({ province, city, location });
    }
  }, []);

  // Location hierarchy hooks
  const { data: provinces } = useProvinces();
  const selectedProvinceId = searchParams.province ? parseInt(searchParams.province) : undefined;
  const { data: cities } = useCities(selectedProvinceId);
  const selectedCityId = searchParams.city ? parseInt(searchParams.city) : undefined;
  const { data: locations } = useLocations(selectedCityId);

  const handleSearch = async (params: SearchParams) => {
    if (!params.province || !params.city) return;
    
    setLoading(true);
    try {
      // Call the real API for finding hostels
      let apiUrl = `/api/find-hostels/${params.province}/${params.city}`;
      if (params.location) {
        apiUrl += `?location_id=${params.location}`;
      }
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search results received:', data);
      
      setHostels(data.hostels || []);
    } catch (error) {
      console.error("Error searching hostels:", error);
      setHostels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof SearchParams, value: string) => {
    const newParams = { ...searchParams, [field]: value };
    
    // Reset dependent fields
    if (field === "province") {
      newParams.city = "";
      newParams.location = "";
    } else if (field === "city") {
      newParams.location = "";
    }
    
    setSearchParams(newParams);
  };

  const handleHostelClick = (hostel: Hostel) => {
    setSelectedHostel(hostel);
    setVacantSeatsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Professional Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo and Title Section */}
            <div className="flex items-center gap-4">
              <img 
                src={asset3} 
                alt="ehostelz.com Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Search Results</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Find your perfect hostel accommodation</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setLocation("/");
                  // Small delay to ensure navigation completes, then scroll to find hostel section
                  setTimeout(() => {
                    const findHostelSection = document.getElementById('find-hostel');
                    if (findHostelSection) {
                      findHostelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 200);
                }}
                className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-200 px-6 py-2 font-medium"
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Province Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Province</label>
                  <Select 
                    value={searchParams.province} 
                    onValueChange={(value) => handleFilterChange("province", value)}
                  >
                    <SelectTrigger data-testid="select-filter-province">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {(provinces || []).map((province) => (
                        <SelectItem key={province.id} value={province.id.toString()}>
                          {province.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <SearchableSelect
                    options={cities || []}
                    value={searchParams.city}
                    onValueChange={(value) => handleFilterChange("city", value)}
                    placeholder={!selectedProvinceId ? "Select province first" : "Select city"}
                    disabled={!selectedProvinceId}
                    testId="select-filter-city"
                  />
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location (Optional)</label>
                  <SearchableSelect
                    options={locations || []}
                    value={searchParams.location || ""}
                    onValueChange={(value) => handleFilterChange("location", value)}
                    placeholder={!selectedCityId ? "Select city first" : "Select location"}
                    disabled={!selectedCityId}
                    testId="select-filter-location"
                  />
                </div>

                <Button 
                  onClick={() => handleSearch(searchParams)}
                  className="w-full"
                  disabled={!searchParams.province || !searchParams.city || loading}
                  data-testid="button-search-hostels"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {loading ? "Searching..." : "Search Hostels"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Searching hostels...</p>
                </div>
              </div>
            ) : hostels.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Found {hostels.length} Hostel{hostels.length !== 1 ? 's' : ''}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on any hostel to check vacant seats
                  </p>
                </div>
                <div className="space-y-4">
                  {hostels.map((hostel, index) => (
                    <HostelCard
                      key={hostel.hostel_id || index}
                      hostel={hostel}
                      index={index}
                      provinces={provinces || []}
                      cities={cities || []}
                      onClick={() => handleHostelClick(hostel)}
                    />
                  ))}
                </div>
              </>
            ) : searchParams.province && searchParams.city ? (
              <div className="text-center py-12">
                <img src={asset9} alt="No hostels found" className="w-16 h-16 mx-auto mb-4 opacity-60" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Hostels Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No hostels found in the selected area. Try different search criteria.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Search for Hostels
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use the filters on the left to search for hostels in your desired location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vacant Seats Modal */}
      <VacantSeatsModal
        hostel={selectedHostel}
        open={vacantSeatsModalOpen}
        onOpenChange={setVacantSeatsModalOpen}
        provinces={provinces}
        cities={cities}
      />
    </div>
  );
}