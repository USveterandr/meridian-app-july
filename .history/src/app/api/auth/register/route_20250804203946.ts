import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { RateLimiter } from 'rate-limiter-flexible';

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

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}