/* Sharma family — all landing visuals. Avatars are CSS initials, images have gradient fallbacks. */

export const COLORS = {
  ananya: '#7c3aed',
  rahul: '#6366f1',
  meera: '#a855f7',
  arjun: '#8b5cf6',
};

export const GRADIENTS = {
  warm: 'linear-gradient(135deg, #1a1033 0%, #2d1b4e 50%, #1a0a2e 100%)',
  ocean: 'linear-gradient(135deg, #0c1929 0%, #1e3a5f 50%, #0f172a 100%)',
  sunset: 'linear-gradient(135deg, #2d1b14 0%, #4a1942 50%, #1a0a2e 100%)',
  brunch: 'linear-gradient(135deg, #1c1917 0%, #44403c 40%, #292524 100%)',
  celebration: 'linear-gradient(135deg, #3b0764 0%, #581c87 50%, #1e1b4b 100%)',
};

/** Re-export from shared image library */
import { FAMILY_IMAGES } from './images';

export const IMG = FAMILY_IMAGES;

export interface Member {
  name: string;
  first: string;
  role: string;
  online: boolean;
  color: string;
}

export const MEMBERS: Member[] = [
  { name: 'Ananya Sharma', first: 'Ananya', role: 'Admin', online: true, color: COLORS.ananya },
  { name: 'Rahul Sharma', first: 'Rahul', role: 'Member', online: true, color: COLORS.rahul },
  { name: 'Meera Sharma', first: 'Meera', role: 'Member', online: false, color: COLORS.meera },
  { name: 'Arjun Sharma', first: 'Arjun', role: 'Member', online: true, color: COLORS.arjun },
];

export interface FeedCard {
  id: string;
  author: Member;
  caption: string;
  image: string;
  imageGradient: string;
  likes: number;
  comments: number;
  time: string;
}

export const FEED_CARDS: FeedCard[] = [
  {
    id: '1',
    author: MEMBERS[0],
    caption: 'Sunday brunch with everyone — three generations at one table. These are the moments we live for.',
    image: IMG.brunch,
    imageGradient: GRADIENTS.brunch,
    likes: 24,
    comments: 8,
    time: '3 hours ago',
  },
  {
    id: '2',
    author: MEMBERS[1],
    caption: 'Beach day was perfect. Already planning next year\'s trip to Goa.',
    image: IMG.travel,
    imageGradient: GRADIENTS.ocean,
    likes: 31,
    comments: 12,
    time: '2 days ago',
  },
  {
    id: '3',
    author: MEMBERS[3],
    caption: 'First goal in the school tournament! So proud of this kid.',
    image: IMG.memory1,
    imageGradient: GRADIENTS.sunset,
    likes: 42,
    comments: 15,
    time: 'Yesterday',
  },
  {
    id: '4',
    author: MEMBERS[2],
    caption: 'Art exhibition opening night — she absolutely shined.',
    image: IMG.reunion,
    imageGradient: GRADIENTS.celebration,
    likes: 19,
    comments: 6,
    time: '4 days ago',
  },
  {
    id: '5',
    author: MEMBERS[0],
    caption: 'Diwali lights, homemade sweets, and everyone under one roof.',
    image: IMG.diwali,
    imageGradient: GRADIENTS.warm,
    likes: 56,
    comments: 22,
    time: '1 week ago',
  },
];

export const ALBUMS = [
  { title: 'Goa · 2025', cover: IMG.vacation, gradient: GRADIENTS.ocean, count: 48 },
  { title: 'Diwali · 2025', cover: IMG.diwali, gradient: GRADIENTS.warm, count: 32 },
  { title: 'Family Reunion', cover: IMG.reunion, gradient: GRADIENTS.celebration, count: 64 },
  { title: 'Sunday Brunch', cover: IMG.brunch, gradient: GRADIENTS.brunch, count: 18 },
  { title: 'Birthday Dinner', cover: IMG.birthday, gradient: GRADIENTS.sunset, count: 24 },
];

export const EVENTS = [
  { title: 'Family Dinner', month: 'AUG', day: '11', time: '7:30 PM', location: 'Mumbai', featured: true },
  { title: "Arjun's Birthday", month: 'JAN', day: '30', time: '7:00 PM', location: 'Home', featured: false },
  { title: 'Family Reunion', month: 'MAR', day: '15', time: 'All day', location: 'Goa', featured: false },
  { title: 'Anniversary Dinner', month: 'AUG', day: '14', time: '8:00 PM', location: 'The Oberoi', featured: false },
];

export const MESSAGES = [
  { from: 'Rahul', text: 'See you at dinner tonight!', color: COLORS.rahul, delay: 0 },
  { from: 'Meera', text: "I've uploaded the Goa photos ❤️", color: COLORS.meera, delay: 0.15 },
  { from: 'Family Group', text: 'Reunion dates confirmed!', color: COLORS.ananya, delay: 0.3 },
];

export const ECOSYSTEM = [
  { label: 'Memories', sub: 'Albums & photos', angle: -60, dist: 140 },
  { label: 'People', sub: 'Family members', angle: -20, dist: 155 },
  { label: 'Events', sub: 'Plans & dates', angle: 20, dist: 155 },
  { label: 'Conversations', sub: 'Messages', angle: 60, dist: 140 },
  { label: 'Moments', sub: 'Feed & posts', angle: 100, dist: 130 },
];
