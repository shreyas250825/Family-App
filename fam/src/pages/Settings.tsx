import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';

export function Settings() {
  const navigate = useNavigate();
  const { user, data, logout, updateProfile, deleteAccount, uploadImage } = useFamZee();
  const [pushEnabled, setPushEnabled] = useState(true);
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
    <AppLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex items-center gap-5">
          <div className="relative">
            <img src={user?.avatar} alt="" className="w-20 h-20 rounded-full object-cover ring-2 ring-neutral-100" />
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 bg-neutral-900 text-white rounded-full text-xs flex items-center justify-center"
            >
              +
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-neutral-900">{user?.name}</h2>
            <p className="text-neutral-500 text-sm">{user?.email}</p>
            <p className="text-xs text-neutral-400 mt-1 capitalize">Signed in with {user?.provider}</p>
          </div>
          <button
            onClick={() => { setName(user?.name || ''); setEditOpen(true); }}
            className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50"
          >
            Edit
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <h3 className="font-bold text-neutral-900 mb-4">Your family</h3>
          <p className="text-neutral-700 font-medium">{data.family.name}</p>
          <p className="text-sm text-neutral-500 mt-1">
            {data.members.length} member{data.members.length !== 1 ? 's' : ''} · {data.family.stats.photos} photos · {data.events.length} events
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <h3 className="font-bold text-neutral-900 mb-4">Notifications</h3>
          <label className="flex items-center justify-between">
            <span className="text-neutral-700 text-sm">Push notifications</span>
            <input type="checkbox" checked={pushEnabled} onChange={(e) => setPushEnabled(e.target.checked)} className="w-5 h-5 accent-neutral-900" />
          </label>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm space-y-3">
          <button onClick={handleLogout} className="w-full py-3 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors">
            Sign out
          </button>
          <button onClick={handleDelete} className="w-full py-3 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
            Delete account
          </button>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit profile">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 mb-4 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
        <button onClick={handleSaveProfile} className="w-full py-3 bg-neutral-900 text-white rounded-xl font-semibold">Save changes</button>
      </Modal>
    </AppLayout>
  );
}
