'use client';

import { motion } from 'framer-motion';
import Button from './Button';
import { trackCTAClick } from '@/lib/analytics';

interface MidPageCTAProps {
  headline: string;
  description?: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'accent' | 'minimal';
}

export default function MidPageCTA({
  headline,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
}: MidPageCTAProps) {
  const handleClick = (text: string) => {
    trackCTAClick(text, 'mid-page');
  };

  const variantStyles = {
    default: 'bg-bg-secondary border-bg-tertiary',
    accent: 'bg-accent-primary/10 border-accent-primary',
    minimal: 'bg-transparent border-transparent',
  };

  return (
    <motion.section
      className={`py-12 md:py-16 px-6 border-y ${variantStyles[variant]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
        {description && (
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            href={primaryButton.href}
            onClick={() => handleClick(primaryButton.text)}
          >
            {primaryButton.text}
          </Button>
          {secondaryButton && (
            <Button
              variant="outline"
              size="lg"
              href={secondaryButton.href}
              onClick={() => handleClick(secondaryButton.text)}
            >
              {secondaryButton.text}
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
