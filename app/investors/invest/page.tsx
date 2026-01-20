'use client';

import { motion } from 'framer-motion';
import InvestorInvestmentForm from '@/components/InvestorInvestmentForm';
import Button from '@/components/Button';
import SectionHeadline from '@/components/SectionHeadline';

export default function InvestPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeadline centered>Investment Application</SectionHeadline>
          <p className="text-xl text-text-secondary mt-4 max-w-3xl mx-auto">
            Complete the form below to begin your investment process. Our team will review your application and contact you within 2-3 business days.
          </p>
        </motion.div>

        {/* Investment Form */}
        <InvestorInvestmentForm />

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-text-secondary mb-4">
            Questions? Contact us at{' '}
            <a href="mailto:michellellvnw@gmail.com" className="text-accent-primary hover:underline">
              michellellvnw@gmail.com
            </a>
          </p>
          <Button variant="outline" href="/investors">
            Return to Investors Page
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
