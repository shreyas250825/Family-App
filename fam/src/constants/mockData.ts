export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline?: boolean;
  birthday?: string;
}

export interface FamilyPost {
  id: string;
  author: FamilyMember;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'photo' | 'update' | 'milestone';
}

export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type: 'birthday' | 'anniversary' | 'gathering' | 'holiday';
  attendees: number;
  image?: string;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  photoCount: number;
  category: 'vacation' | 'wedding' | 'birthday' | 'general';
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  members: string[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  isGroup: boolean;
  messages: Message[];
}

export interface Memory {
  id: string;
  title: string;
  image: string;
  date: string;
  author: string;
}

export const CURRENT_USER: FamilyMember = {
  id: 'u1',
  name: 'Priya Salian',
  role: 'Family Admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  isOnline: true,
};

export const FAMILY = {
  name: 'The Salian Family',
  tagline: 'Connected across three generations since 1987',
  description:
    'From Mumbai to San Francisco, the Salians stay close through shared memories, weekly video calls, and celebrations that span continents. FamZee keeps our circle warm, organized, and always just a tap away.',
  coverPhoto:
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=600&fit=crop',
  location: 'Mumbai, India · San Francisco, USA',
  stats: {
    members: 12,
    photos: 145,
    events: 34,
    memories: 85,
  },
};

export const MEMBERS: FamilyMember[] = [
  {
    id: 'm1',
    name: 'Rajesh Salian',
    role: 'Patriarch',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    birthday: 'March 15',
  },
  {
    id: 'm2',
    name: 'Sunita Salian',
    role: 'Matriarch',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    birthday: 'July 22',
  },
  {
    id: 'm3',
    name: 'Priya Salian',
    role: 'Family Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    birthday: 'November 8',
  },
  {
    id: 'm4',
    name: 'Arjun Salian',
    role: 'Son',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    birthday: 'January 30',
  },
  {
    id: 'm5',
    name: 'Meera Salian',
    role: 'Daughter',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    birthday: 'April 12',
  },
  {
    id: 'm6',
    name: 'Dev Salian',
    role: 'Grandson',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    isOnline: true,
    birthday: 'June 3',
  },
  {
    id: 'm7',
    name: 'Anika Salian',
    role: 'Granddaughter',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    birthday: 'September 19',
  },
  {
    id: 'm8',
    name: 'Vikram Salian',
    role: 'Uncle',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: false,
    birthday: 'December 5',
  },
];

export const POSTS: FamilyPost[] = [
  {
    id: 'p1',
    author: MEMBERS[2],
    content:
      "Grandma's 70th birthday celebration was absolutely magical! 🎂 Thank you everyone for making the trip to Mumbai. These are the moments we'll cherish forever.",
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop',
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
    type: 'photo',
  },
  {
    id: 'p2',
    author: MEMBERS[3],
    content:
      "Dev scored his first goal in the school soccer tournament! So proud of this little champion ⚽🏆",
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',
    likes: 31,
    comments: 12,
    timestamp: '5 hours ago',
    type: 'milestone',
  },
  {
    id: 'p3',
    author: MEMBERS[0],
    content:
      "Sunday family recipe session: Dad's famous biryani recipe passed down to the next generation. Who's joining the video call this weekend? 👨‍🍳",
    likes: 18,
    comments: 15,
    timestamp: 'Yesterday',
    type: 'update',
  },
  {
    id: 'p4',
    author: MEMBERS[4],
    content:
      'Anika started her first day of college today! Time flies so fast. Sending all our love from San Francisco 💜',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
    likes: 42,
    comments: 19,
    timestamp: '2 days ago',
    type: 'milestone',
  },
];

export const UPCOMING_BIRTHDAYS = [
  { name: 'Arjun Salian', date: 'Jan 30', daysAway: 3, avatar: MEMBERS[3].avatar },
  { name: 'Dev Salian', date: 'Jun 3', daysAway: 128, avatar: MEMBERS[5].avatar },
  { name: 'Sunita Salian', date: 'Jul 22', daysAway: 177, avatar: MEMBERS[1].avatar },
];

export const UPCOMING_EVENTS: FamilyEvent[] = [
  {
    id: 'e1',
    title: "Arjun's Birthday Dinner",
    date: 'Jan 30, 2026',
    time: '7:00 PM',
    location: 'The Salian Residence, Mumbai',
    type: 'birthday',
    attendees: 8,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9de1771a?w=400&h=300&fit=crop',
  },
  {
    id: 'e2',
    title: 'Annual Family Reunion',
    date: 'Mar 15, 2026',
    time: 'All Day',
    location: 'Lonavala Resort',
    type: 'gathering',
    attendees: 12,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
  },
  {
    id: 'e3',
    title: 'Rajesh & Sunita — 45th Anniversary',
    date: 'Aug 14, 2026',
    time: '6:30 PM',
    location: 'Taj Mahal Palace, Mumbai',
    type: 'anniversary',
    attendees: 12,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
  },
  {
    id: 'e4',
    title: 'Diwali Celebration',
    date: 'Nov 1, 2026',
    time: '5:00 PM',
    location: 'Virtual + Mumbai',
    type: 'holiday',
    attendees: 12,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&h=300&fit=crop',
  },
];

export const CALENDAR_EVENTS = [
  { day: 30, title: "Arjun's Birthday", type: 'birthday' as const },
  { day: 15, title: 'Family Reunion', type: 'gathering' as const },
  { day: 22, title: "Meera's Trip", type: 'gathering' as const },
];

export const ALBUMS: Album[] = [
  {
    id: 'a1',
    title: 'Goa Beach Vacation 2025',
    cover: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
    photoCount: 48,
    category: 'vacation',
    date: 'Dec 2025',
  },
  {
    id: 'a2',
    title: 'Anika & Rohan Wedding',
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    photoCount: 156,
    category: 'wedding',
    date: 'Oct 2025',
  },
  {
    id: 'a3',
    title: "Sunita's 70th Birthday",
    cover: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
    photoCount: 72,
    category: 'birthday',
    date: 'Jul 2025',
  },
  {
    id: 'a4',
    title: 'Christmas at Home',
    cover: 'https://images.unsplash.com/photo-1543589077-47d81606ca40?w=600&h=400&fit=crop',
    photoCount: 34,
    category: 'general',
    date: 'Dec 2025',
  },
  {
    id: 'a5',
    title: 'San Francisco Trip',
    cover: 'https://images.unsplash.com/photo-1501594907352-04cda98ebcfb?w=600&h=400&fit=crop',
    photoCount: 61,
    category: 'vacation',
    date: 'Aug 2025',
  },
  {
    id: 'a6',
    title: "Dev's 10th Birthday",
    cover: 'https://images.unsplash.com/photo-1530103862676-de8c9de1771a?w=600&h=400&fit=crop',
    photoCount: 45,
    category: 'birthday',
    date: 'Jun 2025',
  },
];

export const RECENT_MEMORIES: Memory[] = [
  {
    id: 'mem1',
    title: 'First snow in Tahoe',
    image: 'https://images.unsplash.com/photo-1483728642387-6a3b522e2877?w=400&h=300&fit=crop',
    date: 'Jan 2026',
    author: 'Meera Salian',
  },
  {
    id: 'mem2',
    title: 'Grandpa teaching chess',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop',
    date: 'Dec 2025',
    author: 'Priya Salian',
  },
  {
    id: 'mem3',
    title: 'Family cooking night',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
    date: 'Nov 2025',
    author: 'Rajesh Salian',
  },
  {
    id: 'mem4',
    title: 'Sunset at Marine Drive',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
    date: 'Oct 2025',
    author: 'Arjun Salian',
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Salian Family Group',
    avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=150&h=150&fit=crop',
    members: ['m1', 'm2', 'm3', 'm4', 'm5'],
    lastMessage: 'Priya: See you all on Sunday! 🎉',
    lastMessageTime: '10:32 AM',
    unread: 3,
    isGroup: true,
    messages: [
      { id: 'msg1', senderId: 'm1', content: 'Good morning family! Who is free for a video call tonight?', timestamp: '9:15 AM', isRead: true },
      { id: 'msg2', senderId: 'm4', content: "I'm in! What time works for everyone?", timestamp: '9:22 AM', isRead: true },
      { id: 'msg3', senderId: 'm5', content: '8 PM IST works for me 🙌', timestamp: '9:45 AM', isRead: true },
      { id: 'msg4', senderId: 'm3', content: 'Perfect! I\'ll set up the FamZee call. See you all on Sunday! 🎉', timestamp: '10:32 AM', isRead: false },
    ],
  },
  {
    id: 'c2',
    name: 'Arjun Salian',
    avatar: MEMBERS[3].avatar,
    members: ['m3', 'm4'],
    lastMessage: 'Can you send me the reunion photos?',
    lastMessageTime: 'Yesterday',
    unread: 0,
    isGroup: false,
    messages: [
      { id: 'msg5', senderId: 'm4', content: 'Hey Priya! How are the reunion plans coming along?', timestamp: 'Yesterday 3:00 PM', isRead: true },
      { id: 'msg6', senderId: 'm3', content: 'Going great! Venue is booked. Can you send me the reunion photos?', timestamp: 'Yesterday 3:15 PM', isRead: true },
    ],
  },
  {
    id: 'c3',
    name: 'Mom & Dad',
    avatar: MEMBERS[1].avatar,
    members: ['m1', 'm2', 'm3'],
    lastMessage: 'Dad: Recipe book scan is ready 📖',
    lastMessageTime: 'Mon',
    unread: 1,
    isGroup: true,
    messages: [
      { id: 'msg7', senderId: 'm2', content: 'Beta, did you receive the biryani photos?', timestamp: 'Mon 11:00 AM', isRead: true },
      { id: 'msg8', senderId: 'm1', content: 'Recipe book scan is ready 📖', timestamp: 'Mon 2:30 PM', isRead: false },
    ],
  },
  {
    id: 'c4',
    name: 'Meera Salian',
    avatar: MEMBERS[4].avatar,
    members: ['m3', 'm5'],
    lastMessage: 'College orientation was amazing!',
    lastMessageTime: 'Tue',
    unread: 0,
    isGroup: false,
    messages: [
      { id: 'msg9', senderId: 'm5', content: 'College orientation was amazing!', timestamp: 'Tue 9:00 AM', isRead: true },
      { id: 'msg10', senderId: 'm3', content: 'So proud of you! Send pics when you can 💜', timestamp: 'Tue 9:30 AM', isRead: true },
    ],
  },
];

export const ONLINE_MEMBERS = MEMBERS.filter((m) => m.isOnline);

export function getMemberById(id: string): FamilyMember | undefined {
  return MEMBERS.find((m) => m.id === id);
}
