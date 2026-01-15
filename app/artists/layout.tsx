import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EmPulse for Artists | Earn 4-6x More Per Stream',
  description: '$0.004-$0.006 per stream. Real-time dashboard. One-click control. No small print. Join the platform that actually pays artists.',
  openGraph: {
    title: 'EmPulse for Artists | Earn 4-6x More Per Stream',
    description: '$0.004-$0.006 per stream. Real-time dashboard. One-click control.',
    type: 'website',
  },
};

export default function ArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
