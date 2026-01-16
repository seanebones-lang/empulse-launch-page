'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'SoftwareApplication' | 'WebSite';
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `structured-data-${type.toLowerCase()}`;
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };

    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(`structured-data-${type.toLowerCase()}`);
      if (existing) {
        existing.remove();
      }
    };
  }, [type, data]);

  return null;
}
