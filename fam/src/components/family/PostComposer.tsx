import { useState } from 'react';
import { Modal } from '../ui/Modal';
import type { PostAudience } from '../../lib/demoFamily';
import { useDemoFamily } from '../../context/DemoFamilyContext';

export function PostComposer({ defaultAudience = 'family' }: { defaultAudience?: PostAudience }) {
  const { addPost } = useDemoFamily();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<PostAudience>(defaultAudience);
  const [containsChildren, setContainsChildren] = useState(false);
  const [confirmPublic, setConfirmPublic] = useState(false);

  const tryPublish = () => {
    if (!content.trim()) return;
    if (audience === 'public' && !confirmPublic) {
      setConfirmPublic(true);
      return;
    }
    addPost({
      memberId: 'ananya',
      content: content.trim(),
      audience,
      containsChildren,
      kind: 'update',
    });
    setContent('');
    setConfirmPublic(false);
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fam-card w-full px-4 py-3 text-left text-sm fam-muted">
        Share a family moment…
      </button>
      <Modal open={open} onClose={() => { setOpen(false); setConfirmPublic(false); }} title="Create a post">
        <textarea className="fam-input mb-4" rows={4} value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's happening in the family?" />
        <p className="mb-2 text-sm font-medium">Audience</p>
        <div className="mb-4 space-y-2">
          {([
            ['family', 'Family only'],
            ['relatives', 'Selected relatives'],
            ['public', 'Public'],
          ] as const).map(([id, label]) => (
            <label key={id} className="flex items-center gap-2 text-sm">
              <input type="radio" name="audience" checked={audience === id} onChange={() => { setAudience(id); setConfirmPublic(false); }} />
              {label}
            </label>
          ))}
        </div>
        <p className="mb-4 text-xs fam-muted">Selected audience: <strong>{audience === 'family' ? 'Family only' : audience === 'relatives' ? 'Selected relatives' : 'Public'}</strong></p>
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={containsChildren} onChange={(e) => setContainsChildren(e.target.checked)} />
          This post includes photos of children
        </label>
        {confirmPublic ? (
          <div className="mb-4 rounded-2xl border p-3 text-sm" style={{ borderColor: 'var(--border)', background: 'var(--primary-soft)' }}>
            {containsChildren
              ? 'This post includes children and is becoming public. Please confirm before publishing.'
              : 'You are changing this post from a private family audience to Public. Continue?'}
          </div>
        ) : null}
        <button type="button" className="fam-btn-primary w-full" onClick={tryPublish}>
          {confirmPublic ? 'Confirm & publish' : 'Publish'}
        </button>
      </Modal>
    </>
  );
}
