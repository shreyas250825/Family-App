import { useState, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { FeedPost } from '../components/ui/FeedPost';
import { DashboardSidebar } from '../components/ui/DashboardSidebar';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';

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

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setPostImage(url);
      setShowComposer(true);
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = () => {
    if (!postText.trim() && !postImage) return;
    createPost(postText.trim() || 'Shared a photo 📸', postImage, postImage ? 'photo' : 'update');
    setPostText('');
    setPostImage(undefined);
    setShowComposer(false);
  };

  return (
    <AppLayout rightPanel={<DashboardSidebar />}>
      <div className="glass-dark rounded-2xl p-6 mb-6 shadow-soft bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5">
        <div className="flex items-center gap-4">
          <img src={user?.avatar} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-primary/20" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {greeting()}, {user?.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-slate-500 text-sm">Here's what's happening in {data.family.name} today.</p>
          </div>
        </div>
      </div>

      <div className="glass-dark rounded-2xl p-4 mb-6 shadow-soft">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <button
            onClick={() => setShowComposer(true)}
            className="flex-1 text-left px-4 py-3 rounded-xl bg-slate-50 text-slate-400 text-sm hover:bg-slate-100 transition-colors"
          >
            Share a memory with your family...
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"
            aria-label="Add photo"
          >
            {uploading ? '...' : '📷'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {data.posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-2xl">📷</div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Your feed is empty</h3>
            <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">
              Share your first photo or update with your family. Tap the composer above to get started.
            </p>
            <button
              onClick={() => setShowComposer(true)}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
            >
              Create first post
            </button>
          </div>
        ) : (
          data.posts.map((post) => <FeedPost key={post.id} post={post} />)
        )}
      </div>

      <Modal open={showComposer} onClose={() => setShowComposer(false)} title="Create Post">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 resize-none mb-4"
        />
        {postImage && (
          <img src={postImage} alt="Preview" className="w-full rounded-xl mb-4 max-h-48 object-cover" />
        )}
        <div className="flex gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            📷 Add Photo
          </button>
          <button
            onClick={handlePublish}
            className="flex-1 py-2.5 bg-gradient-brand text-white rounded-xl font-semibold hover:shadow-glow transition-all"
          >
            Publish to Family Feed
          </button>
        </div>
      </Modal>
    </AppLayout>
  );
}
