interface FamZeeLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function FamZeeMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  const id = `famzee-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Shared space arc — three connected nodes */}
      <path
        d="M9 22.5C9 14.5 14.5 9 22 9"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9 22.5C9 14.5 14.5 9 15.5 9"
        stroke={`url(#${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="9" r="2.2" fill={`url(#${id})`} />
      <circle cx="9" cy="22.5" r="2.2" fill={`url(#${id})`} />
      <circle cx="15" cy="24.5" r="2.2" fill={`url(#${id})`} />
    </svg>
  );
}

export function FamZeeLogo({
  size = 32,
  showWordmark = true,
  className = '',
  wordmarkClassName = '',
}: FamZeeLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <FamZeeMark size={size} />
      {showWordmark ? (
        <span className={`text-[1.05rem] font-semibold tracking-[-0.02em] ${wordmarkClassName || 'text-[var(--text)]'}`} aria-hidden>
          Fam<span className="font-medium opacity-70">Zee</span>
        </span>
      ) : null}
    </span>
  );
}
