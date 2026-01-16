'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FeatureBlock from '@/components/FeatureBlock';
import SectionHeadline from '@/components/SectionHeadline';
import EmailCapture from '@/components/EmailCapture';
import ExitIntentModal from '@/components/ExitIntentModal';
import SocialProof from '@/components/SocialProof';
import Testimonials from '@/components/Testimonials';
import StickyCTA from '@/components/StickyCTA';
import StructuredData from '@/components/StructuredData';
import MidPageCTA from '@/components/MidPageCTA';
import TrustBadges from '@/components/TrustBadges';
import UrgencyBadge from '@/components/UrgencyBadge';

export default function Home() {
  const organizationData = {
    name: 'EmPulse Music',
    url: 'https://empulse.music',
    logo: 'https://empulse.music/empulse-logo.png',
    description: 'Mood-based music streaming platform that pays artists 4-6x industry average with integrated wellness features.',
    foundingDate: '2025',
    founder: {
      '@type': 'Person',
      name: 'Michelle Dudley',
    },
    sameAs: [
      // Add social media links when available
    ],
  };

  const softwareApplicationData = {
    name: 'EmPulse',
    applicationCategory: 'MusicStreaming',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
    },
  };

  return (
    <>
      <StructuredData type="Organization" data={organizationData} />
      <StructuredData type="SoftwareApplication" data={softwareApplicationData} />
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/empulse-logo.png" 
              alt="EmPulse Logo" 
              width={160}
              height={160}
              priority
              className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40"
            />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {["Music", "That", "Knows", "How", "You", "Feel"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-3 md:mr-4"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.12,
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -5,
                  transition: { duration: 0.3, type: "spring" }
                }}
              >
                <motion.span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1e40af 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: [
                      '0% 50%',
                      '100% 50%',
                      '0% 50%',
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1 + index * 0.15,
                  }}
                >
                  {word}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover by mood, not algorithm. Support artists with real pay. Wellness built in, not bolted on.
          </motion.p>

          <SocialProof artistCount={1247} listenerCount={3891} showGrowth={true} />

          <div className="mb-6 md:mb-8">
            <UrgencyBadge
              text="Early Access: First 500 artists get lifetime 10% bonus"
              variant="progress"
              progressValue={247}
              progressMax={500}
            />
          </div>

          <div className="mb-8 md:mb-12">
            <TrustBadges />
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              href="https://blue7.dev"
            >
              Try the Live Beta
            </Button>
            <Button variant="outline" size="lg" href="#problem">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 md:py-32 px-6 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 via-transparent to-accent-tertiary/5 animate-pulse"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeadline centered>Streaming Is Broken</SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <FeatureBlock
              headline="For Listeners"
              body="Algorithms don't understand you. They track what you click, not how you feel. Discovery has become a popularity contest."
              delay={0}
            />
            <FeatureBlock
              headline="For Artists"
              body="Fractions of a penny per stream. Opaque dashboards. No control over your own music. The system extracts, it doesn't support."
              delay={0.1}
            />
            <FeatureBlock
              headline="For Everyone"
              body="Mental health is an afterthought. Wellness apps and music apps exist in separate worlds. Why?"
              delay={0.2}
            />
          </div>

          <motion.div
            className="flex flex-col items-center gap-4 mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/empulse-logo.png" 
              alt="EmPulse Logo" 
              className="h-16 w-16 glow-orange"
              width={64}
              height={64}
              style={{ mixBlendMode: 'normal', border: 'none', outline: 'none', background: 'transparent' }}
            />
            <p className="text-2xl md:text-3xl text-gradient-orange font-semibold text-center">
              EmPulse is built different.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeadline centered>Join the Movement</SectionHeadline>
          <p className="text-xl text-text-secondary mb-12 text-center max-w-3xl mx-auto">
            See what artists and listeners are saying about EmPulse
          </p>
          <Testimonials maxItems={4} />
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 via-transparent to-accent-secondary/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeadline centered>
            Discover by Feeling. Support Artists. Feel Better.
          </SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <Card>
              <div className="text-4xl mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                  <rect x="2" y="6" width="4" height="12" rx="1"/>
                  <rect x="10" y="3" width="4" height="15" rx="1"/>
                  <rect x="18" y="8" width="4" height="10" rx="1"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Two sliders. Infinite discovery.
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Set your mood. Set your energy. Find music that matches exactly where you are—or shifts you where you want to go. No names needed. Just feelings.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                  <line x1="12" y1="2" x2="12" y2="22"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                $0.004 to $0.006 per stream.
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Free streams pay $0.004. Premium streams pay $0.006. No small print. No earnings curve. Real money for real artists, visible in real time.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-primary">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Mental health built in.
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Daily mood tracking. Journaling. Affirmations. Streaks that reward consistency. Music and wellness in one place, reinforcing each other.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA */}
      <MidPageCTA
        headline="Ready to Experience Music Differently?"
        description="Join thousands of listeners and artists building the future of music streaming."
        primaryButton={{
          text: 'Try the Live Beta',
          href: 'https://blue7.dev',
        }}
        secondaryButton={{
          text: 'Join Waitlist',
          href: '#waitlist',
        }}
      />

      {/* Audience Pathways */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-accent-tertiary/5 via-transparent to-accent-primary/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeadline centered>Who Are You?</SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-2xl font-semibold mb-3">
                Fund the Wellness Music Revolution
              </h3>
              <p className="text-text-secondary mb-6">
                A platform at the intersection of streaming, wellness, and creator economy. Real traction. Real differentiation. Real opportunity.
              </p>
              <Button variant="secondary" href="/investors" className="w-full">
                Learn More
              </Button>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-3">
                Earn 4-6x More Per Stream
              </h3>
              <p className="text-text-secondary mb-6">
                Transparent payouts. Real-time dashboard. One-click control. Your music, your rules, your money.
              </p>
              <Button variant="secondary" href="/artists" className="w-full">
                Learn More
              </Button>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-3">
                Join the Movement
              </h3>
              <p className="text-text-secondary mb-6">
                Discover music by feeling. Support artists directly. Be part of something that actually cares about your wellbeing.
              </p>
              <Button variant="secondary" href="/listeners" className="w-full">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>Already in Motion</SectionHeadline>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent-primary mb-2">
                MVP Live
              </div>
              <p className="text-text-secondary">
                <a
                  href="https://blue7.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-primary transition-colors"
                >
                  Try it now →
                </a>
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent-primary mb-2">
                100%
              </div>
              <p className="text-text-secondary">Complete</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent-primary mb-2">
                Q1 2026
              </div>
              <p className="text-text-secondary">Launch</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-accent-primary mb-2">
                Active
              </div>
              <p className="text-text-secondary">Partnering</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <SectionHeadline centered>Where We&apos;re Headed</SectionHeadline>

          <div className="space-y-8">
            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className="border-2 border-accent-primary text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap glow-outline-orange">
                  NOW
                </div>
                <div>
                  <p className="text-text-secondary text-lg">
                    Mood-based streaming. Artist uploads. Wellness tracking. Beta live.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className="border-2 border-accent-primary/70 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap glow-outline-orange">
                  Q2 2026
                </div>
                <div>
                  <p className="text-text-secondary text-lg">
                    Venue partnerships for live streaming. Expanded artist tools.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className="border-2 border-accent-primary/50 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap glow-outline-orange">
                  Q3 2026
                </div>
                <div>
                  <p className="text-text-secondary text-lg">
                    Artist self-streaming from profile pages. Podcast platform.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className="border-2 border-accent-primary/30 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap glow-outline-orange">
                  Q4 2026
                </div>
                <div>
                  <p className="text-text-secondary text-lg">
                    Mobile apps. Dedicated artist stations. Expanded wellness integrations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeadline centered>Updates</SectionHeadline>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-accent-primary glow-outline-orange">
              <div className="flex items-start gap-4 mb-4">
                <div className="border-2 border-accent-primary text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap glow-outline-orange shrink-0">
                  NEW
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Launch a Fully Branded, Custom-Trained Voice AI Chatbot in 48 Hours
                  </h3>
                  <p className="text-lg text-text-secondary mb-4">
                    <strong className="text-accent-primary">$200 One-Time Setup</strong> (First Month Free)
                  </p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-text-secondary mb-6">
                <p className="mb-4">
                  In 2026, robotic TTS is dead. Customers expect conversations that sound genuinely human—emotional intonation, natural pauses, accents, and context-aware responses. Ultra-realistic text-to-voice tech is now mature, powered by neural models from leaders like ElevenLabs, PlayHT, Respeecher, and emerging open-source challengers.
                </p>

                <p className="mb-4">
                  Most platforms lock you into their ecosystem: high per-minute costs, limited white-labeling, or complex integrations. Agencies and businesses want plug-and-play: a branded chatbot widget they own, trained on their data (FAQs, docs, knowledge base), embeddable via simple snippet code, and sounding indistinguishably human.
                </p>

                <div className="bg-bg-secondary border border-accent-primary/20 rounded-lg p-6 mb-4">
                  <h4 className="text-xl font-semibold mb-3 text-text-primary">What You Get for $200 One-Time Setup</h4>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Fully white-labeled voice chatbot:</strong> No "Powered by" watermarks—custom logo, colors, fonts, and UI to match your site/app.</li>
                    <li><strong>Custom training on your data:</strong> Upload PDFs, text files, FAQs, or links. Fine-tuned for hyper-relevant, accurate responses.</li>
                    <li><strong>Embeddable snippet:</strong> One &lt;script&gt; tag + container div. Drop it into WordPress, custom sites, or apps—no heavy SDKs.</li>
                    <li><strong>Realistic, non-robotic voices:</strong> Leverages state-of-the-art TTS (neural, expressive, low-latency) for natural flow—think emotional nuance, not Siri-style flatness.</li>
                    <li><strong>48-hour turnaround:</strong> Once I receive your training docs/assets, delivery in 2 business days.</li>
                    <li><strong>First month hosting included:</strong> Uptime, API access, monitoring, and usage coverage at no extra cost.</li>
                  </ul>
                </div>

                <p className="mb-4">
                  <strong>Ongoing?</strong> Optional $100/month via Stripe (cancel anytime) for continued hosting, security updates, performance tweaks, best-effort support, and retraining as needed. No lock-in—far below enterprise platforms charging $1k+/mo.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    href="https://deploysnip.mothership-ai.com"
                    className="flex-1"
                  >
                    Learn More & Get Started
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    href="mailto:eleven@mothership-ai.com"
                    className="flex-1"
                  >
                    Email: eleven@mothership-ai.com
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <TrustBadges />
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/empulse-logo.png" 
              alt="EmPulse Logo" 
              className="h-12 w-12"
              width={48}
              height={48}
              style={{ mixBlendMode: 'normal', border: 'none', outline: 'none', background: 'transparent' }}
            />
          </motion.div>
          <SectionHeadline centered>Stay in the Loop</SectionHeadline>
          <p className="text-xl text-text-secondary mb-8">
            Get updates on launch, features, and early access opportunities.
          </p>

          <EmailCapture source="home-page" />

          <p className="text-sm text-text-secondary mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeadline centered>Get in Touch</SectionHeadline>

          <div className="space-y-4 text-lg text-text-secondary">
            <p>
              <a
                href="mailto:empulse@mothership-ai.com"
                className="text-accent-primary hover:text-accent-hover transition-colors"
              >
                empulse@mothership-ai.com
              </a>
            </p>
            <p>Chicago, Illinois</p>
          </div>

          <div className="mt-8 text-text-secondary">
            <p>For investor inquiries:</p>
            <a
              href="mailto:investors@empulse.music"
              className="text-accent-primary hover:text-accent-hover transition-colors text-lg"
            >
              investors@empulse.music
            </a>
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      <ExitIntentModal page="home" />

      {/* Sticky CTA (Mobile) */}
      <StickyCTA variant="email" page="home" />
    </>
    </>
  );
}
