import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { VerificationType, VerificationStatus } from '@prisma/client';
import { z } from 'zod';

const verificationSchema = z.object({
  type: z.nativeEnum(VerificationType),
  url: z.string().url().or(z.string()),
  metadata: z.string().optional(),
});

// GET /api/user/verify - Get user verification status
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const verificationDocs = await db.verificationDocument.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ 
      isVerified: user.isVerified,
      verificationLevel: user.verificationLevel,
      documents: verificationDocs,
    });
  } catch (error) {
    console.error('Get verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/user/verify - Submit verification document
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = verificationSchema.parse(body);
    
    // Get user ID from session
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create verification document
    const verificationDoc = await db.verificationDocument.create({
      data: {
        type: validatedData.type,
        url: validatedData.url,
        metadata: validatedData.metadata,
        userId: user.id,
      },
    });

    // If this is a cedula verification, validate it using DR API
    if (validatedData.type === VerificationType.DR_CEDULA) {
      try {
        // Extract cedula from metadata or user record
        const cedula = user.cedula || (validatedData.metadata ? JSON.parse(validatedData.metadata).cedula : null);
        
        if (cedula) {
          const isValid = await validateCedula(cedula);
          
          // Update verification status based on validation result
          await db.verificationDocument.update({
            where: { id: verificationDoc.id },
            data: {
              status: isValid ? VerificationStatus.APPROVED : VerificationStatus.REJECTED,
              reviewedAt: new Date(),
              rejectionReason: isValid ? null : 'Invalid cedula format or number',
            },
          });

          // Update user verification status if approved
          if (isValid) {
            await db.user.update({
              where: { id: user.id },
              data: {
                isVerified: true,
                verificationLevel: 'ADVANCED',
              },
            });
          }
        }
      } catch (error) {
        console.error('Cedula validation error:', error);
        // Don't fail the entire request if cedula validation fails
      }
    }

    return NextResponse.json({
      message: 'Verification document submitted successfully',
      document: verificationDoc,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Submit verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to validate Dominican Republic cedula
async function validateCedula(cedula: string): Promise<boolean> {
  try {
    // Remove any formatting characters
    const cleanCedula = cedula.replace(/[-\s]/g, '');
    
    // Basic format validation
    if (!/^\d{11}$/.test(cleanCedula)) {
      return false;
    }

    // Call DR government API for validation
    const response = await fetch(`https://api.digital.gob.do/v3/cedulas/${cleanCedula}/validate`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.valid === true;
    }

    // Fallback to Luhn algorithm validation
    return validateCedulaLuhn(cleanCedula);
  } catch (error) {
    console.error('Cedula validation API error:', error);
    // Fallback to Luhn algorithm validation
    return validateCedulaLuhn(cedula.replace(/[-\s]/g, ''));
  }
}

// Luhn algorithm implementation for cedula validation
function validateCedulaLuhn(cedula: string): boolean {
  if (!/^\d{11}$/.test(cedula)) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = cedula.length - 1; i >= 0; i--) {
    let digit = parseInt(cedula.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}