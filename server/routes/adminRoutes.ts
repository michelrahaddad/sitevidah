import type { Express } from "express";
import { AdminController } from "../controllers/adminController";
import { WhatsAppController } from "../controllers/whatsappController";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validation";
import { loginLimiter, adminLimiter } from "../middleware/rateLimiting";
import { authenticateAdmin } from "../middleware/auth";

export function adminRoutes(app: Express) {
  // Admin login
  app.post("/api/admin/login",
    loginLimiter,
    [
      body('username')
        .isLength({ min: 3, max: 50 })
        .trim()
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Username deve conter apenas letras, números, _ e -'),
      body('password')
        .isLength({ min: 6, max: 100 })
        .withMessage('Senha deve ter entre 6 e 100 caracteres')
    ],
    validateRequest,
    AdminController.login
  );

  // Verify admin token
  app.get("/api/admin/verify",
    AdminController.verifyToken
  );

  // Protected admin routes
  app.use("/api/admin", adminLimiter);
  app.use("/api/admin", authenticateAdmin);

  // Admin dashboard stats
  app.get("/api/admin/dashboard/stats",
    AdminController.getDashboardStats
  );

  // Admin access to WhatsApp conversions
  app.get("/api/admin/conversions",
    WhatsAppController.getConversions
  );

  // Admin export conversions
  app.get("/api/admin/conversions/export",
    WhatsAppController.exportConversions
  );
}