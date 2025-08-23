import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
  role?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export class AuthService {
  private jwtSecret: string;
  private tokenExpiry: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-fallback-secret-key';
    this.tokenExpiry = process.env.JWT_EXPIRY || '7d';
  }

  generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email
    };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.tokenExpiry
    });
  }

  verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  generateVerificationToken(email: string): string {
    const payload = {
      email,
      type: 'email-verification'
    };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: '24h' // Verification tokens expire in 24 hours
    });
  }

  generatePasswordResetToken(email: string): string {
    const payload = {
      email,
      type: 'password-reset'
    };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: '1h' // Password reset tokens expire in 1 hour
    });
  }

  verifyVerificationToken(token: string): { email: string; type: string } | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      if (decoded.type === 'email-verification') {
        return decoded;
      }
      return null;
    } catch (error) {
      console.error('Verification token validation failed:', error);
      return null;
    }
  }

  verifyPasswordResetToken(token: string): { email: string; type: string } | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      if (decoded.type === 'password-reset') {
        return decoded;
      }
      return null;
    } catch (error) {
      console.error('Password reset token validation failed:', error);
      return null;
    }
  }

  extractTokenFromRequest(request: NextRequest): string | null {
    // Try Authorization header first
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Try cookie as fallback
    const token = request.cookies.get('token');
    return token?.value || null;
  }

  async authenticateRequest(request: NextRequest): Promise<AuthResult> {
    try {
      const token = this.extractTokenFromRequest(request);
      
      if (!token) {
        return {
          success: false,
          error: 'No authentication token provided'
        };
      }

      const payload = this.verifyToken(token);
      
      if (!payload) {
        return {
          success: false,
          error: 'Invalid or expired token'
        };
      }

      // In a real implementation, you would fetch user details from database
      // For now, return the basic user info from the token
      const user: User = {
        id: payload.userId,
        email: payload.email
      };

      return {
        success: true,
        user
      };

    } catch (error) {
      console.error('Authentication error:', error);
      return {
        success: false,
        error: 'Authentication failed'
      };
    }
  }

  hashPassword(password: string): Promise<string> {
    // In a real implementation, you would use bcrypt or similar
    // This is a placeholder that should be replaced with proper hashing
    return Promise.resolve(Buffer.from(password).toString('base64'));
  }

  verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    // In a real implementation, you would use bcrypt.compare or similar
    // This is a placeholder that should be replaced with proper verification
    const hashed = Buffer.from(password).toString('base64');
    return Promise.resolve(hashed === hashedPassword);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  isValidPassword(password: string): boolean {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>"'&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    }).trim();
  }
}

// Export the auth function that's expected by the API routes
export const auth = async (request: NextRequest): Promise<AuthResult> => {
  const authService = new AuthService();
  return authService.authenticateRequest(request);
};

// Export a default instance
export const authService = new AuthService();

// Export default auth service
export default authService;