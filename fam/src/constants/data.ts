import { Feature, Product } from '../types';

export const FEATURES: Feature[] = [
  {
    id: 'memory-sharing',
    title: 'Memory Sharing',
    description: 'Capture and preserve precious moments with photos, stories, and voice notes across generations.',
    icon: '📸',
  },
  {
    id: 'family-events',
    title: 'Family Events',
    description: 'Never miss a birthday, anniversary, or reunion with smart reminders and shared calendars.',
    icon: '🎉',
  },
  {
    id: 'private-messaging',
    title: 'Private Messaging',
    description: 'Stay in touch with secure, family-only conversations — from quick updates to group chats.',
    icon: '💬',
  },
  {
    id: 'photo-albums',
    title: 'Photo Albums',
    description: 'Organize vacations, weddings, and milestones into beautiful shared albums everyone can enjoy.',
    icon: '🖼️',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'family-feed',
    title: 'Family Feed',
    description: 'A warm, curated stream of updates, photos, and celebrations from your entire family circle.',
    features: ['Real-time updates', 'Photo & video posts', 'Reactions & comments'],
  },
  {
    id: 'smart-calendar',
    title: 'Smart Calendar',
    description: 'Track birthdays, anniversaries, and gatherings with intelligent reminders for every member.',
    features: ['Birthday alerts', 'Event RSVPs', 'Recurring traditions'],
  },
  {
    id: 'memory-vault',
    title: 'Memory Vault',
    description: 'Preserve your family legacy with organized albums, timelines, and milestone collections.',
    features: ['Unlimited albums', 'Timeline view', 'Generational archives'],
  },
  {
    id: 'family-chat',
    title: 'Family Chat',
    description: 'Modern messaging built for families — group chats, direct messages, and rich media sharing.',
    features: ['Group conversations', 'Voice messages', 'Photo sharing'],
  },
];

export const LANDING_STATS = [
  { value: '50K+', label: 'Families Connected' },
  { value: '2M+', label: 'Memories Shared' },
  { value: '99.9%', label: 'Uptime' },
];
