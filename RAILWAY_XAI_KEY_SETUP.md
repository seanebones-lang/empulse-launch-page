# ⚠️ CRITICAL: Set XAI_API_KEY in Railway

## Why This Is Needed

The WebSocket proxy needs your xAI API key to authenticate with xAI's Voice Agent API. Without it, the WebSocket connection will fail.

## How to Set It

### Option 1: Railway CLI

```bash
cd "/Users/nexteleven/Desktop/Boss Fight 1/empulse-launch-page/backend"
railway variables set XAI_API_KEY=your_xai_api_key_here
```

### Option 2: Railway Dashboard

1. **Go to Railway Dashboard:**
   - https://railway.com/project/52ffd68a-ac6f-48bf-9fc8-5793efad4971/service/e1c06f6a-72f8-44cd-ad4a-4e2e3cec7b19/settings

2. **Navigate to Variables:**
   - Click on **Variables** tab

3. **Add Variable:**
   - Click **+ New Variable**
   - **Name:** `XAI_API_KEY`
   - **Value:** Your xAI API key (starts with `xai-...`)
   - Click **Add**

4. **Verify:**
   - Variable should appear in the list
   - Backend will automatically restart with new variable

## Verify It's Set

```bash
cd "/Users/nexteleven/Desktop/Boss Fight 1/empulse-launch-page/backend"
railway variables | grep XAI_API_KEY
```

Should show:
```
XAI_API_KEY │ xai-... (encrypted)
```

## After Setting

1. Backend will automatically redeploy
2. Wait ~30 seconds for deployment
3. Test WebSocket connection:
   - Open: https://empulse-launch-page.vercel.app/
   - Open chat widget → Enable voice
   - Check console for: `[xAI Voice] ✅ Session configured successfully`

---

**Without this key, the voice feature will not work!**
