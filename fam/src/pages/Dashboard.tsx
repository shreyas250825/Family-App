import { AppLayout } from '../components/layout/AppLayout';
import { FamilyHero } from '../components/family/FamilyHero';
import { MemberCarousel } from '../components/family/MemberCarousel';
import { MemberProfile } from '../components/family/MemberProfile';
import { FeatureShowcase } from '../components/family/FeatureShowcase';
import { PostComposer } from '../components/family/PostComposer';
import { FeedCard } from '../components/family/FeedCard';
import { useDemoFamily } from '../context/DemoFamilyContext';
import { memberById } from '../lib/demoFamily';

export function Dashboard() {
  const { members, featuredId, setFeaturedId, selectedMember, openProfile, privacy, updatePrivacy, posts, reactions, reactToPost } = useDemoFamily();
  const featured = memberById(featuredId) || members[0];
  const familyPosts = posts.filter((p) => p.audience === 'family').slice(0, 2);

  return (
    <AppLayout>
      <div className="space-y-10">
        <FamilyHero member={featured} onOpen={() => openProfile(featured.id)} />
        <section>
          <h2 className="mb-4 font-display text-3xl">Meet our family</h2>
          <MemberCarousel members={members} featuredId={featuredId} onOpen={openProfile} onFeature={setFeaturedId} />
        </section>
        <section className="space-y-4">
          <h2 className="font-display text-2xl">Family feed</h2>
          <PostComposer />
          {familyPosts.map((post) => (
            <FeedCard key={post.id} post={post} selectedReaction={reactions[post.id] || null} onReact={(kind) => reactToPost(post.id, kind)} />
          ))}
        </section>
        <section>
          <h2 className="mb-4 font-display text-2xl">Keep more of us</h2>
          <FeatureShowcase />
        </section>
      </div>
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
