import type { Express } from "express";
import { SubscriptionController } from "../controllers/subscriptionController";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validation";

export function subscriptionRoutes(app: Express) {
  // Create new subscription
  app.post("/api/subscriptions",
    [
      body('customer.name')
        .isLength({ min: 2, max: 100 })
        .trim()
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
        .withMessage('Nome deve conter apenas letras e espaços'),
      body('customer.email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),
      body('customer.cpf')
        .isLength({ min: 11, max: 14 })
        .withMessage('CPF deve ter 11 dígitos'),
      body('customer.phone')
        .isLength({ min: 10, max: 15 })
        .withMessage('Telefone inválido'),
      body('planId')
        .isInt({ min: 1 })
        .withMessage('ID do plano inválido'),
      body('paymentMethod')
        .isIn(['pix', 'credit', 'boleto'])
        .withMessage('Método de pagamento inválido'),
      body('installments')
        .optional()
        .isInt({ min: 1, max: 12 })
        .withMessage('Número de parcelas inválido')
    ],
    validateRequest,
    SubscriptionController.createSubscription
  );

  // Get subscription by ID
  app.get("/api/subscriptions/:id",
    [
      param('id')
        .isInt({ min: 1 })
        .withMessage('ID da assinatura deve ser um número inteiro positivo')
    ],
    validateRequest,
    SubscriptionController.getSubscription
  );
}