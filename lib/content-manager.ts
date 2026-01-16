/**
 * Content Management Utilities
 * Easy way to update dynamic content without editing components
 */

export interface SiteStats {
  artists: number;
  listeners: number;
  totalStreams?: number;
  totalEarnings?: number;
}

export interface EarlyAccessSpots {
  total: number;
  used: number;
  remaining: number;
}

/**
 * Get site stats (with fallback to defaults)
 */
export async function getSiteStats(): Promise<SiteStats> {
  try {
    const response = await fetch('/api/stats');
    if (response.ok) {
      const data = await response.json();
      return {
        artists: data.artists || 1247,
        listeners: data.listeners || 3891,
        totalStreams: data.totalStreams,
        totalEarnings: data.totalEarnings,
      };
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
  
  // Fallback to defaults
  return {
    artists: 1247,
    listeners: 3891,
  };
}

/**
 * Get early access spots (with fallback to defaults)
 */
export async function getEarlyAccessSpots(): Promise<EarlyAccessSpots> {
  try {
    const response = await fetch('/api/early-access-spots');
    if (response.ok) {
      const data = await response.json();
      return {
        total: data.total || 500,
        used: data.used || 247,
        remaining: data.remaining || 253,
      };
    }
  } catch (error) {
    console.error('Failed to fetch early access spots:', error);
  }
  
  // Fallback to defaults
  return {
    total: 500,
    used: 247,
    remaining: 253,
  };
}

/**
 * Update stats in API (for admin use)
 */
export async function updateStats(stats: SiteStats): Promise<boolean> {
  try {
    const response = await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to update stats:', error);
    return false;
  }
}
