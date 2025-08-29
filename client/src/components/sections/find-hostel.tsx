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
    <section id="find-hostel" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" data-testid="find-hostel-title">
            Find Your Perfect Hostel
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="find-hostel-subtitle">
            Search for hostels across Pakistan using our comprehensive location filters
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="text-primary" />
                Search Hostels by Location
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Province *
                  </label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger data-testid="select-province">
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    City *
                  </label>
                  <Select 
                    value={city} 
                    onValueChange={setCity}
                    disabled={!province}
                  >
                    <SelectTrigger data-testid="select-city">
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Area/Location
                  </label>
                  <Select 
                    value={location} 
                    onValueChange={setLocation}
                    disabled={!city}
                  >
                    <SelectTrigger data-testid="select-location">
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground opacity-0">
                    Actions
                  </label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSearch} 
                      className="flex-1"
                      disabled={!province || !city}
                      data-testid="button-search-hostels"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      data-testid="button-reset"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {!province && !city && !location && "Select your preferred location to find nearby hostels"}
                    {province && !city && `Selected: ${province}`}
                    {province && city && !location && `Selected: ${city}, ${province}`}
                    {province && city && location && `Selected: ${location}, ${city}, ${province}`}
                  </span>
                </div>
              </div>
              
              {province && city && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Search Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Found hostels in {location ? `${location}, ` : ""}{city}, {province}. 
                    This feature will display available hostels once connected to the database.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}