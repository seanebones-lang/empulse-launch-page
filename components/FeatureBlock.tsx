'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureBlockProps {
  icon?: ReactNode;
  headline: string;
  body: string;
  delay?: number;
}

export default function FeatureBlock({ icon, headline, body, delay = 0 }: FeatureBlockProps) {
  return (
    <motion.div
      className="flex flex-col items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-2xl font-semibold text-text-primary mb-3">{headline}</h3>
        <p className="text-text-secondary text-lg leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}
