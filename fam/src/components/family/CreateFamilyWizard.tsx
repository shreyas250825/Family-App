import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RELATIONSHIP_OPTIONS } from '../../lib/demoFamily';
import { useDemoFamily, type WizardMemberDraft } from '../../context/DemoFamilyContext';
import { useFamZee } from '../../context/FamZeeContext';

function uid() {
  return `wm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

const emptyMember = (): WizardMemberDraft => ({
  id: uid(),
  fullName: '',
  relationship: 'Family friend',
  dob: '',
  about: '',
  concealDob: false,
  isChild: false,
});

export function CreateFamilyWizard({ asOnboarding = false }: { asOnboarding?: boolean }) {
  const navigate = useNavigate();
  const { completeOnboarding, addMember, uploadImage } = useFamZee();
  const { wizard, saveWizardDraft, clearWizard } = useDemoFamily();
  const [phase, setPhase] = useState<'form' | 'review' | 'done'>(wizard.members.length ? 'form' : 'form');
  const fileRef = useRef<HTMLInputElement>(null);

  const draft = wizard.members.length ? wizard : { ...wizard, members: [emptyMember()] };
  const total = Math.max(draft.targetCount, draft.members.length, 1);
  const index = Math.min(draft.currentIndex, draft.members.length - 1);
  const current = draft.members[index];
  const progress = ((index + 1) / total) * 100;

  const updateCurrent = (patch: Partial<WizardMemberDraft>) => {
    const members = draft.members.map((m, i) => (i === index ? { ...m, ...patch } : m));
    saveWizardDraft({ ...draft, members });
  };

  const goNext = () => {
    if (!current.fullName.trim()) return;
    if (index === draft.members.length - 1 && draft.members.length < total) {
      saveWizardDraft({
        ...draft,
        members: [...draft.members, emptyMember()],
        currentIndex: index + 1,
      });
      return;
    }
    if (index < draft.members.length - 1) {
      saveWizardDraft({ ...draft, currentIndex: index + 1 });
      return;
    }
    setPhase('review');
  };

  const goBack = () => {
    if (phase === 'review') {
      setPhase('form');
      return;
    }
    if (index > 0) saveWizardDraft({ ...draft, currentIndex: index - 1 });
  };

  const finish = () => {
    const filled = draft.members.filter((m) => m.fullName.trim());
    if (asOnboarding) {
      completeOnboarding(draft.familyName || 'Our Family');
      filled.forEach((m) => addMember(m.fullName, m.relationship));
    }
    setPhase('done');
  };

  const ageHint = useMemo(() => {
    if (!current?.dob) return '';
    const year = Number(current.dob.slice(0, 4));
    if (!year) return '';
    const age = new Date().getFullYear() - year;
    return age < 18 ? 'Child profile — restricted public visibility' : 'Adult — optional DOB concealment';
  }, [current?.dob]);

  if (phase === 'done') {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] fam-muted">FamZee</p>
        <h1 className="font-display mt-3 text-4xl">Your family is ready</h1>
        <p className="mt-3 fam-muted">A private circle for {draft.familyName || 'your family'} — demo confirmation only.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            className="fam-btn-primary"
            onClick={() => {
              clearWizard();
              navigate('/family', { replace: true });
            }}
          >
            Open family home
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'review') {
    return (
      <div className="mx-auto max-w-2xl py-6">
        <h1 className="font-display text-3xl">Review members</h1>
        <p className="mt-1 fam-muted">Edit anyone before the final confirmation.</p>
        <div className="mt-6 space-y-3">
          {draft.members.filter((m) => m.fullName.trim()).map((member, i) => (
            <button
              key={member.id}
              type="button"
              className="fam-card flex w-full items-center gap-3 p-4 text-left"
              onClick={() => {
                saveWizardDraft({ ...draft, currentIndex: i });
                setPhase('form');
              }}
            >
              <div className="h-12 w-12 overflow-hidden rounded-full" style={{ background: 'var(--primary-soft)' }}>
                {member.photo ? <img src={member.photo} alt="" className="h-full w-full object-cover" /> : null}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{member.fullName}</p>
                <p className="text-xs fam-muted">{member.relationship}</p>
              </div>
              <span className="text-xs fam-muted">Edit</span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="fam-btn" onClick={goBack}>Back</button>
          <button type="button" className="fam-btn-primary flex-1" onClick={finish}>Confirm family</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg py-6">
      <p className="text-xs uppercase tracking-[0.2em] fam-muted">Create Your Family</p>
      <h1 className="font-display mt-2 text-3xl">Member {index + 1} of {total}</h1>
      <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: 'var(--primary-soft)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--primary)' }} />
      </div>

      <div className="mt-6 space-y-4">
        <label className="block text-sm">
          Family name
          <input className="fam-input mt-1" value={draft.familyName} onChange={(e) => saveWizardDraft({ ...draft, familyName: e.target.value })} />
        </label>
        <label className="block text-sm">
          Full name
          <input className="fam-input mt-1" value={current.fullName} onChange={(e) => updateCurrent({ fullName: e.target.value })} />
        </label>
        <label className="block text-sm">
          Relationship to main member
          <select className="fam-input mt-1" value={current.relationship} onChange={(e) => updateCurrent({ relationship: e.target.value })}>
            {RELATIONSHIP_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Date of birth
          <input type="date" className="fam-input mt-1" value={current.dob} onChange={(e) => updateCurrent({ dob: e.target.value })} />
        </label>
        {ageHint ? <p className="text-xs" style={{ color: 'var(--primary)' }}>{ageHint}</p> : null}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={current.concealDob} onChange={(e) => updateCurrent({ concealDob: e.target.checked })} />
          Conceal date of birth (adults)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={current.isChild} onChange={(e) => updateCurrent({ isChild: e.target.checked })} />
          This person is a child — restricted visibility
        </label>
        <label className="block text-sm">
          About this person
          <textarea className="fam-input mt-1" rows={3} value={current.about} onChange={(e) => updateCurrent({ about: e.target.value })} />
        </label>
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) updateCurrent({ photo: await uploadImage(file) });
          }} />
          <button type="button" className="fam-btn" onClick={() => fileRef.current?.click()}>
            {current.photo ? 'Change profile photo' : 'Add profile photo'}
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="button" className="fam-btn" onClick={goBack} disabled={index === 0}>Back</button>
        <button type="button" className="fam-btn" onClick={() => saveWizardDraft(draft)}>Save draft</button>
        <button type="button" className="fam-btn-primary flex-1" onClick={goNext}>
          {index + 1 >= total ? 'Review' : 'Save & Next'}
        </button>
      </div>
    </div>
  );
}
