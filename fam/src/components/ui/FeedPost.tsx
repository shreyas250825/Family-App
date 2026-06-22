import { FamilyPost } from '../../types/family';
import { useFamZee } from '../../context/FamZeeContext';
import { useState } from 'react';
import { Modal } from './Modal';

interface FeedPostProps {
  post: FamilyPost;
}

export function FeedPost({ post }: FeedPostProps) {
  const { toggleLike, addComment, getComments, data } = useFamZee();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const liked = data.likedPostIds.includes(post.id);
  const comments = getComments(post.id);

  const typeBadge = {
    photo: { label: 'Photo', color: 'bg-brand-primary/10 text-brand-primary' },
    milestone: { label: 'Milestone', color: 'bg-brand-accent/10 text-amber-700' },
    update: { label: 'Update', color: 'bg-brand-secondary/10 text-brand-secondary' },
  }[post.type];

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(`${post.author.name}: ${post.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <article className="glass-dark rounded-2xl shadow-soft overflow-hidden animate-slide-up">
        <div className="p-5 flex items-start gap-4">
          <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-primary/10" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-slate-800">{post.author.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge.color}`}>{typeBadge.label}</span>
            </div>
            <p className="text-xs text-slate-500">{post.author.role} · {post.timestamp}</p>
          </div>
        </div>

        <div className="px-5 pb-4"><p className="text-slate-700 leading-relaxed">{post.content}</p></div>

        {post.image && (
          <div className="px-5 pb-4">
            <img src={post.image} alt="" className="w-full rounded-xl object-cover max-h-80 shadow-soft" />
          </div>
        )}

        <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-6">
          <button
            onClick={() => toggleLike(post.id)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${liked ? 'text-red-500' : 'text-slate-500 hover:text-brand-primary'}`}
          >
            {liked ? '❤️' : '🤍'} {post.likes}
          </button>
          <button
            onClick={() => setShowComments(true)}
            className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium"
          >
            💬 {post.comments}
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium ml-auto">
            {copied ? '✓ Copied' : '↗ Share'}
          </button>
        </div>
      </article>

      <Modal open={showComments} onClose={() => setShowComments(false)} title="Comments">
        <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
          {comments.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <img src={c.authorAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{c.authorName}</p>
                  <p className="text-sm text-slate-600">{c.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
          />
          <button onClick={handleComment} className="px-4 py-2.5 bg-gradient-brand text-white rounded-xl text-sm font-semibold">Post</button>
        </div>
      </Modal>
    </>
  );
}
