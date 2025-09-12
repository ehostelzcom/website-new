import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Building2, Loader2 } from "lucide-react";
import { useProvinces } from "@/hooks/useProvinces";
import { useCities } from "@/hooks/useCities";
import { useLocations } from "@/hooks/useLocations";
import searchIcon from "@assets/logo/Asset 9.svg";

export default function FindHostel() {
  const [, setLocationPath] = useLocation();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  
  // Fetch provinces from live API
  const { data: provinces, isLoading: provincesLoading, error: provincesError } = useProvinces();
  
  // Get selected province ID for cities API
  const selectedProvinceId = province ? parseInt(province) : undefined;
  
  // Fetch cities based on selected province
  const { data: cities, isLoading: citiesLoading, error: citiesError } = useCities(selectedProvinceId);
  
  // Get selected city ID for locations API
  const selectedCityId = city ? parseInt(city) : undefined;
  
  // Fetch locations based on selected city (optional)
  const { data: locations, isLoading: locationsLoading, error: locationsError } = useLocations(selectedCityId);

  const handleSearch = () => {
    if (!province || !city) return;
    
    // Build search URL with query parameters
    const params = new URLSearchParams({
      province: province,
      city: city,
    });
    
    // Add location if selected
    if (location) {
      params.append("location", location);
    }
    
    // Navigate to search results page
    setLocationPath(`/search-hostels?${params.toString()}`);
  };

  const resetFilters = () => {
    setProvince("");
    setCity("");
    setLocation("");
  };

  return (
    <section id="find-hostel" className="py-16 bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:to-gray-800">
      {/* Full Width Header */}
      <div className="w-full bg-gradient-to-r from-primary to-white py-12 mb-8">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white" data-testid="find-hostel-title">
            Find Your Perfect Hostel
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto" data-testid="find-hostel-subtitle">
            Search for hostels across Pakistan using our comprehensive location filters
          </p>
        </div>
      </div>
      
      {/* Enhanced Search Form */}
      <div className="w-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-gray-100 dark:border-gray-700 p-4">
                <div className="flex items-center justify-center gap-3">
                  <img src={searchIcon} alt="Search" className="w-8 h-8" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Search Hostels by Location</h3>
                </div>
              </div>
              
              {/* Enhanced Form */}
              <div className="p-8">
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  {/* Province */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Province *
                    </label>
                    <Select 
                      value={province} 
                      onValueChange={(value) => {
                        setProvince(value);
                        setCity(""); // Reset city when province changes
                        setLocation(""); // Reset location when province changes
                      }} 
                      disabled={provincesLoading}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary focus:border-primary transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600" data-testid="select-province">
                        <SelectValue placeholder="Choose Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provincesLoading ? (
                          <SelectItem value="loading" disabled>
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading provinces...
                            </div>
                          </SelectItem>
                        ) : provincesError ? (
                          <SelectItem value="error" disabled>
                            Error loading provinces
                          </SelectItem>
                        ) : (
                          (provinces || []).map((prov) => (
                            <SelectItem key={prov.id} value={prov.id.toString()}>
                              {prov.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      City *
                    </label>
                    <div className="h-12">
                      <SearchableSelect
                        options={cities || []}
                        value={city}
                        onValueChange={(value) => {
                          setCity(value);
                          setLocation(""); // Reset location when city changes
                        }}
                        placeholder={!province ? "Select Province first" : "Choose City"}
                        disabled={!province || citiesLoading}
                        isLoading={citiesLoading}
                        searchPlaceholder="Search cities..."
                        emptyText={province ? "No cities found for this province" : "Select province first"}
                        testId="select-city"
                      />
                    </div>
                  </div>
                  
                  {/* Area/Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Area (Optional)
                    </label>
                    <div className="h-12">
                      <SearchableSelect
                        options={locations || []}
                        value={location}
                        onValueChange={setLocation}
                        placeholder={!city ? "Select City first" : "Choose Area (Optional)"}
                        disabled={!city}
                        isLoading={locationsLoading}
                        searchPlaceholder="Search areas..."
                        emptyText={city ? "No areas found - search works without area" : "Select city first"}
                        testId="select-location"
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2 h-4">
                      <div className="w-1.5 h-1.5 bg-transparent rounded-full"></div>
                      <span className="opacity-0">Actions</span>
                    </label>
                    <div className="flex gap-3 h-12">
                      <Button 
                        onClick={handleSearch} 
                        className="flex-1 h-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        disabled={!province || !city}
                        data-testid="button-search-hostels"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={resetFilters}
                        className="px-4 h-full border-2 border-gray-300 hover:border-accent hover:bg-accent hover:text-white rounded-lg transition-all duration-200"
                        data-testid="button-reset"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Status Display */}
                {(province || city || location) && (
                  <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-sm">
                          {!province && !city && !location && "Select your location"}
                          {province && !city && `Selected: ${provinces?.find(p => p.id.toString() === province)?.title}`}
                          {province && city && !location && `Selected: ${cities?.find(c => c.id.toString() === city)?.title}, ${provinces?.find(p => p.id.toString() === province)?.title}`}
                          {province && city && location && `Selected: ${locations?.find(l => l.id.toString() === location)?.title}, ${cities?.find(c => c.id.toString() === city)?.title}, ${provinces?.find(p => p.id.toString() === province)?.title}`}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Click Search to find available hostels
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}