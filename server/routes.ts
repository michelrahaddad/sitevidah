import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomerSchema, insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

const createSubscriptionRequestSchema = z.object({
  customer: insertCustomerSchema,
  planId: z.number(),
  paymentMethod: z.enum(['pix', 'credit', 'boleto']),
  installments: z.number().optional().default(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all available plans
  app.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getAllPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ message: "Failed to fetch plans" });
    }
  });

  // Create subscription and process payment
  app.post("/api/subscriptions", async (req, res) => {
    try {
      const data = createSubscriptionRequestSchema.parse(req.body);
      
      // Check if customer already exists
      let customer = await storage.getCustomerByEmail(data.customer.email);
      if (!customer) {
        // Check CPF uniqueness
        const existingCpf = await storage.getCustomerByCpf(data.customer.cpf);
        if (existingCpf) {
          return res.status(400).json({ message: "CPF já cadastrado" });
        }
        customer = await storage.createCustomer(data.customer);
      }

      // Get plan details
      const plan = await storage.getPlanById(data.planId);
      if (!plan) {
        return res.status(404).json({ message: "Plano não encontrado" });
      }

      // Calculate total amount based on payment method and installments
      let totalAmount = parseFloat(plan.annualPrice) + parseFloat(plan.adhesionFee);
      
      if (data.paymentMethod === 'pix') {
        // 10% discount for PIX
        totalAmount = (parseFloat(plan.annualPrice) * 0.9) + parseFloat(plan.adhesionFee);
      } else if (data.paymentMethod === 'boleto' && data.installments > 1) {
        // Boleto pricing for installments
        const monthlyValue = data.planId === 1 ? 27.90 : 37.90; // Individual vs Familiar
        totalAmount = (monthlyValue * data.installments) + parseFloat(plan.adhesionFee);
      } else if (data.paymentMethod === 'credit' && data.installments > 1) {
        // Credit card pricing for installments  
        const monthlyValue = parseFloat(plan.monthlyPrice || "0");
        totalAmount = (monthlyValue * data.installments) + parseFloat(plan.adhesionFee);
      }

      // Create subscription
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 1); // 1 year from now

      const subscription = await storage.createSubscription({
        customerId: customer.id,
        planId: data.planId,
        paymentMethod: data.paymentMethod,
        totalAmount: totalAmount.toFixed(2),
        installments: data.installments,
        expiresAt,
      });

      // Simulate payment processing
      const paymentSuccess = await processPayment(subscription, data.paymentMethod);
      
      if (paymentSuccess) {
        await storage.updateSubscriptionStatus(subscription.id, 'paid');
        
        // Generate digital card
        const cardNumber = generateCardNumber();
        const qrCode = generateQRCode(subscription.id, customer.id);
        
        const digitalCard = await storage.createDigitalCard({
          subscriptionId: subscription.id,
          cardNumber,
          qrCode,
        });

        res.json({
          success: true,
          subscription,
          digitalCard,
          customer,
          plan,
        });
      } else {
        await storage.updateSubscriptionStatus(subscription.id, 'failed');
        res.status(400).json({ message: "Falha no processamento do pagamento" });
      }

    } catch (error) {
      console.error("Error creating subscription:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  // Get subscription details
  app.get("/api/subscriptions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const subscription = await storage.getSubscriptionById(id);
      
      if (!subscription) {
        return res.status(404).json({ message: "Assinatura não encontrada" });
      }

      const digitalCard = await storage.getDigitalCardBySubscription(id);
      
      res.json({
        subscription,
        digitalCard,
      });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Erro ao buscar assinatura" });
    }
  });

  // WhatsApp integration endpoint for enterprise plans
  app.post("/api/whatsapp/enterprise", async (req, res) => {
    try {
      const { name, email, phone, companyName, employeeCount } = req.body;
      
      // Format WhatsApp message
      const message = `Olá! Gostaria de informações sobre o plano empresarial.%0A%0A` +
        `Nome: ${name}%0A` +
        `Email: ${email}%0A` +
        `Telefone: ${phone}%0A` +
        `Empresa: ${companyName}%0A` +
        `Número de colaboradores: ${employeeCount}`;
      
      const whatsappUrl = `https://wa.me/5516993247676?text=${message}`;
      
      res.json({ whatsappUrl });
    } catch (error) {
      console.error("Error generating WhatsApp URL:", error);
      res.status(500).json({ message: "Erro ao gerar link do WhatsApp" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions
async function processPayment(subscription: any, paymentMethod: string): Promise<boolean> {
  // Simulate payment processing
  // In production, integrate with actual payment gateway
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate 95% success rate
      resolve(Math.random() > 0.05);
    }, 1000);
  });
}

function generateCardNumber(): string {
  // Generate a unique card number
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `VIDAH${timestamp.slice(-6)}${random}`;
}

function generateQRCode(subscriptionId: number, customerId: number): string {
  // Generate QR code data - in production this would create actual QR code
  const qrData = `VIDAH:${subscriptionId}:${customerId}:${Date.now()}`;
  return Buffer.from(qrData).toString('base64');
}
