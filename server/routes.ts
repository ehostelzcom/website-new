import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Proxy route for provinces API to avoid CORS issues
  app.get("/api/provinces", async (req, res) => {
    console.log("API call received for provinces");
    try {
      const response = await axios.get("http://ehostelz.com:8890/ords/jee_management_system/web/api/provinces", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Oracle APEX response:", response.data);
      
      // Return the sorted provinces directly as array
      const sortedProvinces = response.data.items.sort((a: any, b: any) => a.title.localeCompare(b.title));
      
      // Set proper JSON headers
      res.setHeader('Content-Type', 'application/json');
      res.json(sortedProvinces);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      res.status(500).json({ 
        error: "Failed to fetch provinces",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Proxy route for cities API with province_id as path parameter
  app.get("/api/cities/:province_id", async (req, res) => {
    console.log("API call received for cities with province_id:", req.params.province_id);
    try {
      const provinceId = req.params.province_id;
      
      // Call Oracle APEX API with province_id in URL path
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/cities/${provinceId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Oracle APEX cities response count:", response.data.items?.length);
      
      const cities = response.data.items || [];
      
      // Sort cities alphabetically
      const sortedCities = cities.sort((a: any, b: any) => a.title.localeCompare(b.title));
      
      // Set proper JSON headers
      res.setHeader('Content-Type', 'application/json');
      res.json(sortedCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ 
        error: "Failed to fetch cities",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Proxy route for locations API with city_id as path parameter
  app.get("/api/locations/:city_id", async (req, res) => {
    console.log("API call received for locations with city_id:", req.params.city_id);
    try {
      const cityId = req.params.city_id;
      
      // Call Oracle APEX API with city_id in URL path
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/locations/${cityId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Oracle APEX locations response count:", response.data.items?.length || 0);
      
      const locations = response.data.items || [];
      
      // Sort locations alphabetically
      const sortedLocations = locations.sort((a: any, b: any) => a.title.localeCompare(b.title));
      
      // Set proper JSON headers
      res.setHeader('Content-Type', 'application/json');
      res.json(sortedLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      
      // If locations API fails (404 or other error), return empty array
      // This makes location optional - search can work with just province/city
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("No locations found for city_id:", req.params.city_id);
        res.setHeader('Content-Type', 'application/json');
        res.json([]); // Return empty array instead of error
      } else {
        res.status(500).json({ 
          error: "Failed to fetch locations",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
