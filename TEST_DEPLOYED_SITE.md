# Testing Deployed Frontend - https://empulse-launch-page.vercel.app/

## 🧪 Testing Steps

### 1. Open the Site
- URL: https://empulse-launch-page.vercel.app/
- Open in browser
- Open DevTools (F12) → Console tab

### 2. Test Chat Widget
1. **Find Chat Button**: Bottom right corner (chat icon)
2. **Click Chat Button**: Should open chat window
3. **Click Voice Button**: Microphone icon in chat header
4. **Check Console**: Should see:
   ```
   [xAI Voice] Using backend proxy: wss://...
   [xAI Voice] WebSocket connected
   [xAI Voice] ✅ Session configured successfully
   ```

### 3. Test Message Sending
1. **Type a message**: e.g., "Hello, tell me about EmPulse"
2. **Send message**: Click send button
3. **Check Console**: Should see:
   ```
   [xAI Voice] Sending text message: Hello, tell me about EmPulse
   [xAI Voice] Requesting response with text and audio
   [xAI Voice] Received event: response.created
   [xAI Voice] Text delta: ...
   [xAI Voice] Audio complete, total chunks: X
   [xAI Voice] ✅ Response complete
   ```

### 4. Verify Functionality
- [ ] Text streams in real-time (not all at once)
- [ ] Audio plays after response
- [ ] Loading state stops after response
- [ ] Can send another message

---

## ⚠️ Common Issues & Fixes

### Issue: WebSocket connection fails
**Symptoms:**
- Console shows: `WebSocket connection failed`
- `[xAI Voice] WebSocket error`

**Fix:**
1. Check `NEXT_PUBLIC_BACKEND_URL` is set in Vercel
2. Verify backend is running and accessible
3. Check backend URL is correct (Railway URL)

### Issue: "NEXT_PUBLIC_BACKEND_URL not set"
**Fix:**
1. Go to Vercel Dashboard
2. Project → Settings → Environment Variables
3. Add: `NEXT_PUBLIC_BACKEND_URL` = `https://your-backend.railway.app`
4. Redeploy

### Issue: Audio doesn't play
**Symptoms:**
- Text appears but no audio
- Console shows audio errors

**Fix:**
1. Check browser autoplay policy (may need user interaction)
2. Check console for audio decoding errors
3. Verify audio chunks are being received

### Issue: "Bot is thinking" stuck
**Symptoms:**
- Loading spinner never stops
- Can't send new messages

**Fix:**
1. Check console for `response.done` event
2. Verify `onResponseComplete` is being called
3. Check for errors in console

---

## ✅ Success Criteria

- [x] Site loads at https://empulse-launch-page.vercel.app/
- [ ] Chat widget button visible
- [ ] Chat widget opens
- [ ] Voice button enables voice
- [ ] WebSocket connects (check console)
- [ ] Session configures (check console)
- [ ] Text streams in real-time
- [ ] Audio plays
- [ ] Loading state stops
- [ ] Can send multiple messages

---

## 🔍 Debugging Commands

**Check Backend:**
```bash
curl https://your-backend.railway.app/healthz
# Should return: {"status":"ok"}
```

**Check WebSocket (from browser console):**
```javascript
const ws = new WebSocket('wss://your-backend.railway.app/ws/xai-voice');
ws.onopen = () => console.log('Connected');
ws.onerror = (e) => console.error('Error:', e);
```

---

**Test the site now and report any issues!**
