import type { Express } from "express";
import { createServer, type Server } from "http";
import { planRoutes } from "./planRoutes";
import { subscriptionRoutes } from "./subscriptionRoutes";
import { whatsappRoutes } from "./whatsappRoutes";
import { adminRoutes } from "./adminRoutes";
import { generalLimiter, apiLimiter } from "../middleware/rateLimiting";
import { sanitizeInput, validateContentType } from "../middleware/validation";

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply global middleware
  app.use(generalLimiter);
  app.use(sanitizeInput);
  
  // Health check endpoint (no rate limiting)
  app.get("/health", (req, res) => {
    res.json({ 
      success: true, 
      status: "healthy", 
      timestamp: new Date().toISOString() 
    });
  });

  // API routes with specific middleware
  app.use("/api", apiLimiter);
  app.use("/api", validateContentType);
  
  // Register route modules
  planRoutes(app);
  subscriptionRoutes(app);
  whatsappRoutes(app);
  adminRoutes(app);

  return createServer(app);
}