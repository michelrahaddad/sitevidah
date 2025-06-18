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
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  // Create multiple URL options for maximum compatibility
  const urls = [
    `https://wa.me/${cleanPhone}?text=${encodedMessage}`,
    `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`,
    `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`
  ];
  
  // Try each URL approach with different methods
  for (let i = 0; i < urls.length; i++) {
    try {
      if (i === 0) {
        // First attempt: direct location change
        window.location.href = urls[i];
        break;
      } else if (i === 1) {
        // Second attempt: new window
        const newWindow = window.open(urls[i], '_blank', 'noopener,noreferrer');
        if (newWindow) break;
      } else {
        // Final fallback: create link and click
        const link = document.createElement('a');
        link.href = urls[i];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      }
    } catch (error) {
      console.warn(`WhatsApp method ${i + 1} failed:`, error);
      if (i === urls.length - 1) {
        console.error('All WhatsApp methods failed');
        // Show user-friendly message
        alert('Não foi possível abrir o WhatsApp automaticamente. Por favor, entre em contato pelo telefone (16) 99324-7676');
      }
    }
  }
};