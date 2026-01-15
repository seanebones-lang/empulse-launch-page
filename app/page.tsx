'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FeatureBlock from '@/components/FeatureBlock';
import SectionHeadline from '@/components/SectionHeadline';
import EmailCapture from '@/components/EmailCapture';
import ExitIntentModal from '@/components/ExitIntentModal';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Music That Knows How You Feel
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover by mood, not algorithm. Support artists with real pay. Wellness built in, not bolted on.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
      <section id="problem" className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
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

          <motion.p
            className="text-2xl md:text-3xl text-accent-primary font-semibold text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            EmPulse is built different.
          </motion.p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>
            Discover by Feeling. Support Artists. Feel Better.
          </SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <Card>
              <div className="text-4xl mb-4">🎚️</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                Two sliders. Infinite discovery.
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Set your mood. Set your energy. Find music that matches exactly where you are—or shifts you where you want to go. No names needed. Just feelings.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                $0.004 to $0.006 per stream.
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Free streams pay $0.004. Premium streams pay $0.006. No small print. No earnings curve. Real money for real artists, visible in real time.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                Mental health built in.
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Daily mood tracking. Journaling. Affirmations. Streaks that reward consistency. Music and wellness in one place, reinforcing each other.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Audience Pathways */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>Who Are You?</SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
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
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
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
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
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
                35%
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
                <div className="bg-accent-primary text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
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
                <div className="bg-accent-primary/70 text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
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
                <div className="bg-accent-primary/50 text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
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
                <div className="bg-accent-primary/30 text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap">
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

      {/* Email Capture Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
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
    </>
  );
}
