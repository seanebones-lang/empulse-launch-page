# Content Management Guide

## 🎯 Easy Ways to Update Dynamic Content

### Method 1: Content Manager Component (Easiest)

**In Development Mode:**
1. Look for "Show Content" button (bottom-left, next to Admin button)
2. Click to open Content Manager
3. Update artist/listener counts
4. Click "Update Stats"
5. Changes reflect immediately

**Note:** Currently updates mock data. Connect to your database for real updates.

---

### Method 2: Command Line Script (Fast)

**Update Stats:**
```bash
node scripts/update-content.js --artists=1500 --listeners=4000
```

**Update Early Access Spots:**
```bash
node scripts/update-content.js --spots-used=300 --spots-total=500
```

**Both at once:**
```bash
node scripts/update-content.js --artists=1500 --listeners=4000 --spots-used=300
```

---

### Method 3: Direct Component Edit (Permanent)

**Update User Counts:**
**File:** `components/SocialProof.tsx`

Change default props:
```tsx
<SocialProof artistCount={1500} listenerCount={4000} showGrowth={true} />
```

**Update Urgency Badge:**
**File:** `app/page.tsx` (around line 145)

Change progress values:
```tsx
<UrgencyBadge
  progressValue={300}  // Update this
  progressMax={500}    // Update this if needed
/>
```

---

### Method 4: API Integration (Best for Production)

**Connect to Real Database:**

**File:** `app/api/stats/route.ts`

Replace mock data with database queries:
```typescript
// Example with Prisma
import { prisma } from '@/lib/prisma';

export async function GET() {
  const artistCount = await prisma.artist.count();
  const listenerCount = await prisma.listener.count();
  
  return NextResponse.json({
    artists: artistCount,
    listeners: listenerCount,
    // ...
  });
}
```

**Then use in components:**
```tsx
import { getSiteStats } from '@/lib/content-manager';

const [stats, setStats] = useState({ artists: 0, listeners: 0 });

useEffect(() => {
  getSiteStats().then(setStats);
}, []);
```

---

## 📝 Updating Testimonials

**File:** `components/Testimonials.tsx`

Replace `defaultTestimonials` array:

```tsx
const defaultTestimonials: Testimonial[] = [
  {
    quote: "Your real testimonial here",
    author: 'Real Name',
    role: 'Independent Artist',
    location: 'City, State',
    type: 'artist',
    verified: true,
  },
  // Add more...
];
```

---

## 🏷️ Updating Trust Badges

**File:** `components/TrustBadges.tsx`

Update the `defaultBadges` array:

```tsx
const defaultBadges: TrustBadge[] = [
  {
    text: 'SSL Secured',
    icon: <LockIcon />,
  },
  {
    text: 'Featured in TechCrunch', // Add real features
    icon: <StarIcon />,
  },
  // Add more...
];
```

---

## 🎬 Adding Video

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

## 🔄 Auto-Update from Database

**Best Practice:** Set up automatic updates

**Option 1: Polling**
```tsx
useEffect(() => {
  const interval = setInterval(() => {
    getSiteStats().then(setStats);
  }, 60000); // Update every minute

  return () => clearInterval(interval);
}, []);
```

**Option 2: WebSocket (Real-time)**
```tsx
useEffect(() => {
  const ws = new WebSocket('wss://your-api.com/stats');
  ws.onmessage = (event) => {
    const stats = JSON.parse(event.data);
    setStats(stats);
  };
  return () => ws.close();
}, []);
```

---

## 📊 Content Update Checklist

### Daily/Weekly Updates
- [ ] Update user counts (artists, listeners)
- [ ] Update early access spots progress
- [ ] Add new testimonials (as collected)

### Monthly Updates
- [ ] Review and refresh testimonials
- [ ] Update trust badges with new features
- [ ] Add new video content
- [ ] Update statistics in API

### As Needed
- [ ] Add new testimonials
- [ ] Update urgency messages
- [ ] Refresh social proof numbers
- [ ] Update video demos

---

## 🛠️ Quick Commands

**Make script executable (Mac/Linux):**
```bash
chmod +x scripts/update-content.js
```

**Update everything at once:**
```bash
node scripts/update-content.js \
  --artists=1500 \
  --listeners=4000 \
  --spots-used=300 \
  --spots-total=500
```

---

## 💡 Pro Tips

1. **Use Content Manager in Dev:** Fastest way to test changes
2. **Use Scripts for Batch Updates:** When updating multiple values
3. **Connect to Database for Production:** Real-time, accurate data
4. **Cache API Responses:** Reduce database load
5. **Update Regularly:** Fresh content = better conversions

---

**Last Updated:** December 2025
