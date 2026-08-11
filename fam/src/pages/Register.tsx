import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFamZee } from '../context/FamZeeContext';

export function Register() {
  const navigate = useNavigate();
  const { register } = useFamZee();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.12)_0%,_transparent_50%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8 sm:px-6">
        <div className="mb-8 pt-4">
          <Link to="/" className="text-sm font-semibold tracking-[0.2em] text-stone-400">
            FAMZEE
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center pb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-stone-500">Start your family&apos;s private space.</p>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full min-h-[48px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full min-h-[48px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full min-h-[48px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-[#0a0a0a] transition hover:bg-white disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-stone-200 hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs leading-relaxed text-stone-600">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-stone-400">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="underline hover:text-stone-400">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
