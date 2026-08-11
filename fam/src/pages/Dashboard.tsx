import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { HorizontalScroll } from '../components/ui/HorizontalScroll';
import { useFamZee } from '../context/FamZeeContext';
import { DEMO_WEEK, DEMO_MEMORY_ALBUMS, DEMO_POSTS_PREVIEW } from '../lib/demoContent';
import { FAMILY_IMAGES } from '../lib/images';

export function Dashboard() {
  const { user, data, createPost, uploadImage } = useFamZee();
  const [showComposer, setShowComposer] = useState(false);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const hasData = data.posts.length > 0;
  const posts = hasData ? data.posts : [];
  const events = data.events.length > 0 ? data.events : [];
  const albums = data.albums.length > 0 ? data.albums : [];
  const members = data.members.length > 0 ? data.members : [];

  const feedPosts = posts.length > 0
    ? posts.slice(0, 3)
    : DEMO_POSTS_PREVIEW.map((p, i) => ({
        id: `preview_${i}`,
        author: {
          id: `preview_${i}`,
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

  const weekActivity = hasData
    ? [
        { day: 'MON', text: `${data.members[1]?.name.split(' ')[0] || 'Rahul'} added 8 photos` },
        { day: 'TUE', text: 'Family Dinner planned' },
        { day: 'WED', text: `${data.members[2]?.name.split(' ')[0] || 'Meera'} shared a memory` },
        { day: 'THU', text: "Arjun's birthday reminder" },
        { day: 'FRI', text: 'Family Reunion confirmed' },
      ]
    : DEMO_WEEK;

  const memoryAlbums = albums.length > 0
    ? albums.slice(0, 6).map((a) => ({ title: a.title, count: a.photoCount, image: a.cover }))
    : DEMO_MEMORY_ALBUMS;

  const upcoming = events.length > 0 ? events.slice(0, 4) : [];
  const onlineMembers = members.filter((m) => m.isOnline);

  const handlePublish = () => {
    if (!postText.trim() && !postImage) return;
    createPost(postText.trim() || 'Shared a photo', postImage, postImage ? 'photo' : 'update');
    setPostText('');
    setPostImage(undefined);
    setShowComposer(false);
  };

  const firstName = user?.name.split(' ')[0] || 'Ananya';
  const familyName = data.family.name || 'The Sharma Family';
  const location = data.family.location || 'Mumbai';
  const memberCount = members.length || 4;

  return (
    <AppLayout>
      <div className="grid gap-8 lg:grid-cols-[1fr_200px]">
        <div className="min-w-0 space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-medium text-stone-100 sm:text-3xl">
              {greeting()}, {firstName}.
            </h1>
            <p className="mt-1 text-sm font-medium text-stone-300">{familyName}</p>
            <p className="text-xs text-stone-600">{memberCount} members · {location}</p>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-6">
            <img src={user?.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
            <button
              type="button"
              onClick={() => setShowComposer(true)}
              className="flex-1 rounded-lg border border-white/[0.06] bg-[#0c0c0c] px-4 py-2.5 text-left text-sm text-stone-600 transition hover:border-white/10"
            >
              Share a memory…
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploading(true);
                try {
                  setPostImage(await uploadImage(file));
                  setShowComposer(true);
                } finally {
                  setUploading(false);
                }
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="text-xs text-stone-500 hover:text-stone-300"
            >
              {uploading ? '…' : 'Photo'}
            </button>
          </div>

          {/* Horizontal activity timeline */}
          <section>
            <h2 className="mb-4 text-sm font-medium text-stone-400">Your family&apos;s week</h2>
            <HorizontalScroll showArrows={false}>
              {weekActivity.map((item) => (
                <div
                  key={item.day}
                  className="w-[140px] shrink-0 snap-start rounded-xl border border-white/[0.06] bg-[#0B0B0D] p-4 sm:w-[160px]"
                >
                  <p className="text-[10px] font-medium tracking-wider text-violet-400/70">{item.day}</p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">{item.text}</p>
                </div>
              ))}
            </HorizontalScroll>
          </section>

          {/* Recent memories — horizontal gallery */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-stone-400">Recent memories</h2>
              <Link to="/albums" className="text-xs text-stone-600 hover:text-stone-400">
                View albums
              </Link>
            </div>
            <HorizontalScroll>
              {memoryAlbums.map((m) => (
                <Link
                  key={m.title}
                  to="/albums"
                  className="group relative w-[72vw] max-w-[260px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.06] sm:w-[220px]"
                >
                  <img
                    src={m.image}
                    alt={m.title}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-medium text-white">{m.title}</p>
                    <p className="text-xs text-stone-400">{m.count} memories</p>
                  </div>
                </Link>
              ))}
            </HorizontalScroll>
          </section>

          {/* Feed preview */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium text-stone-400">Family feed</h2>
              <Link to="/feed" className="text-xs text-stone-600 hover:text-stone-400">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {feedPosts.map((post) => (
                <article key={post.id} className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0B0B0D]">
                  <div className="flex items-center gap-3 p-4">
                    <img src={post.author.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">{post.author.name}</p>
                      <p className="text-[10px] text-stone-600">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="px-4 pb-3 text-sm leading-relaxed text-stone-400">{post.content}</p>
                  {post.image ? (
                    <img src={post.image} alt="" className="max-h-72 w-full object-cover" loading="lazy" />
                  ) : null}
                  <p className="px-4 py-3 text-xs text-stone-600">
                    ♥ {post.likes} · 💬 {post.comments} comments
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Compact sidebar */}
        <aside className="hidden space-y-8 lg:block">
          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-wider text-stone-600">Upcoming</h3>
            <div className="space-y-3">
              {(upcoming.length > 0 ? upcoming : [
                { id: '1', title: 'Family Dinner', date: 'Today', time: '7:30 PM' },
                { id: '2', title: "Arjun's Birthday", date: 'Aug 18', time: '' },
                { id: '3', title: 'Family Reunion', date: 'Aug 20', time: '' },
              ]).map((e) => (
                <Link key={e.id} to="/events" className="block rounded-lg py-1 transition hover:bg-white/[0.02]">
                  <p className="text-sm text-stone-300">{e.title}</p>
                  <p className="text-[10px] text-stone-600">
                    {e.date}{e.time ? ` · ${e.time}` : ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[10px] font-medium uppercase tracking-wider text-stone-600">Family online</h3>
            <div className="space-y-2.5">
              {(onlineMembers.length > 0 ? onlineMembers : members.slice(0, 3)).map((m) => (
                <div key={m.id} className="flex items-center gap-2.5">
                  <div className="relative">
                    <img src={m.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#050505] bg-emerald-500" />
                  </div>
                  <span className="text-xs text-stone-400">{m.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Modal open={showComposer} onClose={() => setShowComposer(false)} title="Create post">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="mb-4 w-full resize-none rounded-lg border border-white/10 bg-[#0c0c0c] px-4 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        {postImage ? (
          <img src={postImage} alt="Preview" className="mb-4 max-h-48 w-full rounded-lg object-cover" />
        ) : null}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-stone-400"
          >
            Add photo
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="flex-1 rounded-lg bg-stone-100 py-2 text-sm font-medium text-[#0a0a0a]"
          >
            Publish
          </button>
        </div>
      </Modal>
    </AppLayout>
  );
}
