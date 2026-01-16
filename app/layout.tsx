import type { Metadata } from "next";
import "./globals.css";
import "./design-experiments.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PulseChatbot from "@/components/PulseChatbot";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export const metadata: Metadata = {
  title: "EmPulse Music | Discover by Mood. Support Artists. Feel Better.",
  description: "Mood-based music streaming that pays artists 4-6x industry average. Wellness tracking built in. Discover music by how it makes you feel.",
  keywords: ["music streaming", "mood-based discovery", "mental wellness", "artist support", "independent music"],
  openGraph: {
    title: "EmPulse Music | Discover by Mood. Support Artists. Feel Better.",
    description: "Mood-based music streaming that pays artists 4-6x industry average. Wellness tracking built in.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmPulse Music | Discover by Mood. Support Artists. Feel Better.",
    description: "Mood-based music streaming that pays artists 4-6x industry average.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <PulseChatbot />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
