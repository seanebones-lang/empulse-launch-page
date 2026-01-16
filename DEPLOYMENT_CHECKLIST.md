# Pre-Deployment Checklist

## ✅ Before Going Live

### Environment Setup
- [ ] Create `.env.local` file (if not exists)
- [ ] Add `NEXT_PUBLIC_GA4_ID` (get from Google Analytics)
- [ ] Add `NEXT_PUBLIC_CLARITY_ID` (get from Microsoft Clarity)
- [ ] Add `NEXT_PUBLIC_SITE_URL` (your production domain)
- [ ] Add `RESEND_API_KEY` (if using email automation)
- [ ] Verify all environment variables are set

### Content Updates
- [ ] Replace placeholder user counts with real numbers
- [ ] Replace placeholder testimonials with real ones
- [ ] Customize trust badges (add real credentials)
- [ ] Update urgency badge with real progress
- [ ] Add video content (if ready)
- [ ] Review all copy for accuracy

### API Integration
- [ ] Connect `/api/stats` to real database
- [ ] Connect `/api/early-access-spots` to real database
- [ ] Test all API endpoints
- [ ] Add authentication to POST endpoints (if needed)
- [ ] Set up error handling

### Testing
- [ ] Test all CTAs (hero, mid-page, sticky, exit intent)
- [ ] Test all forms (email capture, artist signup, listener signup)
- [ ] Test analytics tracking (check GA4 real-time)
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Test accessibility (keyboard navigation, screen reader)
- [ ] Run Lighthouse audit (target: 90+ score)

### Performance
- [ ] Optimize images (compress, use WebP)
- [ ] Check Core Web Vitals (LCP, FID, CLS)
- [ ] Test page load speed (< 3s)
- [ ] Verify lazy loading works
- [ ] Check bundle size

### SEO
- [ ] Verify meta descriptions on all pages
- [ ] Check structured data (use Google Rich Results Test)
- [ ] Verify sitemap.xml is accessible
- [ ] Check robots.txt
- [ ] Test Open Graph tags (use Facebook Debugger)
- [ ] Test Twitter Card tags

### Security
- [ ] Verify HTTPS is enabled
- [ ] Check security headers (in `next.config.ts`)
- [ ] Review rate limiting on API routes
- [ ] Verify cookie consent is working
- [ ] Test form validation

### Analytics
- [ ] Verify GA4 is tracking
- [ ] Verify Clarity is recording
- [ ] Test conversion events
- [ ] Set up conversion goals in GA4
- [ ] Create custom dashboards

### Content Review
- [ ] Proofread all copy
- [ ] Check all links work
- [ ] Verify email addresses are correct
- [ ] Check phone numbers (if any)
- [ ] Review legal pages (privacy, terms)

### Mobile
- [ ] Test on iPhone
- [ ] Test on Android
- [ ] Check sticky CTA works
- [ ] Verify forms are mobile-friendly
- [ ] Test touch interactions

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

---

## 🚀 Deployment Steps

### 1. Build Check
```bash
npm run build
```
- [ ] Build succeeds without errors
- [ ] No TypeScript errors
- [ ] No linting errors

### 2. Environment Variables
- [ ] Add all env vars to hosting platform (Vercel, Netlify, etc.)
- [ ] Verify production URLs are correct
- [ ] Test environment variables are accessible

### 3. Deploy
- [ ] Deploy to staging first (if available)
- [ ] Test staging environment
- [ ] Deploy to production
- [ ] Verify deployment succeeded

### 4. Post-Deployment
- [ ] Visit production site
- [ ] Check analytics are tracking
- [ ] Test all forms
- [ ] Verify all links work
- [ ] Check mobile experience
- [ ] Run Lighthouse audit on production

---

## 📊 Post-Launch Monitoring (First Week)

### Daily Checks
- [ ] Review GA4 real-time reports
- [ ] Check for errors in console
- [ ] Monitor conversion rates
- [ ] Review Clarity heatmaps

### Weekly Reviews
- [ ] Analyze conversion funnel
- [ ] Review drop-off points
- [ ] Check Core Web Vitals
- [ ] Review user feedback
- [ ] Optimize based on data

---

## 🔍 Verification Commands

### Check Build
```bash
npm run build
npm run start
```

### Check Linting
```bash
npm run lint
```

### Check Tests (if you have them)
```bash
npm test
```

### Check TypeScript
```bash
npx tsc --noEmit
```

---

## 🎯 Success Criteria

### Technical
- ✅ Build succeeds
- ✅ No console errors
- ✅ Lighthouse score 90+
- ✅ Core Web Vitals pass
- ✅ All forms work
- ✅ Analytics tracking

### Business
- ✅ Conversion tracking works
- ✅ Email automation works
- ✅ All CTAs functional
- ✅ Mobile experience good
- ✅ Content is accurate

---

## 🆘 If Something Breaks

1. **Check browser console** for errors
2. **Check server logs** for backend errors
3. **Verify environment variables** are set
4. **Test in incognito mode** (rule out extensions)
5. **Check network tab** for failed requests
6. **Review recent changes** in git history

---

## 📝 Post-Launch Tasks

### Week 1
- [ ] Monitor analytics daily
- [ ] Review heatmaps
- [ ] Collect user feedback
- [ ] Fix any bugs found

### Week 2-4
- [ ] Launch first A/B test
- [ ] Optimize based on data
- [ ] Update content based on feedback
- [ ] Scale successful channels

---

**Ready to deploy?** Go through this checklist, then deploy with confidence! 🚀
