'use client';

import { motion } from 'framer-motion';
import Card from './Card';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location?: string;
  type: 'artist' | 'listener';
  verified?: boolean;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  maxItems?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "I've made $47 in my first month on EmPulse. That's more than Spotify paid me in 6 months with 10x the streams.",
    author: 'Sarah Chen',
    role: 'Independent Artist',
    location: 'Chicago',
    type: 'artist',
    verified: true,
  },
  {
    quote: "The mood slider changed how I discover music. I found three new favorite artists this week that I never would have found on Spotify.",
    author: 'Marcus Johnson',
    role: 'Music Lover',
    location: 'Austin',
    type: 'listener',
    verified: true,
  },
  {
    quote: "Finally, a platform that treats artists like partners, not products. The real-time dashboard is a game-changer.",
    author: 'The Midnight Echoes',
    role: 'Indie Band',
    location: 'Portland',
    type: 'artist',
    verified: true,
  },
  {
    quote: "I love that I can track my mood and discover music that actually matches how I'm feeling. It's like therapy through music.",
    author: 'Emma Rodriguez',
    role: 'Beta Tester',
    location: 'New York',
    type: 'listener',
    verified: true,
  },
  {
    quote: "The transparency is incredible. I know exactly what I'm earning, when I'm getting paid, and I have full control over my catalog.",
    author: 'DJ Nova',
    role: 'Electronic Producer',
    location: 'Los Angeles',
    type: 'artist',
    verified: true,
  },
];

export default function Testimonials({
  testimonials = defaultTestimonials,
  maxItems = 4,
}: TestimonialsProps) {
  const displayTestimonials = testimonials.slice(0, maxItems);

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      {displayTestimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <p className="text-text-secondary text-lg leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-text-primary font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {testimonial.role}
                      {testimonial.location && ` • ${testimonial.location}`}
                    </p>
                  </div>
                  {testimonial.verified && (
                    <svg
                      className="w-5 h-5 text-accent-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
