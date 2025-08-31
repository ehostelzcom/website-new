import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { City } from "@shared/schema";

export function useCities(provinceId?: number) {
  return useQuery<City[], Error>({
    queryKey: ['cities', provinceId],
    queryFn: async () => {
      if (!provinceId) {
        return []; // Return empty array if no province selected
      }
      
      try {
        const response = await axios.get<City[]>(`/api/cities/${provinceId}`, {
          timeout: 10000,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`API Error: ${error.message}`);
        }
        throw new Error('Failed to fetch cities');
      }
    },
    enabled: !!provinceId, // Only enable when provinceId is provided
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    retry: 3,
    retryDelay: 1000,
  });
}