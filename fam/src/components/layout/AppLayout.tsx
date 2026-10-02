import { Link, useLocation } from 'react-router-dom';
import { useState, type ComponentType, type ReactNode } from 'react';
import { useFamZee } from '../../context/FamZeeContext';
import { useTheme } from '../../context/ThemeContext';
import {
  HomeIcon,
  FeedIcon,
  AlbumIcon,
  UsersIcon,
  RootsIcon,
  TreeIcon,
  TimelineIcon,
  InviteIcon,
  GlobeIcon,
} from '../../constants/navigation';

const MAIN_NAV = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/family', label: 'Family', icon: UsersIcon },
  { path: '/roots', label: 'Family Roots', icon: RootsIcon },
  { path: '/timeline', label: 'Timeline', icon: TimelineIcon },
  { path: '/tree', label: 'Family Tree', icon: TreeIcon },
  { path: '/memories', label: 'Memories', icon: AlbumIcon },
  { path: '/feed', label: 'Family Feed', icon: FeedIcon },
  { path: '/public-feed', label: 'Public Feed', icon: GlobeIcon },
  { path: '/invitations', label: 'Invitations', icon: InviteIcon },
];

const MOBILE_NAV = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/family', label: 'Family', icon: UsersIcon },
  { path: '/feed', label: 'Feed', icon: FeedIcon },
  { path: '/memories', label: 'Memories', icon: AlbumIcon },
  { path: '/roots', label: 'Roots', icon: RootsIcon },
];

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useFamZee();
  const { appearance, toggleAppearance } = useTheme();
  const close = () => setMenuOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" style={{ background: 'rgba(20,10,30,0.4)' }} onClick={close} aria-hidden />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-60 flex-col border-r transition-transform lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--elevated)', borderColor: 'var(--border)' }}
      >
        <div className="flex h-14 items-center px-5">
          <Link to="/" className="font-display text-lg" onClick={close}>
            FamZee
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {MAIN_NAV.map((item) => (
            <SidebarLink key={item.path} {...item} active={isActive(item.path)} onNavigate={close} />
          ))}
          <Link
            to="/settings"
            onClick={close}
            className="mb-0.5 mt-2 block rounded-xl px-3 py-2 text-sm fam-muted hover:bg-[var(--primary-soft)]"
          >
            Profile / Settings
          </Link>
          <Link to="/create-family" onClick={close} className="mb-0.5 block rounded-xl px-3 py-2 text-sm fam-muted hover:bg-[var(--primary-soft)]">
            Create Family
          </Link>
        </nav>
        <div className="border-t px-4 py-3" style={{ borderColor: 'var(--border)' }}>
          <button type="button" onClick={toggleAppearance} className="fam-btn mb-3 w-full text-xs">
            {appearance === 'light' ? 'Dark theme' : 'Light theme'}
          </button>
          {user ? (
            <>
              <p className="truncate text-xs font-medium">{user.name}</p>
              <p className="truncate text-[10px] fam-muted">{user.email}</p>
            </>
          ) : null}
        </div>
      </aside>

      <div className="lg:pl-60">
        <header
          className="sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md lg:hidden"
          style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center">
            <button type="button" onClick={() => setMenuOpen(true)} className="mr-3 fam-muted" aria-label="Menu">
              ☰
            </button>
            <span className="font-display">FamZee</span>
          </div>
          <button type="button" onClick={toggleAppearance} className="text-xs fam-muted">
            {appearance === 'light' ? 'Dark' : 'Light'}
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:pb-8">
          {title ? <h1 className="font-display mb-6 text-3xl">{title}</h1> : null}
          {children}
        </main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t px-1 py-2 backdrop-blur-md lg:hidden"
        style={{ background: 'color-mix(in srgb, var(--elevated) 92%, transparent)', borderColor: 'var(--border)' }}
      >
        {MOBILE_NAV.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px]"
            style={{ color: isActive(item.path) ? 'var(--primary)' : 'var(--muted)' }}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function SidebarLink({
  path,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  path: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={path}
      onClick={onNavigate}
      className="mb-0.5 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition"
      style={{
        background: active ? 'var(--primary-soft)' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--muted)',
      }}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}
