import { test, expect } from '@playwright/test';

test('Test xAI Voice Chat Widget on Deployed Site', async ({ page }) => {
  // Capture console logs
  const consoleLogs: string[] = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
  });

  // Navigate to deployed site
  console.log('🌐 Navigating to: https://empulse-launch-page.vercel.app/');
  await page.goto('https://empulse-launch-page.vercel.app/');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  console.log('✅ Page loaded');
  
  // Check if chat widget button exists
  const chatButton = page.locator('button[aria-label="Toggle chat with Pulse AI"]');
  await expect(chatButton).toBeVisible({ timeout: 10000 });
  console.log('✅ Chat widget button found');
  
  // Click chat widget
  await chatButton.click();
  console.log('✅ Chat widget opened');
  await page.waitForTimeout(1000);
  
  // Look for voice button by title attribute
  const voiceButton = page.locator('button[title*="voice"], button[title*="Voice"]').first();
  
  if (await voiceButton.count() > 0) {
    console.log('✅ Voice button found');
    await voiceButton.click();
    console.log('✅ Voice button clicked');
    
    // Wait for WebSocket connection
    await page.waitForTimeout(3000);
    
    // Check console logs for WebSocket connection
    const wsLogs = consoleLogs.filter(log => 
      log.includes('[xAI Voice]') || 
      log.includes('WebSocket')
    );
    
    if (wsLogs.length > 0) {
      console.log('✅ WebSocket logs found:');
      wsLogs.forEach(log => console.log('   ', log));
    } else {
      console.log('⚠️  No WebSocket logs found (may need NEXT_PUBLIC_BACKEND_URL set)');
    }
  } else {
    console.log('⚠️  Voice button not found');
  }
  
  // Try to send a test message
  const input = page.locator('input[type="text"], input[placeholder*="Ask"], input[placeholder*="ask"]');
  if (await input.count() > 0) {
    await input.fill('Hello, test message');
    console.log('✅ Test message entered');
    
    const sendButton = page.locator('button[type="submit"]').first();
    if (await sendButton.count() > 0) {
      await sendButton.click();
      console.log('✅ Message sent');
      await page.waitForTimeout(5000); // Wait for response
    }
  }
  
  console.log('\n📋 Test Summary:');
  console.log('   - Page loaded: ✅');
  console.log('   - Chat widget found: ✅');
  console.log('   - Chat opened: ✅');
  console.log('   - Voice button: ' + (await voiceButton.count() > 0 ? '✅' : '⚠️'));
  console.log('   - WebSocket logs: ' + (consoleLogs.some(l => l.includes('[xAI Voice]')) ? '✅' : '⚠️'));
  console.log('\n🔍 Check browser console for detailed [xAI Voice] logs');
});
