'use client';

import { ReactNode } from 'react';
import { getVariant, trackABTestView, Variant } from '@/lib/ab-testing';
import { useEffect } from 'react';

interface ABTestWrapperProps {
  testName: string;
  variants: {
    A: ReactNode;
    B: ReactNode;
    C?: ReactNode;
  };
  weights?: number[];
  onVariantAssigned?: (variant: Variant) => void;
}

export default function ABTestWrapper({
  testName,
  variants,
  weights,
  onVariantAssigned,
}: ABTestWrapperProps) {
  const variant = getVariant(testName, Object.keys(variants) as Variant[], weights);

  useEffect(() => {
    trackABTestView(testName, variant);
    onVariantAssigned?.(variant);
  }, [testName, variant, onVariantAssigned]);

  return <>{variants[variant]}</>;
}
