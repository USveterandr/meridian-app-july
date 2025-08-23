import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  templateData?: Record<string, string>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  code?: string;
  timestamp: string;
}

export class EmailService {
  private sesClient: SESClient;
  private region: string;
  private fromEmail: string;
  private siteUrl: string;

  constructor() {
    this.region = process.env.EMAIL_REGION || 'us-east-1';
    this.fromEmail = process.env.EMAIL_FROM || 'no-reply@investwithmeridian.com';
    this.siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    this.sesClient = new SESClient({
      region: this.region
    });
  }

  private sanitizeInput(input: string): string {
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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  private getWelcomeEmailTemplate(firstName: string, verificationToken?: string): string {
    const sanitizedFirstName = this.sanitizeInput(firstName);
    const verificationLink = verificationToken 
      ? `${this.siteUrl}/verify-email?token=${verificationToken}`
      : `${this.siteUrl}/verify-email?token=example-token`;

    return `
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
            <a href="${verificationLink}"
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
    `;
  }

  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    const timestamp = new Date().toISOString();

    try {
      // Validate email
      if (!this.isValidEmail(options.to)) {
        return {
          success: false,
          error: "Invalid email format",
          code: 'EMAIL_INVALID_FORMAT',
          timestamp
        };
      }

      // Sanitize inputs
      const sanitizedTo = options.to.trim().toLowerCase();
      const sanitizedSubject = this.sanitizeInput(options.subject);

      const params = {
        Destination: {
          ToAddresses: [sanitizedTo],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: options.html || options.text || '',
            },
          },
          Subject: {
            Data: sanitizedSubject,
            Charset: 'UTF-8'
          }
        },
        Source: this.fromEmail,
      };

      if (options.text && !options.html) {
        params.Message.Body = {
          Text: {
            Charset: 'UTF-8',
            Data: options.text,
          },
        };
      }

      const command = new SendEmailCommand(params);
      const result = await this.sesClient.send(command);

      return {
        success: true,
        messageId: result.MessageId,
        timestamp
      };

    } catch (error: any) {
      console.error("AWS SES Error:", {
        code: error.code,
        statusCode: error.statusCode,
        time: timestamp,
        requestId: error.requestId,
        retryable: error.retryable
      });

      // Handle specific AWS errors
      let errorMessage = "Failed to send email";
      let errorCode = 'EMAIL_SEND_FAILED';

      switch(error.code) {
        case 'InvalidClientTokenId':
        case 'SignatureDoesNotMatch':
          errorMessage = "Authentication error with email service";
          errorCode = 'EMAIL_AUTH_ERROR';
          break;
        
        case 'InvalidParameterValue':
        case 'MissingParameter':
          errorMessage = "Invalid email parameters";
          errorCode = 'EMAIL_INVALID_PARAMS';
          break;
        
        case 'MessageRejected':
          errorMessage = "Email address is invalid or rejected";
          errorCode = 'EMAIL_REJECTED';
          break;
        
        case 'AccountSendingPaused':
          errorMessage = "Email sending is currently paused for this account";
          errorCode = 'EMAIL_SENDING_PAUSED';
          break;
        
        default:
          if (error.code === 'NetworkingError' || 
              error.code === 'TimeoutError' || 
              error.retryable === true) {
            errorMessage = "Temporary email service issue";
            errorCode = 'EMAIL_SERVICE_UNAVAILABLE';
          }
          break;
      }

      return {
        success: false,
        error: errorMessage,
        code: errorCode,
        timestamp
      };
    }
  }

  async sendWelcomeEmail(email: string, firstName: string, verificationToken?: string): Promise<EmailResult> {
    const htmlContent = this.getWelcomeEmailTemplate(firstName, verificationToken);
    
    return this.sendEmail({
      to: email,
      subject: "¡Bienvenido a Meridian República Dominicana! 🇩🇴",
      html: htmlContent
    });
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<EmailResult> {
    const verificationLink = `${this.siteUrl}/verify-email?token=${verificationToken}`;
    
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706;">Confirma tu Email</h1>
            <p style="font-size: 18px; color: #64748b;">Verifica tu dirección de correo electrónico</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}"
               style="background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Confirmar Email
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px;">
              Si no solicitaste esta verificación, puedes ignorar este email.
            </p>
            <p style="color: #64748b; font-size: 14px;">
              Meridian República Dominicana
            </p>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: "Confirma tu Email - Meridian",
      html: htmlContent
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<EmailResult> {
    const resetLink = `${this.siteUrl}/reset-password?token=${resetToken}`;
    
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706;">Restablecer Contraseña</h1>
            <p style="font-size: 18px; color: #64748b;">Solicitud de restablecimiento de contraseña</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}"
               style="background: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Restablecer Contraseña
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <p style="color: #64748b; font-size: 14px;">
              Si no solicitaste este restablecimiento, puedes ignorar este email.
            </p>
            <p style="color: #64748b; font-size: 14px;">
              Este enlace expirará en 1 hora por seguridad.
            </p>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: "Restablecer Contraseña - Meridian",
      html: htmlContent
    });
  }
}

// Export a default instance
export const emailService = new EmailService();