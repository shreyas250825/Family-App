import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                <span className="text-lg">👨‍👩‍👧</span>
              </div>
              <h3 className="text-2xl font-bold">FamZee</h3>
            </div>
            <p className="text-slate-400 mb-4 max-w-md leading-relaxed">
              Your family. Your circle. Connected across generations with love, memories, and meaningful moments.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-slate-300">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#highlights" className="text-slate-400 hover:text-white transition-colors text-sm">Highlights</a></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">Live Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider text-slate-300">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 FamZee. All rights reserved.</p>
          <p className="text-slate-500 text-sm">Made with 💜 for families everywhere</p>
        </div>
      </div>
    </footer>
  );
}
