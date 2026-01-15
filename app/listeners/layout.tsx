import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join EmPulse | Music Discovery by Mood',
  description: 'Tired of algorithms that don\'t get you? Discover music by how it makes you feel. Support artists fairly. Wellness built in.',
  openGraph: {
    title: 'Join EmPulse | Music Discovery by Mood',
    description: 'Discover music by how it makes you feel. Support artists fairly. Wellness built in.',
    type: 'website',
  },
};

export default function ListenersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
