# EmPulse Music - Landing Page

**Music That Knows How You Feel**

A professional, conversion-focused landing site for EmPulse Music platform, built with Next.js 16.1, React 19.2, and Tailwind CSS 4.0.

## Overview

EmPulse is a mood-based music streaming platform that pays artists 4-6x industry average, integrates mental wellness features, and enables discovery by feeling instead of algorithms.

This landing site serves three primary audiences:
- **Investors**: Seed funding opportunity at intersection of streaming & wellness
- **Artists**: Fair pay, transparent dashboards, and real control
- **Listeners**: Music discovery by mood, artist support, wellness integration

## Tech Stack (January 2026)

- **Framework**: Next.js 16.1 (App Router, Turbopack, React 19.2)
- **Styling**: Tailwind CSS 4.0 (Oxide engine, CSS-first configuration)
- **Animations**: Framer Motion 11.x
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API for capture & notifications
- **TypeScript**: 5.6+
- **Hosting**: Vercel (recommended)

## Features

### Core Pages
- `/` - Home (vision, problem/solution, audience routing)
- `/investors` - Investor-focused (opportunity, traction, contact)
- `/artists` - Artist-focused (economics, control, signup)
- `/listeners` - Listener-focused (experience, community, waitlist)

### Components
- **Pulse AI Chatbot**: Floating glassmorphic chat widget on all pages
  - Chicago music expert, Blues Brothers superfan
  - EmPulse knowledge base
  - Can escalate to Michelle or contact forms
- **Exit Intent Modals**: Page-specific conversion captures
- **Email Capture**: Validated forms with Resend integration
- **Responsive Design**: Mobile-first, fully responsive

### Design System
- Dark theme with teal/amber accents
- Generous whitespace (120px sections desktop, 80px mobile)
- 8px/12px border radius consistency
- System font stack with Inter fallback
- Accessibility-focused

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd empulse-launch-page
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:
- `RESEND_API_KEY`: Your Resend API key
- `RESEND_AUDIENCE_ID`: Your Resend audience/list ID
- `NOTIFICATION_EMAIL`: Email for artist signup notifications

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables in Vercel project settings
4. Deploy automatically on push to main branch

### Environment Variables (Vercel)

Add these in Project Settings → Environment Variables:
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `NOTIFICATION_EMAIL`

### Custom Domain

1. Add domain in Vercel project settings
2. Configure DNS records as instructed
3. Update OpenGraph URLs in metadata when live

## Performance Targets

- Lighthouse score: 90+ across all categories
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 500KB initial load

## Email Integration

Email capture uses Resend API:
- **General waitlist**: `/api/subscribe`
- **Artist signups**: `/api/artist-signup`

Emails are added to your Resend audience automatically. Configure welcome emails and automation in your Resend dashboard.

## Pulse AI Chatbot

The Pulse chatbot provides:
- Friendly, knowledgeable responses about EmPulse
- Chicago music venue expertise
- Blues Brothers movie quotes
- Escalation to contact forms or Michelle when needed

**To integrate with actual AI** (OpenAI, Anthropic Claude, etc.):
1. Add API key to environment variables
2. Update `/app/api/pulse-chat/route.ts` with actual AI calls
3. Replace mock `generateResponse()` function

## Contact Information

Update contact details in:
- `components/Footer.tsx`
- Each page's contact section
- Chatbot knowledge base: `app/api/pulse-chat/route.ts`

## Analytics (Optional)

To add privacy-focused analytics:

**Plausible**:
1. Add script to `app/layout.tsx`
2. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var

**Umami**:
1. Add script to `app/layout.tsx`
2. Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_URL`

## Security Notes

- All forms use Zod validation
- Email regex validation on frontend and backend
- XSS protection via React's automatic escaping
- HTTPS required for production
- Rate limiting recommended for production API routes

## Content Updates

To update copy:
- **Home page**: `app/page.tsx`
- **Investors**: `app/investors/page.tsx`
- **Artists**: `app/artists/page.tsx`
- **Listeners**: `app/listeners/page.tsx`
- **Footer links**: `components/Footer.tsx`
- **Header CTAs**: `components/Header.tsx`

## License

Proprietary - EmPulse Music / NextEleven Studios LLC

## Support

For technical questions or issues:
- Email: contact@empulse.music
- CEO: Michelle Dudley

---

**Built with ❤️ by NextEleven Studios**
January 2026
