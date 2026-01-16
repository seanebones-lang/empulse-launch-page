'use client';

import { skipToMainContent } from '@/lib/accessibility';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault();
        skipToMainContent();
      }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-black focus:font-semibold focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
