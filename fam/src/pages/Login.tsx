import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useFamZee } from '../context/FamZeeContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, loadDemoExperience, isAuthenticated, needsOnboarding } = useFamZee();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as { from?: string })?.from || '/dashboard';
  const autoDemo = searchParams.get('demo') === '1';

  const handleDemo = useCallback(async () => {
    setDemoLoading(true);
    setError('');
    try {
      await loadDemoExperience();
    } catch {
      setError('Could not load the sample family. Please try again.');
    } finally {
      setDemoLoading(false);
    }
  }, [loadDemoExperience]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(needsOnboarding ? '/onboarding' : from, { replace: true });
    }
  }, [isAuthenticated, needsOnboarding, from, navigate]);

  useEffect(() => {
    if (autoDemo && !isAuthenticated) {
      handleDemo();
    }
  }, [autoDemo, isAuthenticated, handleDemo]);

  if (isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
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
          <h1 className="font-display text-4xl tracking-tight">Welcome back</h1>
          <p className="mt-2 fam-muted">Explore the product or sign in to your account.</p>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleDemo}
            disabled={demoLoading || loading}
            className="fam-btn-primary mt-8 flex min-h-[52px] w-full items-center justify-center disabled:opacity-60"
          >
            {demoLoading ? 'Loading...' : 'Explore with sample family'}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs uppercase tracking-wide fam-muted" style={{ background: 'var(--bg)' }}>or sign in</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="fam-input min-h-[48px]"
            />
            <button
              type="submit"
              disabled={loading || demoLoading}
              className="fam-btn flex min-h-[52px] w-full items-center justify-center disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm fam-muted">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{ color: 'var(--primary)' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
