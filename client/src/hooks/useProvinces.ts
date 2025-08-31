import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Province } from "@shared/schema";

export function useProvinces() {
  return useQuery<Province[], Error>({
    queryKey: ['provinces'],
    queryFn: async () => {
      try {
        const response = await axios.get<Province[]>("/api/provinces", {
          timeout: 10000, // 10 second timeout
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`API Error: ${error.message}`);
        }
        throw new Error('Failed to fetch provinces');
      }
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour since provinces don't change often
    retry: 3,
    retryDelay: 1000,
  });
}