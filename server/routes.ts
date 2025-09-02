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

  // POST API for Contact Us form
  app.post("/api/contact-us", async (req, res) => {
    console.log("Contact Us form submission received:", req.body);
    try {
      const { name, email, phone, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ 
          error: "Missing required fields",
          message: "All fields (name, email, phone, message) are required"
        });
      }

      // Call Oracle APEX API
      const response = await axios.post(
        "http://ehostelz.com:8890/ords/jee_management_system/web/api/contact-us",
        {
          name,
          email,
          phone,
          message
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      console.log("Oracle APEX contact-us response:", response.data);
      
      // Return success response
      res.setHeader('Content-Type', 'application/json');
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        data: response.data
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ 
        error: "Failed to submit contact form",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST API for Request Demo form
  app.post("/api/request-demo", async (req, res) => {
    console.log("Request Demo form submission received:", req.body);
    try {
      const { 
        homeName, 
        type, 
        mobile, 
        whatsapp, 
        province, 
        city, 
        location, 
        address 
      } = req.body;
      
      // Validate required fields
      if (!homeName || !type || !mobile || !whatsapp || !province || !city || !address) {
        return res.status(400).json({ 
          error: "Missing required fields",
          message: "All fields except location are required"
        });
      }

      // Map frontend field names to Oracle APEX expected field names
      const requestData = {
        hostel_name: homeName,
        type: type.toUpperCase(), // Ensure uppercase for API
        mobile_no: mobile,
        whatsapp_no: whatsapp,
        province_id: parseInt(province), // Convert to number if needed
        city_id: parseInt(city), // Convert to number if needed
        location_id: location ? parseInt(location) : null, // Optional field
        address: address
      };

      // Call Oracle APEX API
      const response = await axios.post(
        "http://ehostelz.com:8890/ords/jee_management_system/web/api/request-demo",
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      console.log("Oracle APEX request-demo response:", response.data);
      
      // Return success response
      res.setHeader('Content-Type', 'application/json');
      res.json({ 
        success: true, 
        message: "Demo request submitted successfully",
        data: response.data
      });
    } catch (error) {
      console.error("Error submitting demo request:", error);
      res.status(500).json({ 
        error: "Failed to submit demo request",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // GET API for finding hostels by search (province_id, city_id, optional location_id)
  app.get("/api/find-hostels/:province_id/:city_id", async (req, res) => {
    console.log("Find hostels API call received with params:", req.params, "query:", req.query);
    try {
      const { province_id, city_id } = req.params;
      const { location_id } = req.query;
      
      // Validate required parameters
      if (!province_id || !city_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "province_id and city_id are required"
        });
      }

      // Build API URL with optional location_id
      let apiUrl = `http://ehostelz.com:8890/ords/jee_management_system/web/api/find-hostels/${province_id}/${city_id}`;
      if (location_id) {
        apiUrl += `?location_id=${location_id}`;
      }

      // Call Oracle APEX API
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Oracle APEX find-hostels response:", response.data);
      
      // Transform response and add static rating for now
      const hostels = (response.data.items || []).map((item: any) => ({
        ...item,
        rating: 4.2, // Static rating as requested
        hostel_id: item.hostel_id // Use real hostel_id from API
      }));
      
      // Set proper JSON headers and return the hostels
      res.setHeader('Content-Type', 'application/json');
      res.json({
        hostels,
        count: hostels.length,
        searchParams: {
          province_id,
          city_id,
          location_id: location_id || null
        }
      });
    } catch (error) {
      console.error("Error finding hostels:", error);
      res.status(500).json({ 
        error: "Failed to find hostels",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // GET API for finding vacant seats by hostel_id
  app.get("/api/vacant-seats/:hostel_id", async (req, res) => {
    console.log("Vacant seats API call received for hostel_id:", req.params.hostel_id);
    try {
      const { hostel_id } = req.params;
      
      // Validate required parameter
      if (!hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameter",
          message: "hostel_id is required"
        });
      }

      // Call Oracle APEX API for vacant seats
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/find-vacant-seats/${hostel_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Oracle APEX vacant-seats response:", response.data);
      
      // Transform the API response to flatten the structure for frontend use
      const vacantSeats: any[] = [];
      
      if (response.data.rooms && Array.isArray(response.data.rooms)) {
        response.data.rooms.forEach((room: any) => {
          if (room.beds && Array.isArray(room.beds)) {
            room.beds.forEach((bed: any) => {
              vacantSeats.push({
                room_title: room.room_title,
                bed_title: bed.bed_title,
                seat_title: bed.seat_title,
                hostel_id: parseInt(hostel_id)
              });
            });
          }
        });
      }
      
      // Set proper JSON headers and return the transformed data
      res.setHeader('Content-Type', 'application/json');
      res.json({
        status: response.data.status,
        code: response.data.code,
        hostel: response.data.hostel,
        vacantSeats, // Flattened structure for frontend
        totalSeats: vacantSeats.length
      });
    } catch (error) {
      console.error("Error fetching vacant seats:", error);
      res.status(500).json({ 
        error: "Failed to fetch vacant seats",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
