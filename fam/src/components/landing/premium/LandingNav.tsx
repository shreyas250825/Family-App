import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#features', label: 'Features' },
  { href: '#product', label: 'Product' },
  { href: '#privacy', label: 'Privacy' },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-[#050505]/90 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
          <Link to="/" className="text-lg font-semibold tracking-[0.2em] text-stone-100 sm:text-xl" onClick={close}>
            FAMZEE
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-stone-400 transition hover:text-stone-100">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <Link to="/login" className="text-sm font-medium text-stone-300 transition hover:text-white">
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-stone-100 px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition hover:bg-white"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-stone-300 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-[#050505] md:hidden">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="text-lg font-semibold tracking-[0.2em] text-stone-100">FAMZEE</span>
            <button type="button" onClick={close} className="p-2 text-stone-400" aria-label="Close menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-5 pt-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="border-b border-white/[0.06] py-5 text-2xl font-light text-stone-100"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              onClick={close}
              className="mt-8 flex min-h-[52px] items-center justify-center rounded-full border border-white/15 text-stone-200"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={close}
              className="flex min-h-[52px] items-center justify-center rounded-full bg-stone-100 font-semibold text-[#0a0a0a]"
            >
              Get started
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
