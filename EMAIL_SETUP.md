# Email System Setup Guide

## ✅ What's Configured

All email forms now send actual emails to the correct recipients:

- **General/Home Page**: `empulse@mothership-ai.com`
- **Investors Page**: `investors@empulse.music`
- **Artists Signup**: `empulse@mothership-ai.com`
- **Listeners Waitlist**: `empulse@mothership-ai.com`

## 🔧 Setup Required

### 1. Get Resend API Key

1. Sign up at https://resend.com
2. Go to API Keys section
3. Create a new API key
4. Copy the key (starts with `re_`)

### 2. Configure Vercel Environment Variables

Run these commands or set in Vercel Dashboard:

```bash
# Required
npx vercel env add RESEND_API_KEY production
# Paste your Resend API key when prompted

# Optional - for email list management
npx vercel env add RESEND_AUDIENCE_ID production
# Get this from Resend Dashboard > Audiences

# Optional - override default email addresses
npx vercel env add GENERAL_EMAIL production
npx vercel env add INVESTOR_EMAIL production
npx vercel env add ARTIST_EMAIL production
npx vercel env add LISTENER_EMAIL production
```

Or set in Vercel Dashboard:
1. Go to your project settings
2. Environment Variables section
3. Add each variable for Production, Preview, and Development

### 3. Verify Domain in Resend

1. Go to Resend Dashboard > Domains
2. Add `mothership-ai.com` domain
3. Verify DNS records
4. This allows sending from `noreply@mothership-ai.com`

## 📧 Email Routing

Emails are automatically routed based on form source:

- **Home page email capture** → `empulse@mothership-ai.com`
- **Investors page** → `investors@empulse.music`
- **Artists signup form** → `empulse@mothership-ai.com`
- **Listeners waitlist** → `empulse@mothership-ai.com`
- **Exit intent modals** → Based on page (investors/listeners/artists)

## 🧪 Testing

After setup:
1. Submit a test form on the website
2. Check the recipient email inbox
3. You should receive an email with form details

## 📋 Email Content

Each email includes:
- Form submission details
- Source/page information
- Timestamp
- Clickable email links

## ⚠️ Troubleshooting

If emails aren't sending:
1. Check Vercel logs: `npx vercel logs`
2. Verify `RESEND_API_KEY` is set correctly
3. Check Resend dashboard for delivery status
4. Verify domain is verified in Resend
