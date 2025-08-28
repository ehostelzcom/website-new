import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function LocationSearch() {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const provinces = ["Punjab", "Sindh", "KPK", "Balochistan"];
  const cities = ["Lahore", "Karachi", "Islamabad", "Peshawar"];
  const locations = ["DHA", "Gulberg", "Model Town", "Johar Town"];

  const handleSearch = () => {
    console.log({ province, city, location });
    // TODO: Implement search functionality
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Select value={province} onValueChange={setProvince}>
        <SelectTrigger className="flex-1" data-testid="select-province">
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
      
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="flex-1" data-testid="select-city">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((cty) => (
            <SelectItem key={cty} value={cty}>
              {cty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="flex-1" data-testid="select-location">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button onClick={handleSearch} className="px-8 py-3 whitespace-nowrap" data-testid="button-search-hostels">
        <Search className="mr-2 h-4 w-4" />
        Search Hostels
      </Button>
    </div>
  );
}
