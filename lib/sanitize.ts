/**
 * Security utility for sanitizing user input
 * Prevents XSS attacks in email templates and other HTML contexts
 */

/**
 * Escapes HTML entities to prevent XSS
 */
export function escapeHtml(text: string | null | undefined): string {
  if (!text) return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Validates and sanitizes email addresses
 */
export function sanitizeEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error('Invalid email address');
  }
  
  // Additional validation: max length per RFC 5321
  if (email.length > 254) {
    throw new Error('Email address too long');
  }
  
  return email.trim().toLowerCase();
}

/**
 * Validates and sanitizes text input with length limits
 */
export function sanitizeText(text: string | null | undefined, maxLength: number = 1000): string {
  if (!text) return '';
  
  const trimmed = text.trim();
  if (trimmed.length > maxLength) {
    throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
  }
  
  return escapeHtml(trimmed);
}

/**
 * Validates and sanitizes URLs
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    return escapeHtml(parsed.toString());
  } catch {
    throw new Error('Invalid URL format');
  }
}
