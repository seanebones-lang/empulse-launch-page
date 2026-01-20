'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FeatureBlock from '@/components/FeatureBlock';
import SectionHeadline from '@/components/SectionHeadline';
import EmailCapture from '@/components/EmailCapture';
import ExitIntentModal from '@/components/ExitIntentModal';
import StickyCTA from '@/components/StickyCTA';
import StructuredData from '@/components/StructuredData';

export default function Investors() {
  const organizationData = {
    name: 'EmPulse Music',
    url: 'https://empulse.music',
    logo: 'https://empulse.music/empulse-logo.png',
    description: 'Music streaming platform at the intersection of streaming and wellness markets.',
  };

  return (
    <>
      <StructuredData type="Organization" data={organizationData} />
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
              width={144}
              height={144}
              priority
              className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36"
            />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Intersection of Streaming, Wellness, and Creator Economy
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Two massive markets. One underserved audience. A platform built to capture both.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="primary" size="lg" href="/investors/invest">
              Invest Now
            </Button>
            <Button variant="secondary" size="lg" href="https://docs.google.com/presentation/d/1vlmuB3UMTtDOqlUgjuFP_XaNthbXw9pM/edit?usp=drive_link&ouid=116475369707600561774&rtpof=true&sd=true">
              Get the Pitch Deck
            </Button>
            <Button variant="outline" size="lg" href="#opportunity">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section id="opportunity" className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>The Opportunity</SectionHeadline>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card>
              <h3 className="text-3xl font-semibold mb-4">Streaming Market</h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                $30B+ global streaming market dominated by platforms artists hate and listeners tolerate.
              </p>
            </Card>

            <Card>
              <h3 className="text-3xl font-semibold mb-4">Wellness Audio Market</h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                $10B+ wellness audio market growing 30% annually, completely disconnected from music streaming.
              </p>
            </Card>
          </div>

          <motion.p
            className="text-2xl md:text-3xl text-accent-primary font-semibold text-center max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            No one is serving the mental health-conscious listener or the independent artist well. That&apos;s the gap.
          </motion.p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>What&apos;s Broken</SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <FeatureBlock
              headline="Artists"
              body="$0.001 average per stream. Opaque royalty calculations. No control over their own catalog. Algorithmic invisibility for anyone without a label."
              delay={0}
            />
            <FeatureBlock
              headline="Listeners"
              body="Discovery driven by popularity, not preference. Algorithms optimize for engagement, not wellbeing. Mental health and music exist in separate apps."
              delay={0.1}
            />
            <FeatureBlock
              headline="The Industry"
              body="Extractive economics. Platform-first thinking. Zero-sum competition where artists and listeners both lose."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>EmPulse Changes the Model</SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                Mood-Based Discovery
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Dual sliders for mood and energy replace algorithmic recommendations. Listeners find music by feeling, not by name. Unknown artists compete on equal footing with established acts.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                Artist-First Economics
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                $0.004 per free stream. $0.006 per premium stream. 4-6x industry average. Real-time dashboards. One-click unpublish. Artists control their catalog and see their earnings instantly.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                Integrated Wellness
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Mood tracking, journaling, affirmations, and streaks built into the listening experience. Daily engagement driven by wellness habits, not just content consumption.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>Current Status</SectionHeadline>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <h3 className="text-xl font-semibold text-accent-primary mb-3">
                Technical Progress
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• MVP 100% complete, live beta at blue7.dev</li>
                <li>• Core features functional: mood discovery, artist uploads, wellness tracking</li>
                <li>• Stripe integration complete</li>
                <li>• Modern, scalable tech stack: Next.js, Prisma, Supabase</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-accent-primary mb-3">
                Market Development
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Actively building artist pipeline</li>
                <li>• Venue partnership conversations underway</li>
                <li>• Development partnership with NextEleven Studios</li>
                <li>• Deferred compensation model minimizes burn</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <SectionHeadline centered>Path to Scale</SectionHeadline>

          <div className="space-y-6">
            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  Q1 2026
                </div>
                <p className="text-text-secondary text-lg">
                  Public beta launch. Artist and listener acquisition. Seed fundraising.
                </p>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary/70 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  Q2 2026
                </div>
                <p className="text-text-secondary text-lg">
                  Venue partnerships for live streaming. Expanded artist tools. Growth marketing.
                </p>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary/50 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  Q3 2026
                </div>
                <p className="text-text-secondary text-lg">
                  Artist self-streaming from profiles. Podcast platform integration.
                </p>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary/30 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  Q4 2026
                </div>
                <p className="text-text-secondary text-lg">
                  Mobile apps (iOS/Android). Dedicated artist stations. Series A preparation.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeadline centered>Leadership</SectionHeadline>

          <div className="max-w-2xl mx-auto">
            <Card>
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                Michelle Dudley
              </h3>
              <p className="text-accent-primary font-semibold mb-4">CEO / Founder</p>
              <p className="text-text-secondary text-lg">
                Leading fundraising, operations, and strategic partnerships.
              </p>
            </Card>

            <div className="mt-8 text-center text-text-secondary">
              <p className="font-semibold text-text-primary mb-2">NextEleven Studios LLC</p>
              <p>Chicago, Illinois • Filed December 2025</p>
              <p className="mt-2">EmPulse is our flagship product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeadline centered>Join Us</SectionHeadline>

          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            We&apos;re raising seed funding to complete development, launch publicly, and scale artist and listener acquisition. This is the ground floor of a platform positioned to capture the intersection of two massive markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" href="/investors/invest">
              Invest Now
            </Button>
            <Button variant="secondary" size="lg" href="https://docs.google.com/presentation/d/1vlmuB3UMTtDOqlUgjuFP_XaNthbXw9pM/edit?usp=drive_link&ouid=116475369707600561774&rtpof=true&sd=true">
              Get the Pitch Deck
            </Button>
            <Button variant="outline" size="lg" href="mailto:michellellvnw@gmail.com?subject=Schedule a Call - EmPulse Investor Inquiry">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeadline centered>Get in Touch</SectionHeadline>

          <div className="max-w-xl mx-auto">
            <EmailCapture
              buttonText="Request Deck"
              placeholder="your@email.com"
              source="investors-page"
            />

            <div className="mt-12 space-y-4 text-center text-text-secondary">
              <p>
                <span className="text-text-primary font-semibold">Investor inquiries:</span>
                <br />
                <a
                  href="mailto:michellellvnw@gmail.com"
                  className="text-accent-primary hover:text-accent-hover transition-colors text-lg"
                >
                  michellellvnw@gmail.com
                </a>
              </p>
              <p className="text-sm">Dallas, Texas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      <ExitIntentModal page="investors" />

      {/* Sticky CTA (Mobile) */}
      <StickyCTA variant="button" buttonText="Request Deck" buttonHref="https://docs.google.com/presentation/d/1vlmuB3UMTtDOqlUgjuFP_XaNthbXw9pM/edit?usp=drive_link&ouid=116475369707600561774&rtpof=true&sd=true" page="investors" />
    </>
    </>
  );
}
