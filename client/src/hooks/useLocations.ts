import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Location } from "@shared/schema";

export function useLocations(cityId?: number) {
  return useQuery<Location[], Error>({
    queryKey: ['locations', cityId],
    queryFn: async () => {
      if (!cityId) {
        return []; // Return empty array if no city selected
      }
      
      try {
        const response = await axios.get<Location[]>(`/api/locations/${cityId}`, {
          timeout: 10000,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If 404 or other error, return empty array (makes location optional)
          console.log("No locations found for city:", cityId);
          return [];
        }
        throw new Error('Failed to fetch locations');
      }
    },
    enabled: !!cityId, // Only enable when cityId is provided
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    retry: 1, // Only retry once for locations since they're optional
    retryDelay: 500,
  });
}