import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import cache from 'memory-cache';
import { EmailService } from '@/lib/email';
import { db } from '@/lib/db';
import crypto from 'crypto';

// Note: This route uses bcrypt which requires Node.js runtime, not edge

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  cedula: z.string().optional(),
  phone: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

// Simple in-memory rate limiter to avoid bundling optional DB adapters
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

// memory-cache default export acts as a singleton cache


export async function POST(request: NextRequest) {
  try {
    // Environment variable checks (runtime)
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL is not set');
    }
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn('NEXT_PUBLIC_API_URL is not set');
    }
    // Basic rate limiting by IP
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const rec = rateLimitMap.get(ip) ?? { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    if (now > rec.resetAt) {
      rec.count = 0;
      rec.resetAt = now + RATE_LIMIT_WINDOW_MS;
    }
    rec.count += 1;
    rateLimitMap.set(ip, rec);
    if (rec.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

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

    // Optional caching (noop on serverless cold starts)
    cache.put('user:' + validatedData.email, userWithoutPassword, 3600 * 1000);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    const msg = (error as Error)?.message || 'Unknown error';
    console.error('Registration error:', msg);
    return NextResponse.json(
      { error: `Server error: ${msg}` },
      { status: 500 }
    );
  }
}