import { Member } from '../../../lib/landingData';

interface MemberAvatarProps {
  member: Member | { name: string; color: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
}

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
};

export function MemberAvatar({ member, size = 'md', ring = false }: MemberAvatarProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`${SIZES[size]} flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${
        ring ? 'ring-2 ring-white/20 ring-offset-2 ring-offset-[#0a0a0a]' : ''
      }`}
      style={{ backgroundColor: member.color }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
