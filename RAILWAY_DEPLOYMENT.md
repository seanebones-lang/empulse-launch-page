# Railway Deployment Guide - Pulse AI Backend

Quick guide to deploy the xAI Voice WebSocket proxy backend to Railway.

## Prerequisites

- Railway account: https://railway.app/
- xAI API key: https://console.x.ai/
- GitHub account (for Railway deployment)

## Step 1: Push Backend to Repository

The backend code is in the `/backend` directory.

```bash
git add backend/
git commit -m "Add Pulse AI backend for xAI Voice integration"
git push
```

## Step 2: Deploy to Railway

### Option A: Deploy from GitHub (Recommended)

1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. **IMPORTANT**: Set root directory to `/backend`
   - Click "Settings" → "Root Directory" → `/backend`
6. Railway will auto-detect Python and deploy

### Option B: Deploy with Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# From backend directory
cd backend

# Initialize
railway init

# Deploy
railway up
```

## Step 3: Set Environment Variables

In Railway dashboard:

1. Go to your service
2. Click "Variables" tab
3. Add:
   - `XAI_API_KEY` = `your_xai_api_key_here`
   - `PORT` = `8000` (Railway sets this automatically, but you can override)

## Step 4: Get Your Backend URL

After deployment:

1. Go to "Settings" tab
2. Find "Domains" section
3. Click "Generate Domain"
4. Copy the URL (e.g., `https://your-app.up.railway.app`)

## Step 5: Update Frontend Environment Variables

In Vercel (or your frontend hosting):

1. Go to project settings
2. Environment Variables
3. Add:
   - `NEXT_PUBLIC_BACKEND_URL` = `https://your-app.up.railway.app`
4. Redeploy frontend

## Step 6: Test Connection

1. Open your landing page
2. Click Pulse AI chatbot
3. Click microphone icon to enable voice
4. Send a message
5. Verify you get text + audio response

## Troubleshooting

### WebSocket connection fails

- Check Railway logs: `railway logs`
- Verify `XAI_API_KEY` is set correctly
- Check CORS is enabled (it is in the code)

### Voice not working

- Check browser console for errors
- Verify `NEXT_PUBLIC_BACKEND_URL` is set in Vercel
- Test backend directly: `curl https://your-app.up.railway.app/healthz`

### Railway deployment fails

- Verify `requirements.txt` is in `/backend` directory
- Check Railway build logs for errors
- Ensure Python 3.12 is available (set in `runtime.txt`)

## Cost

**Railway Free Tier:**
- $5 credit/month
- 500 hours execution
- Should be sufficient for moderate chatbot usage

**Upgrade if needed:**
- $5/month starter plan
- Unlimited execution time

## Monitoring

Check Railway logs:
```bash
railway logs --follow
```

Or in dashboard: "Deployments" → "View Logs"

## Scaling

For production:
- Railway auto-scales horizontally
- No configuration needed
- Pay-as-you-go pricing

---

**That's it!** Your Pulse AI chatbot now has voice powered by xAI.
