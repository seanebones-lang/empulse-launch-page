# Integration Guide: Using All Features

## 📚 Quick Reference

This guide shows you how to integrate and use all the features we've built.

---

## 🧪 A/B Testing

### Basic Usage
```tsx
import ABTestWrapper from '@/components/ABTestWrapper';

<ABTestWrapper
  testName="hero-headline"
  variants={{
    A: <h1>Music That Knows How You Feel</h1>,
    B: <h1>Discover Music by Mood, Not Algorithm</h1>,
  }}
/>
```

### Track Conversions
```tsx
import { trackABTestConversion, getVariant } from '@/lib/ab-testing';

const handleSignup = async () => {
  const variant = getVariant('hero-headline');
  await signupUser();
  trackABTestConversion('hero-headline', variant, 'email_signup');
};
```

### Manual Variant Assignment (Testing)
```tsx
import { setABTestVariant } from '@/lib/test-utilities';

// In browser console or test:
setABTestVariant('hero-headline', 'B');
```

---

## 📊 Analytics & Tracking

### Track Custom Events
```tsx
import { trackButtonClick, trackEmailSignup } from '@/lib/analytics';

// Track button click
<button onClick={() => {
  trackButtonClick('Custom Action', 'location');
  // Your action
}}>
  Click Me
</button>

// Track email signup
trackEmailSignup('home-page');
```

### View Events in GA4
1. Go to Google Analytics 4
2. Navigate to Reports > Engagement > Events
3. Look for: `email_signup`, `cta_click`, `button_click`, `exit_intent`

---

## 🎁 Referral Program

### Generate Referral Link
```tsx
import { generateReferralLink } from '@/lib/referral';

const referralLink = generateReferralLink('user123');
// Returns: https://empulse.music?ref=ABC12345
```

### Handle Referral in Signup
```tsx
import { getReferralFromURL, storeReferralCode, trackReferralSignup } from '@/lib/referral';
import { useEffect } from 'react';

export default function SignupForm() {
  useEffect(() => {
    const refCode = getReferralFromURL();
    if (refCode) {
      storeReferralCode(refCode);
    }
  }, []);

  const handleSignup = async () => {
    const refCode = getStoredReferralCode();
    await signupUser();
    
    if (refCode) {
      trackReferralSignup(refCode, 'listener');
      // Notify your backend to credit the referrer
    }
  };
}
```

### Show Referral Link Component
```tsx
import ReferralLink from '@/components/ReferralLink';

<ReferralLink
  userId="user123"
  userType="listener"
  showStats={true}
/>
```

---

## ⚡ Performance Monitoring

### Automatic Monitoring
Already integrated! The `PerformanceMonitor` component automatically tracks:
- Page load metrics
- Core Web Vitals (LCP, FID, CLS)

### View Metrics
1. Check Google Analytics 4 > Reports > Engagement > Events
2. Look for `page_load_performance` and `web_vital` events
3. Use Google Search Console for Core Web Vitals

### Manual Measurement
```tsx
import { measurePageLoad } from '@/lib/performance';

useEffect(() => {
  setTimeout(() => {
    const metrics = measurePageLoad();
    console.log('Page load metrics:', metrics);
  }, 1000);
}, []);
```

---

## 📧 Email Automation

### Send Welcome Email
```typescript
// In your signup API route
await fetch('/api/send-welcome-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: userEmail,
    type: 'welcome', // or 'artist', 'investor'
    variables: { name: 'John' }, // optional
  }),
});
```

### Available Email Types
- `welcome` - General welcome email
- `artist` - Artist-specific welcome
- `investor` - Investor pitch deck email

### Customize Templates
Edit `lib/email-templates.ts` to customize email content.

---

## 🎯 Social Proof

### Use Real Data
```tsx
import { useState, useEffect } from 'react';
import SocialProof from '@/components/SocialProof';

export default function HomePage() {
  const [stats, setStats] = useState({ artists: 1247, listeners: 3891 });

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {}); // Fallback to default
  }, []);

  return (
    <SocialProof
      artistCount={stats.artists}
      listenerCount={stats.listeners}
      showGrowth={true}
    />
  );
}
```

### Update API Endpoint
Edit `app/api/stats/route.ts` to connect to your database.

---

## ⏰ Countdown Timer

### Basic Usage
```tsx
import CountdownTimer from '@/components/CountdownTimer';

<CountdownTimer
  targetDate="2026-01-31T23:59:59Z"
  onComplete={() => {
    console.log('Time\'s up!');
  }}
/>
```

### Customize Display
```tsx
<CountdownTimer
  targetDate="2026-01-31T23:59:59Z"
  showDays={true}
  showHours={true}
  showMinutes={true}
  showSeconds={false} // Hide seconds
/>
```

---

## 🚨 Urgency Badges

### Progress Bar Variant
```tsx
import { useState, useEffect } from 'react';
import UrgencyBadge from '@/components/UrgencyBadge';

export default function Hero() {
  const [spotsLeft, setSpotsLeft] = useState(500);

  useEffect(() => {
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
```

---

## ♿ Accessibility

### Screen Reader Announcements
```tsx
import { announceToScreenReader } from '@/lib/accessibility';

const handleSuccess = () => {
  announceToScreenReader('Form submitted successfully', 'polite');
};

const handleError = () => {
  announceToScreenReader('Error occurred. Please try again.', 'assertive');
};
```

### Check Reduced Motion
```tsx
import { prefersReducedMotion } from '@/lib/accessibility';

const shouldAnimate = !prefersReducedMotion();
```

### Test Accessibility
```tsx
import { testAccessibility } from '@/lib/test-utilities';

const results = testAccessibility();
console.log('Accessibility test:', results);
```

---

## 🧰 Testing & Development

### Enable Debug Mode
```tsx
import { enableTrackingDebug } from '@/lib/test-utilities';

// In development
if (process.env.NODE_ENV === 'development') {
  enableTrackingDebug();
}
```

### Clear All Tests
```tsx
import { clearABTests } from '@/lib/test-utilities';

clearABTests(); // Clears all A/B test assignments
```

### Admin Panel
The `AdminPanel` component automatically shows in development mode:
- View all A/B test assignments
- View performance metrics
- Run accessibility tests
- Quick actions (clear storage, reload)

---

## 📡 API Endpoints

### Stats API
```
GET /api/stats
Returns: { artists, listeners, totalStreams, totalEarnings }
```

### Early Access Spots API
```
GET /api/early-access-spots
Returns: { total, used, remaining, percentage }
```

### Welcome Email API
```
POST /api/send-welcome-email
Body: { email, type, variables? }
```

---

## 🔧 Environment Variables

```env
# Required
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=your-clarity-id
NEXT_PUBLIC_SITE_URL=https://empulse.music

# Optional (for email)
RESEND_API_KEY=your-resend-api-key
EMAIL_TO=empulse@mothership-ai.com
INVESTOR_EMAIL=investors@empulse.music
```

---

## 📝 Common Patterns

### Pattern 1: Signup with Referral + A/B Test
```tsx
import { getReferralFromURL, storeReferralCode, trackReferralSignup } from '@/lib/referral';
import { getVariant, trackABTestConversion } from '@/lib/ab-testing';
import { trackEmailSignup } from '@/lib/analytics';

export default function SignupForm() {
  useEffect(() => {
    const refCode = getReferralFromURL();
    if (refCode) storeReferralCode(refCode);
  }, []);

  const handleSignup = async (email: string) => {
    const variant = getVariant('signup-form');
    const refCode = getStoredReferralCode();
    
    await signupUser(email);
    
    trackEmailSignup('home-page');
    trackABTestConversion('signup-form', variant, 'email_signup');
    
    if (refCode) {
      trackReferralSignup(refCode, 'listener');
    }
  };
}
```

### Pattern 2: Dynamic Social Proof
```tsx
import { useState, useEffect } from 'react';
import SocialProof from '@/components/SocialProof';

export default function HomePage() {
  const [stats, setStats] = useState({ artists: 0, listeners: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/stats')
        .then((res) => res.json())
        .then(setStats)
        .catch(() => {});
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <SocialProof artistCount={stats.artists} listenerCount={stats.listeners} />;
}
```

---

## 🐛 Troubleshooting

### A/B Tests Not Working?
1. Check browser console for errors
2. Check localStorage: `localStorage.getItem('ab_test_testName')`
3. Clear and retest: `clearABTests()`

### Analytics Not Tracking?
1. Verify `NEXT_PUBLIC_GA4_ID` is set
2. Check browser console for errors
3. Test in incognito mode
4. Use `enableTrackingDebug()` to see events

### Referral Links Not Working?
1. Check URL has `?ref=CODE` parameter
2. Check localStorage for stored code
3. Verify tracking events fire

---

## 📚 More Examples

See `lib/integration-examples.ts` for more code snippets and patterns.

---

**Last Updated:** December 2025
