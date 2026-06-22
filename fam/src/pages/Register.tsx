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
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold bg-ig-gradient bg-clip-text text-transparent">FamZee</Link>
          <h2 className="text-2xl font-bold text-neutral-900 mt-6 mb-2">Create your account</h2>
          <p className="text-neutral-500 text-sm">Join your family's private circle</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-ig-gradient text-white rounded-lg font-semibold text-sm disabled:opacity-60 hover:opacity-95 transition-opacity"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-neutral-900 font-semibold hover:underline">Log in</Link>
        </p>

        <p className="text-center text-xs text-neutral-400 mt-6 leading-relaxed">
          By signing up, you agree to FamZee's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
