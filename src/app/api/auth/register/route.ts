import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { RateLimiter } from 'rate-limiter-flexible';
import MemoryCache from 'memory-cache';
import { EmailService } from '@/lib/email';
import { db } from '@/lib/db';
import crypto from 'crypto';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  cedula: z.string().optional(),
  phone: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

// Initialize rate limiter
const rateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Max 5 requests per minute
  key: 'auth-register'
});

// Initialize cache
const cache = new MemoryCache();

// Add environment variable checks
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is missing');
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is missing');
}

export async function POST(request: NextRequest) {
  try {
    // Add rate limiting check
    await rateLimiter.limit(request);

    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Add password hashing
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    // Create user
    const user = await createUser({
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name,
      cedula: validatedData.cedula,
      phone: validatedData.phone,
      role: validatedData.role || UserRole.INVESTOR,
    });

    // Generate email verification token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create verification token
    await db.emailVerificationToken.create({
      data: {
        token,
        email: validatedData.email,
        expiresAt,
      },
    });

    // Send verification email
    const emailService = new EmailService();
    await emailService.sendVerificationEmail(validatedData.email, token);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    // Add cache headers to API responses
    return NextResponse.json({
      message: 'User created successfully. Please check your email to verify your account.',
      user: userWithoutPassword,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
      status: 200
    });

    // Add caching for frequent queries
    const cachedUser = cache.get('user:' + validatedData.email);
    if (cachedUser) {
      return NextResponse.json(cachedUser, { status: 200 });
    }

    // Add cache for 1 hour
    cache.set('user:' + validatedData.email, userWithoutPassword, 3600);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error.message);
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}