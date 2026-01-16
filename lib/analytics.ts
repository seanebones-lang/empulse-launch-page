/**
 * Analytics utility functions for tracking conversions and events
 */

// Track email signup
export function trackEmailSignup(source: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_signup', {
      event_category: 'engagement',
      event_label: source,
      value: 1,
    });
  }
}

// Track CTA click
export function trackCTAClick(ctaText: string, location: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: `${ctaText} - ${location}`,
      value: 1,
    });
  }
}

// Track page view
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_ID || '', {
      page_path: path,
    });
  }
}

// Track form submission
export function trackFormSubmission(formName: string, success: boolean) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', success ? 'form_submit_success' : 'form_submit_error', {
      event_category: 'form',
      event_label: formName,
      value: success ? 1 : 0,
    });
  }
}

// Track exit intent
export function trackExitIntent(page: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exit_intent', {
      event_category: 'engagement',
      event_label: page,
      value: 1,
    });
  }
}

// Track button click
export function trackButtonClick(buttonText: string, location: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: `${buttonText} - ${location}`,
      value: 1,
    });
  }
}
