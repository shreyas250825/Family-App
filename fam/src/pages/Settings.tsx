import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { ThemeSelector } from '../components/family/ThemeSelector';
import { useFamZee } from '../context/FamZeeContext';

export function Settings() {
  const navigate = useNavigate();
  const { user, data, logout, updateProfile, deleteAccount, uploadImage } = useFamZee();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = () => {
    if (confirm('Delete your account and all family data? This cannot be undone.')) {
      deleteAccount();
      navigate('/');
    }
  };

  const handleSaveProfile = () => {
    updateProfile({ name: name.trim() || user?.name });
    setEditOpen(false);
  };

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      updateProfile({ avatar: url });
    }
  };

  return (
    <AppLayout title="Profile / Settings">
      <div className="max-w-2xl space-y-6">
        <div className="fam-card flex items-center gap-5 p-6">
          <div className="relative">
            <img src={user?.avatar} alt="" className="h-20 w-20 rounded-full object-cover" />
            <button
              type="button"
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full text-xs text-white"
              style={{ background: 'var(--primary)' }}
            >
              +
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-medium">{user?.name}</h2>
            <p className="text-sm fam-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => { setName(user?.name || ''); setEditOpen(true); }}
            className="fam-btn"
          >
            Edit
          </button>
        </div>

        <div className="fam-card p-6">
          <h3 className="mb-4 font-medium">Theme</h3>
          <ThemeSelector />
        </div>

        <div className="fam-card p-6">
          <h3 className="mb-4 font-medium">Your family</h3>
          <p className="font-medium">{data.family.name}</p>
          <p className="mt-1 text-sm fam-muted">
            {data.members.length} member{data.members.length !== 1 ? 's' : ''} · {data.family.stats.photos} photos · {data.events.length} events
          </p>
        </div>

        <div className="fam-card space-y-3 p-6">
          <button type="button" onClick={handleLogout} className="fam-btn-primary w-full py-3">
            Sign out
          </button>
          <button type="button" onClick={handleDelete} className="w-full rounded-xl border border-red-300 py-3 font-semibold text-red-600">
            Delete account
          </button>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit profile">
        <input value={name} onChange={(e) => setName(e.target.value)} className="fam-input mb-4" />
        <button type="button" onClick={handleSaveProfile} className="fam-btn-primary w-full py-3">Save changes</button>
      </Modal>
    </AppLayout>
  );
}
