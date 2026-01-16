'use client';

import { motion } from 'framer-motion';

interface UrgencyBadgeProps {
  text: string;
  variant?: 'default' | 'countdown' | 'progress';
  countdownDate?: string; // ISO date string
  progressValue?: number; // 0-100
  progressMax?: number;
}

export default function UrgencyBadge({
  text,
  variant = 'default',
  countdownDate,
  progressValue,
  progressMax = 100,
}: UrgencyBadgeProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-accent-primary font-semibold text-sm">{text}</span>
      {variant === 'progress' && progressValue !== undefined && (
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(progressValue / progressMax) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-accent-primary text-xs font-semibold">
            {progressValue}/{progressMax}
          </span>
        </div>
      )}
    </motion.div>
  );
}
