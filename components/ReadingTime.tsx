'use client';

import { useEffect, useState } from 'react';

interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
}

export default function ReadingTime({
  content,
  wordsPerMinute = 200,
  className = '',
}: ReadingTimeProps) {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    setReadingTime(minutes);
  }, [content, wordsPerMinute]);

  if (readingTime === 0) return null;

  return (
    <span className={`text-text-secondary text-sm ${className}`}>
      {readingTime} min read
    </span>
  );
}
