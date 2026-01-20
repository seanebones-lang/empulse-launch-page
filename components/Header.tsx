'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const getCTA = () => {
    switch (pathname) {
      case '/investors':
        return { text: 'Request Deck', href: 'https://docs.google.com/presentation/d/1vlmuB3UMTtDOqlUgjuFP_XaNthbXw9pM/edit?usp=drive_link&ouid=116475369707600561774&rtpof=true&sd=true' };
      case '/artists':
        return { text: 'Join as Artist', href: '#signup' };
      case '/listeners':
        return { text: 'Join Waitlist', href: '#waitlist' };
      default:
        return { text: 'Try Beta', href: 'https://blue7.dev' };
    }
  };

  const cta = getCTA();

  const navLinks = [
    { href: '/investors', label: 'Investors' },
    { href: '/artists', label: 'Artists' },
    { href: '/listeners', label: 'Listeners' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-primary/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Top Left */}
          <Link href="/" className="flex items-center z-50 hover:opacity-80 transition-opacity">
            <Image 
              src="/empulse-logo.png" 
              alt="EmPulse Logo" 
              width={200}
              height={200}
              priority
              className="h-16 w-auto md:h-24 lg:h-28"
              style={{ objectFit: 'contain', minWidth: '120px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  pathname === link.href ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Link
            href={cta.href}
            className="hidden md:inline-flex border-2 border-accent-primary text-accent-primary hover:text-accent-hover px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 glow-outline-orange"
          >
            {cta.text}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-text-primary hover:text-accent-primary transition-colors"
            aria-label="Toggle mobile menu"
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
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-bg-secondary border-l border-bg-tertiary z-40 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium transition-colors ${
                        pathname === link.href ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <Link
                  href={cta.href}
                  className="mt-8 border-2 border-accent-primary text-accent-primary hover:text-accent-hover px-6 py-3 rounded-lg font-semibold text-center transition-all glow-outline-orange"
                >
                  {cta.text}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
