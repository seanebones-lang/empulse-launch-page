# Vercel Environment Variable Setup

## ⚠️ CRITICAL: Set NEXT_PUBLIC_BACKEND_URL

The frontend needs to know where the backend is located. This must be set in Vercel.

### Steps:

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Find project: `empulse-launch-page`

2. **Navigate to Environment Variables:**
   - Click on project
   - Go to: **Settings** → **Environment Variables**

3. **Add Variable:**
   - **Name:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** Your Railway backend URL (e.g., `https://your-backend.railway.app`)
   - **Environment:** Select all (Production, Preview, Development)

4. **Redeploy:**
   - After adding the variable, Vercel will prompt to redeploy
   - Or manually: Go to **Deployments** → Click **Redeploy** on latest

### How to Get Railway Backend URL:

1. Go to Railway Dashboard: https://railway.app/dashboard
2. Find your backend service
3. Go to **Settings** → **Public Domain** (or **Generate Domain**)
4. Copy the URL (format: `https://xxx.up.railway.app`)

### Verify It's Set:

After redeploying, the frontend will use this URL to connect to the backend WebSocket proxy.

**Without this variable, the chat widget will try to connect to `http://localhost:8000` which won't work in production!**

---

## Quick Command (if using Vercel CLI):

```bash
cd "/Users/nexteleven/Desktop/Boss Fight 1/empulse-launch-page"
echo "https://your-backend.railway.app" | npx vercel env add NEXT_PUBLIC_BACKEND_URL production
echo "https://your-backend.railway.app" | npx vercel env add NEXT_PUBLIC_BACKEND_URL preview
echo "https://your-backend.railway.app" | npx vercel env add NEXT_PUBLIC_BACKEND_URL development
```

Then redeploy:
```bash
npx vercel --prod
```
