'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';

export default function DesignShowcase() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Design Experiments Showcase
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Explore different color palettes, fonts, and component variations.
            Use the theme switcher in the bottom right to test combinations.
          </p>
        </div>

        {/* Button Variants */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">Button Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Standard Variants</h3>
              <div className="space-y-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4">New Variants</h3>
              <div className="space-y-4">
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="gradient">Gradient Button</Button>
                <Button variant="primary" shape="pill">Pill Shape</Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Size Variations</h3>
              <div className="space-y-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Card Variants */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">Card Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card variant="default">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Default Card</h3>
              <p className="text-text-secondary">Standard card with border and secondary background.</p>
            </Card>

            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Elevated Card</h3>
              <p className="text-text-secondary">Card with shadow and no border for depth.</p>
            </Card>

            <Card variant="bordered">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Bordered Card</h3>
              <p className="text-text-secondary">Card with accent border and primary background.</p>
            </Card>

            <Card variant="glass">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Glass Card</h3>
              <p className="text-text-secondary">Semi-transparent card with backdrop blur.</p>
            </Card>
          </div>
        </section>

        {/* Padding Variations */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">Card Padding Variations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card variant="elevated" padding="sm">
              <h4 className="font-semibold text-text-primary">Small Padding</h4>
              <p className="text-sm text-text-secondary">Compact spacing for dense content.</p>
            </Card>

            <Card variant="elevated" padding="md">
              <h4 className="font-semibold text-text-primary">Medium Padding</h4>
              <p className="text-sm text-text-secondary">Balanced spacing for most use cases.</p>
            </Card>

            <Card variant="elevated" padding="lg">
              <h4 className="font-semibold text-text-primary">Large Padding</h4>
              <p className="text-sm text-text-secondary">Generous spacing for featured content.</p>
            </Card>

            <Card variant="elevated" padding="xl">
              <h4 className="font-semibold text-text-primary">Extra Large</h4>
              <p className="text-sm text-text-secondary">Maximum spacing for hero content.</p>
            </Card>
          </div>
        </section>

        {/* Typography Showcase */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">Typography Scale</h2>
          <Card>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-text-primary">Heading 1</h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-text-primary">Heading 2</h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-text-primary">Heading 3</h3>
              <p className="text-xl md:text-2xl text-text-secondary">
                Large paragraph text for introductions and hero content.
              </p>
              <p className="text-base text-text-primary">
                Regular paragraph text for body content and descriptions.
              </p>
              <p className="text-sm text-text-secondary">
                Small text for captions, metadata, and secondary information.
              </p>
            </div>
          </Card>
        </section>

        {/* Color Palette Display */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">Current Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-full h-20 rounded-lg bg-bg-primary border-2 border-bg-tertiary mb-2"></div>
              <p className="text-sm font-medium text-text-primary">Primary Background</p>
              <p className="text-xs text-text-secondary">var(--bg-primary)</p>
            </div>

            <div className="text-center">
              <div className="w-full h-20 rounded-lg bg-bg-secondary border-2 border-bg-tertiary mb-2"></div>
              <p className="text-sm font-medium text-text-primary">Secondary Background</p>
              <p className="text-xs text-text-secondary">var(--bg-secondary)</p>
            </div>

            <div className="text-center">
              <div className="w-full h-20 rounded-lg bg-accent-primary mb-2"></div>
              <p className="text-sm font-medium text-text-primary">Primary Accent</p>
              <p className="text-xs text-text-secondary">var(--accent-primary)</p>
            </div>

            <div className="text-center">
              <div className="w-full h-20 rounded-lg bg-accent-secondary mb-2"></div>
              <p className="text-sm font-medium text-text-primary">Secondary Accent</p>
              <p className="text-xs text-text-secondary">var(--accent-secondary)</p>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section>
          <Card variant="glass">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">How to Test</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Theme Switcher</h3>
                <p className="text-text-secondary">
                  Click the palette icon in the bottom right corner to open the theme switcher.
                  Experiment with different combinations of colors, fonts, and typography scales.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">Available Experiments</h3>
                <ul className="text-text-secondary space-y-1">
                  <li>• 5 Color Themes (Default, Vibrant, Mono Blue, Warm Earth, High Contrast, Purple Dream)</li>
                  <li>• 5 Font Families (Inter, System, Serif, Monospace, Geometric)</li>
                  <li>• 3 Typography Scales (Standard, Compact, Generous)</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}