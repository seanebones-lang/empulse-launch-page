import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invest in EmPulse | Wellness Music Streaming Platform',
  description: 'Seed opportunity at the intersection of streaming, wellness, and creator economy. $30B+ market. Artist-first economics. Real traction.',
  openGraph: {
    title: 'Invest in EmPulse | Wellness Music Streaming Platform',
    description: 'Seed opportunity at the intersection of streaming, wellness, and creator economy.',
    type: 'website',
  },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
