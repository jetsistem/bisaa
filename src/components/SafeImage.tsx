import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  fallbackLabel?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  objectPosition = 'center center',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#191919] via-[#232320] to-[#111111] text-white/75 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 mb-3 text-[#FF6B00]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="19" strokeOpacity="0.4" />
          <path d="M18 33c3-6 5-12 6-19 1 7 3 13 6 19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 27c4-2 14-2 18 0" strokeLinecap="round" />
        </svg>
        <span className="font-display text-xs tracking-wide text-white/70">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
};
