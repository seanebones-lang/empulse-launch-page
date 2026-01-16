/**
 * A/B Testing Utility Functions
 * Simple client-side A/B testing without external dependencies
 */

export type Variant = 'A' | 'B' | 'C';

interface ABTest {
  name: string;
  variants: Variant[];
  weights?: number[]; // Optional weights for each variant (default: equal)
}

/**
 * Get or assign a variant for a user
 * Uses localStorage to persist variant assignment
 */
export function getVariant(testName: string, variants: Variant[] = ['A', 'B'], weights?: number[]): Variant {
  const storageKey = `ab_test_${testName}`;
  
  // Check if user already has a variant assigned
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey);
    if (stored && variants.includes(stored as Variant)) {
      return stored as Variant;
    }
  }

  // Assign new variant
  const variant = assignVariant(variants, weights);
  
  // Store for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey, variant);
  }

  return variant;
}

/**
 * Assign variant based on weights or equal distribution
 */
function assignVariant(variants: Variant[], weights?: number[]): Variant {
  if (weights && weights.length === variants.length) {
    // Weighted random selection
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < variants.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return variants[i];
      }
    }
  }
  
  // Equal distribution
  return variants[Math.floor(Math.random() * variants.length)];
}

/**
 * Track A/B test conversion
 */
export function trackABTestConversion(testName: string, variant: Variant, conversionName: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      test_name: testName,
      variant: variant,
      conversion_name: conversionName,
    });
  }
}

/**
 * Track A/B test view
 */
export function trackABTestView(testName: string, variant: Variant) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_view', {
      test_name: testName,
      variant: variant,
    });
  }
}

/**
 * Get test results (for admin dashboard)
 */
export function getTestResults(testName: string): {
  variant: Variant | null;
  conversions: number;
} {
  if (typeof window === 'undefined') {
    return { variant: null, conversions: 0 };
  }

  const variant = localStorage.getItem(`ab_test_${testName}`) as Variant | null;
  const conversions = parseInt(localStorage.getItem(`ab_test_${testName}_conversions`) || '0', 10);

  return { variant, conversions };
}
