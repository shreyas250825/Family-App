export function PrivacyControls({
  birthdayVisible,
  profileVisible,
  hideChildrenPublic,
  isChild,
  onChange,
}: {
  birthdayVisible: boolean;
  profileVisible: boolean;
  hideChildrenPublic: boolean;
  isChild: boolean;
  onChange: (patch: { birthdayVisible?: boolean; profileVisible?: boolean; hideChildrenPublic?: boolean }) => void;
}) {
  return (
    <div className="space-y-3 rounded-2xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--primary-soft)' }}>
      <p className="text-sm font-semibold">Privacy</p>
      <Toggle label="Birthday visibility" checked={birthdayVisible} onChange={(v) => onChange({ birthdayVisible: v })} />
      <Toggle label="Profile visibility" checked={profileVisible} onChange={(v) => onChange({ profileVisible: v })} />
      <Toggle
        label="Hide children's details from public visibility"
        checked={hideChildrenPublic}
        onChange={(v) => onChange({ hideChildrenPublic: v })}
      />
      {isChild ? (
        <p className="text-xs fam-muted">Children&apos;s profiles stay limited on public surfaces in this demo.</p>
      ) : null}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 rounded-full transition"
        style={{ background: checked ? 'var(--primary)' : 'var(--border)' }}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? 'left-5' : 'left-0.5'}`}
        />
      </button>
    </label>
  );
}
