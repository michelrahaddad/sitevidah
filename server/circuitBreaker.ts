import CircuitBreaker from 'opossum';
import { logger } from './logger';

// Circuit breaker options
const circuitBreakerOptions = {
  timeout: 30000, // 30 seconds
  errorThresholdPercentage: 50, // Open circuit after 50% failure rate
  resetTimeout: 60000, // Try again after 1 minute
  rollingCountTimeout: 10000, // 10 second rolling window
  rollingCountBuckets: 10, // Number of buckets in rolling window
  name: 'DatabaseCircuitBreaker',
  allowWarmUp: true,
  volumeThreshold: 10 // Minimum number of requests before circuit can open
};

// Database query wrapper with circuit breaker
export const createDatabaseCircuitBreaker = <T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  name: string = 'DatabaseOperation'
) => {
  const breaker = new CircuitBreaker(fn, {
    ...circuitBreakerOptions,
    name
  });

  // Event listeners for monitoring
  breaker.on('open', () => {
    logger.error(`Circuit breaker opened for ${name}`, {
      circuitBreaker: name,
      state: 'OPEN',
      timestamp: new Date().toISOString()
    });
  });

  breaker.on('halfOpen', () => {
    logger.warn(`Circuit breaker half-open for ${name}`, {
      circuitBreaker: name,
      state: 'HALF_OPEN',
      timestamp: new Date().toISOString()
    });
  });

  breaker.on('close', () => {
    logger.info(`Circuit breaker closed for ${name}`, {
      circuitBreaker: name,
      state: 'CLOSED',
      timestamp: new Date().toISOString()
    });
  });

  breaker.on('failure', (error) => {
    logger.error(`Circuit breaker failure for ${name}`, {
      circuitBreaker: name,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  });

  breaker.on('success', (result) => {
    logger.debug(`Circuit breaker success for ${name}`, {
      circuitBreaker: name,
      timestamp: new Date().toISOString()
    });
  });

  breaker.on('timeout', () => {
    logger.error(`Circuit breaker timeout for ${name}`, {
      circuitBreaker: name,
      timeout: circuitBreakerOptions.timeout,
      timestamp: new Date().toISOString()
    });
  });

  return breaker;
};

// Specific circuit breakers for different operations
export const queryCircuitBreaker = createDatabaseCircuitBreaker(
  async (queryFn: () => Promise<any>) => queryFn(),
  'DatabaseQuery'
);

export const writeCircuitBreaker = createDatabaseCircuitBreaker(
  async (writeFn: () => Promise<any>) => writeFn(),
  'DatabaseWrite'
);

export const authCircuitBreaker = createDatabaseCircuitBreaker(
  async (authFn: () => Promise<any>) => authFn(),
  'AuthenticationQuery'
);

// Circuit breaker middleware for Express
export const circuitBreakerMiddleware = (req: any, res: any, next: any) => {
  // Add circuit breaker utilities to request object
  req.circuitBreaker = {
    query: queryCircuitBreaker,
    write: writeCircuitBreaker,
    auth: authCircuitBreaker,
    
    // Helper method to wrap database operations
    protectedQuery: async (queryFn: () => Promise<any>) => {
      try {
        return await queryCircuitBreaker.fire(queryFn);
      } catch (error) {
        if (error.message.includes('Circuit breaker is OPEN')) {
          logger.error('Database unavailable - circuit breaker open');
          throw new Error('Service temporarily unavailable');
        }
        throw error;
      }
    },

    protectedWrite: async (writeFn: () => Promise<any>) => {
      try {
        return await writeCircuitBreaker.fire(writeFn);
      } catch (error) {
        if (error.message.includes('Circuit breaker is OPEN')) {
          logger.error('Database unavailable - circuit breaker open');
          throw new Error('Service temporarily unavailable');
        }
        throw error;
      }
    }
  };

  next();
};

// Health check for circuit breakers
export const getCircuitBreakerStatus = () => {
  return {
    query: {
      state: queryCircuitBreaker.opened ? 'OPEN' : queryCircuitBreaker.halfOpen ? 'HALF_OPEN' : 'CLOSED',
      stats: queryCircuitBreaker.stats,
      options: queryCircuitBreaker.options
    },
    write: {
      state: writeCircuitBreaker.opened ? 'OPEN' : writeCircuitBreaker.halfOpen ? 'HALF_OPEN' : 'CLOSED',
      stats: writeCircuitBreaker.stats,
      options: writeCircuitBreaker.options
    },
    auth: {
      state: authCircuitBreaker.opened ? 'OPEN' : authCircuitBreaker.halfOpen ? 'HALF_OPEN' : 'CLOSED',
      stats: authCircuitBreaker.stats,
      options: authCircuitBreaker.options
    }
  };
};