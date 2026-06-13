export interface TourStep {
  id: string;
  path: string;
  title: string;
  description: string;
  target?: string;
  placement?: 'top' | 'bottom' | 'center';
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    path: '/',
    title: 'Welcome to FamZee',
    description: 'This guided tour walks you through the full demo in under 5 minutes. Perfect for client presentations.',
    placement: 'center',
  },
  {
    id: 'hero',
    path: '/',
    title: 'Your Family Circle',
    description: 'The landing page showcases FamZee\'s warm, family-first brand — built to impress investors and clients instantly.',
    target: '[data-tour="hero"]',
    placement: 'bottom',
  },
  {
    id: 'features',
    path: '/',
    title: 'Platform Features',
    description: 'Memory sharing, events, messaging, and albums — everything a modern family platform needs.',
    target: '[data-tour="features"]',
    placement: 'top',
  },
  {
    id: 'login',
    path: '/login',
    title: 'Premium Sign In',
    description: 'Enter any credentials to access the demo. No backend or authentication required.',
    target: '[data-tour="login-form"]',
    placement: 'center',
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    title: 'Family Dashboard',
    description: 'The main wow-factor page — a live feed of family posts, photos, and milestone updates.',
    target: '[data-tour="dashboard-feed"]',
    placement: 'bottom',
  },
  {
    id: 'sidebar',
    path: '/dashboard',
    title: 'Smart Sidebar',
    description: 'Upcoming birthdays, events, and online family members — always visible at a glance.',
    target: '[data-tour="dashboard-sidebar"]',
    placement: 'bottom',
  },
  {
    id: 'family',
    path: '/family',
    title: 'Family Profile',
    description: 'Cover photo, member grid, stats, and recent memories — your family\'s digital home.',
    target: '[data-tour="family-profile"]',
    placement: 'bottom',
  },
  {
    id: 'events',
    path: '/events',
    title: 'Events & Calendar',
    description: 'Birthdays, anniversaries, and gatherings in a beautiful card-based layout.',
    target: '[data-tour="events-page"]',
    placement: 'bottom',
  },
  {
    id: 'albums',
    path: '/albums',
    title: 'Photo Albums',
    description: 'Vacation, wedding, and birthday albums organized in a premium grid gallery.',
    target: '[data-tour="albums-page"]',
    placement: 'bottom',
  },
  {
    id: 'messages',
    path: '/messages',
    title: 'Family Messaging',
    description: 'WhatsApp-inspired chat UI with group conversations and rich messaging.',
    target: '[data-tour="messages-page"]',
    placement: 'bottom',
  },
  {
    id: 'complete',
    path: '/dashboard',
    title: 'Demo Complete!',
    description: 'You\'ve seen the full FamZee experience. Explore freely or restart the tour anytime.',
    placement: 'center',
  },
];

export const TOUR_STORAGE_KEY = 'famzee-tour-dismissed';
