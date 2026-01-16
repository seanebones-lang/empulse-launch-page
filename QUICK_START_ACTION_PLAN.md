# Quick Start Action Plan - Next 7 Days

## 🎯 Priority 1: Analytics Setup (Day 1 - 30 minutes)

### Step 1: Google Analytics 4 Setup
1. Go to https://analytics.google.com
2. Click "Start measuring" or "Admin" → "Create Property"
3. Property name: "EmPulse Landing Page"
4. Time zone: Your timezone
5. Currency: USD
6. Click "Next" → "Create"
7. **Copy your Measurement ID** (format: G-XXXXXXXXXX)
8. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

### Step 2: Microsoft Clarity Setup
1. Go to https://clarity.microsoft.com
2. Sign in with Microsoft account (or create one)
3. Click "New Project"
4. Project name: "EmPulse Landing Page"
5. Website URL: Your domain (or localhost for testing)
6. **Copy your Project ID**
7. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLARITY_ID=your-project-id
   ```

### Step 3: Verify Setup
1. Restart your dev server: `npm run dev`
2. Visit your site
3. Open browser console (F12)
4. Check for:
   - No errors related to analytics
   - Network tab shows requests to `google-analytics.com` and `clarity.ms`
5. Check GA4 Real-Time reports (should see your visit)

---

## 📝 Priority 2: Content Customization (Days 2-3)

### Task 1: Update User Counts (5 minutes)
**File:** `components/SocialProof.tsx`

**Current:**
```tsx
<SocialProof artistCount={1247} listenerCount={3891} showGrowth={true} />
```

**Action:**
- Replace with real numbers from your database
- Or use API: `fetch('/api/stats')` (already set up)
- Update `app/api/stats/route.ts` to connect to your database

### Task 2: Replace Testimonials (30 minutes)
**File:** `components/Testimonials.tsx`

**Action:**
1. Collect 5-10 testimonials from beta users
2. Get permission to use their name/location
3. Replace default testimonials in the component
4. Add photos if available (optional)

**Template for collecting:**
```
Hi [Name],

We'd love to feature your experience with EmPulse! Could you share:
1. A quote about your experience (1-2 sentences)
2. Your name and location (city, state)
3. Your role (e.g., "Independent Artist", "Music Lover")
4. Permission to use your quote on our website

Thanks!
```

### Task 3: Customize Trust Badges (10 minutes)
**File:** `components/TrustBadges.tsx`

**Current badges:**
- SSL Secured
- Privacy First

**Add if you have:**
- "Featured in [Publication Name]"
- "Backed by [Investor/Studio Name]"
- "Trusted by [Number]+ Artists"
- Security certifications

### Task 4: Update Urgency Badge (5 minutes)
**File:** `app/page.tsx` (line ~145)

**Current:**
```tsx
<UrgencyBadge
  progressValue={247}
  progressMax={500}
/>
```

**Action:**
- Update with real numbers from your database
- Or connect to API: `fetch('/api/early-access-spots')`
- Update `app/api/early-access-spots/route.ts` with real data

---

## 🎬 Priority 3: Video Content (Days 4-5)

### Create Demo Video (2-3 hours)
**Recommended:** 15-30 second demo

**Content:**
1. Show mood slider in action
2. Show music discovery
3. Show wellness features
4. End with CTA: "Try it free at blue7.dev"

**Tools:**
- Screen recording: Loom, OBS, or QuickTime
- Editing: Canva, CapCut, or iMovie
- Host: YouTube (unlisted) or Vimeo

**Integration:**
**File:** `app/page.tsx`

Add to hero section:
```tsx
<VideoDemo
  videoUrl="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  thumbnailUrl="/video-thumbnail.jpg"
  title="See EmPulse in Action"
/>
```

---

## 📧 Priority 4: Email Automation (Day 6)

### Set Up Resend Account
1. Go to https://resend.com
2. Sign up for free account (100 emails/day free)
3. Verify your domain (or use default)
4. **Copy your API key**
5. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

### Test Welcome Email
1. Update signup forms to send welcome emails
2. Test with your own email
3. Verify emails are received

**Files to update:**
- `app/api/subscribe/route.ts`
- `app/api/artist-signup/route.ts`
- `app/api/listener-signup/route.ts`

Add after successful signup:
```typescript
// Send welcome email
try {
  await fetch('/api/send-welcome-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      type: 'welcome', // or 'artist' for artist signups
    }),
  });
} catch (error) {
  console.error('Email send failed:', error);
  // Don't fail signup if email fails
}
```

---

## 🧪 Priority 5: First A/B Test (Day 7)

### Test Hero Headline
**File:** `app/page.tsx`

Replace current headline with:
```tsx
<ABTestWrapper
  testName="hero-headline"
  variants={{
    A: (
      <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        {["Music", "That", "Knows", "How", "You", "Feel"].map(...)}
      </motion.h1>
    ),
    B: (
      <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        Discover Music by Mood, Not Algorithm
      </motion.h1>
    ),
  }}
/>
```

**Track conversion:**
- After 1 week, check GA4 for `ab_test_conversion` events
- Compare conversion rates between variants
- Keep the winner

---

## ✅ Daily Checklist

### Day 1: Analytics
- [ ] Set up Google Analytics 4
- [ ] Set up Microsoft Clarity
- [ ] Add IDs to `.env.local`
- [ ] Verify tracking works
- [ ] Check real-time reports

### Day 2: Content
- [ ] Update user counts (real or API)
- [ ] Collect testimonials (reach out to 10 beta users)
- [ ] Update urgency badge numbers

### Day 3: Content (continued)
- [ ] Replace testimonials in component
- [ ] Customize trust badges
- [ ] Review all placeholder content

### Day 4: Video
- [ ] Plan video content
- [ ] Record demo video
- [ ] Edit video (15-30 seconds)

### Day 5: Video (continued)
- [ ] Upload to YouTube/Vimeo
- [ ] Add video to hero section
- [ ] Test video playback

### Day 6: Email
- [ ] Set up Resend account
- [ ] Add API key to `.env.local`
- [ ] Update signup forms
- [ ] Test welcome emails

### Day 7: Testing
- [ ] Set up first A/B test
- [ ] Review analytics data
- [ ] Check heatmaps (Clarity)
- [ ] Run Lighthouse audit

---

## 📊 Success Metrics (Week 1)

### Analytics
- [ ] GA4 tracking active
- [ ] Clarity heatmaps working
- [ ] Events firing correctly
- [ ] Real-time data visible

### Content
- [ ] Real user counts displayed
- [ ] Real testimonials added
- [ ] Trust badges customized
- [ ] Video demo added

### Email
- [ ] Welcome emails sending
- [ ] Email templates working
- [ ] Delivery rate > 95%

### Testing
- [ ] First A/B test running
- [ ] Baseline metrics established
- [ ] Conversion tracking verified

---

## 🚨 Common Issues & Fixes

### Analytics Not Working?
1. Check `.env.local` file exists
2. Verify IDs are correct (no extra spaces)
3. Restart dev server after adding env vars
4. Check browser console for errors
5. Test in incognito mode

### Testimonials Not Showing?
1. Check component import
2. Verify testimonials array format
3. Check browser console for errors

### Video Not Playing?
1. Verify video URL is correct
2. Check if video is public/unlisted
3. Test embed URL directly
4. Check browser console for errors

### Emails Not Sending?
1. Verify Resend API key
2. Check Resend dashboard for errors
3. Verify email addresses are valid
4. Check API route logs

---

## 📞 Next Steps After Week 1

1. **Week 2:** Review analytics, optimize based on data
2. **Week 3:** Launch referral program
3. **Week 4:** Expand A/B tests, scale successful channels

---

**Ready to start? Begin with Day 1: Analytics Setup!**
