import { FamilyPost } from '../../constants/mockData';

interface FeedPostProps {
  post: FamilyPost;
}

export function FeedPost({ post }: FeedPostProps) {
  const typeBadge = {
    photo: { label: 'Photo', color: 'bg-brand-primary/10 text-brand-primary' },
    milestone: { label: 'Milestone', color: 'bg-brand-accent/10 text-amber-700' },
    update: { label: 'Update', color: 'bg-brand-secondary/10 text-brand-secondary' },
  }[post.type];

  return (
    <article className="glass-dark rounded-2xl shadow-soft overflow-hidden animate-slide-up">
      <div className="p-5 flex items-start gap-4">
        <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-primary/10" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-800">{post.author.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge.color}`}>
              {typeBadge.label}
            </span>
          </div>
          <p className="text-xs text-slate-500">{post.author.role} · {post.timestamp}</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1" aria-label="More options">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="px-5 pb-4">
        <p className="text-slate-700 leading-relaxed">{post.content}</p>
      </div>

      {post.image && (
        <div className="px-5 pb-4">
          <img src={post.image} alt="" className="w-full rounded-xl object-cover max-h-80 shadow-soft" />
        </div>
      )}

      <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-6">
        <button className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likes}
        </button>
        <button className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.comments}
        </button>
        <button className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium ml-auto">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </article>
  );
}
