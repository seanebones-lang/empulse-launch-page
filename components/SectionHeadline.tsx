'use client';

import { motion } from 'framer-motion';

interface SectionHeadlineProps {
  children: React.ReactNode;
  subheadline?: string;
  centered?: boolean;
}

export default function SectionHeadline({ children, subheadline, centered = false }: SectionHeadlineProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-text-primary mb-4">{children}</h2>
      {subheadline && (
        <p className="text-xl text-text-secondary max-w-3xl">{subheadline}</p>
      )}
    </motion.div>
  );
}
