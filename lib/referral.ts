/**
 * Referral program utilities
 */

/**
 * Generate referral link for a user
 */
export function generateReferralLink(userId: string, baseUrl: string = 'https://empulse.music'): string {
  const referralCode = btoa(userId).replace(/[+/=]/g, '').substring(0, 8);
  return `${baseUrl}?ref=${referralCode}`;
}

/**
 * Get referral code from URL
 */
export function getReferralFromURL(): string | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}

/**
 * Store referral code
 */
export function storeReferralCode(code: string): void {
  if (typeof window === 'undefined') return;
  
  // Store in sessionStorage (expires when tab closes)
  sessionStorage.setItem('referral_code', code);
  
  // Also store in localStorage with timestamp for attribution window
  localStorage.setItem(`referral_${code}`, JSON.stringify({
    code,
    timestamp: Date.now(),
    source: window.location.href,
  }));
}

/**
 * Get stored referral code
 */
export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  
  return sessionStorage.getItem('referral_code');
}

/**
 * Track referral signup
 */
export function trackReferralSignup(referralCode: string, userType: 'artist' | 'listener') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'referral_signup', {
      referral_code: referralCode,
      user_type: userType,
    });
  }
}

/**
 * Track referral click
 */
export function trackReferralClick(referralCode: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'referral_click', {
      referral_code: referralCode,
    });
  }
}

/**
 * Get referral stats (for user dashboard)
 */
export function getReferralStats(userId: string): {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
} {
  // This would typically come from an API
  // For now, return mock data structure
  return {
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
  };
}
