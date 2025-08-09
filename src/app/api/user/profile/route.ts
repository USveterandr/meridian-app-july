import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
  cedula: z.string().optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  language: z.string().length(2, 'Language must be 2 characters').optional(),
});

// GET /api/user/profile - Get current user profile
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionTier: true,
        subscriptionEnd: true,
        isVerified: true,
        verificationLevel: true,
        cedula: true,
        phone: true,
        country: true,
        language: true,
        avatar: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = updateProfileSchema.parse(body);
    
    // Get user ID from session
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if cedula is already taken by another user
    if (validatedData.cedula && validatedData.cedula !== user.cedula) {
      const existingUser = await db.user.findFirst({
        where: {
          cedula: validatedData.cedula,
          id: { not: user.id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Cédula already registered' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await updateUser(user.id, validatedData);

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}