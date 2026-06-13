import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('priya@salian.family');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1609220136736-443891a64571?w=1200&h=1400&fit=crop"
          alt="Family together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 via-brand-secondary/80 to-brand-primary/70" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-2xl">👨‍👩‍👧</span>
            </div>
            <span className="text-2xl font-bold">FamZee</span>
          </Link>

          <div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome back to your family circle
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Reconnect with the people who matter most. Your memories, events, and conversations are waiting.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/48?img=${i}`} alt="" className="w-10 h-10 rounded-full border-2 border-white/30" />
                ))}
              </div>
              <p className="text-sm text-white/70">Join 50,000+ connected families</p>
            </div>
          </div>

          <p className="text-sm text-white/50">© 2026 FamZee. Demo mode — no authentication required.</p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-hero">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
              <span className="text-lg">👨‍👩‍👧</span>
            </div>
            <span className="text-xl font-bold text-gradient">FamZee</span>
          </div>

          <div className="glass-dark rounded-3xl p-8 sm:p-10 shadow-card" data-tour="login-form">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign in to FamZee</h2>
              <p className="text-slate-500">Enter any credentials to explore the demo</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                  placeholder="you@family.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary" />
                  Remember me
                </label>
                <a href="#" className="text-brand-primary font-medium hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-brand rounded-xl text-white font-semibold shadow-soft hover:shadow-glow hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span>🔵</span> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span>📱</span> Apple
              </button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account?{' '}
              <Link to="/dashboard" className="text-brand-primary font-semibold hover:underline">
                Try the live demo
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
