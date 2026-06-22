import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="text-xl font-bold bg-ig-gradient bg-clip-text text-transparent">
          FamZee
        </Link>
        <div className="flex gap-8 text-sm text-neutral-500">
          <a href="#features" className="hover:text-neutral-900 transition-colors">Features</a>
          <Link to="/login" className="hover:text-neutral-900 transition-colors">Log in</Link>
          <Link to="/register" className="hover:text-neutral-900 transition-colors">Sign up</Link>
        </div>
        <p className="text-sm text-neutral-400">© {new Date().getFullYear()} FamZee. All rights reserved.</p>
      </div>
    </footer>
  );
}
