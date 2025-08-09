import { NextRequest, NextResponse } from 'next/server';
import { drValidationService } from '@/lib/dr-validation';
import { asyncHandler } from '@/lib/error-handler';
import { z } from 'zod';

const batchValidateSchema = z.object({
  cedulas: z.array(z.string().min(11).max(11)).min(1).max(100),
});

export const POST = asyncHandler(async (request: NextRequest) => {
  const body = await request.json();
  
  // Validate input
  const validatedData = batchValidateSchema.parse(body);
  
  const { cedulas } = validatedData;

  // Limit batch size to prevent abuse
  if (cedulas.length > 100) {
    return NextResponse.json(
      { error: 'Batch size cannot exceed 100 cédulas' },
      { status: 400 }
    );
  }

  // Process batch validation
  const results = await drValidationService.batchValidateCedulas(cedulas);
  
  // Calculate statistics
  const total = results.length;
  const valid = results.filter(r => r.valid).length;
  const invalid = total - valid;

  const summary = {
    total,
    valid,
    invalid,
    successRate: total > 0 ? Math.round((valid / total) * 100) : 0,
  };

  return NextResponse.json({
    results,
    summary,
  });
});