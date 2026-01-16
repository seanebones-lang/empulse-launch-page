/**
 * Advanced form validation utilities
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate form field
 */
export function validateField(
  name: string,
  value: string,
  rules: ValidationRule
): string | null {
  if (rules.required && (!value || value.trim() === '')) {
    return rules.message || `${name} is required`;
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return rules.message || `${name} must be at least ${rules.minLength} characters`;
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return rules.message || `${name} must be no more than ${rules.maxLength} characters`;
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return rules.message || `${name} format is invalid`;
  }

  if (value && rules.custom) {
    const result = rules.custom(value);
    if (result !== true) {
      return typeof result === 'string' ? result : rules.message || `${name} is invalid`;
    }
  }

  return null;
}

/**
 * Validate entire form
 */
export function validateForm(
  data: Record<string, string>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const error = validateField(field, data[field] || '', rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Email validation rule
 */
export const emailRule: ValidationRule = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Please enter a valid email address',
};

/**
 * Password validation rule
 */
export const passwordRule: ValidationRule = {
  required: true,
  minLength: 8,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
};

/**
 * URL validation rule
 */
export const urlRule: ValidationRule = {
  pattern: /^https?:\/\/.+/,
  message: 'Please enter a valid URL',
};

/**
 * Phone validation rule (US format)
 */
export const phoneRule: ValidationRule = {
  pattern: /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
  message: 'Please enter a valid phone number',
};
