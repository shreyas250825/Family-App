import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/60 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <span className="text-lg">👨‍👩‍👧</span>
          </div>
          <span className="text-xl font-bold text-gradient">FamZee</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-600 hover:text-brand-primary transition-colors font-medium">
            Features
          </a>
          <a href="#highlights" className="text-sm text-slate-600 hover:text-brand-primary transition-colors font-medium">
            Highlights
          </a>
          <a href="#cta" className="text-sm text-slate-600 hover:text-brand-primary transition-colors font-medium">
            Get Started
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-brand-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-gradient-brand rounded-xl text-white text-sm font-semibold shadow-soft hover:shadow-glow hover:scale-105 transition-all"
          >
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
