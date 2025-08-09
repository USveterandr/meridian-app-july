type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, metadata?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };
  }

  info(message: string, metadata?: Record<string, any>) {
    const logEntry = this.formatMessage('info', message, metadata);
    if (this.isDevelopment) {
      console.log(`[INFO] ${logEntry.timestamp}: ${message}`, metadata || '');
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }

  warn(message: string, metadata?: Record<string, any>) {
    const logEntry = this.formatMessage('warn', message, metadata);
    if (this.isDevelopment) {
      console.warn(`[WARN] ${logEntry.timestamp}: ${message}`, metadata || '');
    } else {
      console.warn(JSON.stringify(logEntry));
    }
  }

  error(message: string, error?: Error | Record<string, any>) {
    const metadata = error instanceof Error 
      ? { error: error.message, stack: error.stack }
      : error;
    
    const logEntry = this.formatMessage('error', message, metadata);
    
    if (this.isDevelopment) {
      console.error(`[ERROR] ${logEntry.timestamp}: ${message}`, metadata || '');
    } else {
      console.error(JSON.stringify(logEntry));
    }
  }

  debug(message: string, metadata?: Record<string, any>) {
    if (!this.isDevelopment) return;
    
    const logEntry = this.formatMessage('debug', message, metadata);
    console.debug(`[DEBUG] ${logEntry.timestamp}: ${message}`, metadata || '');
  }
}

export const logger = new Logger();