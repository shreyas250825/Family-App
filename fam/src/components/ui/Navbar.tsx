import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight bg-ig-gradient bg-clip-text text-transparent">
            FamZee
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a href="#features" className="hover:text-neutral-900 transition-colors">Features</a>
          <a href="#showcase" className="hover:text-neutral-900 transition-colors">Product</a>
          <a href="#get-started" className="hover:text-neutral-900 transition-colors">Get Started</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-ig-gradient rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
