# Analytics Setup Guide - Step by Step

## 🎯 Goal
Set up Google Analytics 4 and Microsoft Clarity in 30 minutes.

---

## Part 1: Google Analytics 4 (15 minutes)

### Step 1: Create Account
1. Go to https://analytics.google.com
2. Click "Start measuring" (or sign in if you have an account)
3. Enter account name: "EmPulse" or "NextEleven Studios"
4. Configure account settings:
   - Account name: Your choice
   - Country: United States
   - Currency: USD
   - Click "Next"

### Step 2: Create Property
1. Property name: "EmPulse Landing Page"
2. Reporting time zone: Your timezone
3. Currency: USD
4. Click "Next"

### Step 3: Business Information
1. Industry category: "Technology" or "Entertainment"
2. Business size: Select appropriate
3. How you intend to use Google Analytics: Select all that apply
4. Click "Create"

### Step 4: Accept Terms
1. Read and accept Google Analytics Terms of Service
2. Accept Data Processing Terms
3. Click "I Accept"

### Step 5: Get Measurement ID
1. You'll see "Set up a data stream"
2. Select "Web"
3. Website URL: Your domain (e.g., `empulse.music`) or `localhost:3000` for testing
4. Stream name: "EmPulse Website"
5. Click "Create stream"
6. **Copy your Measurement ID** (starts with `G-`)
   - Example: `G-ABC123XYZ`

### Step 6: Add to Your Project
1. Create or edit `.env.local` file in your project root
2. Add:
   ```env
   NEXT_PUBLIC_GA4_ID=G-ABC123XYZ
   ```
3. Replace `G-ABC123XYZ` with your actual Measurement ID
4. Save the file

### Step 7: Verify Setup
1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Visit your site
3. Open browser DevTools (F12)
4. Go to Network tab
5. Filter by "google-analytics"
6. You should see requests to `google-analytics.com`
7. Go to GA4 dashboard → Reports → Realtime
8. You should see your visit within 30 seconds

**✅ Done! Google Analytics is set up.**

---

## Part 2: Microsoft Clarity (15 minutes)

### Step 1: Create Account
1. Go to https://clarity.microsoft.com
2. Click "Sign in" (use Microsoft account, Google, or create new)
3. If creating new: Use your work email

### Step 2: Create Project
1. Click "New Project" (or "Add Project")
2. Project name: "EmPulse Landing Page"
3. Website URL: Your domain or `localhost:3000` for testing
4. Category: "Technology" or "Entertainment"
5. Click "Create Project"

### Step 3: Get Project ID
1. After creating, you'll see setup instructions
2. **Copy your Project ID** (looks like: `abc123xyz` or `clarity-abc123`)
3. It's usually shown in the code snippet or in project settings

### Step 4: Add to Your Project
1. Edit `.env.local` file
2. Add:
   ```env
   NEXT_PUBLIC_CLARITY_ID=your-project-id-here
   ```
3. Replace `your-project-id-here` with your actual Project ID
4. Save the file

### Step 5: Verify Setup
1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Visit your site
3. Open browser DevTools (F12)
4. Go to Network tab
5. Filter by "clarity"
6. You should see requests to `clarity.ms`
7. Go to Clarity dashboard
8. Wait 5-10 minutes, then check "Recordings" tab
9. You should see a session recording

**✅ Done! Microsoft Clarity is set up.**

---

## Complete .env.local File

Your `.env.local` should look like this:

```env
# Analytics
NEXT_PUBLIC_GA4_ID=G-ABC123XYZ
NEXT_PUBLIC_CLARITY_ID=your-clarity-project-id

# Site URL
NEXT_PUBLIC_SITE_URL=https://empulse.music

# Email (optional - for welcome emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_TO=empulse@mothership-ai.com
INVESTOR_EMAIL=investors@empulse.music
```

**Important:** 
- Never commit `.env.local` to git (it should be in `.gitignore`)
- Use different IDs for development and production
- Restart server after changing environment variables

---

## Troubleshooting

### GA4 Not Tracking?
1. **Check Measurement ID format:** Should start with `G-`
2. **Verify env variable:** Check `.env.local` file
3. **Restart server:** Always restart after changing env vars
4. **Check browser console:** Look for errors
5. **Test in incognito:** Some extensions block analytics
6. **Verify in Network tab:** Should see requests to `google-analytics.com`

### Clarity Not Working?
1. **Check Project ID:** Should be alphanumeric string
2. **Verify env variable:** Check `.env.local` file
3. **Restart server:** Always restart after changing env vars
4. **Wait 5-10 minutes:** Clarity takes time to show recordings
5. **Check browser console:** Look for errors
6. **Verify in Network tab:** Should see requests to `clarity.ms`

### Both Not Working?
1. Check if `.env.local` file exists in project root
2. Verify file is named exactly `.env.local` (not `.env.local.txt`)
3. Make sure you restarted the dev server
4. Check for typos in variable names
5. Verify IDs are correct (no extra spaces)

---

## Next Steps

After setup:
1. ✅ Verify both are tracking (check real-time reports)
2. ✅ Set up conversion goals in GA4
3. ✅ Review heatmaps in Clarity after 24 hours
4. ✅ Set up custom events (already implemented in code)
5. ✅ Create dashboards for key metrics

---

## Useful Links

- **GA4 Dashboard:** https://analytics.google.com
- **Clarity Dashboard:** https://clarity.microsoft.com
- **GA4 Documentation:** https://support.google.com/analytics/answer/9304153
- **Clarity Documentation:** https://docs.microsoft.com/en-us/clarity/

---

**Time to complete:** ~30 minutes  
**Difficulty:** Easy  
**Status:** ✅ Ready to set up!
