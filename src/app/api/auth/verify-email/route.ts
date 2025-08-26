import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

export const runtime = 'edge';

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find the verification token
    const verificationToken = await db.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (verificationToken.expiresAt < new Date()) {
      // Delete expired token
      await db.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      });

      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await db.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user as verified
    await db.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    // Delete the verification token
    await db.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Create a notification for successful verification
    await db.notification.create({
      data: {
        type: 'ACCOUNT_UPDATE',
        title: 'Email Verified',
        message: 'Your email address has been successfully verified.',
        userId: user.id,
      },
    });

    // Redirect to success page or return success response
    return NextResponse.redirect(new URL('/auth/verification-success', request.url));
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = verifyEmailSchema.parse(body);

    // Find the verification token
    const verificationToken = await db.emailVerificationToken.findUnique({
      where: { token: validatedData.token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (verificationToken.expiresAt < new Date()) {
      // Delete expired token
      await db.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      });

      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await db.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user as verified
    await db.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    // Delete the verification token
    await db.emailVerificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Create a notification for successful verification
    await db.notification.create({
      data: {
        type: 'ACCOUNT_UPDATE',
        title: 'Email Verified',
        message: 'Your email address has been successfully verified.',
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: true,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}