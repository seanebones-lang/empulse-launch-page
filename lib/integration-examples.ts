/**
 * Integration examples and code snippets for common use cases
 * Copy and paste these into your components
 */

// Example 1: A/B Test Hero Headline
export const abTestHeroExample = `
import ABTestWrapper from '@/components/ABTestWrapper';

<ABTestWrapper
  testName="hero-headline"
  variants={{
    A: (
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        Music That Knows How You Feel
      </h1>
    ),
    B: (
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        Discover Music by Mood, Not Algorithm
      </h1>
    ),
  }}
/>
`;

// Example 2: Track Conversion After A/B Test
export const trackABConversionExample = `
import { trackABTestConversion, getVariant } from '@/lib/ab-testing';

const handleEmailSignup = async () => {
  const variant = getVariant('hero-headline');
  
  // Your signup logic here
  await signupUser();
  
  // Track conversion
  trackABTestConversion('hero-headline', variant, 'email_signup');
};
`;

// Example 3: Referral Link Integration
export const referralIntegrationExample = `
import { getReferralFromURL, storeReferralCode, trackReferralSignup } from '@/lib/referral';
import { useEffect } from 'react';

export default function SignupForm() {
  useEffect(() => {
    const refCode = getReferralFromURL();
    if (refCode) {
      storeReferralCode(refCode);
    }
  }, []);

  const handleSignup = async (userData) => {
    const refCode = getStoredReferralCode();
    
    // Your signup logic
    const user = await createUser(userData);
    
    if (refCode) {
      trackReferralSignup(refCode, 'listener');
      // Notify backend to credit referrer
    }
  };
}
`;

// Example 4: Performance Monitoring
export const performanceMonitoringExample = `
import { measurePageLoad, measureWebVitals } from '@/lib/performance';
import { useEffect } from 'react';

export default function MyPage() {
  useEffect(() => {
    // Automatic monitoring is already in PerformanceMonitor component
    // But you can also measure specific actions:
    
    const startTime = performance.now();
    
    // Your heavy operation
    loadHeavyData();
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (window.gtag) {
      window.gtag('event', 'custom_performance', {
        event_category: 'performance',
        event_label: 'heavy_data_load',
        value: Math.round(duration),
      });
    }
  }, []);
}
`;

// Example 5: Email Automation Integration
export const emailAutomationExample = `
// In your signup API route (app/api/subscribe/route.ts or similar)
import { emailTemplates } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  const { email, source } = await request.json();
  
  // Your existing signup logic
  await saveToDatabase(email);
  
  // Send welcome email
  try {
    await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        type: source.includes('artist') ? 'artist' : 'welcome',
        variables: { name: email.split('@')[0] },
      }),
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't fail the signup if email fails
  }
  
  return NextResponse.json({ success: true });
}
`;

// Example 6: Social Proof with Real Data
export const socialProofRealDataExample = `
import { useState, useEffect } from 'react';
import SocialProof from '@/components/SocialProof';

export default function HomePage() {
  const [stats, setStats] = useState({ artists: 1247, listeners: 3891 });

  useEffect(() => {
    // Fetch real stats from your API
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        // Fallback to default if API fails
      });
  }, []);

  return (
    <SocialProof
      artistCount={stats.artists}
      listenerCount={stats.listeners}
      showGrowth={true}
    />
  );
}
`;

// Example 7: Urgency Badge with Real Progress
export const urgencyBadgeRealDataExample = `
import { useState, useEffect } from 'react';
import UrgencyBadge from '@/components/UrgencyBadge';

export default function HeroSection() {
  const [spotsLeft, setSpotsLeft] = useState(500);

  useEffect(() => {
    // Fetch from API
    fetch('/api/early-access-spots')
      .then((res) => res.json())
      .then((data) => setSpotsLeft(data.remaining))
      .catch(() => {});
  }, []);

  return (
    <UrgencyBadge
      text="Early Access: First 500 artists get lifetime 10% bonus"
      variant="progress"
      progressValue={500 - spotsLeft}
      progressMax={500}
    />
  );
}
`;

// Example 8: Countdown Timer Integration
export const countdownTimerExample = `
import CountdownTimer from '@/components/CountdownTimer';

<CountdownTimer
  targetDate="2026-01-31T23:59:59Z" // ISO date string
  onComplete={() => {
    // Handle countdown completion
    console.log('Early access closed!');
  }}
  showDays={true}
  showHours={true}
  showMinutes={true}
  showSeconds={true}
/>
`;

// Example 9: Custom Event Tracking
export const customEventTrackingExample = `
import { trackButtonClick, trackEmailSignup } from '@/lib/analytics';

// Track custom button click
<button
  onClick={() => {
    trackButtonClick('Custom Action', 'hero-section');
    // Your action here
  }}
>
  Click Me
</button>

// Track email signup with additional data
const handleSignup = async (email: string) => {
  await signup(email);
  
  trackEmailSignup('home-page-hero');
  
  // Track with custom parameters
  if (window.gtag) {
    window.gtag('event', 'email_signup', {
      event_category: 'engagement',
      event_label: 'home-page-hero',
      value: 1,
      custom_parameter: 'premium_interest', // Add custom data
    });
  }
};
`;

// Example 10: Accessibility Announcements
export const accessibilityAnnouncementsExample = `
import { announceToScreenReader } from '@/lib/accessibility';

const handleFormSubmit = async () => {
  try {
    await submitForm();
    announceToScreenReader('Form submitted successfully', 'polite');
  } catch (error) {
    announceToScreenReader('Form submission failed. Please try again.', 'assertive');
  }
};
`;
