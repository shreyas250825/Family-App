import { AppLayout } from '../components/layout/AppLayout';
import { FamilyTimeline } from '../components/family/FamilyTimeline';
import { MemberProfile } from '../components/family/MemberProfile';
import { useDemoFamily } from '../context/DemoFamilyContext';

export function TimelinePage() {
  const { selectedMember, openProfile, privacy, updatePrivacy, setFeaturedId } = useDemoFamily();

  return (
    <AppLayout title="Family Timeline">
      <p className="mb-8 max-w-xl fam-muted">Every year holds a chapter. Walk through the Sharma family story.</p>
      <FamilyTimeline onOpenMember={openProfile} />
      <MemberProfile
        member={selectedMember}
        privacy={selectedMember ? privacy[selectedMember.id] : undefined}
        onClose={() => openProfile(null)}
        onPrivacy={(patch) => selectedMember && updatePrivacy(selectedMember.id, patch)}
        onFeature={() => selectedMember && setFeaturedId(selectedMember.id)}
      />
    </AppLayout>
  );
}
