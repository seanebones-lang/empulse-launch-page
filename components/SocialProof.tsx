'use client';

import { motion } from 'framer-motion';

interface SocialProofProps {
  artistCount?: number;
  listenerCount?: number;
  showGrowth?: boolean;
}

export default function SocialProof({
  artistCount = 1247,
  listenerCount = 3891,
  showGrowth = true,
}: SocialProofProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl md:text-4xl font-bold text-accent-primary">
          {artistCount.toLocaleString()}
        </div>
        <div className="text-text-secondary text-sm md:text-base">
          Artists
        </div>
      </div>
      
      <div className="hidden sm:block w-px h-8 bg-bg-tertiary" />
      
      <div className="flex items-center gap-3">
        <div className="text-3xl md:text-4xl font-bold text-accent-primary">
          {listenerCount.toLocaleString()}
        </div>
        <div className="text-text-secondary text-sm md:text-base">
          Listeners
        </div>
      </div>

      {showGrowth && (
        <>
          <div className="hidden sm:block w-px h-8 bg-bg-tertiary" />
          <div className="flex items-center gap-2 text-accent-primary text-sm font-semibold">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Growing daily
          </div>
        </>
      )}
    </motion.div>
  );
}
