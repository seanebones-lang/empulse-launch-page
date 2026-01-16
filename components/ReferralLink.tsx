'use client';

import { useState, useEffect } from 'react';
import { generateReferralLink, getStoredReferralCode } from '@/lib/referral';
import { trackButtonClick } from '@/lib/analytics';

interface ReferralLinkProps {
  userId?: string;
  userType?: 'artist' | 'listener';
  showStats?: boolean;
}

export default function ReferralLink({ userId, userType = 'listener', showStats = false }: ReferralLinkProps) {
  const [referralLink, setReferralLink] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (userId) {
      setReferralLink(generateReferralLink(userId));
    } else {
      // For demo/landing page - use a placeholder
      setReferralLink('https://empulse.music?ref=DEMO123');
    }
    // Check if Web Share API is available
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanShare(true);
    }
  }, [userId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    trackButtonClick('Copy Referral Link', 'referral');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join EmPulse - Music That Knows How You Feel',
          text: 'Check out EmPulse - mood-based music streaming that pays artists fairly!',
          url: referralLink,
        });
        trackButtonClick('Share Referral Link', 'referral');
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Share EmPulse</h3>
        <p className="text-text-secondary mb-4">
          Share your referral link and earn rewards when friends sign up!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-3 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary text-text-primary"
          />
          <button
            onClick={handleCopy}
            className="px-6 py-3 border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-black font-semibold rounded-lg transition-all glow-outline-orange"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        {canShare && (
          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-3 border-2 border-accent-secondary text-accent-secondary hover:bg-accent-secondary hover:text-white font-semibold rounded-lg transition-all glow-outline-red"
          >
            Share
          </button>
        )}
      </div>

      {showStats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-primary">0</div>
            <div className="text-sm text-text-secondary">Total Referrals</div>
          </div>
          <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-primary">0</div>
            <div className="text-sm text-text-secondary">Active Users</div>
          </div>
          <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-primary">$0</div>
            <div className="text-sm text-text-secondary">Earnings</div>
          </div>
        </div>
      )}

      <div className="text-sm text-text-secondary">
        <p className="font-semibold mb-2">How it works:</p>
        <ul className="list-disc list-inside space-y-1">
          {userType === 'listener' ? (
            <>
              <li>Refer 3 friends → Get 1 month premium free</li>
              <li>Refer 5 friends → Get 3 months premium free</li>
              <li>Refer 10 friends → Get lifetime 20% discount</li>
            </>
          ) : (
            <>
              <li>Refer 1 artist → Get $50 bonus on first payout</li>
              <li>Refer 3 artists → Get $200 bonus + featured placement</li>
              <li>Refer 5 artists → Get $500 bonus + "Early Supporter" badge</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
