import { HorizontalScroll } from '../ui/HorizontalScroll';
import { FamilyMemberCard } from './FamilyMemberCard';
import type { DemoMember } from '../../lib/demoFamily';

export function MemberCarousel({
  members,
  featuredId,
  onOpen,
  onFeature,
}: {
  members: DemoMember[];
  featuredId: string;
  onOpen: (id: string) => void;
  onFeature: (id: string) => void;
}) {
  return (
    <HorizontalScroll>
      {members.map((member) => (
        <FamilyMemberCard
          key={member.id}
          member={member}
          featured={member.id === featuredId}
          onOpen={() => onOpen(member.id)}
          onFeature={() => onFeature(member.id)}
        />
      ))}
    </HorizontalScroll>
  );
}
