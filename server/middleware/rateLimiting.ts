import rateLimit from "express-rate-limit";

// General rate limiting
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Increased from 100 to prevent blocking legitimate users
  message: { 
    success: false,
    error: "Muitas solicitações deste IP. Tente novamente em alguns minutos." 
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks and static assets
    return req.path === '/health' || req.path.startsWith('/assets');
  }
});

// API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Reasonable limit for API calls
  message: { 
    success: false,
    error: "Muitas chamadas à API. Tente novamente em alguns minutos." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin rate limiting (more restrictive)
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // Lower limit for admin operations
  message: { 
    success: false,
    error: "Muitas operações administrativas. Tente novamente em alguns minutos." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login rate limiting (very restrictive)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Increased from 5 to reduce false positives
  message: { 
    success: false,
    error: "Muitas tentativas de login. Tente novamente em 15 minutos." 
  },
  skipSuccessfulRequests: true, // Don't count successful logins
  skipFailedRequests: false, // Count failed attempts
  standardHeaders: true,
  legacyHeaders: false,
});

// WhatsApp conversion rate limiting
export const whatsappLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Allow up to 10 conversions per 5 minutes per IP
  message: { 
    success: false,
    error: "Muitas conversões registradas. Aguarde alguns minutos." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});