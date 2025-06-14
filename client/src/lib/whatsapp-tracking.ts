export interface TrackingData {
  buttonType: 'plan_subscription' | 'doctor_appointment' | 'enterprise_quote';
  planName?: string;
  doctorName?: string;
  name?: string;
  phone?: string;
}

export const trackWhatsAppConversion = async (data: TrackingData) => {
  try {
    await fetch('/api/whatsapp/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Error tracking WhatsApp conversion:', error);
  }
};

export const generateWhatsAppLink = (phone: string, message: string, trackingData: TrackingData) => {
  // Track the conversion before redirecting
  trackWhatsAppConversion(trackingData);
  
  // Generate WhatsApp URL
  const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
  return whatsappURL;
};