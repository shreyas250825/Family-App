import type { DemoInvite } from '../../context/DemoFamilyContext';

const STATUS_LABEL = {
  pending: 'Pending',
  accepted: 'Accepted',
  expired: 'Expired',
  revoked: 'Revoked',
};

export function InvitationCard({
  invite,
  onStatus,
}: {
  invite: DemoInvite;
  onStatus: (status: DemoInvite['status']) => void;
}) {
  return (
    <article className="fam-card p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{invite.kind === 'code' ? 'One-time joining invitation' : 'Email invitation'}</p>
          <p className="text-xs fam-muted">{invite.familyName} · from {invite.invitingMember}</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: 'var(--primary-soft)' }}>
          {STATUS_LABEL[invite.status]}
        </span>
      </div>
      {invite.code ? <p className="font-mono text-lg tracking-widest">{invite.code}</p> : null}
      {invite.link ? <p className="mt-1 truncate text-xs fam-muted">{invite.link}</p> : null}
      {invite.email ? <p className="text-sm">{invite.email}</p> : null}
      <p className="mt-2 text-xs fam-muted">{invite.expiresAt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(['pending', 'accepted', 'expired', 'revoked'] as const).map((status) => (
          <button key={status} type="button" onClick={() => onStatus(status)} className="fam-btn px-3 py-1 text-xs capitalize">
            {status}
          </button>
        ))}
      </div>
    </article>
  );
}
