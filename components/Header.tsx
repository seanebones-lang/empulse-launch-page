'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCTA = () => {
    switch (pathname) {
      case '/investors':
        return { text: 'Request Deck', href: '#contact' };
      case '/artists':
        return { text: 'Join as Artist', href: '#signup' };
      case '/listeners':
        return { text: 'Join Waitlist', href: '#waitlist' };
      default:
        return { text: 'Try Beta', href: 'https://blue7.dev' };
    }
  };

  const cta = getCTA();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bg-primary/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-text-primary hover:text-accent-primary transition-colors">
            EmPulse
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/investors"
              className={`text-base font-medium transition-colors ${
                pathname === '/investors' ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Investors
            </Link>
            <Link
              href="/artists"
              className={`text-base font-medium transition-colors ${
                pathname === '/artists' ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Artists
            </Link>
            <Link
              href="/listeners"
              className={`text-base font-medium transition-colors ${
                pathname === '/listeners' ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Listeners
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href={cta.href}
            className="bg-accent-primary hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            {cta.text}
          </Link>
        </div>
      </div>
    </header>
  );
}
