import { memberById, type DemoFeedPost, type PostAudience, type ReactionKind } from '../../lib/demoFamily';
import { ReactionPicker } from './ReactionPicker';
import { MemberPhoto } from './MemberPhoto';

const AUDIENCE_LABEL: Record<PostAudience, string> = {
  family: 'Family only',
  relatives: 'Selected relatives',
  public: 'Public',
};

export function FeedCard({
  post,
  selectedReaction,
  onReact,
}: {
  post: DemoFeedPost;
  selectedReaction: ReactionKind | null;
  onReact: (kind: ReactionKind) => void;
}) {
  const author = memberById(post.memberId);

  return (
    <article className="fam-card overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <MemberPhoto src={author?.photo || ''} alt={author?.name || 'Family member'} className="h-11 w-11 rounded-full object-cover object-top" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{author?.name}</p>
          <p className="text-xs fam-muted">{author?.relationship} · {post.date}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>
          {AUDIENCE_LABEL[post.audience]}
        </span>
      </div>
      <p className="px-4 pb-3 text-sm leading-relaxed">{post.content}</p>
      {post.image ? (
        <img src={post.image} alt="" className="aspect-[4/3] w-full object-cover" />
      ) : null}
      <div className="p-4">
        <ReactionPicker selected={selectedReaction} counts={post.counts} onSelect={onReact} />
      </div>
    </article>
  );
}
