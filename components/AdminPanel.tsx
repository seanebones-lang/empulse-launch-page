'use client';

import { useState, useEffect } from 'react';
import { getAllABTests, clearABTests, getPerformanceMetrics, testAccessibility } from '@/lib/test-utilities';
import Card from './Card';

/**
 * Admin panel for development/testing
 * Only show in development mode
 */
export default function AdminPanel() {
  const [abTests, setABTests] = useState<Record<string, string>>({});
  const [performance, setPerformance] = useState<any>(null);
  const [accessibility, setAccessibility] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsOpen(true);
      refreshData();
    }
  }, []);

  const refreshData = () => {
    setABTests(getAllABTests());
    setPerformance(getPerformanceMetrics());
    setAccessibility(testAccessibility());
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent-primary text-black px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-accent-hover transition-colors"
      >
        {isOpen ? 'Hide' : 'Show'} Admin
      </button>

      {isOpen && (
        <Card className="mt-2 w-96 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Admin Panel</h3>
              <button
                onClick={refreshData}
                className="text-accent-primary hover:text-accent-hover text-sm"
              >
                Refresh
              </button>
            </div>

            {/* A/B Tests */}
            <div>
              <h4 className="font-semibold mb-2">A/B Tests</h4>
              {Object.keys(abTests).length === 0 ? (
                <p className="text-text-secondary text-sm">No active tests</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(abTests).map(([test, variant]) => (
                    <div key={test} className="text-sm">
                      <span className="text-text-secondary">{test}:</span>{' '}
                      <span className="text-accent-primary font-semibold">{variant}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      clearABTests();
                      refreshData();
                    }}
                    className="text-xs text-error hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Performance */}
            {performance && (
              <div>
                <h4 className="font-semibold mb-2">Performance</h4>
                <div className="text-sm space-y-1">
                  <div>DNS: {Math.round(performance.dns)}ms</div>
                  <div>TCP: {Math.round(performance.tcp)}ms</div>
                  <div>Request: {Math.round(performance.request)}ms</div>
                  <div>Response: {Math.round(performance.response)}ms</div>
                  <div>DOM: {Math.round(performance.dom)}ms</div>
                  <div className="font-semibold text-accent-primary">
                    Total: {Math.round(performance.total)}ms
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility */}
            {accessibility && (
              <div>
                <h4 className="font-semibold mb-2">Accessibility</h4>
                <div className="text-sm">
                  <div className={accessibility.passed ? 'text-success' : 'text-error'}>
                    {accessibility.passed ? '✓ Passed' : `✗ ${accessibility.count} issues`}
                  </div>
                  {accessibility.issues.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-text-secondary">
                      {accessibility.issues.slice(0, 5).map((issue: string, i: number) => (
                        <li key={i}>• {issue}</li>
                      ))}
                      {accessibility.issues.length > 5 && (
                        <li>... and {accessibility.issues.length - 5} more</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <h4 className="font-semibold mb-2">Quick Actions</h4>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    refreshData();
                  }}
                  className="block w-full text-left text-error hover:underline"
                >
                  Clear All Storage
                </button>
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="block w-full text-left text-accent-primary hover:underline"
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
