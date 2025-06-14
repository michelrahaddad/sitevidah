import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomerSchema, insertSubscriptionSchema, insertAdminUserSchema, insertWhatsappConversionSchema } from "@shared/schema";
import { z } from "zod";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

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

  // JWT secret for admin authentication
  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

  // Middleware for admin authentication
  const authenticateAdmin = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Token de acesso requerido" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };

  // Admin login route
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
      }

      const isValid = await storage.verifyAdminPassword(username, password);
      
      if (!isValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const admin = await storage.getAdminByUsername(username);
      if (!admin || !admin.isActive) {
        return res.status(401).json({ message: "Usuário inativo" });
      }

      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Create admin user (only for initial setup)
  app.post("/api/admin/create", async (req, res) => {
    try {
      const adminData = insertAdminUserSchema.parse(req.body);
      
      // Check if admin already exists
      const existing = await storage.getAdminByUsername(adminData.username);
      if (existing) {
        return res.status(400).json({ message: "Usuário administrador já existe" });
      }

      const admin = await storage.createAdminUser(adminData);
      
      res.status(201).json({
        message: "Administrador criado com sucesso",
        user: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ message: "Erro ao criar administrador" });
    }
  });

  // Track WhatsApp conversion
  app.post("/api/whatsapp/track", async (req, res) => {
    try {
      const conversionData = insertWhatsappConversionSchema.parse(req.body);
      
      // Add IP address and user agent
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      
      const conversion = await storage.createWhatsappConversion({
        ...conversionData,
        ipAddress,
        userAgent
      });

      res.status(201).json({ message: "Conversão registrada", id: conversion.id });
    } catch (error) {
      console.error("Error tracking conversion:", error);
      res.status(500).json({ message: "Erro ao registrar conversão" });
    }
  });

  // Get all WhatsApp conversions (admin only)
  app.get("/api/admin/conversions", authenticateAdmin, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      let conversions;
      if (startDate && endDate) {
        conversions = await storage.getWhatsappConversionsByDateRange(
          new Date(startDate as string),
          new Date(endDate as string)
        );
      } else {
        conversions = await storage.getAllWhatsappConversions();
      }

      res.json(conversions);
    } catch (error) {
      console.error("Error fetching conversions:", error);
      res.status(500).json({ message: "Erro ao buscar conversões" });
    }
  });

  // Export conversions as CSV (admin only)
  app.get("/api/admin/conversions/export", authenticateAdmin, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      let conversions;
      if (startDate && endDate) {
        conversions = await storage.getWhatsappConversionsByDateRange(
          new Date(startDate as string),
          new Date(endDate as string)
        );
      } else {
        conversions = await storage.getAllWhatsappConversions();
      }

      // Generate CSV content
      const csvHeader = "ID,Nome,Telefone,Tipo,Plano,Médico,IP,Data\n";
      const csvRows = conversions.map(conv => 
        `${conv.id},"${conv.name || ''}","${conv.phone || ''}","${conv.buttonType}","${conv.planName || ''}","${conv.doctorName || ''}","${conv.ipAddress || ''}","${conv.createdAt}"`
      ).join('\n');
      
      const csv = csvHeader + csvRows;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="conversoes-whatsapp.csv"');
      res.send(csv);
    } catch (error) {
      console.error("Error exporting conversions:", error);
      res.status(500).json({ message: "Erro ao exportar conversões" });
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
