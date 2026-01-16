# Quick Reference Card

## 🚀 Most Common Tasks

### Update User Counts
```bash
# Method 1: Command line (fastest)
node scripts/update-content.js --artists=1500 --listeners=4000

# Method 2: Content Manager (dev mode)
# Click "Show Content" button → Update → Save

# Method 3: Edit component
# components/SocialProof.tsx → Change default props
```

### Update Early Access Spots
```bash
node scripts/update-content.js --spots-used=300
```

### Add Testimonial
1. Open `components/Testimonials.tsx`
2. Add to `defaultTestimonials` array
3. Save

### Set Up Analytics
1. Follow `ANALYTICS_SETUP_GUIDE.md`
2. Get GA4 ID → Add to `.env.local`
3. Get Clarity ID → Add to `.env.local`
4. Restart server

---

## 📁 Key Files

| What | File Path |
|------|-----------|
| Update user counts | `components/SocialProof.tsx` |
| Update testimonials | `components/Testimonials.tsx` |
| Update trust badges | `components/TrustBadges.tsx` |
| Update urgency badge | `app/page.tsx` (line ~145) |
| Connect stats API | `app/api/stats/route.ts` |
| Environment variables | `.env.local` (create if missing) |

---

## 🔧 Environment Variables

```env
# Required
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=your-id
NEXT_PUBLIC_SITE_URL=https://empulse.music

# Optional
RESEND_API_KEY=re_xxxxx
EMAIL_TO=empulse@mothership-ai.com
```

---

## 🎯 Dev Tools (Development Only)

- **Admin Panel:** Bottom-left "Show Admin" button
- **Content Manager:** Bottom-left "Show Content" button
- Both only visible in development mode

---

## 📊 Check Analytics

- **GA4:** https://analytics.google.com → Realtime reports
- **Clarity:** https://clarity.microsoft.com → Recordings

---

## 🐛 Quick Fixes

**Analytics not working?**
→ Check `.env.local` exists and has correct IDs
→ Restart dev server

**Content not updating?**
→ Check browser cache (hard refresh: Cmd+Shift+R)
→ Verify file saved

**Admin/Content buttons not showing?**
→ Only visible in development mode
→ Check `NODE_ENV === 'development'`

---

## 📞 Need Help?

1. Check `QUICK_START_ACTION_PLAN.md` for step-by-step
2. Check `INTEGRATION_GUIDE.md` for code examples
3. Check `CONTENT_MANAGEMENT_GUIDE.md` for content updates

---

**Last Updated:** December 2025
