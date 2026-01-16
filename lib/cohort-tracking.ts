/**
 * Cohort tracking utilities for user segmentation
 */

export interface Cohort {
  id: string;
  name: string;
  startDate: Date;
  userCount: number;
  metadata?: Record<string, any>;
}

/**
 * Get user cohort based on signup date
 */
export function getUserCohort(signupDate: Date): string {
  const year = signupDate.getFullYear();
  const week = getWeekNumber(signupDate);
  return `${year}-W${week.toString().padStart(2, '0')}`;
}

/**
 * Get week number of year
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Track cohort signup
 */
export function trackCohortSignup(signupDate: Date, userType: 'artist' | 'listener') {
  const cohort = getUserCohort(signupDate);

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cohort_signup', {
      cohort_id: cohort,
      user_type: userType,
      signup_date: signupDate.toISOString(),
    });
  }
}

/**
 * Track cohort activity
 */
export function trackCohortActivity(
  signupDate: Date,
  activity: string,
  metadata?: Record<string, any>
) {
  const cohort = getUserCohort(signupDate);

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cohort_activity', {
      cohort_id: cohort,
      activity_name: activity,
      ...metadata,
    });
  }
}

/**
 * Get cohort retention data (for analytics dashboard)
 */
export function getCohortRetention(
  cohort: string,
  daysSinceSignup: number
): {
  cohort: string;
  daysSinceSignup: number;
  activeUsers: number;
  retentionRate: number;
} {
  // This would typically come from your analytics API
  // For now, return structure
  return {
    cohort,
    daysSinceSignup,
    activeUsers: 0,
    retentionRate: 0,
  };
}
