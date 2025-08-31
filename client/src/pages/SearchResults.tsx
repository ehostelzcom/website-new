import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { ArrowLeft, Search, MapPin, Phone, Users, Star, Bed } from "lucide-react";
import { useProvinces } from "@/hooks/useProvinces";
import { useCities } from "@/hooks/useCities";
import { useLocations } from "@/hooks/useLocations";
import HostelCard from "../components/ui/hostel-card";
import VacantSeatsModal from "../components/ui/vacant-seats-modal";

// Hostel type definition
export interface Hostel {
  id: number;
  name: string;
  address: string;
  city_id: number;
  country_id: number;
  mobile: string;
  phone?: string;
  type: "Boys" | "Girls";
  province_id: number;
  location_id?: number;
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
      // TODO: Replace with actual API call
      // const response = await axios.get(`/api/search-hostels?province_id=${params.province}&city_id=${params.city}&location_id=${params.location || ''}`);
      
      // Mock data for now - will be replaced with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHostels: Hostel[] = [
        {
          id: 1,
          name: "Smart Boys Hostel",
          address: "123 Main Street, Block A",
          city_id: parseInt(params.city),
          country_id: 1,
          mobile: "03001234567",
          phone: "042-123456",
          type: "Boys",
          province_id: parseInt(params.province),
          location_id: params.location ? parseInt(params.location) : undefined
        },
        {
          id: 2,
          name: "Pearl Girls Hostel",
          address: "456 Garden Road, Block B",
          city_id: parseInt(params.city),
          country_id: 1,
          mobile: "03009876543",
          type: "Girls",
          province_id: parseInt(params.province),
          location_id: params.location ? parseInt(params.location) : undefined
        },
        {
          id: 3,
          name: "Elite Boys Hostel",
          address: "789 University Road, Block C",
          city_id: parseInt(params.city),
          country_id: 1,
          mobile: "03005555555",
          phone: "042-789012",
          type: "Boys",
          province_id: parseInt(params.province),
          location_id: params.location ? parseInt(params.location) : undefined
        },
        {
          id: 4,
          name: "Rose Girls Hostel",
          address: "321 Campus Avenue, Block D",
          city_id: parseInt(params.city),
          country_id: 1,
          mobile: "03007777777",
          type: "Girls",
          province_id: parseInt(params.province),
          location_id: params.location ? parseInt(params.location) : undefined
        }
      ];
      
      setHostels(mockHostels);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/")}
                className="flex items-center gap-2"
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search Results</h1>
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
                      {provinces?.map((province) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hostels.map((hostel, index) => (
                    <HostelCard
                      key={hostel.id}
                      hostel={hostel}
                      index={index}
                      onClick={() => handleHostelClick(hostel)}
                    />
                  ))}
                </div>
              </>
            ) : searchParams.province && searchParams.city ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
      />
    </div>
  );
}