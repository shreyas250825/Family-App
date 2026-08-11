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
    <div className="min-h-screen bg-[#050505] text-stone-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.12)_0%,_transparent_50%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8 sm:px-6">
        <div className="mb-8 pt-4">
          <Link to="/" className="text-sm font-semibold tracking-[0.2em] text-stone-400">
            FAMZEE
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center pb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-stone-500">Explore the product or sign in to your account.</p>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleDemo}
            disabled={demoLoading || loading}
            className="mt-8 flex min-h-[52px] w-full items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-[#0a0a0a] transition hover:bg-white disabled:opacity-60"
          >
            {demoLoading ? 'Loading...' : 'Explore with sample family'}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#050505] px-3 text-xs uppercase tracking-wide text-stone-600">or sign in</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full min-h-[48px] rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
            <button
              type="submit"
              disabled={loading || demoLoading}
              className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-stone-200 transition hover:bg-white/[0.04] disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-stone-200 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
