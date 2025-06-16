import { WhatsAppConversion, InsertWhatsappConversion } from "@shared/types";
import { WHATSAPP_CONFIG } from "@shared/constants";
import { storage } from "../storage";

/**
 * Service class for handling WhatsApp conversion logic
 */
export class WhatsAppService {
  
  /**
   * Creates a new WhatsApp conversion record
   */
  static async createConversion(data: InsertWhatsappConversion): Promise<WhatsAppConversion> {
    return await storage.createWhatsappConversion(data);
  }

  /**
   * Generates WhatsApp URL with appropriate message template
   */
  static generateWhatsAppUrl(conversion: WhatsAppConversion): string {
    const { name = '', phone = '', email = '', planName = '', doctorName = '' } = conversion;
    
    let message = '';
    
    switch (conversion.buttonType) {
      case 'plan_subscription':
        message = WHATSAPP_CONFIG.MESSAGE_TEMPLATES.PLAN_SUBSCRIPTION(name, phone, email, planName);
        break;
      case 'doctor_appointment':
        message = WHATSAPP_CONFIG.MESSAGE_TEMPLATES.DOCTOR_APPOINTMENT(name, phone, email, doctorName);
        break;
      case 'enterprise_quote':
        message = WHATSAPP_CONFIG.MESSAGE_TEMPLATES.ENTERPRISE_QUOTE(name, phone, email);
        break;
      default:
        throw new Error(`Invalid button type: ${conversion.buttonType}`);
    }
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_CONFIG.DEFAULT_PHONE}?text=${encodedMessage}`;
  }

  /**
   * Gets conversions by date range
   */
  static async getConversionsByDateRange(startDate: Date, endDate: Date): Promise<WhatsAppConversion[]> {
    return await storage.getWhatsappConversionsByDateRange(startDate, endDate);
  }

  /**
   * Gets all conversions
   */
  static async getAllConversions(): Promise<WhatsAppConversion[]> {
    return await storage.getAllWhatsappConversions();
  }
}