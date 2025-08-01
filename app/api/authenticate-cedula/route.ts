import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.digital.gob.do';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cedulaNumber } = body;

    if (!cedulaNumber) {
      return NextResponse.json({ error: 'Cédula number is required.' }, { status: 400 });
    }

    // Sanitize cedulaNumber for URL, e.g., remove hyphens if any, though API might handle them
    const sanitizedCedulaNumber = cedulaNumber.replace(/-/g, '');
    const apiUrl = `${API_BASE_URL}/citizens/${sanitizedCedulaNumber}/validate`;

    console.log(`Calling cédula validation API: ${apiUrl}`);

    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      // Add any required headers here, e.g., Authorization if the API needs it
      // headers: {
      //   'Authorization': `Bearer ${process.env.CEDULA_API_KEY}`,
      // },
    });

    const data = await apiResponse.json();

    if (apiResponse.ok) { // Status 200 OK
      // Check the 'valid' field from ResponseCedulaValidationDto
      if (data.valid) {
        return NextResponse.json({
          message: 'Cédula authenticated successfully.',
          valid: data.valid,
        }, { status: 200 });
      } else {
        // API returned 200 OK but valid is false
        return NextResponse.json({ error: 'Cédula is not valid.', valid: false }, { status: 200 }); // Or 400 depending on how you want to handle it
      }
    } else if (apiResponse.status === 404) {
      // Handle 404 Not Found from ResponseNotFoundDto
      // The API might return { valid: false, message: '...' }
      return NextResponse.json({ error: data.message || 'Cédula not found.', valid: data.valid || false }, { status: 404 });
    } else {
      // Handle other error statuses
      console.error('Cédula API returned an error status:', apiResponse.status, data);
      return NextResponse.json({ error: data.message || 'Failed to validate cédula with the external service.' }, { status: apiResponse.status });
    }

  } catch (error) {
    console.error('Error in cédula authentication API route:', error);
    return NextResponse.json({ error: 'An internal server error occurred while contacting the validation service.' }, { status: 500 });
  }
}
