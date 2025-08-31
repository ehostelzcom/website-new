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

  // Proxy route for cities API with optional province filtering
  app.get("/api/cities", async (req, res) => {
    console.log("API call received for cities");
    try {
      const response = await axios.get("http://ehostelz.com:8890/ords/jee_management_system/web/api/cities", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Oracle APEX cities response count:", response.data.items?.length);
      
      let cities = response.data.items || [];
      
      // Filter by province_id if provided
      const provinceId = req.query.province_id;
      if (provinceId) {
        cities = cities.filter((city: any) => city.province_id === parseInt(provinceId as string));
      }
      
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

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
