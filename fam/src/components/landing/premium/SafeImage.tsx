import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  gradient: string;
}

export function SafeImage({ src, alt, className = '', gradient }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} bg-cover bg-center`}
        style={{ background: gradient }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
