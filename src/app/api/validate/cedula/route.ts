import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { drValidationService } from '@/lib/dr-validation';
import { asyncHandler } from '@/lib/error-handler';

const cedulaSchema = z.object({
  cedula: z.string().min(11, 'Cédula must be 11 digits').max(11, 'Cédula must be 11 digits'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = cedulaSchema.parse(body);
    
    // Remove any formatting characters
    const cleanCedula = validatedData.cedula.replace(/[-\s]/g, '');
    
    // Validate using DR government API
    const result = await drValidationService.validateCedula(cleanCedula);
    
    // Get additional citizen information if available
    let citizenInfo = null;
    if (result.valid) {
      const citizenResult = await drValidationService.validateCitizen(cleanCedula);
      citizenInfo = citizenResult.valid ? { verified: true } : null;
    }
    
    return NextResponse.json({
      valid: result.valid,
      cedula: cleanCedula,
      message: result.message,
      citizenInfo: citizenInfo,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Cedula validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function validateCedulaWithAPI(cedula: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.digital.gob.do/v3/cedulas/${cedula}/validate`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.valid === true;
    }

    // Fallback to Luhn algorithm
    return validateCedulaLuhn(cedula);
  } catch (error) {
    console.error('DR API validation error:', error);
    // Fallback to Luhn algorithm
    return validateCedulaLuhn(cedula);
  }
}

async function getCitizenInfo(cedula: string): Promise<any> {
  try {
    const response = await fetch(`https://api.digital.gob.do/v3/citizens/${cedula}/validate`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    return null;
  } catch (error) {
    console.error('Citizen info API error:', error);
    return null;
  }
}

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

// GET endpoint for quick validation
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cedula = searchParams.get('cedula');

    if (!cedula) {
      return NextResponse.json(
        { error: 'Cédula parameter is required' },
        { status: 400 }
      );
    }

    // Clean and validate format
    const cleanCedula = cedula.replace(/[-\s]/g, '');
    
    if (!/^\d{11}$/.test(cleanCedula)) {
      return NextResponse.json({
        valid: false,
        error: 'Cédula must be 11 digits',
      });
    }

    const result = await drValidationService.validateCedula(cleanCedula);
    
    return NextResponse.json({
      valid: result.valid,
      cedula: cleanCedula,
      message: result.message,
    });
  } catch (error) {
    console.error('GET cedula validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}