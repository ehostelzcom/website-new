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

  // Proxy route for rating questions API to avoid CORS issues
  app.get("/api/rating-questions", async (req, res) => {
    try {
      const response = await axios.get("http://ehostelz.com:8890/ords/jee_management_system/web/api/rating-questions", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching rating questions:", error);
      res.status(500).json({ 
        error: "Failed to fetch rating questions",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST API for hostel rating submission
  app.post("/api/hostel-rating/save", async (req, res) => {
    try {
      const { user_id, hostel_id, ratings } = req.body;
      
      // Validate required fields
      if (!user_id || !hostel_id || !ratings || !Array.isArray(ratings)) {
        return res.status(400).json({ 
          error: "Missing required fields",
          message: "user_id, hostel_id, and ratings array are required"
        });
      }

      // Count only numeric star ratings (exclude ID 100 which is comments)
      const starRatings = ratings.filter(r => r.rating_id !== 100);
      
      // Validate minimum 3 star ratings
      if (starRatings.length < 3) {
        return res.status(400).json({ 
          error: "Insufficient ratings",
          message: "At least 3 star ratings are required"
        });
      }

      // Validate comments length if provided (in rating_id 100)
      const commentsRating = ratings.find(r => r.rating_id === 100);
      if (commentsRating && commentsRating.comment_suggestions && commentsRating.comment_suggestions.length > 1000) {
        return res.status(400).json({ 
          error: "Comments too long",
          message: "Additional comments must be 1000 characters or less"
        });
      }

      // Prepare payload for Oracle APEX
      const payload = {
        user_id,
        hostel_id,
        ratings
      };

      // Call Oracle APEX API
      const response = await axios.post(
        "http://ehostelz.com:8890/ords/jee_management_system/web/api/hostel-rating/save",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      
      // Return success response
      res.setHeader('Content-Type', 'application/json');
      res.json({ 
        success: true, 
        message: "Rating submitted successfully",
        data: response.data 
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (axios.isAxiosError(error) && error.response) {
        res.status(error.response.status).json({
          error: "Failed to submit rating",
          message: error.response.data?.message || error.message
        });
      } else {
        res.status(500).json({ 
          error: "Failed to submit rating",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  // GET API for existing hostel ratings
  app.get("/api/hostel-ratings/:user_id/:hostel_id", async (req, res) => {
    try {
      const { user_id, hostel_id } = req.params;
      
      // Validate required parameters
      if (!user_id || !hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "user_id and hostel_id are required"
        });
      }

      // Call Oracle APEX API to get existing ratings
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/hostel-ratings/${user_id}/${hostel_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching existing ratings:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // No ratings found - return empty ratings array
        res.setHeader('Content-Type', 'application/json');
        res.json({ 
          status: true,
          code: 200,
          ratings: []
        });
      } else {
        res.status(500).json({ 
          error: "Failed to fetch existing ratings",
          message: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
  });

  // GET API for student profile
  app.get("/api/student-profile/:user_id/:hostel_id", async (req, res) => {
    const { user_id, hostel_id } = req.params;
    
    try {
      const response = await axios.get(
        `http://ehostelz.com:8890/ords/jee_management_system/web/api/student-profile/${user_id}/${hostel_id}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      
      res.json(response.data);
      
    } catch (error) {
      console.error("Error fetching student profile:", error);
      res.status(500).json({ 
        status: false,
        error: "Failed to fetch student profile data" 
      });
    }
  });

  // POST API for Contact Us form
  app.post("/api/contact-us", async (req, res) => {
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
    try {
      const { province_id, city_id } = req.params;
      const { location_id, low_rent, high_rent } = req.query;
      
      // Validate required parameters
      if (!province_id || !city_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "province_id and city_id are required"
        });
      }

      // Build API URL with optional query parameters
      let apiUrl = `http://ehostelz.com:8890/ords/jee_management_system/web/api/find-hostels/${province_id}/${city_id}`;
      
      // Build query parameters array
      const queryParams = [];
      if (location_id) {
        queryParams.push(`location_id=${location_id}`);
      }
      if (low_rent && !isNaN(parseInt(low_rent as string))) {
        queryParams.push(`low_rent=${low_rent}`);
      }
      if (high_rent && !isNaN(parseInt(high_rent as string))) {
        queryParams.push(`high_rent=${high_rent}`);
      }
      
      // Add query parameters if any exist
      if (queryParams.length > 0) {
        apiUrl += `?${queryParams.join('&')}`;
      }

      // Call Oracle APEX API
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Transform response and add amenity data + calculate ratings
      const hostels = await Promise.all((response.data.data || []).map(async (item: any) => {
        // Fetch facilities data for this hostel to get amenity flags
        let amenityData = { wifi: 0, security: 0, food: 0, solar_system: 0 };
        
        try {
          const facilityResponse = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/facilities/${item.hostel_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            timeout: 5000,
          });
          
          // Extract amenity flags from facilities response
          if (facilityResponse.data) {
            amenityData = {
              wifi: facilityResponse.data.wifi || 0,
              security: facilityResponse.data.security || 0,
              food: facilityResponse.data.food || 0,
              solar_system: facilityResponse.data.solar_system || 0
            };
          }
        } catch (error) {
          // Use default values (0) if facilities fetch fails
        }
        
        // Calculate average rating and review count from ratings data
        let hostel_avg_rating = 4.2; // Default
        let hostel_review_counts = 0;
        
        if (item.ratings && item.ratings.length > 0) {
          // Calculate total reviews and average rating from all user ratings
          let totalScore = 0;
          let totalRatings = 0;
          
          item.ratings.forEach((userRating: any) => {
            if (userRating.ratings && userRating.ratings.length > 0) {
              userRating.ratings.forEach((rating: any) => {
                totalScore += rating.score;
                totalRatings++;
              });
            }
          });
          
          if (totalRatings > 0) {
            hostel_avg_rating = totalScore / totalRatings;
            hostel_review_counts = item.ratings.length; // Number of users who reviewed
          }
        }
        
        return {
          ...item,
          rating: hostel_avg_rating.toFixed(1), // Keep for backward compatibility
          hostel_id: item.hostel_id, // Use real hostel_id from API
          hostel_avg_rating: parseFloat(hostel_avg_rating.toFixed(1)),
          hostel_review_counts,
          ...amenityData // Include amenity flags
        };
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
                hostel_id: parseInt(hostel_id),
                total_counts: room.total_counts || 0,
                counts: room.counts || 0
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

  // GET API for fetching facilities by hostel_id
  app.get("/api/facilities/:hostel_id", async (req, res) => {
    try {
      const { hostel_id } = req.params;
      
      // Validate required parameter
      if (!hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameter",
          message: "hostel_id is required"
        });
      }

      // Call Oracle APEX API for facilities
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/facilities/${hostel_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the facilities data directly
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ 
        error: "Failed to fetch facilities",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // GET API for fetching rents by hostel_id
  app.get("/api/rents/:hostel_id", async (req, res) => {
    try {
      const { hostel_id } = req.params;
      
      // Validate required parameter
      if (!hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameter",
          message: "hostel_id is required"
        });
      }

      // Call Oracle APEX API for rents
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/rents/${hostel_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the rents data directly
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching rents:", error);
      res.status(500).json({ 
        error: "Failed to fetch rents",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // POST API for Student Login
  app.post("/api/student-login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({ 
          error: "Missing required fields",
          message: "Username and password are required"
        });
      }

      // Call Oracle APEX student login API
      const response = await axios.post(
        "http://ehostelz.com:8890/ords/jee_management_system/web/api/student-login",
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error during student login:", error);
      
      // Handle authentication failure
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return res.status(401).json({ 
          status: false,
          code: 401,
          message: "Invalid username or password"
        });
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Login failed due to server error"
      });
    }
  });

  // GET API for Student Hostels by user_id
  app.get("/api/student-hostels/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      
      // Validate required parameter
      if (!user_id) {
        return res.status(400).json({ 
          error: "Missing required parameter",
          message: "user_id is required"
        });
      }

      // Call Oracle APEX student hostels API
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/student-hostels/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching student hostels:", error);
      
      // Handle not found case
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return res.status(404).json({ 
          status: false,
          code: 404,
          message: "No hostels found for this student"
        });
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Failed to fetch student hostels"
      });
    }
  });

  // Student Allotments API endpoint
  app.get("/api/student-allotments/:user_id/:hostel_id", async (req, res) => {
    try {
      const { user_id, hostel_id } = req.params;
      const { year } = req.query;
      
      // Validate required parameters
      if (!user_id || !hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "user_id and hostel_id are required"
        });
      }
      
      // Build URL with required parameters
      let apiUrl = `http://ehostelz.com:8890/ords/jee_management_system/web/api/student-allotments/${user_id}/${hostel_id}`;
      
      if (year) {
        apiUrl += `?year=${year}`;
      }

      const response = await axios.get(apiUrl, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching student allotments:", error);

      if (error.code === 'ECONNABORTED') {
        return res.status(408).json({ 
          error: "Request timeout",
          message: "The request to fetch student allotments took too long"
        });
      }
      
      return res.status(500).json({ 
        error: "Failed to fetch student allotments",
        message: error.message || "Unknown error occurred"
      });
    }
  });

  // GET API for Years
  app.get("/api/years", async (req, res) => {
    try {
      // Call Oracle APEX years API
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/years`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching years:", error);

      if (error.code === 'ECONNABORTED') {
        return res.status(408).json({ 
          error: "Request timeout",
          message: "The request to fetch years took too long"
        });
      }
      
      return res.status(500).json({ 
        error: "Failed to fetch years",
        message: error.message || "Unknown error occurred"
      });
    }
  });

  // GET API for Student Dashboard Fees and Payments by user_id and hostel_id
  app.get("/api/student-dashboard-fees-payments/:user_id/:hostel_id", async (req, res) => {
    try {
      const { user_id, hostel_id } = req.params;
      const { year, allotment_id } = req.query;
      
      // Validate required parameters
      if (!user_id || !hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "user_id and hostel_id are required"
        });
      }

      // Build URL with optional parameters
      let apiUrl = `http://ehostelz.com:8890/ords/jee_management_system/web/api/student-dashboard-fees-payments/${user_id}/${hostel_id}`;
      const params = [];
      
      if (year && year !== 'overall') {
        params.push(`year=${year}`);
      } else if (year === 'overall') {
      }
      
      if (allotment_id && allotment_id !== 'overall') {
        params.push(`allotment_id=${allotment_id}`);
      } else if (allotment_id === 'overall') {
      }
      
      if (params.length > 0) {
        apiUrl += `?${params.join('&')}`;
      }

      // Call Oracle APEX student dashboard fees/payments API
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching student dashboard fees/payments:", error);
      
      // Handle not found case
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return res.status(404).json({ 
          status: false,
          code: 404,
          message: "No fees/payments data found for this student and hostel"
        });
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Failed to fetch student dashboard fees/payments"
      });
    }
  });

  // GET API for Student Fees by user_id and hostel_id
  app.get("/api/student-fees/:user_id/:hostel_id", async (req, res) => {
    try {
      const { user_id, hostel_id } = req.params;
      const { allotment_id } = req.query;
      
      // Validate required parameters
      if (!user_id || !hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "user_id and hostel_id are required"
        });
      }

      // Build URL with required parameters
      let apiUrl = `http://ehostelz.com:8890/ords/jee_management_system/web/api/student-fees/${user_id}/${hostel_id}`;
      
      if (allotment_id) {
        apiUrl += `?allotment_id=${allotment_id}`;

      }

      // Call Oracle APEX student fees API
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching student fees:", error);
      
      // Handle not found case
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return res.status(404).json({ 
          status: false,
          code: 404,
          message: "No fees data found for this student and hostel"
        });
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Failed to fetch student fees"
      });
    }
  });

  // Student payments API endpoint
  app.get("/api/student-payments/:user_id/:hostel_id", async (req, res) => {
    try {
      const { user_id, hostel_id } = req.params;
      const { allotment_id } = req.query;
      
      // Validate required parameters
      if (!user_id || !hostel_id) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          message: "user_id and hostel_id are required"
        });
      }

      // Build URL with required parameters
      let apiUrl = `http://ehostelz.com:8890/ords/jee_management_system/web/api/student-payments/${user_id}/${hostel_id}`;
      
      if (allotment_id) {
        apiUrl += `?allotment_id=${allotment_id}`;

      }

      // Call Oracle APEX student payments API
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      // Return the response directly from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching student payments:", error);
      
      // Handle not found case
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return res.status(404).json({ 
          status: false,
          code: 404,
          message: "No payments data found for this student and hostel"
        });
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Failed to fetch student payments"
      });
    }
  });

  // Get hostel reviews
  app.get('/api/hostel-reviews/:hostelId', async (req, res) => {
    try {
      const { hostelId } = req.params;
      
      
      const response = await axios.get(`http://ehostelz.com:8890/ords/jee_management_system/web/api/hostel-reviews/${hostelId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching hostel reviews:', error);
      
      // Handle not found case
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return res.status(404).json({ 
          status: false,
          code: 404,
          message: "No reviews found for this hostel"
        });
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: 'Failed to fetch hostel reviews' 
      });
    }
  });

  // POST API for Password Reset Verification (CNIC + Mobile)
  app.post("/api/reset-password/verify", async (req, res) => {
    try {
      const { cnic, mobile } = req.body;
      
      // Validate required fields
      if (!cnic || !mobile) {
        return res.status(400).json({ 
          status: false,
          code: 400,
          message: "CNIC and mobile number are required"
        });
      }

      // Call Oracle APEX API for account verification
      const response = await axios.post(
        "http://ehostelz.com:8890/ords/jee_management_system/web/api/student-verified-account",
        {
          cnic: cnic,
          mobile_no: mobile  // Note: API expects 'mobile_no', not 'mobile'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      
      // Return the verification response from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error during password reset verification:", error);
      
      // Handle verification failure from Oracle APEX
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Return the exact Oracle APEX error response
        return res.status(404).json(error.response.data);
      }
      
      // Handle other Oracle APEX error responses
      if (axios.isAxiosError(error) && error.response?.data) {
        return res.status(error.response.status || 400).json(error.response.data);
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Verification failed due to server error"
      });
    }
  });

  // POST API for Password Reset Update
  app.post("/api/reset-password/update", async (req, res) => {
    try {
      const { user_id, new_password } = req.body;
      
      // Validate required fields
      if (!user_id || !new_password) {
        return res.status(400).json({ 
          status: false,
          code: 400,
          message: "User ID and new password are required"
        });
      }

      // Call Oracle APEX API for password reset update
      const response = await axios.post(
        "http://ehostelz.com:8890/ords/jee_management_system/web/api/reset-password",
        {
          user_id: user_id,
          new_password: new_password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      
      // Return the update response from Oracle APEX
      res.setHeader('Content-Type', 'application/json');
      res.json(response.data);
    } catch (error) {
      console.error("Error during password reset update:", error);
      
      // Handle update failure from Oracle APEX
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Return the exact Oracle APEX error response
        return res.status(404).json(error.response.data);
      }
      
      // Handle other Oracle APEX error responses
      if (axios.isAxiosError(error) && error.response?.data) {
        return res.status(error.response.status || 400).json(error.response.data);
      }
      
      res.status(500).json({ 
        status: false,
        code: 500,
        message: "Password update failed due to server error"
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
