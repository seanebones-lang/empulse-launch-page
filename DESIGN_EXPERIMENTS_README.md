# EmPulse Design Experiments - January 2026

## Overview

This development branch (`feature/ui-colors-fonts-testing`) contains comprehensive design experiments for testing alternative color palettes, fonts, and component variations. All changes are experimental and can be easily toggled or reverted.

## What's Included

### 🎨 Color Themes (6 Options)
- **Default**: Current EmPulse palette (teal/amber accents)
- **Vibrant Energy**: Coral (#ff6b35) and electric teal accents
- **Monochrome Blue**: Blue monochromatic theme
- **Warm Earth**: Earthy brown and green tones
- **High Contrast**: Maximum accessibility (yellow/cyan accents)
- **Purple Dream**: Purple and lavender palette

### 🔤 Font Families (5 Options)
- **Inter**: Current font (default)
- **System**: Native system fonts stack
- **Serif**: Times New Roman
- **Monospace**: SF Mono/Cascadia Code
- **Geometric**: Helvetica Neue

### 📏 Typography Scales (3 Options)
- **Standard**: Current scale
- **Compact**: Smaller text sizes (-0.125rem base)
- **Generous**: Larger text sizes (+0.125rem base)

### 🧩 Enhanced Components

#### Button Component
- **New Variants**: `ghost`, `gradient`
- **New Shapes**: `pill`, `square`
- **Improved Accessibility**: Focus rings, better contrast

#### Card Component
- **New Variants**: `elevated`, `bordered`, `glass`
- **Padding Options**: `sm`, `md`, `lg`, `xl`
- **Enhanced Animations**: Smoother transitions

## How to Use

### 1. Development Server
```bash
npm run dev
```

### 2. Theme Switcher
- Click the 🎨 palette icon in the bottom-right corner
- Select combinations of Color Theme, Font Family, and Typography Scale
- Changes apply instantly and persist in localStorage

### 3. Showcase Page
Visit `/design-showcase` to see all component variations and current color palette display.

### 4. Testing Combinations
The theme switcher allows 6 × 5 × 3 = 90 different combinations to test user preferences and accessibility.

## Accessibility Results

✅ **Excellent**: Text on background contrast (14.28:1 - 21.00:1)
✅ **Good**: Accent on background contrast (4.60:1 - 19.56:1)
⚠️ **Needs Attention**: White text on colored accents (1.07:1 - 4.23:1)

*Recommendation*: For colored accent buttons, consider using dark text on light accent colors or adjusting accent colors for better contrast.

## Files Added/Modified

### New Files
- `app/design-experiments.css` - Alternative design tokens
- `components/ThemeSwitcher.tsx` - Interactive theme switcher
- `app/design-showcase/page.tsx` - Component showcase
- `lib/accessibility-test.js` - Contrast ratio testing utility
- `DESIGN_EXPERIMENTS_README.md` - This documentation

### Modified Files
- `app/layout.tsx` - Added design experiments CSS and theme switcher
- `components/Button.tsx` - Enhanced with new variants and shapes
- `components/Card.tsx` - Enhanced with new variants and padding options

## Next Steps

1. **User Testing**: Gather feedback on preferred color/font combinations
2. **A/B Testing**: Implement analytics to measure engagement
3. **Accessibility Fixes**: Adjust accent colors for better contrast
4. **Performance Testing**: Ensure CSS variables don't impact rendering
5. **Production Integration**: Merge successful experiments into main branch

## Reverting Changes

To revert all experimental changes:
```bash
git checkout main
git branch -D feature/ui-colors-fonts-testing
```

## Technical Implementation

- **CSS Variables**: Data attributes (`data-theme`, `data-font`, `data-typography`) control design switching
- **localStorage**: User preferences persist across sessions
- **Atomic Design**: Components remain modular and composable
- **Performance**: CSS variables ensure instant theme switching without re-renders

---

*Created as part of EmPulse UI/UX experimentation phase - January 2026*