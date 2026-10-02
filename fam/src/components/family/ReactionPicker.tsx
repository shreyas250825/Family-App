import type { ReactionKind } from '../../lib/demoFamily';

const REACTIONS: { id: ReactionKind; label: string; meaning: string; icon: string }[] = [
  { id: 'heartbeat', label: 'Heartbeat', meaning: 'Love / appreciation', icon: '♡' },
  { id: 'hug', label: 'Family Hug', meaning: 'Affection', icon: '🤗' },
  { id: 'roots', label: 'Our Roots', meaning: 'Heritage', icon: '🌳' },
  { id: 'sparkle', label: 'Special Moment', meaning: 'A memory worth keeping', icon: '✦' },
];

export function ReactionPicker({
  selected,
  counts,
  onSelect,
}: {
  selected: ReactionKind | null;
  counts: Record<ReactionKind, number>;
  onSelect: (kind: ReactionKind) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map((reaction) => {
        const active = selected === reaction.id;
        return (
          <button
            key={reaction.id}
            type="button"
            title={reaction.meaning}
            onClick={() => onSelect(reaction.id)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${active ? 'reaction-pop' : ''}`}
            style={{
              borderColor: active ? 'var(--primary)' : 'var(--border)',
              background: active ? 'var(--primary-soft)' : 'transparent',
            }}
          >
            <span className={reaction.id === 'heartbeat' && active ? 'reaction-pop' : ''}>{reaction.icon}</span>
            {reaction.label}
            <span className="fam-muted">{counts[reaction.id]}</span>
          </button>
        );
      })}
    </div>
  );
}
