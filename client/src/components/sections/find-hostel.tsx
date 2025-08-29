import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Building2 } from "lucide-react";
import searchIcon from "@assets/logo/Asset 9.svg";

export default function FindHostel() {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const provinces = [
    "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", 
    "Gilgit-Baltistan", "Azad Jammu and Kashmir"
  ];
  
  const cities = {
    "Punjab": ["Lahore", "Karachi", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala"],
    "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
    "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad", "Kohat", "Bannu"],
    "Balochistan": ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Sibi"],
    "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza", "Ghanche"],
    "Azad Jammu and Kashmir": ["Muzaffarabad", "Mirpur", "Kotli", "Rawalakot"]
  };
  
  const locations = {
    "Lahore": ["DHA", "Gulberg", "Model Town", "Johar Town", "Cantt", "Anarkali"],
    "Karachi": ["Clifton", "Defence", "Gulshan", "Nazimabad", "North Nazimabad"],
    "Islamabad": ["Blue Area", "F-6", "F-7", "F-8", "G-6", "G-7"],
    "Peshawar": ["University Town", "Hayatabad", "Board Bazaar", "Saddar"],
    "Faisalabad": ["Samanabad", "People's Colony", "Madina Town", "Civil Lines"]
  };

  const handleSearch = () => {
    console.log({ province, city, location });
    // TODO: Implement search functionality
  };

  const resetFilters = () => {
    setProvince("");
    setCity("");
    setLocation("");
  };

  const availableCities = province ? cities[province as keyof typeof cities] || [] : [];
  const availableLocations = city ? locations[city as keyof typeof locations] || [] : [];

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
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-gray-100 dark:border-gray-700 p-4">
                <div className="flex items-center justify-center gap-3">
                  <img src={searchIcon} alt="Search" className="w-8 h-8" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Search Hostels by Location</h3>
                </div>
              </div>
              
              {/* Enhanced Form */}
              <div className="p-6">
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  {/* Province */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Province *
                    </label>
                    <Select value={province} onValueChange={setProvince}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary focus:border-primary transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600" data-testid="select-province">
                        <SelectValue placeholder="Choose Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((prov) => (
                          <SelectItem key={prov} value={prov}>
                            {prov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      City *
                    </label>
                    <Select 
                      value={city} 
                      onValueChange={setCity}
                      disabled={!province}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-accent focus:border-accent transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" data-testid="select-city">
                        <SelectValue placeholder={!province ? "Select Province first" : "Choose City"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((cty) => (
                          <SelectItem key={cty} value={cty}>
                            {cty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Area/Location */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Area (Optional)
                    </label>
                    <Select 
                      value={location} 
                      onValueChange={setLocation}
                      disabled={!city}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary focus:border-primary transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" data-testid="select-location">
                        <SelectValue placeholder={!city ? "Select City first" : "Choose Area"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLocations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                          {province && !city && `Selected: ${province}`}
                          {province && city && !location && `Selected: ${city}, ${province}`}
                          {province && city && location && `Selected: ${location}, ${city}, ${province}`}
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