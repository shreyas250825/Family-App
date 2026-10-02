import { AppLayout } from '../components/layout/AppLayout';
import { FeedCard } from '../components/family/FeedCard';
import { PostComposer } from '../components/family/PostComposer';
import { useDemoFamily } from '../context/DemoFamilyContext';

export function PublicFeed() {
  const { posts, reactions, reactToPost } = useDemoFamily();
  const publicPosts = posts.filter((p) => p.audience === 'public');

  return (
    <AppLayout title="Public Feed">
      <p className="mb-6 max-w-xl text-sm fam-muted">Posts marked public. Family memories stay on Family Feed unless you choose otherwise.</p>
      <div className="mx-auto max-w-xl space-y-5">
        <PostComposer defaultAudience="public" />
        {publicPosts.map((post) => (
          <FeedCard key={post.id} post={post} selectedReaction={reactions[post.id] || null} onReact={(kind) => reactToPost(post.id, kind)} />
        ))}
      </div>
    </AppLayout>
  );
}
