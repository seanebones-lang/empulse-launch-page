'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FeatureBlock from '@/components/FeatureBlock';
import SectionHeadline from '@/components/SectionHeadline';
import ExitIntentModal from '@/components/ExitIntentModal';

const listenerWaitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  betaTester: z.boolean().optional(),
  alsoArtist: z.boolean().optional(),
});

type ListenerWaitlistData = z.infer<typeof listenerWaitlistSchema>;

export default function Listeners() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ListenerWaitlistData>({
    resolver: zodResolver(listenerWaitlistSchema),
  });

  const onSubmit = async (data: ListenerWaitlistData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'listeners-waitlist' }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Tired of Algorithms That Don&apos;t Get You?
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover music by how it makes you feel. Support artists who actually get paid. Take care of your mind while you listen.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="primary" size="lg" href="#waitlist">
              Join the Waitlist
            </Button>
            <Button variant="outline" size="lg" href="https://blue7.dev">
              Try the Beta Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Discovery Reimagined */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>Two Sliders. Infinite Discovery.</SectionHeadline>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Mood: sad to happy. Energy: calm to energetic. Set them where you are, find music that matches. Or set them where you want to be, and let the music shift you there.
          </p>
          <div className="text-6xl my-8">🎚️</div>
          <p className="text-2xl text-accent-primary font-semibold">
            No more skipping through recommendations that miss the mark. No more algorithms pushing popularity over fit.
          </p>
        </div>
      </section>

      {/* Hear Something New */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>Discovery by Feeling, Not Fame</SectionHeadline>
          <p className="text-xl text-text-secondary mb-6 max-w-3xl mx-auto">
            When you search by mood instead of name, you find artists you&apos;d never search for. The struggling songwriter who perfectly captures your Tuesday afternoon melancholy. The unknown producer whose energy track becomes your new workout essential.
          </p>
          <p className="text-2xl text-accent-primary font-semibold">
            On EmPulse, great music finds you—regardless of who made it.
          </p>
        </div>
      </section>

      {/* Your Streams Matter */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>When You Listen, Artists Earn</SectionHeadline>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            On most platforms, artists see fractions of a penny. On EmPulse, they earn 4-6x more per stream. Your listening directly supports independent creators. Feel good about every play.
          </p>
        </div>
      </section>

      {/* Wellness Built In */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeadline centered>More Than a Music App</SectionHeadline>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                Mood Tracking
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Daily check-ins help you understand your emotional patterns over time.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                Journaling
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Reflect on how you&apos;re feeling. Earn points for consistency.
              </p>
            </Card>

            <Card>
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                Affirmations
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Mood-based affirmations when you need them. Because sometimes you need more than a song.
              </p>
            </Card>
          </div>

          <motion.p
            className="text-2xl md:text-3xl text-accent-primary font-semibold text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Music and mental wellness, reinforcing each other.
          </motion.p>
        </div>
      </section>

      {/* Live Music Coming */}
      <section className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>Catch Them Live. Right Here.</SectionHeadline>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We&apos;re partnering with venues to stream live performances. And soon, artists will stream directly from their profiles—rehearsals, acoustic sessions, full shows. Discover through recordings, connect through live.
          </p>
        </div>
      </section>

      {/* Join the Movement */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeadline centered>This Is Early. You Can Shape It.</SectionHeadline>
          <p className="text-xl text-text-secondary mb-6 max-w-3xl mx-auto">
            EmPulse is in beta. We&apos;re building something different, and early supporters get to influence what it becomes. Join the waitlist, try the beta, give feedback, spread the word.
          </p>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Want to help beyond listening? We&apos;re looking for beta testers, feedback contributors, and people willing to spread the word. Let us know when you sign up.
          </p>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section id="waitlist" className="py-20 md:py-32 px-6 bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          <SectionHeadline centered>Get Early Access</SectionHeadline>

          {isSubmitted ? (
            <div className="bg-accent-primary/10 border border-accent-primary rounded-lg p-8 text-center">
              <p className="text-accent-primary font-semibold text-xl mb-2">✓ You&apos;re on the list!</p>
              <p className="text-text-secondary">
                We&apos;ll keep you updated on launch and early access opportunities.
              </p>
              <p className="text-text-secondary mt-4">
                Beta is live now at{' '}
                <a href="https://blue7.dev" className="text-accent-primary hover:text-accent-hover">
                  blue7.dev
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    {...register('betaTester')}
                    type="checkbox"
                    id="betaTester"
                    className="w-5 h-5 rounded border-2 border-bg-tertiary bg-bg-tertiary text-accent-primary focus:ring-accent-primary"
                  />
                  <label htmlFor="betaTester" className="text-text-secondary">
                    I want to help test and give feedback
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    {...register('alsoArtist')}
                    type="checkbox"
                    id="alsoArtist"
                    className="w-5 h-5 rounded border-2 border-bg-tertiary bg-bg-tertiary text-accent-primary focus:ring-accent-primary"
                  />
                  <label htmlFor="alsoArtist" className="text-text-secondary">
                    I&apos;m also an artist interested in uploading
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-accent-secondary hover:bg-accent-secondary/90 text-white font-semibold text-lg rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Count Me In'}
              </button>

              <p className="text-center text-text-secondary text-sm">
                Beta is live now at{' '}
                <a href="https://blue7.dev" className="text-accent-primary hover:text-accent-hover">
                  blue7.dev
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeadline centered>Questions or Ideas?</SectionHeadline>
          <p className="text-xl text-text-secondary mb-6">
            We&apos;re building this for you. Reach out.
          </p>
          <div className="space-y-2 text-text-secondary">
            <p>
              <a
                href="mailto:contact@empulse.music"
                className="text-accent-primary hover:text-accent-hover transition-colors text-lg"
              >
                contact@empulse.music
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Exit Intent Modal */}
      <ExitIntentModal page="listeners" />
    </>
  );
}
