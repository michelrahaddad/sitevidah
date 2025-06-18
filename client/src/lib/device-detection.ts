/**
 * Device detection utilities for WhatsApp redirection
 */

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Check for mobile patterns
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // Check for touch capability and screen size
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen);
};

export const isAndroidDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /android/i.test(navigator.userAgent);
};

export const isIOSDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const generateWhatsAppUrl = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  // wa.me is the most universal option - works on all devices
  // It automatically chooses the best available option:
  // - Mobile with app: opens native WhatsApp
  // - Mobile without app: opens web version
  // - Desktop: opens web.whatsapp.com
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const openWhatsApp = (phone: string, message: string): void => {
  const url = generateWhatsAppUrl(phone, message);
  
  // Try multiple approaches for maximum compatibility
  try {
    // Method 1: Direct location change (most reliable)
    window.location.href = url;
  } catch (error) {
    try {
      // Method 2: Open in new window if location change fails
      window.open(url, '_blank');
    } catch (fallbackError) {
      // Method 3: Create temporary link and click it
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};