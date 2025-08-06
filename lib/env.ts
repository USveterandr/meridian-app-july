// Production-safe environment configuration
// This file should be used throughout the application to access environment variables
export const env = {
  EMAIL_REGION: process.env.EMAIL_REGION || 'us-east-1',
  EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@investwithmeridian.com',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyC8P70fUHkSGzwz8rFbtTVBlKZAEmbyeBI',
  // Add other environment variables here
} as const;

// Type definition for environment variables
export type Env = typeof env;
