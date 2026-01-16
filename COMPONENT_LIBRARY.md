# Component Library Reference

## 📦 All Available Components

### Core UI Components

#### Button
**File:** `components/Button.tsx`  
**Variants:** `primary`, `secondary`, `outline`, `ghost`, `gradient`  
**Sizes:** `sm`, `md`, `lg`  
**Usage:**
```tsx
<Button variant="primary" size="lg" href="/artists">
  Join as Artist
</Button>
```

#### Card
**File:** `components/Card.tsx`  
**Props:** `hover` (default: true)  
**Usage:**
```tsx
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

#### EmailCapture
**File:** `components/EmailCapture.tsx`  
**Props:** `buttonText`, `placeholder`, `source`  
**Usage:**
```tsx
<EmailCapture
  buttonText="Sign Up"
  placeholder="your@email.com"
  source="home-page"
/>
```

---

### Conversion Components

#### SocialProof
**File:** `components/SocialProof.tsx`  
**Props:** `artistCount`, `listenerCount`, `showGrowth`  
**Usage:**
```tsx
<SocialProof
  artistCount={1247}
  listenerCount={3891}
  showGrowth={true}
/>
```

#### Testimonials
**File:** `components/Testimonials.tsx`  
**Props:** `testimonials`, `maxItems`  
**Usage:**
```tsx
<Testimonials maxItems={4} />
```

#### UrgencyBadge
**File:** `components/UrgencyBadge.tsx`  
**Variants:** `default`, `countdown`, `progress`  
**Usage:**
```tsx
<UrgencyBadge
  text="Early Access: First 500 artists"
  variant="progress"
  progressValue={247}
  progressMax={500}
/>
```

#### TrustBadges
**File:** `components/TrustBadges.tsx`  
**Props:** `badges` (optional)  
**Usage:**
```tsx
<TrustBadges />
```

#### StickyCTA
**File:** `components/StickyCTA.tsx`  
**Variants:** `email`, `button`  
**Usage:**
```tsx
<StickyCTA
  variant="email"
  page="home"
/>
```

#### MidPageCTA
**File:** `components/MidPageCTA.tsx`  
**Variants:** `default`, `accent`, `minimal`  
**Usage:**
```tsx
<MidPageCTA
  headline="Ready to Get Started?"
  description="Join thousands of users"
  primaryButton={{ text: 'Sign Up', href: '/signup' }}
  secondaryButton={{ text: 'Learn More', href: '/about' }}
/>
```

#### ExitIntentModal
**File:** `components/ExitIntentModal.tsx`  
**Props:** `page` (`home`, `artists`, `listeners`, `investors`)  
**Usage:**
```tsx
<ExitIntentModal page="home" />
```

---

### Advanced Components

#### ABTestWrapper
**File:** `components/ABTestWrapper.tsx`  
**Usage:**
```tsx
<ABTestWrapper
  testName="hero-headline"
  variants={{
    A: <h1>Variant A</h1>,
    B: <h1>Variant B</h1>,
  }}
/>
```

#### CountdownTimer
**File:** `components/CountdownTimer.tsx`  
**Usage:**
```tsx
<CountdownTimer
  targetDate="2026-01-31T23:59:59Z"
  onComplete={() => console.log('Done!')}
  showDays={true}
  showHours={true}
  showMinutes={true}
  showSeconds={true}
/>
```

#### VideoDemo
**File:** `components/VideoDemo.tsx`  
**Usage:**
```tsx
<VideoDemo
  videoUrl="https://www.youtube.com/embed/VIDEO_ID"
  thumbnailUrl="/thumbnail.jpg"
  title="See EmPulse in Action"
/>
```

#### ReferralLink
**File:** `components/ReferralLink.tsx`  
**Usage:**
```tsx
<ReferralLink
  userId="user123"
  userType="listener"
  showStats={true}
/>
```

#### ScrollProgress
**File:** `components/ScrollProgress.tsx`  
**Usage:**
```tsx
<ScrollProgress
  position="top"
  height={3}
  showPercentage={false}
/>
```

#### CookieConsent
**File:** `components/CookieConsent.tsx`  
**Usage:** Automatically integrated in layout

#### ReadingTime
**File:** `components/ReadingTime.tsx`  
**Usage:**
```tsx
<ReadingTime
  content={blogPostContent}
  wordsPerMinute={200}
/>
```

#### LoadingSpinner
**File:** `components/LoadingSpinner.tsx`  
**Sizes:** `sm`, `md`, `lg`  
**Usage:**
```tsx
<LoadingSpinner size="md" />
```

---

### Developer Components

#### AdminPanel
**File:** `components/AdminPanel.tsx`  
**Visible:** Development mode only  
**Features:** A/B tests, performance, accessibility

#### ContentManager
**File:** `components/ContentManager.tsx`  
**Visible:** Development mode only  
**Features:** Update stats, view content links

#### ComponentShowcase
**File:** `components/ComponentShowcase.tsx`  
**Visible:** Development mode only  
**Features:** Visual reference for all components

#### PerformanceMonitor
**File:** `components/PerformanceMonitor.tsx`  
**Usage:** Automatically integrated in layout

#### SkipToContent
**File:** `components/SkipToContent.tsx`  
**Usage:** Automatically integrated in layout

---

### Utility Components

#### StructuredData
**File:** `components/StructuredData.tsx`  
**Types:** `Organization`, `SoftwareApplication`, `WebSite`  
**Usage:**
```tsx
<StructuredData
  type="Organization"
  data={organizationData}
/>
```

#### SectionHeadline
**File:** `components/SectionHeadline.tsx`  
**Props:** `centered` (optional)  
**Usage:**
```tsx
<SectionHeadline centered>
  The Opportunity
</SectionHeadline>
```

#### FeatureBlock
**File:** `components/FeatureBlock.tsx`  
**Props:** `headline`, `body`, `delay`  
**Usage:**
```tsx
<FeatureBlock
  headline="For Artists"
  body="Description here"
  delay={0}
/>
```

---

## 🎨 Component Variants

### Button Variants
- `primary` - Red accent (accent-secondary)
- `secondary` - Orange accent (accent-primary)
- `outline` - Outlined with hover fill
- `ghost` - Transparent with hover background
- `gradient` - Gradient background

### UrgencyBadge Variants
- `default` - Simple text badge
- `progress` - Progress bar with X/Y display
- `countdown` - Countdown timer (future)

### MidPageCTA Variants
- `default` - Standard background
- `accent` - Accent colored background
- `minimal` - Transparent background

---

## 📐 Component Sizing

### Button Sizes
- `sm` - Small (px-4 py-2 text-sm)
- `md` - Medium (px-6 py-3 text-base)
- `lg` - Large (px-8 py-4 text-lg)

### LoadingSpinner Sizes
- `sm` - 16px (w-4 h-4)
- `md` - 32px (w-8 h-8)
- `lg` - 48px (w-12 h-12)

---

## 🎯 Component Placement

### Hero Section
- Logo
- Headline
- Description
- SocialProof
- UrgencyBadge
- TrustBadges
- CTAs (Button)

### Mid-Page
- MidPageCTA
- Testimonials
- FeatureBlock
- Card

### Footer/Sticky
- StickyCTA (mobile)
- CookieConsent
- ScrollProgress

### Developer Tools
- AdminPanel (bottom-left, dev only)
- ContentManager (bottom-left, dev only)
- ComponentShowcase (top-right, dev only)

---

## 🔧 Customization

### Colors
All components use design system colors:
- `accent-primary` - Orange (#ffb800)
- `accent-secondary` - Red (#ef4444)
- `accent-tertiary` - Blue (#3b82f6)
- `bg-primary` - Black (#000000)
- `text-primary` - White (#ffffff)

### Spacing
Components follow 8px grid system:
- Small: 8px (gap-2)
- Medium: 16px (gap-4)
- Large: 24px (gap-6)
- XL: 32px (gap-8)

---

## 📱 Responsive Behavior

All components are mobile-first:
- Stack on mobile (< 640px)
- Side-by-side on tablet+ (≥ 640px)
- StickyCTA only shows on mobile
- Admin/Content panels adjust on mobile

---

## 🧪 Testing Components

### View All Components
1. Run in development mode
2. Click "Show Components" button (top-right)
3. Browse all components visually

### Test Interactions
- Hover effects
- Click handlers
- Form submissions
- Animations

---

## 📚 Related Documentation

- **INTEGRATION_GUIDE.md** - Usage examples
- **CONTENT_MANAGEMENT_GUIDE.md** - Content updates
- **ADVANCED_FEATURES.md** - Advanced usage

---

**Last Updated:** December 2025
