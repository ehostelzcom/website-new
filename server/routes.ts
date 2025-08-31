import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy route for provinces API to avoid CORS issues
  app.get("/api/provinces", async (req, res) => {
    try {
      const response = await axios.get("http://ehostelz.com:8890/ords/jee_management_system/web/api/provinces", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      // Return the sorted provinces directly
      const sortedProvinces = response.data.items.sort((a: any, b: any) => a.title.localeCompare(b.title));
      res.json(sortedProvinces);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      res.status(500).json({ 
        error: "Failed to fetch provinces",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
