/**
 * Funnel tracking utilities for conversion analysis
 */

export type FunnelStep =
  | 'landing'
  | 'viewed_features'
  | 'clicked_cta'
  | 'started_signup'
  | 'completed_signup'
  | 'verified_email'
  | 'onboarded';

interface FunnelData {
  step: FunnelStep;
  timestamp: number;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, any>;
}

/**
 * Track funnel step
 */
export function trackFunnelStep(
  step: FunnelStep,
  metadata?: Record<string, any>
) {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSessionId();
  const funnelData: FunnelData = {
    step,
    timestamp: Date.now(),
    sessionId,
    metadata,
  };

  // Store in sessionStorage
  const funnelHistory = getFunnelHistory();
  funnelHistory.push(funnelData);
  sessionStorage.setItem('funnel_history', JSON.stringify(funnelHistory));

  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'funnel_step', {
      step_name: step,
      step_number: getStepNumber(step),
      session_id: sessionId,
      ...metadata,
    });
  }
}

/**
 * Get or create session ID
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

/**
 * Get funnel history
 */
export function getFunnelHistory(): FunnelData[] {
  if (typeof window === 'undefined') return [];

  const history = sessionStorage.getItem('funnel_history');
  return history ? JSON.parse(history) : [];
}

/**
 * Get step number for ordering
 */
function getStepNumber(step: FunnelStep): number {
  const stepOrder: Record<FunnelStep, number> = {
    landing: 1,
    viewed_features: 2,
    clicked_cta: 3,
    started_signup: 4,
    completed_signup: 5,
    verified_email: 6,
    onboarded: 7,
  };
  return stepOrder[step] || 0;
}

/**
 * Calculate funnel conversion rate
 */
export function calculateFunnelConversion(
  fromStep: FunnelStep,
  toStep: FunnelStep
): number {
  const history = getFunnelHistory();
  const fromCount = history.filter((h) => h.step === fromStep).length;
  const toCount = history.filter((h) => h.step === toStep).length;

  if (fromCount === 0) return 0;
  return (toCount / fromCount) * 100;
}

/**
 * Get drop-off points
 */
export function getDropOffPoints(): Array<{
  from: FunnelStep;
  to: FunnelStep;
  dropOffRate: number;
}> {
  const steps: FunnelStep[] = [
    'landing',
    'viewed_features',
    'clicked_cta',
    'started_signup',
    'completed_signup',
    'verified_email',
    'onboarded',
  ];

  const dropOffs: Array<{
    from: FunnelStep;
    to: FunnelStep;
    dropOffRate: number;
  }> = [];

  for (let i = 0; i < steps.length - 1; i++) {
    const from = steps[i];
    const to = steps[i + 1];
    const conversion = calculateFunnelConversion(from, to);
    dropOffs.push({
      from,
      to,
      dropOffRate: 100 - conversion,
    });
  }

  return dropOffs.sort((a, b) => b.dropOffRate - a.dropOffRate);
}

/**
 * Track time spent on step
 */
export function trackTimeOnStep(step: FunnelStep, timeMs: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'time_on_step', {
      step_name: step,
      time_ms: Math.round(timeMs),
      time_seconds: Math.round(timeMs / 1000),
    });
  }
}
