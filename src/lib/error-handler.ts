/**
 * Error handling utilities for the Meridian Real Estate Platform
 */

export interface ErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
  timestamp?: string;
  requestId?: string;
  userId?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  timestamp: string;
  details?: any;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly isOperational: boolean;
  public readonly timestamp: string;

  constructor(
    message: string, 
    statusCode: number = 500, 
    code?: string, 
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    if (field) {
      this.message = `${field}: ${message}`;
    }
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

// Changed Function to proper function type signature
export type ErrorHandler = (error: Error, context?: Record<string, any>) => void;

export function createErrorResponse(error: Error | AppError, includeStack: boolean = false): ErrorResponse {
  const timestamp = new Date().toISOString();
  
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      timestamp: error.timestamp || timestamp,
      details: includeStack ? { stack: error.stack } : undefined
    };
  }
  
  return {
    success: false,
    error: error.message || 'Internal server error',
    timestamp,
    details: includeStack ? { stack: error.stack } : undefined
  };
}

export function logError(error: Error | AppError, context?: Record<string, any>): void {
  const errorInfo = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...(error instanceof AppError && {
      statusCode: error.statusCode,
      code: error.code,
      isOperational: error.isOperational,
    }),
    context: context ? sanitizeContext(context) : undefined
  };
  
  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorInfo);
  } else {
    // Log only essential info in production
    console.error('Error:', {
      name: error.name,
      message: error.message,
      statusCode: error instanceof AppError ? error.statusCode : 500,
      timestamp: errorInfo.timestamp
    });
  }
}

function sanitizeContext(context: Record<string, any>): Record<string, any> {
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'credential'];
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(context)) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

export function handleAsyncError(handler: (req: any, res: any) => Promise<any>) {
  return async (req: any, res: any) => {
    try {
      await handler(req, res);
    } catch (error) {
      logError(error instanceof Error ? error : new Error(String(error)), {
        url: req.url,
        method: req.method,
        userAgent: req.headers?.['user-agent'],
      });
      
      const errorResponse = createErrorResponse(
        error instanceof Error ? error : new Error(String(error)),
        process.env.NODE_ENV === 'development'
      );
      
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      res.status(statusCode).json(errorResponse);
    }
  };
}

export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

export function handleUncaughtExceptions(): void {
  process.on('uncaughtException', (error: Error) => {
    logError(error, { type: 'uncaughtException' });
    
    if (!isOperationalError(error)) {
      process.exit(1);
    }
  });
  
  process.on('unhandledRejection', (reason: unknown, promise: Promise<any>) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logError(error, { 
      type: 'unhandledRejection',
      promise: promise.toString()
    });
    
    if (!isOperationalError(error)) {
      process.exit(1);
    }
  });
}

// Export common error instances
export const COMMON_ERRORS = {
  INVALID_INPUT: new ValidationError('Invalid input provided'),
  UNAUTHORIZED: new AuthenticationError(),
  FORBIDDEN: new AuthorizationError(),
  NOT_FOUND: new NotFoundError(),
  RATE_LIMITED: new RateLimitError(),
  INTERNAL_ERROR: new AppError('Internal server error', 500, 'INTERNAL_ERROR')
} as const;