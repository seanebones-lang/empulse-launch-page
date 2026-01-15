import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-bg-tertiary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Beta Link */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-text-primary mb-4 inline-block">
              EmPulse
            </Link>
            <p className="text-text-secondary mb-4">
              Music that knows how you feel. Discover by mood, support artists, feel better.
            </p>
            <a
              href="https://blue7.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-hover transition-colors"
            >
              Try the Live Beta →
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-text-secondary hover:text-text-primary transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-text-secondary hover:text-text-primary transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/listeners" className="text-text-secondary hover:text-text-primary transition-colors">
                  Listeners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
            <ul className="space-y-2 text-text-secondary">
              <li>Dallas, Texas</li>
              <li>
                <a href="mailto:empulse@mothership-ai.com" className="hover:text-text-primary transition-colors">
                  empulse@mothership-ai.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-bg-tertiary">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              © 2026 EmPulse Music. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-text-secondary">
              <Link href="/privacy" className="hover:text-text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
