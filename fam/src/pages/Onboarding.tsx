import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFamZee } from '../context/FamZeeContext';

export function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding, addMember, uploadImage } = useFamZee();
  const [step, setStep] = useState(1);
  const [familyName, setFamilyName] = useState(`${user?.name.split(' ')[0] || 'My'}'s Family`);
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<string | undefined>();
  const [memberName, setMemberName] = useState('');
  const coverRef = useRef<HTMLInputElement>(null);

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverPhoto(await uploadImage(file));
  };

  const finish = () => {
    completeOnboarding(familyName, description, coverPhoto);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-neutral-400 mb-3">Welcome to FamZee</p>
          <h1 className="text-3xl font-bold text-neutral-900">Set up your family circle</h1>
          <p className="text-neutral-500 mt-2">Step {step} of 3 — takes under a minute</p>
          <div className="flex gap-2 justify-center mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1 w-16 rounded-full ${s <= step ? 'bg-neutral-900' : 'bg-neutral-200'}`} />
            ))}
          </div>
        </div>

        <div className="border border-neutral-200 rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Family name</label>
                <input
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  placeholder="The Sharma Family"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">About your family (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 resize-none"
                  placeholder="A few words about your family..."
                />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!familyName.trim()}
                className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-semibold disabled:opacity-40 hover:bg-neutral-800 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="text-sm text-neutral-600">Add a cover photo for your family profile.</p>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
              <button
                onClick={() => coverRef.current?.click()}
                className="w-full h-40 rounded-xl border-2 border-dashed border-neutral-200 overflow-hidden hover:border-neutral-400 transition-colors"
              >
                {coverPhoto ? (
                  <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-neutral-400 text-sm">Tap to upload cover photo</span>
                )}
              </button>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-600">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-neutral-900 text-white rounded-xl font-semibold">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <p className="text-sm text-neutral-600">Invite your first family member (optional — you can add more later).</p>
              <input
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                placeholder="Member name"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-600">
                  Back
                </button>
                <button
                  onClick={() => {
                    if (memberName.trim()) addMember(memberName.trim());
                    finish();
                  }}
                  className="flex-1 py-3 bg-neutral-900 text-white rounded-xl font-semibold"
                >
                  {memberName.trim() ? 'Finish & invite' : 'Skip & finish'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
