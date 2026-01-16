/**
 * Accessibility Test Utility for EmPulse Design Experiments
 * Tests color contrast ratios for WCAG compliance
 */

// WCAG contrast ratio thresholds
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;
const WCAG_AAA_NORMAL = 7.0;
const WCAG_AAA_LARGE = 4.5;

/**
 * Calculate relative luminance of a color
 * @param {string} hex - Hex color code
 * @returns {number} Relative luminance (0-1)
 */
function getRelativeLuminance(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Apply gamma correction
  const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);

  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color (hex)
 * @param {string} color2 - Second color (hex)
 * @returns {number} Contrast ratio
 */
function getContrastRatio(color1, color2) {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Test color combinations for accessibility compliance
 */
function testColorAccessibility() {
  console.log('🔍 EmPulse Design System - Accessibility Test Results\n');

  const themes = {
    default: {
      bg: '#0a0a0b',
      text: '#f5f5f7',
      accent: '#0d9488',
      name: 'Default (Teal)'
    },
    vibrant: {
      bg: '#0f0f0f',
      text: '#ffffff',
      accent: '#ff6b35',
      name: 'Vibrant Energy'
    },
    'monochrome-blue': {
      bg: '#0a192f',
      text: '#e2e8f0',
      accent: '#3b82f6',
      name: 'Monochrome Blue'
    },
    'warm-earth': {
      bg: '#1a1a0e',
      text: '#f5f5dc',
      accent: '#d97706',
      name: 'Warm Earth'
    },
    'high-contrast': {
      bg: '#000000',
      text: '#ffffff',
      accent: '#ffff00',
      name: 'High Contrast'
    },
    'purple-dream': {
      bg: '#0f0a1a',
      text: '#f3f4f6',
      accent: '#8b5cf6',
      name: 'Purple Dream'
    }
  };

  let allPass = true;

  Object.entries(themes).forEach(([themeKey, theme]) => {
    console.log(`🎨 ${theme.name} (${themeKey})`);
    console.log('─'.repeat(50));

    // Test primary text on background
    const textBgRatio = getContrastRatio(theme.text, theme.bg);
    const textBgPass = textBgRatio >= WCAG_AA_NORMAL;

    console.log(`📝 Text on Background: ${textBgRatio.toFixed(2)}:1 ${textBgPass ? '✅ PASS' : '❌ FAIL'} (AA: ${WCAG_AA_NORMAL}:1)`);

    // Test accent on background
    const accentBgRatio = getContrastRatio(theme.accent, theme.bg);
    const accentBgPass = accentBgRatio >= WCAG_AA_NORMAL;

    console.log(`🎯 Accent on Background: ${accentBgRatio.toFixed(2)}:1 ${accentBgPass ? '✅ PASS' : '❌ FAIL'} (AA: ${WCAG_AA_NORMAL}:1)`);

    // Test accent text readability (assuming white text on accent)
    const whiteOnAccentRatio = getContrastRatio('#ffffff', theme.accent);
    const whiteOnAccentPass = whiteOnAccentRatio >= WCAG_AA_NORMAL;

    console.log(`⚪ White on Accent: ${whiteOnAccentRatio.toFixed(2)}:1 ${whiteOnAccentPass ? '✅ PASS' : '❌ FAIL'} (AA: ${WCAG_AA_NORMAL}:1)`);

    if (!textBgPass || !accentBgPass || !whiteOnAccentPass) {
      allPass = false;
    }

    console.log('');
  });

  console.log('📊 Summary:');
  console.log(allPass
    ? '✅ All themes pass WCAG AA accessibility standards!'
    : '⚠️  Some themes may need contrast adjustments for accessibility.'
  );

  return allPass;
}

// Run test if executed directly
if (require.main === module) {
  testColorAccessibility();
}

// Export for use in browser console or other modules
if (typeof window !== 'undefined') {
  window.testEmPulseAccessibility = testColorAccessibility;
}

module.exports = { testColorAccessibility, getContrastRatio, getRelativeLuminance };