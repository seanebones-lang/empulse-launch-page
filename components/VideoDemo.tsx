'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface VideoDemoProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  autoplay?: boolean;
}

export default function VideoDemo({
  videoUrl,
  thumbnailUrl,
  title = 'See EmPulse in Action',
  autoplay = false,
}: VideoDemoProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // If no video URL provided, show placeholder
  if (!videoUrl) {
    return (
      <div className="relative w-full max-w-4xl mx-auto aspect-video bg-bg-secondary rounded-lg border border-bg-tertiary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-accent-primary ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-text-secondary">{title}</p>
          <p className="text-text-secondary text-sm mt-2">
            Add video URL to component props
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {!isPlaying && thumbnailUrl && (
        <div
          className="absolute inset-0 cursor-pointer z-10"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-accent-primary/90 flex items-center justify-center hover:bg-accent-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        </div>
      )}
      <iframe
        src={`${videoUrl}${isPlaying ? '?autoplay=1' : ''}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </motion.div>
  );
}
