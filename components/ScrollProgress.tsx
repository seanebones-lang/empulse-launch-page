'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  showPercentage?: boolean;
  color?: string;
}

export default function ScrollProgress({
  position = 'top',
  height = 3,
  showPercentage = false,
  color = 'accent-primary',
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const colorClass = `bg-${color}`;

  return (
    <div
      className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-50`}
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={`h-full ${colorClass}`}
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      {showPercentage && scrollProgress > 5 && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">
          {Math.round(scrollProgress)}%
        </div>
      )}
    </div>
  );
}
