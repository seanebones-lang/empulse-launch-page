/**
 * Image optimization utilities
 */

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[] = [400, 800, 1200, 1600, 2000]
): string {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default: string;
}): string {
  const sizes: string[] = [];

  if (breakpoints.mobile) {
    sizes.push(`(max-width: 640px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    sizes.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    sizes.push(`(max-width: 1280px) ${breakpoints.desktop}`);
  }
  sizes.push(breakpoints.default);

  return sizes.join(', ');
}

/**
 * Lazy load image with intersection observer
 */
export function lazyLoadImage(
  imageElement: HTMLImageElement,
  src: string,
  onLoad?: () => void
) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    imageElement.src = src;
    if (onLoad) onLoad();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imageElement.src = src;
          if (onLoad) onLoad();
          observer.unobserve(imageElement);
        }
      });
    },
    { rootMargin: '50px' }
  );

  observer.observe(imageElement);
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: 'image' | 'fetch' = 'image') {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Get optimized image URL (for Next.js Image component or CDN)
 */
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  quality: number = 75
): string {
  // For Next.js Image component, this would be handled automatically
  // For CDN (like Cloudinary, Imgix), add transformation parameters
  if (width) {
    return `${src}?w=${width}&q=${quality}`;
  }
  return src;
}
