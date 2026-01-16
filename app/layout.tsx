import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PulseChatbot from "@/components/PulseChatbot";
import ErrorBoundary from "@/components/ErrorBoundary";
import Analytics from "@/components/Analytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import SkipToContent from "@/components/SkipToContent";
import AdminPanel from "@/components/AdminPanel";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import ContentManager from "@/components/ContentManager";
import ComponentShowcase from "@/components/ComponentShowcase";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://empulse.music'),
  title: {
    default: "EmPulse Music | Discover by Mood. Support Artists. Feel Better.",
    template: "%s | EmPulse Music",
  },
  description: "Mood-based music streaming that pays artists 4-6x industry average. Wellness tracking built in. Discover music by how it makes you feel. Join 3,891 listeners and 1,247 artists on the future of music streaming.",
  keywords: [
    "music streaming",
    "mood-based discovery",
    "mental wellness",
    "artist support",
    "independent music",
    "fair pay artists",
    "music and mental health",
    "wellness music app",
    "mood music discovery",
    "artist streaming platform",
  ],
  authors: [{ name: "EmPulse Music", url: "https://empulse.music" }],
  creator: "NextEleven Studios",
  publisher: "EmPulse Music",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://empulse.music",
    siteName: "EmPulse Music",
    title: "EmPulse Music | Discover by Mood. Support Artists. Feel Better.",
    description: "Mood-based music streaming that pays artists 4-6x industry average. Wellness tracking built in. Join the movement.",
    images: [
      {
        url: "/empulse-logo.png",
        width: 1200,
        height: 630,
        alt: "EmPulse Music Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EmPulse Music | Discover by Mood. Support Artists. Feel Better.",
    description: "Mood-based music streaming that pays artists 4-6x industry average. Wellness tracking built in.",
    images: ["/empulse-logo.png"],
  },
  alternates: {
    canonical: "https://empulse.music",
  },
  verification: {
    // Add when you have verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://empulse.music'} />
      </head>
      <body className="antialiased">
        <Analytics />
        <PerformanceMonitor />
        <SkipToContent />
        <ErrorBoundary>
          <ScrollProgress position="top" height={3} />
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <PulseChatbot />
          <AdminPanel />
          <ContentManager />
          <ComponentShowcase />
          <CookieConsent />
        </ErrorBoundary>
      </body>
    </html>
  );
}
