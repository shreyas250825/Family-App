import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFamZee } from '../context/FamZeeContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, loginWithApple, isAuthenticated, needsOnboarding } = useFamZee();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as { from?: string })?.from || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(needsOnboarding ? '/onboarding' : from, { replace: true });
    }
  }, [isAuthenticated, needsOnboarding, from, navigate]);

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

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setOauthLoading(true);
    setError('');
    try {
      if (provider === 'google') await loginWithGoogle();
      else await loginWithApple();
    } catch {
      setError('Sign in failed. Please try again.');
    } finally {
      setOauthLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-ig-gradient opacity-30" />
        <Link to="/" className="relative text-2xl font-bold bg-ig-gradient bg-clip-text text-transparent">
          FamZee
        </Link>
        <div className="relative">
          <h1 className="text-4xl font-bold leading-tight mb-4">Welcome back</h1>
          <p className="text-neutral-300 text-lg max-w-sm">
            Your family's private space for photos, events, and conversations.
          </p>
        </div>
        <p className="relative text-sm text-neutral-500">© FamZee</p>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="text-2xl font-bold bg-ig-gradient bg-clip-text text-transparent">FamZee</Link>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Log in</h2>
          <p className="text-neutral-500 text-sm mb-8">Enter your account details to continue.</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300"
            />
            <button
              type="submit"
              disabled={loading || oauthLoading}
              className="w-full py-3 bg-neutral-900 text-white rounded-lg font-semibold text-sm hover:bg-neutral-800 disabled:opacity-60 transition-colors"
            >
              {loading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-neutral-400 uppercase tracking-wide">or</span></div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={loading || oauthLoading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('apple')}
              disabled={loading || oauthLoading}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <p className="text-center text-sm text-neutral-500 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-neutral-900 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
