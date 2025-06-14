import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...meta,
    });
  })
);

// Daily rotate file transport for general logs
const fileRotateTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '30d',
  format: logFormat,
});

// Daily rotate file transport for error logs
const errorRotateTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '30d',
  format: logFormat,
});

// Security logs transport
const securityRotateTransport = new DailyRotateFile({
  filename: 'logs/security-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '90d', // Keep security logs longer
  format: logFormat,
});

// Audit logs transport
const auditRotateTransport = new DailyRotateFile({
  filename: 'logs/audit-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '365d', // Keep audit logs for 1 year
  format: logFormat,
});

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'cartao-vidah' },
  transports: [
    fileRotateTransport,
    errorRotateTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

// Security logger
export const securityLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  defaultMeta: { service: 'cartao-vidah-security' },
  transports: [securityRotateTransport]
});

// Audit logger
export const auditLogger = winston.createLogger({
  level: 'info',
  format: logFormat,
  defaultMeta: { service: 'cartao-vidah-audit' },
  transports: [auditRotateTransport]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Log helper functions
export const logSecurity = (level: string, message: string, meta: any = {}) => {
  securityLogger.log(level, message, {
    timestamp: new Date().toISOString(),
    ...meta
  });
};

export const logAudit = (action: string, userId: string, details: any = {}) => {
  auditLogger.info('User action', {
    action,
    userId,
    timestamp: new Date().toISOString(),
    ...details
  });
};

export const logRequest = (req: any, res: any, duration: number) => {
  logger.info('HTTP Request', {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    duration: `${duration}ms`,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
};

export const logError = (error: Error, context: any = {}) => {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...context
  });
};

// Performance monitoring
export const logPerformance = (operation: string, duration: number, metadata: any = {}) => {
  logger.info('Performance Metric', {
    operation,
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
    ...metadata
  });
};

// Database query logging
export const logDatabaseQuery = (query: string, duration: number, success: boolean) => {
  logger.info('Database Query', {
    query: query.substring(0, 1000), // Limit query length
    duration: `${duration}ms`,
    success,
    timestamp: new Date().toISOString()
  });
};