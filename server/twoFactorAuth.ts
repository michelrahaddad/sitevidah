import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { logger, logAudit } from './logger';

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

interface TwoFactorValidation {
  isValid: boolean;
  usedBackupCode?: string;
}

class TwoFactorAuthManager {
  private readonly serviceName = 'Cartão Vidah Admin';
  private readonly issuer = 'Cartão + Vidah';

  async generateSecret(username: string): Promise<TwoFactorSetup> {
    try {
      // Generate secret
      const secret = speakeasy.generateSecret({
        name: `${this.serviceName} (${username})`,
        issuer: this.issuer,
        length: 32
      });

      // Generate QR code
      const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      logger.info('2FA secret generated', { username });
      
      logAudit('2fa_setup_initiated', username, {
        action: '2fa_setup_initiated',
        timestamp: new Date().toISOString()
      });

      return {
        secret: secret.base32,
        qrCode,
        backupCodes
      };

    } catch (error) {
      logger.error('Failed to generate 2FA secret', {
        username,
        error: (error as Error).message
      });
      throw new Error('Failed to generate 2FA secret');
    }
  }

  verifyToken(secret: string, token: string, window: number = 2): boolean {
    try {
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window
      });

      return verified;
    } catch (error) {
      logger.error('2FA token verification failed', {
        error: (error as Error).message
      });
      return false;
    }
  }

  validateTwoFactor(
    secret: string, 
    token: string, 
    backupCodes: string[], 
    username: string
  ): TwoFactorValidation {
    try {
      // First try TOTP token
      if (this.verifyToken(secret, token)) {
        logAudit('2fa_success', username, {
          method: 'totp',
          timestamp: new Date().toISOString()
        });
        return { isValid: true };
      }

      // Then try backup codes
      const normalizedToken = token.replace(/\s/g, '').toLowerCase();
      const matchingCode = backupCodes.find(code => 
        code.replace(/\s/g, '').toLowerCase() === normalizedToken
      );

      if (matchingCode) {
        logAudit('2fa_success', username, {
          method: 'backup_code',
          timestamp: new Date().toISOString()
        });
        return { isValid: true, usedBackupCode: matchingCode };
      }

      logAudit('2fa_failed', username, {
        timestamp: new Date().toISOString()
      });
      return { isValid: false };

    } catch (error) {
      logger.error('2FA validation error', {
        username,
        error: (error as Error).message
      });
      return { isValid: false };
    }
  }

  private generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      // Generate 8-character alphanumeric code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      // Format as XXXX-XXXX
      const formattedCode = `${code.substring(0, 4)}-${code.substring(4, 8)}`;
      codes.push(formattedCode);
    }

    return codes;
  }

  regenerateBackupCodes(): string[] {
    return this.generateBackupCodes();
  }

  // Generate QR code for manual entry
  async generateQRCodeForSecret(secret: string, username: string): Promise<string> {
    try {
      const otpauth = speakeasy.otpauthURL({
        secret,
        label: `${this.serviceName} (${username})`,
        issuer: this.issuer,
        encoding: 'base32'
      });

      return await QRCode.toDataURL(otpauth);
    } catch (error) {
      logger.error('Failed to generate QR code', {
        username,
        error: (error as Error).message
      });
      throw new Error('Failed to generate QR code');
    }
  }

  // Validate setup token during 2FA enrollment
  validateSetupToken(secret: string, token: string): boolean {
    return this.verifyToken(secret, token, 1); // Smaller window for setup
  }

  // Rate limiting for 2FA attempts
  private twoFactorAttempts = new Map<string, { attempts: number; lastAttempt: number }>();

  checkRateLimit(username: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const attempts = this.twoFactorAttempts.get(username) || { attempts: 0, lastAttempt: 0 };

    // Reset if last attempt was more than 15 minutes ago
    if (now - attempts.lastAttempt > 15 * 60 * 1000) {
      attempts.attempts = 0;
    }

    // Allow max 5 attempts per 15 minutes
    if (attempts.attempts >= 5) {
      logger.warn('2FA rate limit exceeded', { username });
      return { allowed: false, remaining: 0 };
    }

    attempts.attempts++;
    attempts.lastAttempt = now;
    this.twoFactorAttempts.set(username, attempts);

    return { allowed: true, remaining: 5 - attempts.attempts };
  }

  resetRateLimit(username: string): void {
    this.twoFactorAttempts.delete(username);
  }

  // Emergency disable 2FA (for admin use only)
  async emergencyDisable(username: string, adminUser: string): Promise<boolean> {
    try {
      logger.warn('2FA emergency disable', { username, disabledBy: adminUser });
      
      logAudit('2fa_emergency_disable', adminUser, {
        targetUser: username,
        timestamp: new Date().toISOString()
      });

      return true;
    } catch (error) {
      logger.error('Failed to emergency disable 2FA', {
        username,
        adminUser,
        error: (error as Error).message
      });
      return false;
    }
  }
}

export const twoFactorAuth = new TwoFactorAuthManager();