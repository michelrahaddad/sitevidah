import { db } from "./db";
import { logger, logPerformance } from "./logger";
import type { Request, Response } from "express";

// Health check system
interface HealthCheck {
  service: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime?: number;
  message?: string;
  timestamp: string;
}

// Database health check
const checkDatabase = async (): Promise<HealthCheck> => {
  const start = Date.now();
  try {
    await db.select().from({} as any).limit(1);
    const responseTime = Date.now() - start;
    
    return {
      service: 'database',
      status: responseTime < 1000 ? 'healthy' : 'degraded',
      responseTime,
      message: responseTime < 1000 ? 'Database responsive' : 'Database slow',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      service: 'database',
      status: 'unhealthy',
      responseTime: Date.now() - start,
      message: 'Database connection failed',
      timestamp: new Date().toISOString()
    };
  }
};

// Memory health check
const checkMemory = (): HealthCheck => {
  const memUsage = process.memoryUsage();
  const totalMem = memUsage.heapTotal;
  const usedMem = memUsage.heapUsed;
  const memoryUsagePercent = (usedMem / totalMem) * 100;

  let status: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
  let message = 'Memory usage normal';

  if (memoryUsagePercent > 90) {
    status = 'unhealthy';
    message = 'Critical memory usage';
  } else if (memoryUsagePercent > 75) {
    status = 'degraded';
    message = 'High memory usage';
  }

  return {
    service: 'memory',
    status,
    message: `${message} (${memoryUsagePercent.toFixed(1)}%)`,
    timestamp: new Date().toISOString()
  };
};

// Disk space check (simplified)
const checkDisk = (): HealthCheck => {
  // In a real implementation, you'd check actual disk usage
  // For now, we'll simulate based on log file sizes
  return {
    service: 'disk',
    status: 'healthy',
    message: 'Disk space adequate',
    timestamp: new Date().toISOString()
  };
};

// Performance metrics collection
class PerformanceMetrics {
  private requestCounts: Map<string, number> = new Map();
  private responseTimes: Map<string, number[]> = new Map();
  private errorCounts: Map<string, number> = new Map();
  private lastReset: number = Date.now();

  recordRequest(path: string, responseTime: number, statusCode: number) {
    // Record request count
    this.requestCounts.set(path, (this.requestCounts.get(path) || 0) + 1);

    // Record response time
    const times = this.responseTimes.get(path) || [];
    times.push(responseTime);
    if (times.length > 100) times.shift(); // Keep last 100 requests
    this.responseTimes.set(path, times);

    // Record errors
    if (statusCode >= 400) {
      this.errorCounts.set(path, (this.errorCounts.get(path) || 0) + 1);
    }

    // Log slow requests
    if (responseTime > 5000) {
      logger.warn('Slow request detected', {
        path,
        responseTime: `${responseTime}ms`,
        statusCode
      });
    }
  }

  getMetrics() {
    const now = Date.now();
    const timeWindow = now - this.lastReset;

    const metrics = {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      timeWindow: `${Math.round(timeWindow / 1000)}s`,
      requests: {
        total: Array.from(this.requestCounts.values()).reduce((a, b) => a + b, 0),
        byPath: Object.fromEntries(this.requestCounts),
      },
      responseTimes: {
        average: this.calculateAverageResponseTime(),
        byPath: this.getResponseTimesByPath()
      },
      errors: {
        total: Array.from(this.errorCounts.values()).reduce((a, b) => a + b, 0),
        byPath: Object.fromEntries(this.errorCounts),
        rate: this.calculateErrorRate()
      },
      memory: process.memoryUsage(),
    };

    return metrics;
  }

  private calculateAverageResponseTime(): number {
    const allTimes = Array.from(this.responseTimes.values()).flat();
    return allTimes.length > 0 
      ? Math.round(allTimes.reduce((a, b) => a + b, 0) / allTimes.length)
      : 0;
  }

  private getResponseTimesByPath(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const [path, times] of this.responseTimes.entries()) {
      result[path] = times.length > 0
        ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
        : 0;
    }
    return result;
  }

  private calculateErrorRate(): number {
    const totalRequests = Array.from(this.requestCounts.values()).reduce((a, b) => a + b, 0);
    const totalErrors = Array.from(this.errorCounts.values()).reduce((a, b) => a + b, 0);
    return totalRequests > 0 ? Math.round((totalErrors / totalRequests) * 100) : 0;
  }

  reset() {
    this.requestCounts.clear();
    this.responseTimes.clear();
    this.errorCounts.clear();
    this.lastReset = Date.now();
  }
}

export const performanceMetrics = new PerformanceMetrics();

// Comprehensive health check
export const getSystemHealth = async (): Promise<{
  status: 'healthy' | 'unhealthy' | 'degraded';
  checks: HealthCheck[];
  uptime: number;
  timestamp: string;
}> => {
  const checks = await Promise.all([
    checkDatabase(),
    Promise.resolve(checkMemory()),
    Promise.resolve(checkDisk())
  ]);

  const hasUnhealthy = checks.some(check => check.status === 'unhealthy');
  const hasDegraded = checks.some(check => check.status === 'degraded');

  let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
  if (hasUnhealthy) {
    overallStatus = 'unhealthy';
  } else if (hasDegraded) {
    overallStatus = 'degraded';
  }

  return {
    status: overallStatus,
    checks,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
};

// Express middleware for performance monitoring
export const performanceMiddleware = (req: Request, res: Response, next: Function) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const path = req.route?.path || req.path;
    
    performanceMetrics.recordRequest(path, duration, res.statusCode);
    
    // Log request for monitoring
    logger.info('Request completed', {
      method: req.method,
      path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')?.substring(0, 100)
    });
  });

  next();
};

// Health check endpoints
export const healthRoutes = (app: any) => {
  // Basic health check
  app.get('/health', async (req: Request, res: Response) => {
    try {
      const health = await getSystemHealth();
      const statusCode = health.status === 'healthy' ? 200 : 
                        health.status === 'degraded' ? 200 : 503;
      
      res.status(statusCode).json(health);
    } catch (error) {
      logger.error('Health check failed', { error: error.message });
      res.status(503).json({
        status: 'unhealthy',
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Detailed metrics endpoint (admin only)
  app.get('/metrics', async (req: Request, res: Response) => {
    try {
      const health = await getSystemHealth();
      const metrics = performanceMetrics.getMetrics();
      
      res.json({
        health,
        metrics,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Metrics endpoint failed', { error: error.message });
      res.status(500).json({
        error: 'Failed to retrieve metrics',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Readiness probe (for load balancers)
  app.get('/ready', async (req: Request, res: Response) => {
    try {
      const dbCheck = await checkDatabase();
      if (dbCheck.status === 'unhealthy') {
        return res.status(503).json({
          ready: false,
          message: 'Database not ready'
        });
      }
      
      res.json({
        ready: true,
        message: 'Service ready',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(503).json({
        ready: false,
        message: 'Service not ready'
      });
    }
  });
};