import { Link, useLocation } from 'react-router-dom';
import { useState, type ComponentType } from 'react';
import { useFamZee } from '../../context/FamZeeContext';
import {
  HomeIcon,
  FeedIcon,
  CalendarIcon,
  AlbumIcon,
  MessageIcon,
  UsersIcon,
} from '../../constants/navigation';

const MAIN_NAV = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/feed', label: 'Feed', icon: FeedIcon },
  { path: '/events', label: 'Events', icon: CalendarIcon },
  { path: '/albums', label: 'Albums', icon: AlbumIcon },
  { path: '/messages', label: 'Messages', icon: MessageIcon },
];

const MOBILE_NAV = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/feed', label: 'Feed', icon: FeedIcon },
  { path: '/events', label: 'Events', icon: CalendarIcon },
  { path: '/albums', label: 'Albums', icon: AlbumIcon },
  { path: '/messages', label: 'Messages', icon: MessageIcon },
];

const SECONDARY_NAV = [
  { path: '/family', label: 'Family', icon: UsersIcon },
];

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useFamZee();
  const close = () => setMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#050505] text-stone-100">
      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={close} aria-hidden />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-56 flex-col border-r border-white/[0.06] bg-[#0a0a0a] transition-transform lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center px-5">
          <Link to="/" className="text-sm font-medium text-stone-200" onClick={close}>
            FamZee
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2">
          {MAIN_NAV.map((item) => (
            <SidebarLink key={item.path} {...item} active={isActive(item.path)} onNavigate={close} />
          ))}
          <div className="my-3 border-t border-white/[0.06]" />
          {SECONDARY_NAV.map((item) => (
            <SidebarLink key={item.path} {...item} active={isActive(item.path)} onNavigate={close} />
          ))}
          <Link
            to="/settings"
            onClick={close}
            className="mb-0.5 mt-0.5 block rounded-lg px-3 py-2 text-sm text-stone-500 hover:bg-white/[0.03] hover:text-stone-300"
          >
            Settings
          </Link>
        </nav>

        {user ? (
          <div className="border-t border-white/[0.06] px-4 py-3">
            <p className="truncate text-xs font-medium text-stone-300">{user.name}</p>
            <p className="truncate text-[10px] text-stone-600">{user.email}</p>
          </div>
        ) : null}
      </aside>

      <div className="lg:pl-56">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#050505]/90 px-4 backdrop-blur-sm lg:hidden">
          <div className="flex items-center">
            <button type="button" onClick={() => setMenuOpen(true)} className="mr-3 text-stone-400" aria-label="Menu">
              ☰
            </button>
            <span className="text-sm font-medium text-stone-200">FamZee</span>
          </div>
          <Link to="/family" className="text-xs text-stone-500 hover:text-stone-300">
            Family
          </Link>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:pb-8">
          {title ? <h1 className="mb-6 text-xl font-medium text-stone-100">{title}</h1> : null}
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/[0.06] bg-[#0a0a0a]/95 px-2 py-2 backdrop-blur-md lg:hidden">
        {MOBILE_NAV.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] transition ${
              isActive(item.path) ? 'text-stone-100' : 'text-stone-600'
            }`}
          >
            <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'opacity-100' : 'opacity-50'}`} />
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
      className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
        active ? 'bg-white/[0.06] text-stone-100' : 'text-stone-500 hover:bg-white/[0.03] hover:text-stone-300'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0 opacity-70" />
      {label}
    </Link>
  );
}
