import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#feed', label: 'Features' },
  { href: '#showcase', label: 'Product' },
  { href: '#trust', label: 'Privacy' },
];


  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-neutral-100/80 bg-white/90 shadow-sm backdrop-blur-xl' : 'bg-white/70 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="text-xl font-bold tracking-tight text-neutral-900" onClick={close}>
            FamZee
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:text-neutral-900"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Sign up
            </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition hover:bg-neutral-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm" onClick={close} aria-hidden />
          <nav className="absolute inset-x-0 top-16 border-b border-neutral-100 bg-white px-5 py-6 shadow-lg">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-neutral-800 transition hover:bg-neutral-50"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-6">
              <Link
                to="/login"
                onClick={close}
                className="flex min-h-[48px] items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-800"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={close}
                className="flex min-h-[48px] items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>