'use client';

import { useEffect } from 'react';
import { measurePageLoad, measureWebVitals } from '@/lib/performance';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Measure page load after component mounts
    setTimeout(() => {
      measurePageLoad();
    }, 1000);

    // Measure Core Web Vitals
    measureWebVitals();
  }, []);

  return null;
}
