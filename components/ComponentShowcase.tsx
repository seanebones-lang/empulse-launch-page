'use client';

import { useState } from 'react';
import Card from './Card';
import Button from './Button';
import SocialProof from './SocialProof';
import Testimonials from './Testimonials';
import UrgencyBadge from './UrgencyBadge';
import TrustBadges from './TrustBadges';
import StickyCTA from './StickyCTA';
import MidPageCTA from './MidPageCTA';
import CountdownTimer from './CountdownTimer';
import LoadingSpinner from './LoadingSpinner';
import ReferralLink from './ReferralLink';
import EmailCapture from './EmailCapture';

/**
 * Component Showcase
 * Visual reference for all components
 * Only visible in development mode
 */
export default function ComponentShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-50 bg-accent-tertiary text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-accent-tertiary/90 transition-colors"
      >
        {isOpen ? 'Hide' : 'Show'} Components
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            <div className="bg-bg-secondary rounded-lg p-8 space-y-12">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Component Showcase</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  ✕ Close
                </button>
              </div>

              {/* Buttons */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="lg">Primary</Button>
                  <Button variant="secondary" size="lg">Secondary</Button>
                  <Button variant="outline" size="lg">Outline</Button>
                  <Button variant="ghost" size="lg">Ghost</Button>
                </div>
              </section>

              {/* Social Proof */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Social Proof</h2>
                <SocialProof artistCount={1247} listenerCount={3891} showGrowth={true} />
              </section>

              {/* Testimonials */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
                <Testimonials maxItems={2} />
              </section>

              {/* Urgency Badge */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Urgency Badge</h2>
                <UrgencyBadge
                  text="Early Access: First 500 artists get lifetime 10% bonus"
                  variant="progress"
                  progressValue={247}
                  progressMax={500}
                />
              </section>

              {/* Trust Badges */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Trust Badges</h2>
                <TrustBadges />
              </section>

              {/* Countdown Timer */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Countdown Timer</h2>
                <CountdownTimer
                  targetDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}
                  showDays={true}
                  showHours={true}
                  showMinutes={true}
                  showSeconds={true}
                />
              </section>

              {/* Email Capture */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Email Capture</h2>
                <EmailCapture
                  buttonText="Sign Up"
                  placeholder="your@email.com"
                  source="showcase"
                />
              </section>

              {/* Referral Link */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Referral Link</h2>
                <ReferralLink
                  userId="demo123"
                  userType="listener"
                  showStats={true}
                />
              </section>

              {/* Loading Spinner */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Loading Spinner</h2>
                <div className="flex gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
              </section>

              {/* Mid-Page CTA */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Mid-Page CTA</h2>
                <MidPageCTA
                  headline="Ready to Experience Music Differently?"
                  description="Join thousands of listeners and artists."
                  primaryButton={{ text: 'Try Beta', href: 'https://blue7.dev' }}
                  secondaryButton={{ text: 'Learn More', href: '#features' }}
                />
              </section>

              {/* Cards */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Cards</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <h3 className="text-xl font-semibold mb-2">Card Title</h3>
                    <p className="text-text-secondary">
                      This is a card component with hover effects.
                    </p>
                  </Card>
                  <Card>
                    <h3 className="text-xl font-semibold mb-2">Another Card</h3>
                    <p className="text-text-secondary">
                      Cards are used throughout the site for content sections.
                    </p>
                  </Card>
                  <Card hover={false}>
                    <h3 className="text-xl font-semibold mb-2">No Hover</h3>
                    <p className="text-text-secondary">
                      This card has hover disabled.
                    </p>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
