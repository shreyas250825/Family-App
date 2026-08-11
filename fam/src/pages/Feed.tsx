import { AppLayout } from '../components/layout/AppLayout';
import { useFamZee } from '../context/FamZeeContext';
import { DEMO_POSTS_PREVIEW } from '../lib/demoContent';
import { FAMILY_IMAGES } from '../lib/images';

export function Feed() {
  const { data } = useFamZee();

  const posts = data.posts.length > 0
    ? data.posts
    : DEMO_POSTS_PREVIEW.map((p, i) => ({
        id: `demo_${i}`,
        author: {
          id: `demo_${i}`,
          name: p.author,
          role: 'Member',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.author)}&background=7c3aed&color=fff`,
          isOnline: true,
        },
        content: p.content,
        image: [FAMILY_IMAGES.brunch, FAMILY_IMAGES.travel, FAMILY_IMAGES.birthday][i],
        likes: p.likes,
        comments: p.comments,
        timestamp: p.time,
        type: 'photo' as const,
      }));

  return (
    <AppLayout title="Family Feed">
      <div className="mx-auto max-w-xl space-y-5">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0B0B0D]">
            <div className="flex items-center gap-3 p-4">
              <img src={post.author.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-stone-200">{post.author.name}</p>
                <p className="text-[10px] text-stone-600">{post.timestamp}</p>
              </div>
            </div>
            <p className="px-4 pb-3 text-sm leading-relaxed text-stone-300">{post.content}</p>
            {post.image ? (
              <img src={post.image} alt="" className="w-full object-cover" style={{ maxHeight: '420px' }} loading="lazy" />
            ) : null}
            <div className="flex gap-4 px-4 py-3 text-xs text-stone-500">
              <span>♥ {post.likes}</span>
              <span>💬 {post.comments} comments</span>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
