'use client';

import { useState, useEffect } from 'react';

type Theme = 'default' | 'vibrant' | 'monochrome-blue' | 'warm-earth' | 'high-contrast' | 'purple-dream';
type Font = 'default' | 'system' | 'serif' | 'mono' | 'geometric';
type Typography = 'default' | 'compact' | 'generous';

interface ThemeOption {
  value: Theme;
  label: string;
  description: string;
}

interface FontOption {
  value: Font;
  label: string;
  description: string;
}

interface TypographyOption {
  value: Typography;
  label: string;
  description: string;
}

const themeOptions: ThemeOption[] = [
  { value: 'default', label: 'Default', description: 'Current EmPulse palette' },
  { value: 'vibrant', label: 'Vibrant Energy', description: 'Coral & electric teal accents' },
  { value: 'monochrome-blue', label: 'Mono Blue', description: 'Blue monochromatic theme' },
  { value: 'warm-earth', label: 'Warm Earth', description: 'Earthy brown & green tones' },
  { value: 'high-contrast', label: 'High Contrast', description: 'Maximum accessibility' },
  { value: 'purple-dream', label: 'Purple Dream', description: 'Purple & lavender palette' },
];

const fontOptions: FontOption[] = [
  { value: 'default', label: 'Inter', description: 'Current Inter font' },
  { value: 'system', label: 'System', description: 'Native system fonts' },
  { value: 'serif', label: 'Serif', description: 'Times New Roman' },
  { value: 'mono', label: 'Monospace', description: 'SF Mono' },
  { value: 'geometric', label: 'Geometric', description: 'Helvetica Neue' },
];

const typographyOptions: TypographyOption[] = [
  { value: 'default', label: 'Standard', description: 'Current scale' },
  { value: 'compact', label: 'Compact', description: 'Smaller text sizes' },
  { value: 'generous', label: 'Generous', description: 'Larger text sizes' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  const [currentFont, setCurrentFont] = useState<Font>('default');
  const [currentTypography, setCurrentTypography] = useState<Typography>('default');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('empulse-theme') as Theme || 'default';
    const savedFont = localStorage.getItem('empulse-font') as Font || 'default';
    const savedTypography = localStorage.getItem('empulse-typography') as Typography || 'default';

    setCurrentTheme(savedTheme);
    setCurrentFont(savedFont);
    setCurrentTypography(savedTypography);

    applyTheme(savedTheme, savedFont, savedTypography);
  }, []);

  const applyTheme = (theme: Theme, font: Font, typography: Typography) => {
    const html = document.documentElement;

    // Remove all existing theme/font/typography attributes
    themeOptions.forEach(t => html.removeAttribute(`data-theme`));
    fontOptions.forEach(f => html.removeAttribute(`data-font`));
    typographyOptions.forEach(ty => html.removeAttribute(`data-typography`));

    // Apply new attributes
    if (theme !== 'default') html.setAttribute('data-theme', theme);
    if (font !== 'default') html.setAttribute('data-font', font);
    if (typography !== 'default') html.setAttribute('data-typography', typography);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('empulse-theme', theme);
    applyTheme(theme, currentFont, currentTypography);
  };

  const handleFontChange = (font: Font) => {
    setCurrentFont(font);
    localStorage.setItem('empulse-font', font);
    applyTheme(currentTheme, font, currentTypography);
  };

  const handleTypographyChange = (typography: Typography) => {
    setCurrentTypography(typography);
    localStorage.setItem('empulse-typography', typography);
    applyTheme(currentTheme, currentFont, typography);
  };

  const resetToDefault = () => {
    setCurrentTheme('default');
    setCurrentFont('default');
    setCurrentTypography('default');
    localStorage.removeItem('empulse-theme');
    localStorage.removeItem('empulse-font');
    localStorage.removeItem('empulse-typography');
    applyTheme('default', 'default', 'default');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent-primary hover:bg-accent-hover text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        aria-label="Open theme switcher"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-bg-secondary border border-bg-tertiary rounded-lg p-4 shadow-xl min-w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Design Experiments</h3>
            <button
              onClick={resetToDefault}
              className="text-sm text-accent-primary hover:text-accent-hover underline"
            >
              Reset
            </button>
          </div>

          {/* Theme Selection */}
          <div className="mb-4">
            <label htmlFor="theme-select" className="block text-sm font-medium text-text-secondary mb-2">
              Color Theme
            </label>
            <select
              id="theme-select"
              value={currentTheme}
              onChange={(e) => handleThemeChange(e.target.value as Theme)}
              className="w-full bg-bg-tertiary border border-bg-tertiary rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          {/* Font Selection */}
          <div className="mb-4">
            <label htmlFor="font-select" className="block text-sm font-medium text-text-secondary mb-2">
              Font Family
            </label>
            <select
              id="font-select"
              value={currentFont}
              onChange={(e) => handleFontChange(e.target.value as Font)}
              className="w-full bg-bg-tertiary border border-bg-tertiary rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          {/* Typography Selection */}
          <div className="mb-4">
            <label htmlFor="typography-select" className="block text-sm font-medium text-text-secondary mb-2">
              Typography Scale
            </label>
            <select
              id="typography-select"
              value={currentTypography}
              onChange={(e) => handleTypographyChange(e.target.value as Typography)}
              className="w-full bg-bg-tertiary border border-bg-tertiary rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              {typographyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-text-secondary">
            Current: {currentTheme} / {currentFont} / {currentTypography}
          </div>
        </div>
      )}
    </div>
  );
}