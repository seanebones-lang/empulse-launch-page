/**
 * Testing utilities for development and QA
 */

/**
 * Mock analytics for testing
 */
export function mockAnalytics() {
  if (typeof window !== 'undefined') {
    window.gtag = window.gtag || ((...args: any[]) => {
      console.log('[Mock Analytics]', args);
    });
  }
}

/**
 * Clear all A/B test assignments (for testing)
 */
export function clearABTests() {
  if (typeof window === 'undefined') return;
  
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('ab_test_')) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Set A/B test variant manually (for testing)
 */
export function setABTestVariant(testName: string, variant: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`ab_test_${testName}`, variant);
}

/**
 * Get all A/B test assignments (for debugging)
 */
export function getAllABTests(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const tests: Record<string, string> = {};
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('ab_test_')) {
      const testName = key.replace('ab_test_', '');
      tests[testName] = localStorage.getItem(key) || '';
    }
  });
  return tests;
}

/**
 * Simulate referral code
 */
export function simulateReferral(code: string) {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  url.searchParams.set('ref', code);
  window.history.pushState({}, '', url.toString());
  
  // Trigger storage
  const { storeReferralCode } = require('./referral');
  storeReferralCode(code);
}

/**
 * Clear all referral data
 */
export function clearReferrals() {
  if (typeof window === 'undefined') return;
  
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('referral_')) {
      localStorage.removeItem(key);
    }
  });
  sessionStorage.removeItem('referral_code');
}

/**
 * Log all tracking events (for debugging)
 */
export function enableTrackingDebug() {
  if (typeof window === 'undefined') return;
  
  const originalGtag = window.gtag as ((...args: any[]) => void) | undefined;
  window.gtag = ((...args: any[]) => {
    console.log('[Tracking Event]', args);
    if (originalGtag) {
      (originalGtag as (...args: any[]) => void)(...args);
    }
  }) as typeof window.gtag;
}

/**
 * Disable tracking (for testing)
 */
export function disableTracking() {
  if (typeof window === 'undefined') return;
  window.gtag = () => {}; // No-op
}

/**
 * Get performance metrics (for testing)
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) return null;
  
  const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;
  
  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart,
  };
}

/**
 * Test accessibility (basic checks)
 */
export function testAccessibility() {
  if (typeof window === 'undefined') return;
  
  const issues: string[] = [];
  
  // Check for images without alt text
  document.querySelectorAll('img').forEach((img) => {
    if (!img.alt && !img.getAttribute('aria-hidden')) {
      issues.push(`Image without alt text: ${img.src}`);
    }
  });
  
  // Check for buttons without accessible names
  document.querySelectorAll('button').forEach((button) => {
    const text = button.textContent?.trim();
    const ariaLabel = button.getAttribute('aria-label');
    const ariaLabelledBy = button.getAttribute('aria-labelledby');
    
    if (!text && !ariaLabel && !ariaLabelledBy) {
      issues.push(`Button without accessible name: ${button.className}`);
    }
  });
  
  // Check for form inputs without labels
  document.querySelectorAll('input, textarea, select').forEach((input) => {
    const id = input.getAttribute('id');
    const label = id ? document.querySelector(`label[for="${id}"]`) : null;
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!label && !ariaLabel && !ariaLabelledBy) {
      issues.push(`Form input without label: ${input.getAttribute('name') || input.getAttribute('type')}`);
    }
  });
  
  return {
    passed: issues.length === 0,
    issues,
    count: issues.length,
  };
}
