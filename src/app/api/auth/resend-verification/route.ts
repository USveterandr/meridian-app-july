import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { EmailService } from '@/lib/email';
import { z } from 'zod';
import crypto from 'crypto';

const resendVerificationSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = resendVerificationSchema.parse(body);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      );
    }

    // Delete any existing verification tokens for this email
    await db.emailVerificationToken.deleteMany({
      where: { email: validatedData.email },
    });

    // Generate new verification token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new verification token
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

    return NextResponse.json({
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}