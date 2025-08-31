import { useQuery } from "@tanstack/react-query";
import { Province, ProvincesResponse } from "@shared/schema";

const PROVINCES_API_URL = "http://ehostelz.com:8890/ords/jee_management_system/web/api/provinces";

export function useProvinces() {
  return useQuery<Province[], Error>({
    queryKey: [PROVINCES_API_URL],
    queryFn: async () => {
      const response = await fetch(PROVINCES_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch provinces: ${response.statusText}`);
      }
      const data: ProvincesResponse = await response.json();
      return data.items.sort((a, b) => a.title.localeCompare(b.title));
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour since provinces don't change often
  });
}