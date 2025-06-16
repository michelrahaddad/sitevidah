import type { Express } from "express";
import { PlanController } from "../controllers/planController";
import { param } from "express-validator";
import { validateRequest } from "../middleware/validation";

export function planRoutes(app: Express) {
  // Get all plans
  app.get("/api/plans", PlanController.getAllPlans);

  // Get specific plan by ID
  app.get("/api/plans/:id", 
    [
      param('id')
        .isInt({ min: 1 })
        .withMessage('ID do plano deve ser um número inteiro positivo')
    ],
    validateRequest,
    PlanController.getPlanById
  );
}