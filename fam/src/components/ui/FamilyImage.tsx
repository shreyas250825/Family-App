import { useState } from 'react';
import { FAMILY_IMAGES, IMAGE_FALLBACK, GRADIENTS } from '../../lib/images';

type ImageKey = keyof typeof FAMILY_IMAGES;

interface FamilyImageProps {
  name: ImageKey;
  alt: string;
  className?: string;
}

export function FamilyImage({ name, alt, className = '' }: FamilyImageProps) {
  const [src, setSrc] = useState<string>(FAMILY_IMAGES[name]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (src.startsWith('/images')) setSrc(IMAGE_FALLBACK[name]);
      }}
    />
  );
}

export function FamilyImageBg({ name, alt, className = '' }: FamilyImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={className} style={{ background: GRADIENTS.brunch }} role="img" aria-label={alt} />
    );
  }

  return (
    <img
      src={FAMILY_IMAGES[name]}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
