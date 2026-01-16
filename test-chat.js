// Test script to verify xAI Voice integration
const testChat = async () => {
  console.log('🧪 Testing EmPulse Chat Widget...\n');
  
  // Test 1: Check if page loads
  try {
    const response = await fetch('http://localhost:3000');
    console.log('✅ Frontend is accessible');
  } catch (e) {
    console.log('❌ Frontend not accessible:', e.message);
    return;
  }
  
  // Test 2: Check backend health
  try {
    const health = await fetch('http://localhost:8000/healthz');
    const data = await health.json();
    console.log('✅ Backend health check:', data);
  } catch (e) {
    console.log('❌ Backend not accessible:', e.message);
    return;
  }
  
  // Test 3: Check WebSocket endpoint (can't test directly, but verify it exists)
  console.log('✅ WebSocket endpoint should be at: ws://localhost:8000/ws/xai-voice');
  console.log('\n📋 Manual Testing Steps:');
  console.log('1. Open: http://localhost:3000');
  console.log('2. Click the chat button (bottom right)');
  console.log('3. Click the voice/microphone button to enable voice');
  console.log('4. Check browser console for:');
  console.log('   - [xAI Voice] WebSocket connected');
  console.log('   - [xAI Voice] ✅ Session configured successfully');
  console.log('5. Send a test message');
  console.log('6. Verify text streams in real-time');
  console.log('7. Verify audio plays');
};

testChat();
