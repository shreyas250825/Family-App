import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { InvitationCard } from '../components/family/InvitationCard';
import { useDemoFamily } from '../context/DemoFamilyContext';

export function Invitations() {
  const { invites, generateCodeInvite, sendEmailInvite, setInviteStatus } = useDemoFamily();
  const [email, setEmail] = useState('');

  return (
    <AppLayout title="Family Invitations">
      <p className="mb-8 max-w-xl fam-muted">Demo invitations only — codes are generated locally and emails are not sent.</p>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="fam-card p-5">
          <h2 className="font-semibold">One-time joining invitation</h2>
          <p className="mt-1 text-sm fam-muted">Create a code and link with an expiry. Status can be simulated.</p>
          <button type="button" className="fam-btn-primary mt-4" onClick={generateCodeInvite}>
            Generate invite
          </button>
        </div>
        <form
          className="fam-card p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) return;
            sendEmailInvite(email.trim());
            setEmail('');
          }}
        >
          <h2 className="font-semibold">Email invitation</h2>
          <p className="mt-1 mb-3 text-sm fam-muted">Family name: The Sharma Family · Inviting member: Ananya Sharma</p>
          <input className="fam-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="fam-btn-primary mt-4">Send invitation</button>
        </form>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {invites.map((invite) => (
          <InvitationCard key={invite.id} invite={invite} onStatus={(status) => setInviteStatus(invite.id, status)} />
        ))}
      </div>
    </AppLayout>
  );
}
