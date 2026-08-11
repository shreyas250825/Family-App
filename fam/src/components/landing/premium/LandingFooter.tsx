import { Link } from 'react-router-dom';

export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030303] py-12 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 sm:px-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold tracking-[0.2em] text-stone-400">FAMZEE</p>
          <p className="mt-2 text-xs text-stone-600">Private family space · © {new Date().getFullYear()}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-stone-500">
          <Link to="/login" className="transition hover:text-stone-300">Log in</Link>
          <Link to="/register" className="transition hover:text-stone-300">Sign up</Link>
          <Link to="/privacy" className="transition hover:text-stone-300">Privacy</Link>
          <Link to="/terms" className="transition hover:text-stone-300">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
