import type { Express } from "express";
import { WhatsAppController } from "../controllers/whatsappController";
import { body, query } from "express-validator";
import { validateRequest } from "../middleware/validation";
import { whatsappLimiter } from "../middleware/rateLimiting";

export function whatsappRoutes(app: Express) {
  // Create WhatsApp conversion
  app.post("/api/whatsapp/conversions",
    whatsappLimiter,
    [
      body('buttonType')
        .isIn(['plan_subscription', 'doctor_appointment', 'enterprise_quote'])
        .withMessage('Tipo de botão inválido'),
      body('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .trim()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços'),
      body('phone')
        .optional()
        .isLength({ min: 10, max: 15 })
        .withMessage('Telefone inválido'),
      body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
      body('planName')
        .optional()
        .isLength({ max: 100 })
        .trim(),
      body('doctorName')
        .optional()
        .isLength({ max: 100 })
        .trim()
    ],
    validateRequest,
    WhatsAppController.createConversion
  );

  // Get conversions (admin only - will be protected in admin routes)
  app.get("/api/whatsapp/conversions",
    [
      query('startDate')
        .optional()
        .isISO8601()
        .withMessage('Data inicial inválida'),
      query('endDate')
        .optional()
        .isISO8601()
        .withMessage('Data final inválida'),
      query('type')
        .optional()
        .isIn(['plan_subscription', 'doctor_appointment', 'enterprise_quote'])
        .withMessage('Tipo de conversão inválido')
    ],
    validateRequest,
    WhatsAppController.getConversions
  );

  // Export conversions (admin only)
  app.get("/api/whatsapp/conversions/export",
    [
      query('format')
        .optional()
        .isIn(['csv', 'json'])
        .withMessage('Formato de exportação inválido'),
      query('type')
        .optional()
        .isIn(['internal', 'marketing'])
        .withMessage('Tipo de exportação inválido')
    ],
    validateRequest,
    WhatsAppController.exportConversions
  );
}