import Redis from 'ioredis';
import { logger } from './logger';

// Redis client configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
  family: 4
};

class CacheManager {
  private redis: Redis;
  private isConnected: boolean = false;

  constructor() {
    this.redis = new Redis(redisConfig);
    this.setupEventListeners();
    this.connect();
  }

  private setupEventListeners() {
    this.redis.on('connect', () => {
      this.isConnected = true;
      logger.info('Redis connected successfully');
    });

    this.redis.on('error', (error) => {
      this.isConnected = false;
      logger.error('Redis connection error', { error: error.message });
    });

    this.redis.on('close', () => {
      this.isConnected = false;
      logger.warn('Redis connection closed');
    });

    this.redis.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });
  }

  private async connect() {
    try {
      await this.redis.connect();
    } catch (error) {
      logger.error('Failed to connect to Redis', { error: (error as Error).message });
    }
  }

  // Session storage
  async setSession(sessionId: string, data: any, ttl: number = 7200): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      
      await this.redis.setex(`session:${sessionId}`, ttl, JSON.stringify(data));
      return true;
    } catch (error) {
      logger.error('Failed to set session', { sessionId, error: (error as Error).message });
      return false;
    }
  }

  async getSession(sessionId: string): Promise<any | null> {
    try {
      if (!this.isConnected) return null;
      
      const data = await this.redis.get(`session:${sessionId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Failed to get session', { sessionId, error: (error as Error).message });
      return null;
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      
      await this.redis.del(`session:${sessionId}`);
      return true;
    } catch (error) {
      logger.error('Failed to delete session', { sessionId, error: (error as Error).message });
      return false;
    }
  }

  // General caching
  async set(key: string, value: any, ttl: number = 3600): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      await this.redis.setex(key, ttl, serialized);
      return true;
    } catch (error) {
      logger.error('Failed to set cache', { key, error: (error as Error).message });
      return false;
    }
  }

  async get(key: string): Promise<any | null> {
    try {
      if (!this.isConnected) return null;
      
      const data = await this.redis.get(key);
      if (!data) return null;

      try {
        return JSON.parse(data);
      } catch {
        return data; // Return as string if not JSON
      }
    } catch (error) {
      logger.error('Failed to get cache', { key, error: (error as Error).message });
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      
      await this.redis.del(key);
      return true;
    } catch (error) {
      logger.error('Failed to delete cache', { key, error: (error as Error).message });
      return false;
    }
  }

  // Rate limiting
  async checkRateLimit(key: string, limit: number, window: number): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    try {
      if (!this.isConnected) {
        return { allowed: true, remaining: limit - 1, resetTime: Date.now() + window * 1000 };
      }

      const current = await this.redis.incr(key);
      
      if (current === 1) {
        await this.redis.expire(key, window);
      }

      const ttl = await this.redis.ttl(key);
      const resetTime = Date.now() + (ttl * 1000);

      return {
        allowed: current <= limit,
        remaining: Math.max(0, limit - current),
        resetTime
      };
    } catch (error) {
      logger.error('Rate limit check failed', { key, error: (error as Error).message });
      return { allowed: true, remaining: limit - 1, resetTime: Date.now() + window * 1000 };
    }
  }

  // Conversion cache
  async cacheConversions(conversions: any[], ttl: number = 300): Promise<boolean> {
    return this.set('whatsapp:conversions', conversions, ttl);
  }

  async getCachedConversions(): Promise<any[] | null> {
    return this.get('whatsapp:conversions');
  }

  // Plans cache
  async cachePlans(plans: any[], ttl: number = 3600): Promise<boolean> {
    return this.set('plans:all', plans, ttl);
  }

  async getCachedPlans(): Promise<any[] | null> {
    return this.get('plans:all');
  }

  // Admin token blacklist
  async blacklistToken(token: string, ttl: number = 7200): Promise<boolean> {
    return this.set(`blacklist:${token}`, 'true', ttl);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.get(`blacklist:${token}`);
    return result === 'true';
  }

  // Health check
  async healthCheck(): Promise<{ connected: boolean; latency?: number; error?: string }> {
    try {
      if (!this.isConnected) {
        return { connected: false, error: 'Not connected' };
      }

      const start = Date.now();
      await this.redis.ping();
      const latency = Date.now() - start;

      return { connected: true, latency };
    } catch (error) {
      return { connected: false, error: (error as Error).message };
    }
  }

  // Cleanup and shutdown
  async disconnect(): Promise<void> {
    try {
      await this.redis.disconnect();
      this.isConnected = false;
      logger.info('Redis disconnected');
    } catch (error) {
      logger.error('Error disconnecting Redis', { error: (error as Error).message });
    }
  }

  // Cache invalidation patterns
  async invalidatePattern(pattern: string): Promise<number> {
    try {
      if (!this.isConnected) return 0;

      const keys = await this.redis.keys(pattern);
      if (keys.length === 0) return 0;

      await this.redis.del(...keys);
      return keys.length;
    } catch (error) {
      logger.error('Failed to invalidate cache pattern', { pattern, error: (error as Error).message });
      return 0;
    }
  }

  // Statistics
  async getStats(): Promise<any> {
    try {
      if (!this.isConnected) return { connected: false };

      const info = await this.redis.info();
      const keyspace = await this.redis.info('keyspace');
      
      return {
        connected: true,
        info: info,
        keyspace: keyspace,
        memory: await this.redis.memory('usage'),
        clients: await this.redis.client('list')
      };
    } catch (error) {
      return { connected: false, error: (error as Error).message };
    }
  }
}

export const cacheManager = new CacheManager();

// Middleware for cache-enabled requests
export const cacheMiddleware = (ttl: number = 300) => {
  return async (req: any, res: any, next: any) => {
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = `http:${req.originalUrl}`;
    const cached = await cacheManager.get(cacheKey);

    if (cached) {
      logger.debug('Cache hit', { url: req.originalUrl });
      return res.json(cached);
    }

    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data: any) {
      cacheManager.set(cacheKey, data, ttl);
      logger.debug('Response cached', { url: req.originalUrl, ttl });
      return originalJson.call(this, data);
    };

    next();
  };
};