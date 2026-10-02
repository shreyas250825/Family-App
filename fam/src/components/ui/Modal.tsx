import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(20,12,28,0.45)' }} onClick={onClose} />
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl border ${wide ? 'max-w-3xl' : 'max-w-lg'}`}
        style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)', boxShadow: 'var(--shadow)' }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-5 py-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-base font-medium">{title}</h2>
          <button type="button" onClick={onClose} className="fam-muted" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
