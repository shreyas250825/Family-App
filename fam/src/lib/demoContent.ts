/**
 * Guided demo content — The Sharma Family walkthrough
 */
import { FAMILY_IMAGES } from './images';

export const DEMO_MEMBERS = [
  { id: 'demo_m1', name: 'Ananya Sharma', first: 'Ananya', role: 'Admin', online: true, color: '#7c3aed' },
  { id: 'demo_m2', name: 'Rahul Sharma', first: 'Rahul', role: 'Member', online: true, color: '#6366f1' },
  { id: 'demo_m3', name: 'Meera Sharma', first: 'Meera', role: 'Member', online: false, color: '#a855f7' },
  { id: 'demo_m4', name: 'Arjun Sharma', first: 'Arjun', role: 'Member', online: true, color: '#8b5cf6' },
];

export const DEMO_FAMILY_STATS = { members: 4, photos: 86, events: 12, memories: 24 };

export const DEMO_WEEK = [
  { day: 'MON', text: 'Rahul added 8 photos' },
  { day: 'TUE', text: 'Family Dinner planned' },
  { day: 'WED', text: 'Meera shared a memory' },
  { day: 'THU', text: "Arjun's birthday reminder" },
  { day: 'FRI', text: 'Family Reunion confirmed' },
];

export const GUIDED_STEPS = [
  { id: 'create', num: '01', title: 'Create your family space', subtitle: 'Set up a private home for your circle' },
  { id: 'invite', num: '02', title: 'Invite your family', subtitle: 'Bring everyone into one place' },
  { id: 'share', num: '03', title: 'Share memories', subtitle: 'Post photos and moments together' },
  { id: 'plan', num: '04', title: "Plan what's next", subtitle: 'Birthdays, dinners, reunions' },
  { id: 'connect', num: '05', title: 'Stay connected', subtitle: 'Albums, messages, and activity' },
] as const;

export type GuidedStepId = (typeof GUIDED_STEPS)[number]['id'];

export const DEMO_INVITES = [
  { name: 'Ananya Sharma', role: 'Admin', status: 'Joined', color: '#7c3aed' },
  { name: 'Rahul Sharma', role: 'Member', status: 'Invited ✓', color: '#6366f1' },
  { name: 'Meera Sharma', role: 'Member', status: 'Invited ✓', color: '#a855f7' },
  { name: 'Arjun Sharma', role: 'Member', status: 'Invited ✓', color: '#8b5cf6' },
];

export const DEMO_POST_COMMENTS = [
  { author: 'Rahul Sharma', color: '#6366f1', text: 'That was such a good day ❤️' },
  { author: 'Meera Sharma', color: '#a855f7', text: 'Already want to do this again!' },
  { author: 'Ananya Sharma', color: '#7c3aed', text: 'Next Sunday? 😄' },
];

export const DEMO_POSTS = [
  {
    author: 'Ananya Sharma',
    authorColor: '#7c3aed',
    content: 'Sunday brunch with everyone — three generations at one table.',
    image: FAMILY_IMAGES.brunch,
    likes: 24,
    comments: 8,
    time: '3 hours ago',
  },
  {
    author: 'Rahul Sharma',
    authorColor: '#6366f1',
    content: 'Weekend getaway was exactly what we needed.',
    image: FAMILY_IMAGES.travel,
    likes: 18,
    comments: 4,
    time: 'Yesterday',
  },
  {
    author: 'Meera Sharma',
    authorColor: '#a855f7',
    content: 'Birthday preparations are officially underway 🎂',
    image: FAMILY_IMAGES.birthday,
    likes: 31,
    comments: 11,
    time: '2 days ago',
  },
  {
    author: 'Arjun Sharma',
    authorColor: '#8b5cf6',
    content: 'First family football match of the year ⚽',
    image: FAMILY_IMAGES.gathering,
    likes: 12,
    comments: 3,
    time: '4 days ago',
  },
];

export const DEMO_POSTS_PREVIEW = DEMO_POSTS.slice(0, 3);

export const DEMO_MEMORY_ALBUMS = [
  { title: 'Goa Vacation', count: 24, image: FAMILY_IMAGES.vacation },
  { title: 'Sunday Brunch', count: 12, image: FAMILY_IMAGES.brunch },
  { title: 'Birthday Weekend', count: 18, image: FAMILY_IMAGES.birthday },
  { title: 'Family Reunion', count: 32, image: FAMILY_IMAGES.reunion },
  { title: 'Diwali 2025', count: 36, image: FAMILY_IMAGES.diwali },
  { title: 'Summer Trip', count: 21, image: FAMILY_IMAGES.travel },
];

export const DEMO_ALBUMS_GRID = [
  { title: 'Goa Vacation 2025', count: 24, cover: FAMILY_IMAGES.vacation, thumbs: [FAMILY_IMAGES.vacation, FAMILY_IMAGES.beach, FAMILY_IMAGES.travel, FAMILY_IMAGES.reunion] },
  { title: 'Family Brunch', count: 12, cover: FAMILY_IMAGES.brunch, thumbs: [FAMILY_IMAGES.brunch, FAMILY_IMAGES.dinner, FAMILY_IMAGES.gathering] },
  { title: 'Birthday Weekend', count: 18, cover: FAMILY_IMAGES.birthday, thumbs: [FAMILY_IMAGES.birthday, FAMILY_IMAGES.gathering, FAMILY_IMAGES.memory3] },
  { title: 'Diwali 2025', count: 36, cover: FAMILY_IMAGES.diwali, thumbs: [FAMILY_IMAGES.diwali, FAMILY_IMAGES.gathering, FAMILY_IMAGES.reunion] },
  { title: 'Summer Trip', count: 21, cover: FAMILY_IMAGES.travel, thumbs: [FAMILY_IMAGES.travel, FAMILY_IMAGES.vacation, FAMILY_IMAGES.beach] },
];

export const DEMO_UPCOMING = [
  { title: 'Family Dinner', when: 'Aug 11 · 7:30 PM', location: 'Mumbai', image: FAMILY_IMAGES.dinner, attendees: 4 },
  { title: "Arjun's Birthday", when: 'Aug 18 · 7:00 PM', location: 'Home', image: FAMILY_IMAGES.birthday, attendees: 4 },
  { title: 'Family Reunion', when: 'Aug 20 · All day', location: 'Goa', image: FAMILY_IMAGES.reunion, attendees: 4 },
  { title: 'Diwali Celebration', when: 'Nov 8 · 6:00 PM', location: 'Home', image: FAMILY_IMAGES.diwali, attendees: 4 },
];

export const DEMO_EVENT_RSVP = [
  { name: 'Ananya', going: true },
  { name: 'Rahul', going: true },
  { name: 'Meera', going: true },
  { name: 'Arjun', going: false },
];

export const DEMO_CONVERSATIONS = [
  {
    id: 'group',
    title: 'Sharma Family',
    messages: [
      { sender: 'Rahul', color: '#6366f1', text: 'Are we still meeting at 7:30?', time: '6:42 PM', isMe: false },
      { sender: 'Ananya', color: '#7c3aed', text: "Yes! I'll be there 😊", time: '6:44 PM', isMe: true, read: true },
      { sender: 'Meera', color: '#a855f7', text: "I'll bring the photos from Goa.", time: '6:45 PM', isMe: false },
      { sender: 'Arjun', color: '#8b5cf6', text: 'Can someone pick me up? 😂', time: '6:47 PM', isMe: false },
    ],
    typing: 'Ananya',
  },
  {
    id: 'rahul',
    title: 'Rahul Sharma',
    messages: [
      { sender: 'Rahul', color: '#6366f1', text: 'Sending you the Goa photos now.', time: '2:15 PM', isMe: false },
      { sender: 'Ananya', color: '#7c3aed', text: 'Perfect ❤️', time: '2:18 PM', isMe: true, read: true },
    ],
    typing: null,
  },
  {
    id: 'reunion',
    title: 'Family Reunion',
    messages: [
      { sender: 'Meera', color: '#a855f7', text: 'Dates confirmed!', time: '11:02 AM', isMe: false },
      { sender: 'Rahul', color: '#6366f1', text: 'Finally! 🎉', time: '11:05 AM', isMe: false },
    ],
    typing: null,
  },
];

export const DEMO_ACTIVITY = [
  { time: '10:32 AM', text: 'Meera added 12 photos to', highlight: 'Goa Vacation 2025' },
  { time: '11:45 AM', text: 'Rahul commented on Ananya\'s memory', highlight: null },
  { time: '1:20 PM', text: 'Family Dinner created', highlight: null },
  { time: '3:10 PM', text: 'Arjun joined the family space', highlight: null },
];

export const DEMO_MESSAGES = [
  { id: 'rahul', name: 'Rahul Sharma', preview: 'Sending you the Goa photos now.', time: '2:15 PM', color: '#6366f1' },
  { id: 'group', name: 'Sharma Family', preview: 'Are we still meeting at 7:30?', time: '6:42 PM', color: '#7c3aed', active: true },
  { id: 'meera', name: 'Meera Sharma', preview: 'Dates confirmed!', time: '11:02 AM', color: '#a855f7' },
  { id: 'arjun', name: 'Arjun Sharma', preview: 'Can someone pick me up? 😂', time: '6:47 PM', color: '#8b5cf6' },
];

export const DEMO_CHAT = DEMO_CONVERSATIONS[0].messages;

export const DEMO_NOTIFICATIONS = [
  { icon: '❤️', text: 'Rahul liked your memory', time: '2m ago', unread: true },
  { icon: '📷', text: 'Meera added 12 photos to Family Brunch', time: '1h ago', unread: true },
  { icon: '🎂', text: "Arjun's birthday is coming up", time: '3h ago', unread: false },
  { icon: '📅', text: 'Family Dinner starts in 2 hours', time: '5h ago', unread: false },
  { icon: '💬', text: 'New message from Sharma Family', time: 'Yesterday', unread: false },
];

export const DEMO_MEMBER_PROFILE = {
  name: 'Ananya Sharma',
  role: 'Admin',
  color: '#7c3aed',
  about: 'Keeping our family connected across generations.',
  memories: [
    { title: 'Family Brunch', image: FAMILY_IMAGES.brunch },
    { title: 'Goa Vacation', image: FAMILY_IMAGES.vacation },
    { title: 'Birthday Weekend', image: FAMILY_IMAGES.birthday },
  ],
};

export const PHOTO_WALL = [
  { title: 'Goa Vacation', image: FAMILY_IMAGES.vacation },
  { title: 'Family Brunch', image: FAMILY_IMAGES.brunch },
  { title: 'Diwali 2025', image: FAMILY_IMAGES.diwali },
  { title: 'Birthday Weekend', image: FAMILY_IMAGES.birthday },
  { title: 'Summer Trip', image: FAMILY_IMAGES.travel },
];

export const GOA_GALLERY = [FAMILY_IMAGES.vacation, FAMILY_IMAGES.beach, FAMILY_IMAGES.travel, FAMILY_IMAGES.reunion, FAMILY_IMAGES.memory1];

export type TourFeature = 'feed' | 'events' | 'albums' | 'messages' | 'family' | 'notifications' | 'settings';

export const TOUR_FEATURES: { id: TourFeature; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'events', label: 'Events' },
  { id: 'albums', label: 'Albums' },
  { id: 'messages', label: 'Messages' },
  { id: 'family', label: 'Family' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'settings', label: 'Settings' },
];
