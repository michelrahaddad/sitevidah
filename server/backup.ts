import cron from 'node-cron';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger, logAudit } from './logger';

const execAsync = promisify(exec);

interface BackupResult {
  success: boolean;
  filename?: string;
  size?: number;
  duration?: number;
  error?: string;
}

class BackupManager {
  private isBackupRunning = false;
  private lastBackupTime: Date | null = null;
  private backupHistory: BackupResult[] = [];

  constructor() {
    this.initializeBackupSchedule();
  }

  private initializeBackupSchedule() {
    // Daily backup at 2 AM
    cron.schedule('0 2 * * *', () => {
      this.performBackup();
    }, {
      timezone: "America/Sao_Paulo"
    });

    // Weekly cleanup of old backups (keep last 30 days)
    cron.schedule('0 3 * * 0', () => {
      this.cleanupOldBackups();
    });

    logger.info('Backup scheduler initialized', {
      dailyBackup: '02:00 AM',
      weeklyCleanup: 'Sunday 03:00 AM'
    });
  }

  async performBackup(): Promise<BackupResult> {
    if (this.isBackupRunning) {
      logger.warn('Backup already in progress, skipping');
      return { success: false, error: 'Backup already in progress' };
    }

    this.isBackupRunning = true;
    const startTime = Date.now();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;

    try {
      logger.info('Starting database backup', { filename });

      // Create backup directory if it doesn't exist
      await execAsync('mkdir -p ./backups');

      // Perform PostgreSQL backup
      const backupCommand = `pg_dump "${process.env.DATABASE_URL}" > ./backups/${filename}`;
      await execAsync(backupCommand);

      // Get backup file size
      const { stdout: sizeOutput } = await execAsync(`stat -c%s ./backups/${filename}`);
      const size = parseInt(sizeOutput.trim());

      const duration = Date.now() - startTime;
      this.lastBackupTime = new Date();

      const result: BackupResult = {
        success: true,
        filename,
        size,
        duration
      };

      this.backupHistory.push(result);
      if (this.backupHistory.length > 100) {
        this.backupHistory.shift(); // Keep last 100 backup records
      }

      logger.info('Database backup completed successfully', {
        filename,
        size: `${(size / 1024 / 1024).toFixed(2)}MB`,
        duration: `${duration}ms`
      });

      logAudit('database_backup', 'system', {
        filename,
        size,
        duration,
        success: true
      });

      return result;

    } catch (error) {
      const duration = Date.now() - startTime;
      const result: BackupResult = {
        success: false,
        error: error.message,
        duration
      };

      this.backupHistory.push(result);

      logger.error('Database backup failed', {
        filename,
        duration: `${duration}ms`,
        error: error.message
      });

      logAudit('database_backup_failed', 'system', {
        filename,
        error: error.message,
        duration
      });

      return result;

    } finally {
      this.isBackupRunning = false;
    }
  }

  private async cleanupOldBackups() {
    try {
      logger.info('Starting backup cleanup');

      // Remove backups older than 30 days
      const cleanupCommand = 'find ./backups -name "backup-*.sql" -mtime +30 -delete';
      await execAsync(cleanupCommand);

      // Get current backup count
      const { stdout: countOutput } = await execAsync('find ./backups -name "backup-*.sql" | wc -l');
      const remainingBackups = parseInt(countOutput.trim());

      logger.info('Backup cleanup completed', {
        remainingBackups
      });

      logAudit('backup_cleanup', 'system', {
        remainingBackups
      });

    } catch (error) {
      logger.error('Backup cleanup failed', {
        error: error.message
      });
    }
  }

  async restoreFromBackup(filename: string): Promise<boolean> {
    try {
      logger.info('Starting database restore', { filename });

      const restoreCommand = `psql "${process.env.DATABASE_URL}" < ./backups/${filename}`;
      await execAsync(restoreCommand);

      logger.info('Database restore completed successfully', { filename });

      logAudit('database_restore', 'admin', {
        filename,
        success: true
      });

      return true;

    } catch (error) {
      logger.error('Database restore failed', {
        filename,
        error: error.message
      });

      logAudit('database_restore_failed', 'admin', {
        filename,
        error: error.message
      });

      return false;
    }
  }

  getBackupStatus() {
    return {
      isRunning: this.isBackupRunning,
      lastBackup: this.lastBackupTime,
      history: this.backupHistory.slice(-10), // Last 10 backups
      nextScheduledBackup: this.getNextBackupTime()
    };
  }

  private getNextBackupTime(): Date {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(2, 0, 0, 0);
    return tomorrow;
  }

  async listAvailableBackups(): Promise<string[]> {
    try {
      const { stdout } = await execAsync('ls -1 ./backups/backup-*.sql 2>/dev/null || true');
      return stdout.trim().split('\n').filter(line => line.length > 0);
    } catch (error) {
      logger.error('Failed to list backups', { error: error.message });
      return [];
    }
  }
}

export const backupManager = new BackupManager();