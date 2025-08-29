import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Building2 } from "lucide-react";
import searchIcon from "@assets/logo/Asset 8.svg";

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
      
      {/* Compact Search Form */}
      <div className="w-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              {/* Compact Form */}
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger className="h-10" data-testid="select-province">
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
                
                <div>
                  <Select 
                    value={city} 
                    onValueChange={setCity}
                    disabled={!province}
                  >
                    <SelectTrigger className="h-10" data-testid="select-city">
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
                
                <div>
                  <Select 
                    value={location} 
                    onValueChange={setLocation}
                    disabled={!city}
                  >
                    <SelectTrigger className="h-10" data-testid="select-location">
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
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSearch} 
                    className="flex-1 h-10 bg-primary hover:bg-primary/90"
                    disabled={!province || !city}
                    data-testid="button-search-hostels"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="h-10"
                    data-testid="button-reset"
                  >
                    Reset
                  </Button>
                </div>
              </div>
              
              {/* Simple Status */}
              {(province || city || location) && (
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded p-3">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  {!province && !city && !location && "Select your location"}
                  {province && !city && `Selected: ${province}`}
                  {province && city && !location && `Selected: ${city}, ${province}`}
                  {province && city && location && `Selected: ${location}, ${city}, ${province}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}