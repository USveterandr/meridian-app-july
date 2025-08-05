// Security utilities and configurations
export const SECURITY_CONFIG = {
  // Input validation limits
  MAX_INPUT_LENGTH: {
    NAME: 50,
    EMAIL: 254,
    PHONE: 20,
    CEDULA: 11,
    PASSWORD: 128,
  },
  
  // File upload limits
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  },
  
  // Rate limiting
  RATE_LIMITS: {
    REGISTRATION: 5, // per hour
    EMAIL_VERIFICATION: 3, // per hour
    LOGIN_ATTEMPTS: 10, // per hour
  },
} as const;

// Input sanitization function
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>\"'&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    })
    .trim()
    .slice(0, SECURITY_CONFIG.MAX_INPUT_LENGTH.NAME);
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && 
         email.length <= SECURITY_CONFIG.MAX_INPUT_LENGTH.EMAIL &&
         email.length >= 5;
}

// Phone validation
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,18}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

// Password validation
export function isValidPassword(password: string): boolean {
  return password.length >= 8 && 
         password.length <= SECURITY_CONFIG.MAX_INPUT_LENGTH.PASSWORD &&
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
}

// CSRF protection check
export function validateCSRFToken(request: Request): boolean {
  const requestedWith = request.headers.get('X-Requested-With');
  return requestedWith === 'XMLHttpRequest';
}

// File validation
export function isValidFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }
  
  if (file.size > SECURITY_CONFIG.FILE_UPLOAD.MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }
  
  if (!(SECURITY_CONFIG.FILE_UPLOAD.ALLOWED_TYPES as readonly string[]).includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPG, PNG, and PDF are allowed' };
  }
  
  return { valid: true };
}

// Log security events without exposing sensitive data
export function logSecurityEvent(event: string, details?: Record<string, any>) {
  const sanitizedDetails = details ? 
    Object.keys(details).reduce((acc, key) => {
      // Don't log sensitive fields
      if (['password', 'email', 'phone', 'cedula'].includes(key.toLowerCase())) {
        acc[key] = '[REDACTED]';
      } else {
        acc[key] = details[key];
      }
      return acc;
    }, {} as Record<string, any>) : {};
    
  console.log(`Security Event: ${event}`, {
    timestamp: new Date().toISOString(),
    ...sanitizedDetails
  });
}