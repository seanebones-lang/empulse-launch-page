import SectionHeadline from '@/components/SectionHeadline';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <SectionHeadline centered>Privacy Policy</SectionHeadline>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-text-secondary mb-8">
            Last updated: January 15, 2026
          </p>

          {/* Privacy policy content will be added here */}
          <div className="text-text-secondary">
            <p>Privacy policy content from blue7.dev will be inserted here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}