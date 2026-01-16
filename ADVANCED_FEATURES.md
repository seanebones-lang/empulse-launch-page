# Advanced Features Guide

## 🚀 Phase 5: Advanced Conversion & Compliance Features

### ✅ New Components

#### ScrollProgress
- **File:** `components/ScrollProgress.tsx`
- **Purpose:** Visual scroll progress indicator
- **Features:**
  - Top or bottom position
  - Customizable height and color
  - Optional percentage display
  - Smooth animations
- **Usage:**
  ```tsx
  <ScrollProgress position="top" height={3} showPercentage={false} />
  ```

#### CookieConsent
- **File:** `components/CookieConsent.tsx`
- **Purpose:** GDPR-compliant cookie consent banner
- **Features:**
  - Accept/Decline options
  - Remembers user choice
  - Disables analytics if declined
  - Links to privacy policy
- **Usage:** Automatically integrated in layout

#### ReadingTime
- **File:** `components/ReadingTime.tsx`
- **Purpose:** Calculate and display reading time
- **Features:**
  - Automatic word count
  - Configurable words per minute
  - Clean display
- **Usage:**
  ```tsx
  <ReadingTime content={blogPostContent} wordsPerMinute={200} />
  ```

### ✅ New Utilities

#### Funnel Tracking
- **File:** `lib/funnel-tracking.ts`
- **Purpose:** Track user journey through conversion funnel
- **Features:**
  - Step tracking
  - Conversion rate calculation
  - Drop-off point identification
  - Time on step tracking
- **Usage:**
  ```tsx
  import { trackFunnelStep } from '@/lib/funnel-tracking';
  
  trackFunnelStep('clicked_cta', { cta_location: 'hero' });
  trackFunnelStep('started_signup');
  trackFunnelStep('completed_signup');
  ```

#### Cohort Tracking
- **File:** `lib/cohort-tracking.ts`
- **Purpose:** Track user cohorts for retention analysis
- **Features:**
  - Automatic cohort assignment (by week)
  - Cohort signup tracking
  - Cohort activity tracking
  - Retention data structure
- **Usage:**
  ```tsx
  import { trackCohortSignup, trackCohortActivity } from '@/lib/cohort-tracking';
  
  trackCohortSignup(new Date(), 'listener');
  trackCohortActivity(new Date(), 'playlist_created');
  ```

#### Image Optimization
- **File:** `lib/image-optimization.ts`
- **Purpose:** Optimize images for performance
- **Features:**
  - Responsive srcset generation
  - Sizes attribute generation
  - Lazy loading helpers
  - Preload critical images
  - CDN optimization
- **Usage:**
  ```tsx
  import { generateSrcSet, lazyLoadImage } from '@/lib/image-optimization';
  
  const srcset = generateSrcSet('/image.jpg', [400, 800, 1200]);
  lazyLoadImage(imageElement, '/image.jpg');
  ```

#### Form Validation
- **File:** `lib/form-validation.ts`
- **Purpose:** Advanced form validation
- **Features:**
  - Field-level validation
  - Form-level validation
  - Pre-built rules (email, password, URL, phone)
  - Custom validation functions
- **Usage:**
  ```tsx
  import { validateForm, emailRule, passwordRule } from '@/lib/form-validation';
  
  const rules = {
    email: emailRule,
    password: passwordRule,
  };
  
  const result = validateForm(formData, rules);
  if (result.isValid) {
    // Submit form
  } else {
    // Show errors
    console.log(result.errors);
  }
  ```

---

## 📊 Funnel Analysis

### Funnel Steps
1. `landing` - User lands on page
2. `viewed_features` - User scrolls to features
3. `clicked_cta` - User clicks CTA
4. `started_signup` - User starts form
5. `completed_signup` - User submits form
6. `verified_email` - User verifies email
7. `onboarded` - User completes onboarding

### Track Funnel
```tsx
import { trackFunnelStep } from '@/lib/funnel-tracking';

// On page load
useEffect(() => {
  trackFunnelStep('landing');
}, []);

// On scroll to features
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      trackFunnelStep('viewed_features');
    }
  });
  observer.observe(featuresSection);
}, []);

// On CTA click
const handleCTAClick = () => {
  trackFunnelStep('clicked_cta', { cta_location: 'hero' });
};
```

### Analyze Drop-offs
```tsx
import { getDropOffPoints } from '@/lib/funnel-tracking';

const dropOffs = getDropOffPoints();
// Returns: [{ from: 'landing', to: 'viewed_features', dropOffRate: 45 }, ...]
```

---

## 👥 Cohort Analysis

### Track Cohorts
```tsx
import { trackCohortSignup, trackCohortActivity } from '@/lib/cohort-tracking';

// On signup
trackCohortSignup(new Date(), 'listener');

// On activity
trackCohortActivity(new Date(), 'playlist_created', {
  playlist_count: 5,
});
```

### Cohort Structure
Cohorts are named by year-week: `2025-W01`, `2025-W02`, etc.

---

## 🖼️ Image Optimization

### Responsive Images
```tsx
import { generateSrcSet, generateSizes } from '@/lib/image-optimization';

<img
  src="/hero.jpg"
  srcSet={generateSrcSet('/hero.jpg', [400, 800, 1200, 1600])}
  sizes={generateSizes({
    mobile: '100vw',
    tablet: '80vw',
    desktop: '1200px',
    default: '1200px',
  })}
  alt="Hero image"
/>
```

### Lazy Loading
```tsx
import { lazyLoadImage } from '@/lib/image-optimization';

useEffect(() => {
  const img = document.querySelector('#lazy-image') as HTMLImageElement;
  if (img) {
    lazyLoadImage(img, '/image.jpg', () => {
      console.log('Image loaded');
    });
  }
}, []);
```

### Preload Critical Images
```tsx
import { preloadImage } from '@/lib/image-optimization';

useEffect(() => {
  preloadImage('/hero.jpg');
}, []);
```

---

## ✅ Form Validation

### Basic Usage
```tsx
import { validateForm, emailRule, passwordRule } from '@/lib/form-validation';

const rules = {
  email: emailRule,
  password: passwordRule,
  confirmPassword: {
    required: true,
    custom: (value) => {
      if (value !== formData.password) {
        return 'Passwords do not match';
      }
      return true;
    },
  },
};

const result = validateForm(formData, rules);
```

### Custom Validation
```tsx
const customRule: ValidationRule = {
  required: true,
  minLength: 8,
  custom: (value) => {
    if (!value.includes('@')) {
      return 'Must contain @ symbol';
    }
    return true;
  },
};
```

---

## 🍪 Cookie Consent

### Automatic Integration
The `CookieConsent` component is automatically added to the layout. It:
- Shows once per user
- Remembers choice in localStorage
- Disables analytics if declined
- Links to privacy policy

### Customize
Edit `components/CookieConsent.tsx` to customize:
- Message text
- Button labels
- Privacy policy link
- Styling

---

## 📈 Scroll Progress

### Automatic Integration
The `ScrollProgress` component is automatically added to the layout at the top.

### Customize
```tsx
<ScrollProgress
  position="top" // or "bottom"
  height={3} // pixels
  showPercentage={true} // show percentage
  color="accent-primary" // Tailwind color
/>
```

---

## 🎯 Best Practices

### Funnel Tracking
1. Track every major step in user journey
2. Add metadata for context (CTA location, source, etc.)
3. Review drop-off points weekly
4. Optimize high drop-off steps

### Cohort Analysis
1. Track signups by cohort
2. Track key activities by cohort
3. Compare retention across cohorts
4. Identify successful cohort patterns

### Image Optimization
1. Always use responsive images
2. Lazy load below-the-fold images
3. Preload critical above-the-fold images
4. Use appropriate image formats (WebP, AVIF)

### Form Validation
1. Validate on blur (not on every keystroke)
2. Show clear error messages
3. Validate server-side as well
4. Provide helpful hints

---

## 📊 Analytics Integration

All tracking automatically sends to Google Analytics 4:
- Funnel steps → `funnel_step` event
- Cohort signups → `cohort_signup` event
- Cohort activity → `cohort_activity` event
- Time on step → `time_on_step` event

View in GA4:
- Reports > Engagement > Events
- Explore > Funnel exploration
- Explore > Cohort exploration

---

**Last Updated:** December 2025
