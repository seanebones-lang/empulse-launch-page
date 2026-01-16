/**
 * Environment variable validation
 * Ensures all required environment variables are present at startup
 */

const requiredEnvVars = {
  // Optional - these have defaults
  RESEND_API_KEY: false,
  RESEND_AUDIENCE_ID: false,
  INVESTOR_EMAIL: false,
  ARTIST_EMAIL: false,
  LISTENER_EMAIL: false,
  GENERAL_EMAIL: false,
  NEXT_PUBLIC_BACKEND_URL: false,
} as const;

/**
 * Validates environment variables
 * Throws error if required variables are missing
 */
export function validateEnv() {
  const missing: string[] = [];
  
  // Check required variables (currently none are strictly required due to defaults)
  // Add variables here if they become required
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Get environment variable with validation
 */
export function getEnv(key: keyof typeof requiredEnvVars, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (requiredEnvVars[key] && !value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value || '';
}
