'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import EmailCapture from './EmailCapture';
import { trackCTAClick } from '@/lib/analytics';

interface StickyCTAProps {
  variant?: 'email' | 'button';
  buttonText?: string;
  buttonHref?: string;
  page?: string;
}

export default function StickyCTA({
  variant = 'email',
  buttonText = 'Join EmPulse',
  buttonHref = '#waitlist',
  page = 'home',
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only show on mobile/tablet, or as backup on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Check if already shown in this session
    const shown = sessionStorage.getItem('stickyCTAShown');
    if (shown && !isMobile) return;

    const handleScroll = () => {
      // Show after scrolling 50% of page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        if (!isMobile) {
          sessionStorage.setItem('stickyCTAShown', 'true');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const handleClick = () => {
    trackCTAClick(buttonText, 'sticky-footer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-bg-secondary/95 backdrop-blur-md border-t border-bg-tertiary shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {variant === 'email' ? (
                <div>
                  <p className="text-text-primary font-semibold text-sm mb-2 text-center">
                    Join the movement
                  </p>
                  <EmailCapture
                    buttonText="Sign Up"
                    placeholder="your@email.com"
                    source={`sticky-cta-${page}`}
                  />
                </div>
              ) : (
                <Link
                  href={buttonHref}
                  onClick={handleClick}
                  className="block w-full text-center px-6 py-3 border-2 border-accent-primary text-accent-primary hover:text-accent-hover font-semibold rounded-lg transition-all duration-200 hover:scale-105 glow-outline-orange"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
