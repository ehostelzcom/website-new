import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Building2 } from "lucide-react";

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
      <div className="w-full bg-gradient-to-r from-primary to-accent py-12 mb-8">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white" data-testid="find-hostel-title">
            Find Your Perfect Hostel
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto" data-testid="find-hostel-subtitle">
            Search for hostels across Pakistan using our comprehensive location filters
          </p>
        </div>
      </div>
      
      {/* Full Width Search Form */}
      <div className="w-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-gray-700 dark:to-gray-600 p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Search Hostels by Location</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enter your preferred location details below</p>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Province *
                  </label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger className="h-12 border-2 hover:border-primary focus:border-primary transition-colors" data-testid="select-province">
                      <SelectValue placeholder="Select Province" />
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
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    City *
                  </label>
                  <Select 
                    value={city} 
                    onValueChange={setCity}
                    disabled={!province}
                  >
                    <SelectTrigger className="h-12 border-2 hover:border-accent focus:border-accent transition-colors disabled:opacity-50" data-testid="select-city">
                      <SelectValue placeholder={!province ? "Select Province first" : "Select City"} />
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
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Area/Location
                  </label>
                  <Select 
                    value={location} 
                    onValueChange={setLocation}
                    disabled={!city}
                  >
                    <SelectTrigger className="h-12 border-2 hover:border-primary focus:border-primary transition-colors disabled:opacity-50" data-testid="select-location">
                      <SelectValue placeholder={!city ? "Select City first" : "Select Location"} />
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
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 opacity-0">
                    Actions
                  </label>
                  <div className="flex gap-3 h-12">
                    <Button 
                      onClick={handleSearch} 
                      className="flex-1 h-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 hover:scale-105"
                      disabled={!province || !city}
                      data-testid="button-search-hostels"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Search Hostels
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      className="px-6 h-full border-2 border-gray-300 hover:border-accent hover:text-accent transition-colors"
                      data-testid="button-reset"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Status Display */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {!province && !city && !location && "Select your preferred location to find nearby hostels"}
                      {province && !city && `Selected: ${province}`}
                      {province && city && !location && `Selected: ${city}, ${province}`}
                      {province && city && location && `Selected: ${location}, ${city}, ${province}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use the filters above to narrow down your hostel search
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Search Results */}
              {province && city && (
                <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border-2 border-accent/20 animate-in slide-in-from-bottom-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-accent mb-2">Search Results</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Found hostels in <span className="font-semibold text-primary">{location ? `${location}, ` : ""}{city}, {province}</span>. 
                        This feature will display available hostels once connected to the database.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}