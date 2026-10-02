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
    <div className="fam-hero min-h-screen" style={{ color: 'var(--text)' }}>
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8 sm:px-6">
        <div className="mb-8 pt-4">
          <Link to="/" className="font-display text-lg">
            FamZee
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center pb-8">
          <h1 className="font-display text-4xl tracking-tight">Create your account</h1>
          <p className="mt-2 fam-muted">Start your family&apos;s private space.</p>

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
              className="fam-input min-h-[48px]"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="fam-input min-h-[48px]"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="fam-input min-h-[48px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="fam-btn-primary flex min-h-[52px] w-full items-center justify-center disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm fam-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs leading-relaxed fam-muted">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="underline">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
