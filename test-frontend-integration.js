/**
 * Test script for xAI Voice integration on deployed frontend
 * Run: node test-frontend-integration.js
 */

const https = require('https');
const http = require('http');

const DEPLOYED_URL = 'https://empulse-launch-page.vercel.app/';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

console.log('🧪 Testing EmPulse Frontend Integration\n');
console.log('Frontend URL:', DEPLOYED_URL);
console.log('Expected Backend URL:', BACKEND_URL);
console.log('');

// Test 1: Frontend is accessible
console.log('Test 1: Frontend Accessibility');
https.get(DEPLOYED_URL, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Frontend is accessible (HTTP', res.statusCode + ')');
  } else {
    console.log('❌ Frontend returned:', res.statusCode);
  }
  
  // Test 2: Check if chat widget code is present
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    if (html.includes('PulseChatbot') || html.includes('chat') || html.includes('aria-label="Toggle chat')) {
      console.log('✅ Chat widget component detected in HTML');
    } else {
      console.log('⚠️  Chat widget not clearly detected (may be client-side rendered)');
    }
    
    // Test 3: Check backend
    console.log('\nTest 2: Backend Health');
    const backendProtocol = BACKEND_URL.startsWith('https') ? https : http;
    backendProtocol.get(BACKEND_URL + '/healthz', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'ok') {
            console.log('✅ Backend is healthy:', json);
          } else {
            console.log('⚠️  Backend returned:', json);
          }
        } catch (e) {
          console.log('❌ Backend health check failed:', e.message);
        }
        
        console.log('\n📋 MANUAL TESTING REQUIRED:');
        console.log('1. Open:', DEPLOYED_URL);
        console.log('2. Open DevTools (F12) → Console');
        console.log('3. Click chat widget button (bottom right)');
        console.log('4. Click voice/microphone button');
        console.log('5. Check console for:');
        console.log('   - [xAI Voice] Using backend proxy: wss://...');
        console.log('   - [xAI Voice] WebSocket connected');
        console.log('   - [xAI Voice] ✅ Session configured successfully');
        console.log('6. Send a test message');
        console.log('7. Verify text streams and audio plays');
        console.log('\n⚠️  CRITICAL: Ensure NEXT_PUBLIC_BACKEND_URL is set in Vercel!');
      });
    }).on('error', (e) => {
      console.log('❌ Backend not accessible:', e.message);
      console.log('   Make sure backend is deployed and running');
    });
  });
}).on('error', (e) => {
  console.log('❌ Frontend not accessible:', e.message);
});
