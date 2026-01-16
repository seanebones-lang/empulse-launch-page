'use client';

import { useState, useEffect } from 'react';
import { getSiteStats, getEarlyAccessSpots, updateStats, type SiteStats, type EarlyAccessSpots } from '@/lib/content-manager';
import Card from './Card';
import Button from './Button';

/**
 * Content Manager Component
 * Only visible in development mode
 * Allows easy updating of dynamic content
 */
export default function ContentManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<SiteStats>({ artists: 1247, listeners: 3891 });
  const [spots, setSpots] = useState<EarlyAccessSpots>({ total: 500, used: 247, remaining: 253 });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const [statsData, spotsData] = await Promise.all([
      getSiteStats(),
      getEarlyAccessSpots(),
    ]);
    setStats(statsData);
    setSpots(spotsData);
  };

  const handleUpdateStats = async () => {
    setIsLoading(true);
    setMessage('');
    
    const success = await updateStats(stats);
    if (success) {
      setMessage('Stats updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Failed to update stats. Check console for errors.');
    }
    
    setIsLoading(false);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-20 z-50 bg-accent-secondary text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-accent-secondary/90 transition-colors"
      >
        {isOpen ? 'Hide' : 'Show'} Content
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 w-96 max-h-[70vh] overflow-y-auto">
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Content Manager</h3>
                <button
                  onClick={loadData}
                  className="text-accent-primary hover:text-accent-hover text-sm"
                >
                  Refresh
                </button>
              </div>

              {/* Stats Editor */}
              <div>
                <h4 className="font-semibold mb-2">Site Stats</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">
                      Artists
                    </label>
                    <input
                      type="number"
                      value={stats.artists}
                      onChange={(e) => setStats({ ...stats, artists: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-lg bg-bg-tertiary border border-bg-tertiary text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">
                      Listeners
                    </label>
                    <input
                      type="number"
                      value={stats.listeners}
                      onChange={(e) => setStats({ ...stats, listeners: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-lg bg-bg-tertiary border border-bg-tertiary text-text-primary"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleUpdateStats}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Stats'}
                  </Button>
                  {message && (
                    <p className={`text-sm ${message.includes('success') ? 'text-success' : 'text-error'}`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>

              {/* Early Access Spots */}
              <div>
                <h4 className="font-semibold mb-2">Early Access Spots</h4>
                <div className="text-sm space-y-1 text-text-secondary">
                  <div>Total: {spots.total}</div>
                  <div>Used: {spots.used}</div>
                  <div>Remaining: {spots.remaining}</div>
                  <div className="text-accent-primary font-semibold">
                    Progress: {Math.round((spots.used / spots.total) * 100)}%
                  </div>
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Update via API: /api/early-access-spots
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-2">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="/components/Testimonials.tsx"
                    target="_blank"
                    className="block text-accent-primary hover:text-accent-hover"
                  >
                    Edit Testimonials →
                  </a>
                  <a
                    href="/components/TrustBadges.tsx"
                    target="_blank"
                    className="block text-accent-primary hover:text-accent-hover"
                  >
                    Edit Trust Badges →
                  </a>
                  <a
                    href="/app/api/stats/route.ts"
                    target="_blank"
                    className="block text-accent-primary hover:text-accent-hover"
                  >
                    Connect Stats API →
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
