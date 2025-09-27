/**
 * API Configuration
 * Centralized configuration for external API endpoints
 */

// Base URL for all external API calls
export const API_BASE_URL = "https://apex.ehostelz.com/ords/jee_management_system/web/api";

// Common headers for API requests
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Common timeout for API requests (in milliseconds)
export const API_TIMEOUT = 10000;

/**
 * Helper function to build complete API URL
 * @param endpoint - The endpoint path (e.g., '/provinces', '/cities/123')
 * @returns Complete API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

/**
 * Common axios config for API requests
 */
export const getApiConfig = (timeout: number = API_TIMEOUT) => ({
  headers: API_HEADERS,
  timeout,
});