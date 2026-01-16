'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Card({
  children,
  className = '',
  hover = true,
  variant = 'default',
  padding = 'lg'
}: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const variantStyles = {
    default: 'bg-bg-secondary border border-bg-tertiary',
    elevated: 'bg-bg-secondary border-0 shadow-lg shadow-bg-tertiary/50',
    bordered: 'bg-bg-primary border-2 border-accent-primary/20',
    glass: 'bg-bg-secondary/80 backdrop-blur-sm border border-bg-tertiary/50',
  };

  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-primary/10 transition-all duration-300'
    : 'transition-all duration-200';

  return (
    <motion.div
      className={`${variantStyles[variant]} rounded-lg ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
