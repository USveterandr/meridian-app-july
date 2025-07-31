// Production-safe environment configuration
// This file should be used throughout the application to access environment variables
export const env = {
  EMAIL_REGION: process.env.EMAIL_REGION || 'us-east-1',
  EMAIL_FROM: process.env.EMAIL_FROM || 'no-reply@meridian.com',
  // Add other environment variables here
} as const;

// Type definition for environment variables
export type Env = typeof env;