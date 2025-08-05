import { type NextRequest, NextResponse } from "next/server"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Environment configuration
const env = {
  EMAIL_REGION: process.env.EMAIL_REGION || 'us-east-1',
  EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@investwithmeridian.com',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

// Input sanitization function
function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>"'&]/g, (match) => {
    const entities: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    };
    return entities[match] || match;
  }).trim();
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  try {
    // Check for CSRF protection header
    const requestedWith = request.headers.get('X-Requested-With');
    if (requestedWith !== 'XMLHttpRequest') {
      return NextResponse.json({ error: "Invalid request" }, { status: 403 });
    }

    const { email, firstName, timestamp } = await request.json()

    // Validate required fields
    if (!email || !firstName) {
      return NextResponse.json({ error: "Email and firstName are required" }, { status: 400 })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedFirstName = sanitizeInput(firstName);

    // Validate sanitized inputs
    if (!sanitizedEmail || !sanitizedFirstName || sanitizedFirstName.length > 50) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 })
    }

    // Initialize AWS SES v3 Client
    const sesClient = new SESClient({ 
      region: env.EMAIL_REGION
    });

    const params = {
      Destination: {
        ToAddresses: [sanitizedEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #d97706;">¡Bienvenido a Meridian!</h1>
                    <p style="font-size: 18px; color: #64748b;">Hola ${sanitizedFirstName}, tu cuenta ha sido creada exitosamente</p>
                  </div>
                  
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="color: #1e293b;">Próximos Pasos:</h2>
                    <ol style="color: #475569;">
                      <li>Confirma tu email haciendo clic en el botón de abajo</li>
                      <li>Espera la verificación de documentos (24-72 horas)</li>
                      <li>¡Comienza a explorar oportunidades de inversión!</li>
                    </ol>
                  </div>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${env.NEXT_PUBLIC_SITE_URL}/verify-email?token=example-token"
                       style="background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                      Confirmar Email
                    </a>
                  </div>
                  
                  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
                    <p style="color: #64748b; font-size: 14px;">
                      Si tienes preguntas, contáctanos en <a href="mailto:soporte@meridian-dr.com">soporte@meridian-dr.com</a>
                    </p>
                    <p style="color: #64748b; font-size: 14px;">
                      Meridian República Dominicana - Tu socio en inversiones inmobiliarias
                    </p>
                  </div>
                </body>
              </html>
            `,
          },
        },
        Subject: {
          Data: "¡Bienvenido a Meridian República Dominicana! 🇩🇴",
          Charset: 'UTF-8'
        }
      },
      Source: process.env.EMAIL_FROM || 'no-reply@meridian.com',
    };

    try {
      // Send email using AWS SES v3
      const command = new SendEmailCommand(params);
      const result = await sesClient.send(command);
      
      return NextResponse.json({
        success: true,
        message: "Welcome email sent successfully",
        emailSent: true,
        timestamp: new Date().toISOString(),
        messageId: result.MessageId
      });
    } catch (error) {
      // Log error without exposing sensitive data
      console.error("AWS SES Error:", {
        code: error.code,
        statusCode: error.statusCode,
        time: new Date().toISOString(),
        requestId: error.requestId,
        retryable: error.retryable
      });

      // Handle specific AWS errors
      switch(error.code) {
        case 'InvalidClientTokenId':
        case 'SignatureDoesNotMatch':
          return NextResponse.json(
            { 
              success: false, 
              error: "Authentication error with email service",
              code: 'EMAIL_AUTH_ERROR',
              timestamp: new Date().toISOString()
            }, 
            { status: 503 }
          );
        
        case 'InvalidParameterValue':
        case 'MissingParameter':
          return NextResponse.json(
            { 
              success: false, 
              error: "Invalid email parameters",
              code: 'EMAIL_INVALID_PARAMS',
              timestamp: new Date().toISOString()
            }, 
            { status: 400 }
          );
        
        case 'MessageRejected':
          return NextResponse.json(
            { 
              success: false, 
              error: "Email address is invalid or rejected",
              code: 'EMAIL_REJECTED',
              timestamp: new Date().toISOString()
            }, 
            { status: 400 }
          );
        
        case 'AccountSendingPaused':
          return NextResponse.json(
            { 
              success: false, 
              error: "Email sending is currently paused for this account",
              code: 'EMAIL_SENDING_PAUSED',
              timestamp: new Date().toISOString()
            }, 
            { status: 503 }
          );
        
        default:
          // For unknown errors, check if it's a network error
          if (error.code === 'NetworkingError' || 
              error.code === 'TimeoutError' || 
              error.retryable === true) {
            return NextResponse.json(
              { 
                success: false, 
                error: "Temporary email service issue",
                code: 'EMAIL_SERVICE_UNAVAILABLE',
                timestamp: new Date().toISOString()
              }, 
              { status: 503 }
            );
          }
          
          // Generic server error for all other cases
          return NextResponse.json(
            { 
              success: false, 
              error: "Failed to send welcome email",
              code: 'EMAIL_SEND_FAILED',
              timestamp: new Date().toISOString(),
              details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }, 
            { status: 500 }
          );
      }
    }
  } catch (error) {
    console.error("Unexpected error in welcome email handler:", {
      message: error.message,
      time: new Date().toISOString(),
      stack: error.stack
    });

    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error",
        code: 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString(),
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Email template example (you would use this with your email service)
const welcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bienvenido a Meridian</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #d97706;">¡Bienvenido a Meridian!</h1>
        <p style="font-size: 18px; color: #64748b;">Hola {{firstName}}, tu cuenta ha sido creada exitosamente</p>
    </div>
    
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1e293b;">Próximos Pasos:</h2>
        <ol style="color: #475569;">
            <li>Confirma tu email haciendo clic en el botón de abajo</li>
            <li>Espera la verificación de documentos (24-72 horas)</li>
            <li>¡Comienza a explorar oportunidades de inversión!</li>
        </ol>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="{{verificationLink}}" style="background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Confirmar Email
        </a>
    </div>
    
    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
        <p style="color: #64748b; font-size: 14px;">
            Si tienes preguntas, contáctanos en <a href="mailto:{{supportEmail}}">{{supportEmail}}</a>
        </p>
        <p style="color: #64748b; font-size: 14px;">
            Meridian República Dominicana - Tu socio en inversiones inmobiliarias
        </p>
    </div>
</body>
</html>
`
