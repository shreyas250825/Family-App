import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFamZee } from '../../context/FamZeeContext';
import {
  APP_NAV_ITEMS,
  FAMILY_NAV_ITEM,
  getNavHref,
  isNavActive,
} from '../../constants/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, rightPanel, title }: AppLayoutProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, data } = useFamZee();
  const unreadCount = data.notifications.filter((n) => !n.isRead).length;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-amber-50/20">
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-out drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-[70] w-72 flex flex-col glass-dark border-r border-slate-200/80 transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-tour="mobile-nav"
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
              <span className="text-white text-lg">👨‍👩‍👧</span>
            </div>
            <span className="text-xl font-bold text-gradient">FamZee</span>
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {APP_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              pathname={location.pathname}
              onNavigate={closeMenu}
              badge={item.label === 'Notifications' ? unreadCount : item.badge}
            />
          ))}
          <NavLink item={FAMILY_NAV_ITEM} pathname={location.pathname} onNavigate={closeMenu} className="mt-4" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80">
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-primary/20" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-40 glass-dark border-r border-slate-200/80" data-tour="app-sidebar">
          <div className="p-6 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <span className="text-white text-lg">👨‍👩‍👧</span>
              </div>
              <span className="text-xl font-bold text-gradient">FamZee</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {APP_NAV_ITEMS.map((item) => (
              <NavLink key={item.label} item={item} pathname={location.pathname} badge={item.label === 'Notifications' ? unreadCount : item.badge} />
            ))}
            <NavLink item={FAMILY_NAV_ITEM} pathname={location.pathname} className="mt-4" highlight="secondary" />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80">
              <div className="relative">
                <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-primary/20" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.role}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-dark border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <span className="text-sm">👨‍👩‍👧</span>
              </div>
              <span className="font-bold text-gradient">FamZee</span>
            </Link>
          </div>
          <Link
            to="/messages"
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600"
            aria-label="Messages"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full" />
          </Link>
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
            {title && (
              <h1 className="text-2xl font-bold text-slate-800 mb-6 animate-fade-in">{title}</h1>
            )}
            <div className={`flex gap-6 ${rightPanel ? 'flex-col xl:flex-row' : ''}`}>
              <div className="flex-1 min-w-0">{children}</div>
              {rightPanel && (
                <aside className="w-full xl:w-80 flex-shrink-0 space-y-4" data-tour="dashboard-sidebar">
                  {rightPanel}
                </aside>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
  className = '',
  highlight = 'primary',
  badge,
}: {
  item: (typeof APP_NAV_ITEMS)[number] | typeof FAMILY_NAV_ITEM;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
  highlight?: 'primary' | 'secondary';
  badge?: number;
}) {
  const Icon = item.icon;
  const active = isNavActive(pathname, item, item.label);
  const href = getNavHref(item);
  const badgeCount = badge ?? item.badge;

  const activeClass =
    highlight === 'secondary'
      ? 'bg-brand-secondary/10 text-brand-secondary shadow-soft'
      : 'bg-brand-primary/10 text-brand-primary shadow-soft';

  return (
    <Link
      to={href}
      onClick={onNavigate}
      data-tour={item.tourId}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${className} ${
        active ? activeClass : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{item.label}</span>
      {badgeCount ? (
        <span className="px-2 py-0.5 text-xs font-semibold bg-brand-accent text-white rounded-full">
          {badgeCount > 9 ? '9+' : badgeCount}
        </span>
      ) : null}
    </Link>
  );
}
