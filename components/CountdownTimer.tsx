'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  onComplete?: () => void;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
}

export default function CountdownTimer({
  targetDate,
  onComplete,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsComplete(true);
        if (onComplete) onComplete();
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (isComplete) {
    return (
      <div className="text-center">
        <p className="text-accent-primary font-semibold text-lg">Time's up!</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, show: showDays },
    { label: 'Hours', value: timeLeft.hours, show: showHours },
    { label: 'Minutes', value: timeLeft.minutes, show: showMinutes },
    { label: 'Seconds', value: timeLeft.seconds, show: showSeconds },
  ].filter((unit) => unit.show);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-bg-secondary border border-bg-tertiary rounded-lg px-4 py-3 min-w-[70px]">
            <div className="text-3xl md:text-4xl font-bold text-accent-primary">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-text-secondary mt-1">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
