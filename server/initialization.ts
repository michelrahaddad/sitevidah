import { logger } from './logger';
import { cacheManager } from './cache';
import { backupManager } from './backup';
import { db } from './db';
import { storage } from './storage';

// System initialization for production
export class SystemInitializer {
  private initialized = false;

  async initialize(): Promise<boolean> {
    if (this.initialized) {
      logger.warn('System already initialized');
      return true;
    }

    try {
      logger.info('Starting system initialization');

      // Create logs directory
      await this.createLogsDirectory();

      // Test database connection
      await this.testDatabaseConnection();

      // Initialize cache connection
      await this.initializeCache();

      // Verify backup directory
      await this.verifyBackupDirectory();

      // Run initial health checks
      await this.runHealthChecks();

      this.initialized = true;
      logger.info('System initialization completed successfully');
      return true;

    } catch (error) {
      logger.error('System initialization failed', {
        error: (error as Error).message,
        stack: (error as Error).stack
      });
      return false;
    }
  }

  private async createLogsDirectory(): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      await execAsync('mkdir -p logs');
      logger.info('Logs directory created/verified');
    } catch (error) {
      throw new Error(`Failed to create logs directory: ${(error as Error).message}`);
    }
  }

  private async testDatabaseConnection(): Promise<void> {
    try {
      // Simple test using storage interface instead of raw query
      await storage.getAllPlans();
      logger.info('Database connection verified');
    } catch (error) {
      logger.warn('Database connection test failed, continuing with startup', {
        error: (error as Error).message
      });
      // Don't throw error in development, just log warning
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Database connection failed: ${(error as Error).message}`);
      }
    }
  }

  private async initializeCache(): Promise<void> {
    try {
      const health = await cacheManager.healthCheck();
      if (health.connected) {
        logger.info('Cache connection established', { latency: health.latency });
      } else {
        logger.warn('Cache connection failed, running without cache', { error: health.error });
      }
    } catch (error) {
      logger.warn('Cache initialization failed, running without cache', {
        error: (error as Error).message
      });
    }
  }

  private async verifyBackupDirectory(): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      await execAsync('mkdir -p backups');
      const status = backupManager.getBackupStatus();
      logger.info('Backup system verified', {
        lastBackup: status.lastBackup,
        nextScheduled: status.nextScheduledBackup
      });
    } catch (error) {
      throw new Error(`Failed to verify backup directory: ${(error as Error).message}`);
    }
  }

  private async runHealthChecks(): Promise<void> {
    try {
      // Test admin user exists
      const adminExists = await storage.getAdminByUsername('admin');
      if (!adminExists) {
        logger.warn('Default admin user not found - creating one');
        await this.createDefaultAdmin();
      } else {
        logger.info('Admin user verified');
      }

      // Test plans data
      const plans = await storage.getAllPlans();
      logger.info(`Plans verified: ${plans.length} plans available`);

      logger.info('Health checks completed');
    } catch (error) {
      throw new Error(`Health checks failed: ${(error as Error).message}`);
    }
  }

  private async createDefaultAdmin(): Promise<void> {
    try {
      await storage.createAdminUser({
        username: 'admin',
        email: 'admin@vidah.com.br',
        password: 'admin123'
      });
      logger.info('Default admin user created');
    } catch (error) {
      logger.error('Failed to create default admin user', {
        error: (error as Error).message
      });
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const systemInitializer = new SystemInitializer();