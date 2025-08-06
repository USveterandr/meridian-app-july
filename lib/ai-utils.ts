// AI utility functions and configurations

export const AI_CONFIG = {
  MAX_MESSAGE_LENGTH: 1000,
  MAX_CONVERSATION_HISTORY: 20,
  RESPONSE_TIMEOUT: 30000, // 30 seconds
} as const;

// Sanitize user input for AI processing
export function sanitizeAIInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, AI_CONFIG.MAX_MESSAGE_LENGTH)
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/\n{3,}/g, '\n\n'); // Limit excessive line breaks
}

// Generate context for AI based on user session or page
export function generateAIContext(page?: string, userType?: string): string {
  const contexts = {
    '/properties': 'User is browsing properties',
    '/invest': 'User is interested in investment opportunities',
    '/sell': 'User wants to sell property',
    '/incentives': 'User is asking about tax incentives',
    '/login': 'User is logging in',
    '/register': 'User is registering',
  };

  let context = 'General real estate inquiry';
  
  if (page && contexts[page as keyof typeof contexts]) {
    context = contexts[page as keyof typeof contexts];
  }
  
  if (userType) {
    context += ` - User type: ${userType}`;
  }
  
  return context;
}

// Common AI prompts for different scenarios
export const AI_PROMPTS = {
  PROPERTY_SEARCH: 'Help the user find properties that match their criteria',
  INVESTMENT_ADVICE: 'Provide investment guidance for Dominican Republic real estate',
  TAX_INCENTIVES: 'Explain tax benefits and incentives for foreign investors',
  SELLING_PROCESS: 'Guide the user through the property selling process',
  GENERAL_SUPPORT: 'Provide general real estate support and information',
} as const;

// Error messages for AI chat
export const AI_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor verifica tu conexión a internet e intenta de nuevo.',
  SERVICE_UNAVAILABLE: 'El servicio de AI está temporalmente no disponible. Por favor intenta más tarde.',
  INVALID_INPUT: 'Por favor ingresa un mensaje válido.',
  RATE_LIMITED: 'Has enviado demasiados mensajes. Por favor espera un momento antes de continuar.',
  GENERAL_ERROR: 'Lo siento, no pude procesar tu mensaje en este momento. Por favor intenta de nuevo o contacta a nuestro equipo de soporte.',
} as const;