'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Card from './Card';

// Validation schema
const investorFormSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().optional(),
  title: z.string().optional(),
  
  // Step 2: Investment Details
  investmentAmount: z.string().min(1, 'Investment amount is required'),
  investmentType: z.enum(['individual', 'entity', 'syndicate'], {
    required_error: 'Please select investment type',
  }),
  accreditedInvestor: z.enum(['yes', 'no'], {
    required_error: 'Please confirm accreditation status',
  }),
  
  // Step 3: Documentation
  additionalInfo: z.string().optional(),
  
  // Step 4: Agreement
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  agreeToDisclosures: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the risk disclosures',
  }),
});

type InvestorFormData = z.infer<typeof investorFormSchema>;

interface InvestorInvestmentFormProps {
  onSuccess?: () => void;
}

export default function InvestorInvestmentForm({ onSuccess }: InvestorInvestmentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<InvestorFormData>({
    resolver: zodResolver(investorFormSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Investment Details' },
    { number: 3, title: 'Documentation' },
    { number: 4, title: 'Agreement & Review' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof InvestorFormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'email', 'phone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['investmentAmount', 'investmentType', 'accreditedInvestor'];
    } else if (currentStep === 3) {
      // Step 3 is optional documentation
    } else if (currentStep === 4) {
      fieldsToValidate = ['agreeToTerms', 'agreeToDisclosures'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: InvestorFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Append uploaded files
      uploadedFiles.forEach((file, index) => {
        formData.append(`document_${index}`, file);
      });

      const response = await fetch('/api/investor-investment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        onSuccess?.();
      } else {
        const error = await response.json();
        alert(error.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Investment submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-xl text-text-secondary mb-6">
            Your investment submission has been received.
          </p>
          <p className="text-text-secondary mb-8">
            Our team will review your submission and contact you within 2-3 business days to complete the investment process, including agreement signing and deposit instructions.
          </p>
          <Button variant="primary" size="lg" href="/investors">
            Return to Investors Page
          </Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step.number
                      ? 'bg-accent-primary text-black'
                      : 'bg-bg-tertiary text-text-secondary'
                  }`}
                >
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className="text-sm mt-2 text-text-secondary hidden md:block">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all ${
                    currentStep > step.number ? 'bg-accent-primary' : 'bg-bg-tertiary'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-6">Personal Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-accent-secondary">*</span>
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                  {errors.fullName && (
                    <p className="text-accent-secondary text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-accent-secondary">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                    {errors.email && (
                      <p className="text-accent-secondary text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone <span className="text-accent-secondary">*</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                    {errors.phone && (
                      <p className="text-accent-secondary text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company (Optional)</label>
                    <input
                      {...register('company')}
                      type="text"
                      className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Title (Optional)</label>
                    <input
                      {...register('title')}
                      type="text"
                      className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Investment Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-6">Investment Details</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Investment Amount (USD) <span className="text-accent-secondary">*</span>
                  </label>
                  <input
                    {...register('investmentAmount')}
                    type="text"
                    placeholder="$10,000"
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                  {errors.investmentAmount && (
                    <p className="text-accent-secondary text-sm mt-1">{errors.investmentAmount.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Investment Type <span className="text-accent-secondary">*</span>
                  </label>
                  <select
                    {...register('investmentType')}
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  >
                    <option value="">Select investment type</option>
                    <option value="individual">Individual</option>
                    <option value="entity">Entity (LLC, Corporation, etc.)</option>
                    <option value="syndicate">Syndicate/Group</option>
                  </select>
                  {errors.investmentType && (
                    <p className="text-accent-secondary text-sm mt-1">{errors.investmentType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Are you an accredited investor? <span className="text-accent-secondary">*</span>
                  </label>
                  <div className="space-y-3 mt-2">
                    <label className="flex items-center">
                      <input
                        {...register('accreditedInvestor')}
                        type="radio"
                        value="yes"
                        className="mr-3"
                      />
                      <span>Yes, I am an accredited investor</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register('accreditedInvestor')}
                        type="radio"
                        value="no"
                        className="mr-3"
                      />
                      <span>No, I am not an accredited investor</span>
                    </label>
                  </div>
                  {errors.accreditedInvestor && (
                    <p className="text-accent-secondary text-sm mt-1">{errors.accreditedInvestor.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Documentation */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-6">Documentation</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Documents (Optional)
                  </label>
                  <p className="text-sm text-text-secondary mb-3">
                    You can upload any relevant documents (accreditation letters, entity documents, etc.)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg">
                          <span className="text-sm text-text-primary">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-accent-secondary hover:text-accent-hover"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    {...register('additionalInfo')}
                    rows={5}
                    placeholder="Any additional information you'd like to share..."
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Agreement & Review */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-6">Agreement & Review</h2>
                
                <div className="bg-bg-secondary p-6 rounded-lg space-y-4 mb-6">
                  <h3 className="font-semibold text-lg">Review Your Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {watchedValues.fullName}</p>
                    <p><strong>Email:</strong> {watchedValues.email}</p>
                    <p><strong>Phone:</strong> {watchedValues.phone}</p>
                    <p><strong>Investment Amount:</strong> {watchedValues.investmentAmount}</p>
                    <p><strong>Investment Type:</strong> {watchedValues.investmentType}</p>
                    <p><strong>Accredited Investor:</strong> {watchedValues.accreditedInvestor === 'yes' ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      {...register('agreeToTerms')}
                      type="checkbox"
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">
                      I agree to the{' '}
                      <a href="/terms" target="_blank" className="text-accent-primary hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" target="_blank" className="text-accent-primary hover:underline">
                        Privacy Policy
                      </a>
                      <span className="text-accent-secondary"> *</span>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-accent-secondary text-sm">{errors.agreeToTerms.message}</p>
                  )}

                  <label className="flex items-start">
                    <input
                      {...register('agreeToDisclosures')}
                      type="checkbox"
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">
                      I acknowledge that I have read and understand the risk disclosures. I understand that investing in startups involves significant risk, including the potential loss of my entire investment.
                      <span className="text-accent-secondary"> *</span>
                    </span>
                  </label>
                  {errors.agreeToDisclosures && (
                    <p className="text-accent-secondary text-sm">{errors.agreeToDisclosures.message}</p>
                  )}
                </div>

                <div className="bg-bg-secondary p-4 rounded-lg text-sm text-text-secondary">
                  <p className="font-semibold mb-2">Next Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Our team will review your submission within 2-3 business days</li>
                    <li>You will receive an email with investment agreement documents</li>
                    <li>After signing, you will receive deposit instructions</li>
                    <li>Once deposit is confirmed, your investment will be processed</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-bg-tertiary">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button type="button" variant="primary" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Investment Application'}
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
