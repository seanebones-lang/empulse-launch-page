'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trackEmailSignup, trackFormSubmission } from '@/lib/analytics';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCaptureProps {
  buttonText?: string;
  placeholder?: string;
  source?: string;
}

export default function EmailCapture({
  buttonText = 'Count Me In',
  placeholder = 'your@email.com',
  source = 'general'
}: EmailCaptureProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, source }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        trackEmailSignup(source);
        trackFormSubmission('email_capture', true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        trackFormSubmission('email_capture', false);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-accent-primary/10 border border-accent-primary rounded-lg p-4 text-center">
        <p className="text-accent-primary font-semibold">✓ You&apos;re on the list!</p>
        <p className="text-text-secondary text-sm mt-1">Check your email for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            {...register('email')}
            type="email"
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg bg-bg-tertiary border-2 border-bg-tertiary focus:border-accent-primary text-text-primary placeholder-text-secondary transition-colors outline-none"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 border-2 border-accent-primary text-accent-primary hover:text-accent-hover font-semibold rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed glow-outline-orange"
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </button>
      </div>
    </form>
  );
}
