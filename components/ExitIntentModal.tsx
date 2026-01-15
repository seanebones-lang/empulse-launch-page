'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmailCapture from './EmailCapture';

interface ExitIntentModalProps {
  page: 'home' | 'investors' | 'artists' | 'listeners';
}

const modalContent = {
  home: {
    headline: 'Before You Go',
    body: 'Join our waitlist for launch updates and early access.',
    buttonText: 'Stay Updated',
  },
  investors: {
    headline: 'Want the Full Picture?',
    body: 'Request our pitch deck for detailed financials and roadmap.',
    buttonText: 'Send Me the Deck',
  },
  artists: {
    headline: "Don't Miss Early Access",
    body: 'Early artists get the best positioning. Join the waitlist.',
    buttonText: 'Count Me In',
  },
  listeners: {
    headline: 'Get Notified at Launch',
    body: 'Be first to know when EmPulse goes live.',
    buttonText: 'Notify Me',
  },
};

export default function ExitIntentModal({ page }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    // Check if already shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const content = modalContent[page];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-8 relative">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                {content.headline}
              </h3>
              <p className="text-text-secondary mb-6">{content.body}</p>

              <EmailCapture
                buttonText={content.buttonText}
                source={`exit-intent-${page}`}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
