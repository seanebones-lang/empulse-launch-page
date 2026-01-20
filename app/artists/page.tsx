'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FeatureBlock from '@/components/FeatureBlock';
import SectionHeadline from '@/components/SectionHeadline';
import ExitIntentModal from '@/components/ExitIntentModal';
import StickyCTA from '@/components/StickyCTA';
import StructuredData from '@/components/StructuredData';

const artistSignupSchema = z.object({
  artistName: z.string().min(1, 'Artist/Band name is required'),
  yourName: z.string().min(1, 'Your name is required'),
  email: z.string().email('Please enter a valid email address'),
  musicLink: z.string().optional(),
  betaAccess: z.boolean().optional(),
});

type ArtistSignupData = z.infer<typeof artistSignupSchema>;

export default function Artists() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArtistSignupData>({
    resolver: zodResolver(artistSignupSchema),
  });

  const onSubmit = async (data: ArtistSignupData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/artist-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
  };

  return (
    <>
      <StructuredData type="SoftwareApplication" data={softwareApplicationData} />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="mx-auto mb-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image 
              src="/empulse-logo.png" 
              alt="EmPulse Logo" 
              width={200}
              height={200}
              priority
              className="h-20 w-auto md:h-28 md:w-auto lg:h-36 lg:w-auto"
              style={{ objectFit: 'contain', minWidth: '120px' }}
            />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Earn 4-6x More Per Stream. See Every Cent in Real Time.
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            No small print. No earnings curve. It is what we say it is.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="primary" size="lg" href="#signup">
              Join as an Artist
            </Button>
            <Button variant="outline" size="lg" href="https://blue7.dev">
              Try the Live Beta
            </Button>
          </motion.div>
        </div>
      </section>

      {/* The Payout */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>Real Numbers. Real Money.</SectionHeadline>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card>
              <h3 className="text-2xl font-semibold text-accent-primary mb-4">EmPulse</h3>
              <ul className="space-y-3 text-text-secondary text-lg">
                <li>• Free tier streams: <span className="text-accent-primary font-semibold">$0.004</span></li>
                <li>• Premium streams: <span className="text-accent-primary font-semibold">$0.006</span></li>
                <li>• Paid monthly, $20 minimum cashout</li>
                <li>• ACH, debit, or app transfer</li>
                <li>• You pay only actual processing fees</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold text-text-secondary mb-4">Industry Comparison</h3>
              <ul className="space-y-3 text-text-secondary text-lg">
                <li>• Spotify: ~$0.003 average</li>
                <li>• Apple Music: ~$0.008 (but label-gated)</li>
                <li>• Tidal: ~$0.012 (tiny market)</li>
                <li>• Bandcamp: No streaming, sales only</li>
              </ul>
            </Card>
          </div>

          <motion.p
            className="text-2xl md:text-3xl text-accent-primary font-semibold text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We pay 4-6x industry average. Calculated monthly. Visible instantly. No mystery math.
          </motion.p>
        </div>
      </section>

      {/* Real-Time Dashboard */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>Your Earnings. Visible Now.</SectionHeadline>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Log into your dashboard and see exactly what you&apos;ve earned—every stream, every cent, updated in real time. No waiting 60-90 days for a statement you can&apos;t verify. No black box calculations. Your data, your money, transparent.
          </p>
        </div>
      </section>

      {/* Total Control */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>Your Music. Your Rules.</SectionHeadline>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                One-Click Unpublish
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Want a track down? Done. No support tickets. No waiting periods. No platform approval. It&apos;s your music—you decide what&apos;s live.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                Metadata You Control
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                You upload high-quality audio—WAV, MP3, MP4—to our lossless delivery system. You add your artwork and title. You set the mood and energy sliders. You decide how your music gets discovered.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Discovery */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>Discovery That Works for You</SectionHeadline>
          <p className="text-xl text-text-secondary mb-6 max-w-3xl mx-auto">
            On EmPulse, listeners discover music by mood and energy, not by artist name or algorithmic favor. That means a bedroom producer in Tulsa has the same discoverability as a signed artist. Your metadata determines your visibility, not your marketing budget.
          </p>
          <p className="text-2xl text-accent-primary font-semibold">
            This is how new and struggling artists actually get heard.
          </p>
        </div>
      </section>

      {/* Merch */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>Your Merch. Your Revenue.</SectionHeadline>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                Sell through your own channels
              </h3>
              <p className="text-text-secondary text-lg">
                Keep 100%. We&apos;re not involved.
              </p>
            </Card>

            <Card>
              <h3 className="text-2xl font-semibold mb-4">
                Sell through EmPulse store
              </h3>
              <p className="text-text-secondary text-lg">
                Keep 70% minus actual fulfillment costs on both sides. Convenience with a fair cut.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Coming */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeadline centered>More Ways to Earn. More Ways to Connect.</SectionHeadline>

          <div className="space-y-6">
            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  NOW
                </div>
                <ul className="text-text-secondary text-lg list-disc list-inside">
                  <li>Upload and stream</li>
                  <li>Real-time earnings dashboard</li>
                  <li>One-click control</li>
                </ul>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary/70 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  Q2 2026
                </div>
                <p className="text-text-secondary text-lg">
                  Venue live streaming partnerships
                </p>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary/50 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  Q3 2026
                </div>
                <p className="text-text-secondary text-lg">
                  Go live directly from your profile page. Stream rehearsals, sessions, shows—no venue required.
                </p>
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="border-2 border-accent-primary/30 text-accent-primary px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap w-fit glow-outline-orange">
                  FUTURE
                </div>
                <ul className="text-text-secondary text-lg list-disc list-inside">
                  <li>Tips from listeners</li>
                  <li>Premium subscriber content</li>
                  <li>Virtual ticketing</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>We Handle the Paperwork</SectionHeadline>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            ASCAP, BMI, SESAC blanket licenses—covered. Mechanical rights through MLC—covered. You focus on creating. We handle the legal infrastructure.
          </p>
        </div>
      </section>

      {/* Artist Signup Form */}
      <section id="signup" className="py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeadline centered>Ready to Get Paid Fairly?</SectionHeadline>

          {isSubmitted ? (
            <div className="bg-accent-primary/10 border border-accent-primary rounded-lg p-8 text-center">
              <p className="text-accent-primary font-semibold text-xl mb-2">✓ You&apos;re on the list!</p>
              <p className="text-text-secondary">
                We&apos;ll be in touch soon with next steps and early access information.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Artist/Band Name *
                </label>
                <input
                  {...register('artistName')}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary focus:border-accent-primary text-text-primary placeholder-text-secondary transition-colors outline-none"
                  placeholder="Your artist or band name"
                />
                {errors.artistName && (
                  <p className="text-error text-sm mt-1">{errors.artistName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Your Name *
                </label>
                <input
                  {...register('yourName')}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary focus:border-accent-primary text-text-primary placeholder-text-secondary transition-colors outline-none"
                  placeholder="Your full name"
                />
                {errors.yourName && (
                  <p className="text-error text-sm mt-1">{errors.yourName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary focus:border-accent-primary text-text-primary placeholder-text-secondary transition-colors outline-none"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-text-primary font-medium mb-2">
                  Link to existing music (optional)
                </label>
                <input
                  {...register('musicLink')}
                  type="url"
                  className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary focus:border-accent-primary text-text-primary placeholder-text-secondary transition-colors outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  {...register('betaAccess')}
                  type="checkbox"
                  id="betaAccess"
                  className="w-5 h-5 rounded border-2 border-bg-tertiary bg-bg-tertiary text-accent-primary focus:ring-accent-primary"
                />
                <label htmlFor="betaAccess" className="text-text-secondary">
                  I want early access to the beta
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 border-2 border-accent-secondary text-accent-secondary hover:text-accent-secondary/90 font-semibold text-lg rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed glow-outline-red"
              >
                {isSubmitting ? 'Submitting...' : 'Join as an Artist'}
              </button>

              <p className="text-center text-text-secondary text-sm">
                Already on the beta?{' '}
                <a href="https://blue7.dev" className="text-accent-primary hover:text-accent-hover">
                  Log in at blue7.dev
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeadline centered>Questions?</SectionHeadline>
          <p className="text-xl text-text-secondary mb-6">
            Reach out directly. We answer.
          </p>
          <div className="space-y-2 text-text-secondary">
            <p>
              <a
                href="mailto:michellellvnw@gmail.com"
                className="text-accent-primary hover:text-accent-hover transition-colors text-lg"
              >
                michellellvnw@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      <ExitIntentModal page="artists" />

      {/* Sticky CTA (Mobile) */}
      <StickyCTA variant="button" buttonText="Join as Artist" buttonHref="#signup" page="artists" />
    </>
  );
}
