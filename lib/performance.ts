/**
 * Performance monitoring and optimization utilities
 */

/**
 * Measure page load performance
 */
export function measurePageLoad() {
  if (typeof window === 'undefined' || !window.performance) return;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (navigation) {
    const metrics = {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      request: navigation.responseStart - navigation.requestStart,
      response: navigation.responseEnd - navigation.responseStart,
      dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      load: navigation.loadEventEnd - navigation.loadEventStart,
      total: navigation.loadEventEnd - navigation.fetchStart,
    };

    // Log to analytics
    if (window.gtag) {
      window.gtag('event', 'page_load_performance', {
        dns_time: Math.round(metrics.dns),
        tcp_time: Math.round(metrics.tcp),
        request_time: Math.round(metrics.request),
        response_time: Math.round(metrics.response),
        dom_time: Math.round(metrics.dom),
        load_time: Math.round(metrics.load),
        total_time: Math.round(metrics.total),
      });
    }

    return metrics;
  }
}

/**
 * Measure Core Web Vitals
 */
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
      renderTime?: number;
      loadTime?: number;
    };
    
    const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
    
    if (window.gtag) {
      window.gtag('event', 'web_vital', {
        name: 'LCP',
        value: Math.round(lcp),
      });
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      const fid = entry.processingStart - entry.startTime;
      
      if (window.gtag) {
        window.gtag('event', 'web_vital', {
          name: 'FID',
          value: Math.round(fid),
        });
      }
    });
  }).observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    entryList.getEntries().forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });

    if (window.gtag) {
      window.gtag('event', 'web_vital', {
        name: 'CLS',
        value: Math.round(clsValue * 1000) / 1000,
      });
    }
  }).observe({ entryTypes: ['layout-shift'] });
}

/**
 * Lazy load images
 */
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(urls: string[]) {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
}
