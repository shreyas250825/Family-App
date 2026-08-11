/**
 * Pre-populated demo — The Sharma Family (investor/client demo)
 */
import type { AppData, StoredUser, UserFamilyData } from './seedData';
import { avatarForName, uid } from './seedData';
import type { FamilyMember, FamilyPost } from '../types/family';
import { FAMILY_IMAGES } from './images';

export const DEMO_EMAIL = 'ananya@demo.famzee.app';
export const DEMO_PASSWORD = 'demo2026';

const IMG = FAMILY_IMAGES;

const demoUser: StoredUser = {
  id: 'demo_user_ananya',
  name: 'Ananya Sharma',
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
  avatar: avatarForName('Ananya Sharma', '833AB4'),
  role: 'Admin',
  provider: 'email',
};

const members: FamilyMember[] = [
  { id: 'demo_m1', name: 'Ananya Sharma', role: 'Admin', avatar: avatarForName('Ananya Sharma', '833AB4'), isOnline: true, birthday: 'March 12' },
  { id: 'demo_m2', name: 'Rahul Sharma', role: 'Member', avatar: avatarForName('Rahul Sharma', '405DE6'), isOnline: true, birthday: 'Aug 18' },
  { id: 'demo_m3', name: 'Meera Sharma', role: 'Member', avatar: avatarForName('Meera Sharma', 'C13584'), isOnline: false, birthday: 'Nov 22' },
  { id: 'demo_m4', name: 'Arjun Sharma', role: 'Member', avatar: avatarForName('Arjun Sharma', 'E1306C'), isOnline: true, birthday: 'Jan 30' },
];

function post(
  author: FamilyMember,
  content: string,
  image?: string,
  timestamp = '2 hours ago',
  likes = 18,
  comments = 5
): FamilyPost {
  return {
    id: uid('post'),
    author,
    content,
    image,
    likes,
    comments,
    timestamp,
    type: image ? 'photo' : 'update',
  };
}

export function createDemoFamilyData(): UserFamilyData {
  const eventDinner = {
    id: uid('event'),
    title: 'Family Dinner',
    date: 'Today',
    time: '7:30 PM',
    location: 'Mumbai',
    type: 'gathering' as const,
    attendees: 4,
    image: IMG.dinner,
  };
  const eventBirthday = {
    id: uid('event'),
    title: "Arjun's Birthday",
    date: 'Aug 18, 2026',
    time: '7:00 PM',
    location: 'Home',
    type: 'birthday' as const,
    attendees: 4,
    image: IMG.birthday,
  };
  const eventReunion = {
    id: uid('event'),
    title: 'Family Reunion',
    date: 'Aug 20, 2026',
    time: 'All day',
    location: 'Goa',
    type: 'gathering' as const,
    attendees: 4,
    image: IMG.reunion,
  };
  const eventDiwali = {
    id: uid('event'),
    title: 'Diwali Celebration',
    date: 'Nov 8, 2026',
    time: '6:00 PM',
    location: 'Home',
    type: 'holiday' as const,
    attendees: 4,
    image: IMG.diwali,
  };

  const albumPhotos = (n = 4) =>
    Array.from({ length: n }, (_, i) => ({
      id: uid('photo'),
      url: [IMG.vacation, IMG.brunch, IMG.travel, IMG.reunion][i % 4],
      addedAt: new Date().toISOString(),
    }));

  return {
    family: {
      name: 'The Sharma Family',
      tagline: 'Connected across generations',
      description:
        'A close-knit family sharing life\'s moments — from Sunday brunches to beach vacations and every birthday in between.',
      coverPhoto: IMG.cover,
      location: 'Mumbai',
      stats: { members: 4, photos: 131, events: 4, memories: 24 },
    },
    members,
    posts: [
      post(members[0], 'Sunday brunch with everyone — three generations at one table.', IMG.brunch, '3 hours ago', 24, 8),
      post(members[1], 'Weekend getaway was exactly what we needed.', IMG.travel, 'Yesterday', 18, 4),
      post(members[2], 'Birthday preparations are officially underway 🎂', IMG.birthday, '2 days ago', 31, 6),
      post(members[3], 'First goal in the school tournament! So proud ⚽', IMG.gathering, '3 days ago', 42, 15),
      post(members[1], 'Beach day was perfect. Already planning next year\'s trip.', IMG.vacation, '4 days ago', 27, 9),
    ],
    events: [eventDinner, eventBirthday, eventReunion, eventDiwali],
    albums: [
      {
        id: uid('album'),
        title: 'Goa Vacation 2025',
        cover: IMG.vacation,
        photoCount: 24,
        category: 'vacation',
        date: 'Dec 2025',
        photos: albumPhotos(4),
      },
      {
        id: uid('album'),
        title: 'Family Brunch',
        cover: IMG.brunch,
        photoCount: 12,
        category: 'general',
        date: 'Jan 2026',
        photos: albumPhotos(3),
      },
      {
        id: uid('album'),
        title: 'Birthday Celebration',
        cover: IMG.birthday,
        photoCount: 18,
        category: 'birthday',
        date: 'Aug 2025',
        photos: albumPhotos(3),
      },
      {
        id: uid('album'),
        title: 'Diwali 2025',
        cover: IMG.diwali,
        photoCount: 36,
        category: 'general',
        date: 'Nov 2025',
        photos: albumPhotos(4),
      },
      {
        id: uid('album'),
        title: 'Summer Trip',
        cover: IMG.travel,
        photoCount: 21,
        category: 'vacation',
        date: 'Jun 2025',
        photos: albumPhotos(3),
      },
    ],
    conversations: [
      {
        id: 'demo_conv_group',
        name: 'Sharma Family',
        avatar: members[0].avatar,
        members: [demoUser.id, 'demo_m2', 'demo_m3', 'demo_m4'],
        lastMessage: 'Reunion dates confirmed!',
        lastMessageTime: '10:42 AM',
        unread: 0,
        isGroup: true,
        messages: [
          { id: uid('msg'), senderId: 'demo_m2', content: 'Are we still meeting for dinner?', timestamp: '10:15 AM', isRead: true },
          { id: uid('msg'), senderId: demoUser.id, content: 'Yes! 7:30 works.', timestamp: '10:22 AM', isRead: true },
          { id: uid('msg'), senderId: 'demo_m3', content: "I'll bring the photos.", timestamp: '10:35 AM', isRead: true },
          { id: uid('msg'), senderId: demoUser.id, content: 'Reunion dates confirmed!', timestamp: '10:42 AM', isRead: true },
        ],
      },
      {
        id: 'demo_conv1',
        name: 'Rahul Sharma',
        avatar: members[1].avatar,
        members: [demoUser.id, 'demo_m2'],
        lastMessage: 'See you at dinner tonight!',
        lastMessageTime: '10:30 AM',
        unread: 0,
        isGroup: false,
        messages: [
          { id: uid('msg'), senderId: 'demo_m2', content: 'See you at dinner tonight!', timestamp: '10:30 AM', isRead: true },
        ],
      },
      {
        id: 'demo_conv2',
        name: 'Meera Sharma',
        avatar: members[2].avatar,
        members: [demoUser.id, 'demo_m3'],
        lastMessage: 'Sending the photos now 📸',
        lastMessageTime: 'Yesterday',
        unread: 1,
        isGroup: false,
        messages: [
          { id: uid('msg'), senderId: 'demo_m3', content: 'Sending the photos now 📸', timestamp: 'Yesterday', isRead: false },
        ],
      },
    ],
    memories: [
      { id: uid('mem'), title: 'Goa sunset', image: IMG.vacation, date: 'Dec 2025', author: 'Ananya Sharma' },
      { id: uid('mem'), title: 'Family brunch', image: IMG.brunch, date: 'Jan 2026', author: 'Rahul Sharma' },
      { id: uid('mem'), title: 'Birthday night', image: IMG.birthday, date: 'Aug 2025', author: 'Meera Sharma' },
    ],
    birthdays: [],
    comments: {},
    likedPostIds: [],
    rsvpEventIds: [eventDinner.id, eventBirthday.id],
    notifications: [
      { id: uid('notif'), type: 'birthday', title: 'Birthday reminder', body: "Arjun's birthday is coming up!", isRead: false, createdAt: new Date().toISOString() },
      { id: uid('notif'), type: 'new_post', title: 'New family post', body: 'Rahul shared photos from the beach trip.', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: uid('notif'), type: 'event', title: 'Family reunion', body: 'Annual reunion is on Aug 20.', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
    onboardingComplete: true,
  };
}

export function createDemoAppData(): AppData {
  const familyData = createDemoFamilyData();
  return {
    version: 2,
    user: demoUser,
    users: [demoUser],
    userFamilies: { [demoUser.id]: familyData },
    ...familyData,
  };
}
