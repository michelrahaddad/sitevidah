import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { securityHeaders, validateRequestSize, monitorSuspiciousActivity, queryTimeout } from "./security";
import { logger, logRequest } from "./logger";
// import { performanceMiddleware, healthRoutes } from "./monitoring";
// import { circuitBreakerMiddleware } from "./circuitBreaker";
// import { cacheManager } from "./cache";
// import { backupManager } from "./backup";
// import { systemInitializer } from "./initialization";

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "wss:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS with production-safe origins
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? /\.replit\.(app|dev)$/
    : true,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Compression for better performance
app.use(compression());

// Trust proxy for accurate client IPs
app.set('trust proxy', 1);

// Additional security middleware
app.use(securityHeaders);
app.use(validateRequestSize);
app.use(monitorSuspiciousActivity);
app.use(queryTimeout(30000)); // 30 second timeout

// Skip performance monitoring and circuit breaker in development
// app.use(performanceMiddleware);
// app.use(circuitBreakerMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Stricter rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many API requests, please try again later." }
});
app.use("/api/", apiLimiter);

// Very strict rate limiting for admin routes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many admin requests, please try again later." }
});
app.use("/api/admin/", adminLimiter);

// Body parsing with security limits
app.use(express.json({ 
  limit: "10mb",
  verify: (req, res, buf) => {
    if (buf.length > 10 * 1024 * 1024) {
      throw new Error('Request entity too large');
    }
  }
}));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Skip system initialization in development to avoid Redis issues
  if (process.env.NODE_ENV === 'production') {
    // const initSuccess = await systemInitializer.initialize();
    // if (!initSuccess) {
    //   logger.error('System initialization failed, exiting');
    //   process.exit(1);
    // }
  }

  // Health check route
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Setup main application routes
  const server = await registerRoutes(app);

  // Global error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Log error with enhanced security logging
    logger.error('Application error', {
      status,
      message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent')?.substring(0, 100),
      timestamp: new Date().toISOString()
    });

    // Don't expose internal errors in production
    if (status === 500 && process.env.NODE_ENV === "production") {
      message = "Internal Server Error";
    }

    // Handle different error types securely
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: "Invalid input data" });
    }
    
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: "Authentication required" });
    }

    res.status(status).json({ 
      error: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    logger.info(`Server started successfully`, {
      port,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
    log(`serving on port ${port}`);
  });

  // Graceful shutdown handling
  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}, starting graceful shutdown`);
    
    try {
      // Stop accepting new connections
      server.close(async () => {
        logger.info('HTTP server closed');
        
        try {
          // Disconnect from cache
          await cacheManager.disconnect();
          logger.info('Cache disconnected');
          
          // Close database connections if needed
          logger.info('Database connections closed');
          
          logger.info('Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          logger.error('Error during graceful shutdown', { 
            error: (error as Error).message 
          });
          process.exit(1);
        }
      });

      // Force close after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);

    } catch (error) {
      logger.error('Error initiating graceful shutdown', { 
        error: (error as Error).message 
      });
      process.exit(1);
    }
  };

  // Handle process signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', {
      error: error.message,
      stack: error.stack
    });
    gracefulShutdown('UNCAUGHT_EXCEPTION');
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection', {
      reason,
      promise
    });
    gracefulShutdown('UNHANDLED_REJECTION');
  });
})();
