import { useState } from 'react';

export function MemberPhoto({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&size=512&background=C7B5F5&color=2A1F3D&bold=true`;

  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
