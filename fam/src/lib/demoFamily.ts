import { FAMILY_IMAGES } from './images';

export type ReactionKind = 'heartbeat' | 'hug' | 'roots' | 'sparkle';
export type PostAudience = 'family' | 'relatives' | 'public';
export type InviteStatus = 'pending' | 'accepted' | 'expired' | 'revoked';
export type InviteKind = 'code' | 'email';

export interface DemoMember {
  id: string;
  name: string;
  relationship: string;
  generation: number;
  parentIds: string[];
  photo: string;
  intro: string;
  birthday: string;
  isChild: boolean;
  photos: { url: string; caption: string; date: string }[];
  memories: { title: string; date: string; text: string }[];
}

export interface DemoFeedPost {
  id: string;
  memberId: string;
  content: string;
  image?: string;
  date: string;
  audience: PostAudience;
  containsChildren: boolean;
  kind: 'memory' | 'photo' | 'update';
  counts: Record<ReactionKind, number>;
}

export const MEMBER_PHOTOS = {
  arun: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=900&h=1100&fit=crop&q=80&auto=format',
  meena: '/images/family/meena-sharma.jpg',
  raj: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1100&fit=crop&q=80&auto=format',
  priya: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=1100&fit=crop&q=80&auto=format',
  aarav: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1100&fit=crop&q=80&auto=format',
  ananya: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop&q=80&auto=format',
};

export const FAMILY_NAME = 'The Sharma Family';
export const FAMILY_TAGLINE = 'Our people. Our roots. Our forever.';
export const FAMILY_WELCOME = 'Welcome to Our Family';

export const DEMO_FAMILY_MEMBERS: DemoMember[] = [
  {
    id: 'arun',
    name: 'Arun Sharma',
    relationship: 'Grandfather',
    generation: 1,
    parentIds: [],
    photo: MEMBER_PHOTOS.arun,
    intro: 'The quiet storyteller of the family. Arun still remembers the mango grove behind the ancestral home in Jaipur.',
    birthday: '12 April 1948',
    isChild: false,
    photos: [
      { url: FAMILY_IMAGES.reunion, caption: 'Telling stories at the reunion', date: '2024' },
      { url: FAMILY_IMAGES.dinner, caption: 'Sunday dinner at home', date: '2023' },
    ],
    memories: [
      { title: 'The first house', date: '1972', text: 'Bought the family house in Jaipur with Meena, two rooms and a courtyard.' },
      { title: 'Teaching Aarav chess', date: '2019', text: 'A rainy afternoon that became a weekly ritual.' },
    ],
  },
  {
    id: 'meena',
    name: 'Meena Sharma',
    relationship: 'Grandmother',
    generation: 1,
    parentIds: [],
    photo: MEMBER_PHOTOS.meena,
    intro: 'Keeper of recipes, festivals, and everyone\'s favourite stories. Meena\'s kitchen is where the family still gathers.',
    birthday: '3 September 1951',
    isChild: false,
    photos: [
      { url: FAMILY_IMAGES.diwali, caption: 'Lighting diyas together', date: '2024' },
      { url: FAMILY_IMAGES.brunch, caption: 'Festival breakfast', date: '2025' },
    ],
    memories: [
      { title: 'Secret ladoo recipe', date: '1988', text: 'Passed down from her mother, still made every Diwali.' },
    ],
  },
  {
    id: 'raj',
    name: 'Raj Sharma',
    relationship: 'Father',
    generation: 2,
    parentIds: ['arun', 'meena'],
    photo: MEMBER_PHOTOS.raj,
    intro: 'Planner of reunions and the unofficial family photographer. Raj moved the family to Mumbai and never stopped visiting Jaipur.',
    birthday: '21 June 1976',
    isChild: false,
    photos: [
      { url: FAMILY_IMAGES.travel, caption: 'Road trip to the hills', date: '2023' },
      { url: FAMILY_IMAGES.vacation, caption: 'Goa with the kids', date: '2025' },
    ],
    memories: [
      { title: 'Moving to Mumbai', date: '2004', text: 'A new city, the same Sunday calls home.' },
    ],
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    relationship: 'Mother',
    generation: 2,
    parentIds: [],
    photo: MEMBER_PHOTOS.priya,
    intro: 'Warm, organised, and the reason every birthday still feels like a celebration. Priya joined the family in 2005.',
    birthday: '14 February 1979',
    isChild: false,
    photos: [
      { url: FAMILY_IMAGES.birthday, caption: 'Ananya\'s birthday table', date: '2024' },
      { url: FAMILY_IMAGES.gathering, caption: 'Cousins weekend', date: '2022' },
    ],
    memories: [
      { title: 'Wedding in Jaipur', date: '2005', text: 'Marigold, music, and three days that still make everyone smile.' },
    ],
  },
  {
    id: 'aarav',
    name: 'Aarav Sharma',
    relationship: 'Son',
    generation: 3,
    parentIds: ['raj', 'priya'],
    photo: MEMBER_PHOTOS.aarav,
    intro: 'Curious, kind, and always first to pull out the old albums. Aarav is in his first year of university.',
    birthday: '8 November 2006',
    isChild: true,
    photos: [
      { url: FAMILY_IMAGES.gathering, caption: 'First family football match', date: '2024' },
      { url: FAMILY_IMAGES.beach, caption: 'Goa shoreline', date: '2025' },
    ],
    memories: [
      { title: 'Learning to cook with Dadi', date: '2021', text: 'The first perfect dal, celebrated like a festival.' },
    ],
  },
  {
    id: 'ananya',
    name: 'Ananya Sharma',
    relationship: 'Daughter',
    generation: 3,
    parentIds: ['raj', 'priya'],
    photo: MEMBER_PHOTOS.ananya,
    intro: 'The family\'s connector — she keeps everyone in one circle, from Mumbai to Jaipur.',
    birthday: '12 March 2008',
    isChild: true,
    photos: [
      { url: FAMILY_IMAGES.brunch, caption: 'Sunday brunch host', date: '2025' },
      { url: FAMILY_IMAGES.memory1, caption: 'Garden afternoon', date: '2024' },
    ],
    memories: [
      { title: 'Starting the family album', date: '2023', text: 'Scanned Dada\'s photographs and gave everyone a home online.' },
    ],
  },
];

export const FAMILY_ROOTS = {
  origin: {
    hometown: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    note: 'A courtyard house near the old city, where three generations learned to share a table.',
  },
  languages: {
    family: ['Hindi', 'English', 'Marwari'],
    motherTongues: ['Hindi', 'Marwari'],
  },
  traditions: {
    celebrations: ['Diwali', 'Holi', 'Raksha Bandhan', 'Family New Year brunch'],
    food: ['Meena\'s ladoos', 'Sunday dal-chawal', 'Jaipur kachori on visits home'],
    customs: ['Touching elders\' feet on festivals', 'Lighting a diya before travel'],
    gatherings: ['Annual Goa reunion', 'Monthly Sunday lunch in Mumbai'],
  },
  milestones: [
    { year: '1972', title: 'The first house', detail: 'Arun and Meena begin their life together in Jaipur.' },
    { year: '2005', title: 'Raj & Priya marry', detail: 'A three-day wedding that still defines family photographs.' },
    { year: '2018', title: 'First all-generation reunion', detail: 'Cousins, uncles, and grandparents together in Goa.' },
    { year: '2024', title: 'A new generation of stories', detail: 'Aarav and Ananya begin recording elders\' voices.' },
  ],
  saying: {
    proverb: 'Jahaan parivaar, wahaan ghar.',
    motto: 'Stay close, even from far.',
    expression: 'Chai pe baat karte hain.',
  },
  story:
    'The Sharmas began in a small Jaipur courtyard and grew across cities without losing the Sunday table. We keep recipes, photographs, and the habit of calling home — so the next generation always knows where they come from.',
};

export const FAMILY_TIMELINE = [
  {
    id: 't1985',
    year: '1985',
    title: 'Family begins in Jaipur',
    description: 'Arun and Meena settle into the courtyard house. Neighbours still remember the evening aartis.',
    image: FAMILY_IMAGES.cover,
    memberIds: ['arun', 'meena'],
  },
  {
    id: 't1998',
    year: '1998',
    title: 'Raj leaves for Mumbai',
    description: 'A major family milestone — work in the city, letters every Sunday, and the first long-distance Diwali.',
    image: FAMILY_IMAGES.travel,
    memberIds: ['arun', 'meena', 'raj'],
  },
  {
    id: 't2005',
    year: '2005',
    title: 'A wedding of marigolds',
    description: 'Raj and Priya marry in Jaipur. The family album grows by three days of photographs.',
    image: FAMILY_IMAGES.memory3,
    memberIds: ['raj', 'priya', 'arun', 'meena'],
  },
  {
    id: 't2007',
    year: '2007',
    title: 'Family reunion by the sea',
    description: 'The first reunion that brought every cousin under one roof in Goa.',
    image: FAMILY_IMAGES.reunion,
    memberIds: ['arun', 'meena', 'raj', 'priya'],
  },
  {
    id: 't2014',
    year: '2014',
    title: 'Two little storytellers',
    description: 'Aarav and Ananya start appearing in every frame — the family\'s new generation of keepers.',
    image: FAMILY_IMAGES.gathering,
    memberIds: ['aarav', 'ananya', 'raj', 'priya'],
  },
  {
    id: 't2024',
    year: '2024',
    title: 'New generation, same roots',
    description: 'Voices of our elders recorded, recipes written down, and a private family space to hold it all.',
    image: FAMILY_IMAGES.brunch,
    memberIds: ['arun', 'meena', 'raj', 'priya', 'aarav', 'ananya'],
  },
];

export const DEMO_FEED: DemoFeedPost[] = [
  {
    id: 'fp1',
    memberId: 'priya',
    content: 'Sunday brunch with everyone — three generations at one table.',
    image: FAMILY_IMAGES.brunch,
    date: '3 hours ago',
    audience: 'family',
    containsChildren: true,
    kind: 'memory',
    counts: { heartbeat: 12, hug: 8, roots: 4, sparkle: 6 },
  },
  {
    id: 'fp2',
    memberId: 'raj',
    content: 'The courtyard in Jaipur still smells like rain and mango leaves.',
    image: FAMILY_IMAGES.cover,
    date: 'Yesterday',
    audience: 'family',
    containsChildren: false,
    kind: 'photo',
    counts: { heartbeat: 18, hug: 3, roots: 14, sparkle: 2 },
  },
  {
    id: 'fp3',
    memberId: 'ananya',
    content: 'Dadi taught me the ladoo recipe today. I wrote every step down.',
    date: '2 days ago',
    audience: 'family',
    containsChildren: true,
    kind: 'update',
    counts: { heartbeat: 9, hug: 11, roots: 7, sparkle: 5 },
  },
  {
    id: 'fp4',
    memberId: 'meena',
    content: 'Diwali at home — the house glowed from the courtyard to the terrace.',
    image: FAMILY_IMAGES.diwali,
    date: 'Last week',
    audience: 'public',
    containsChildren: false,
    kind: 'photo',
    counts: { heartbeat: 42, hug: 16, roots: 21, sparkle: 19 },
  },
  {
    id: 'fp5',
    memberId: 'aarav',
    content: 'First family football match of the year. Dada kept score.',
    image: FAMILY_IMAGES.gathering,
    date: '4 days ago',
    audience: 'relatives',
    containsChildren: true,
    kind: 'memory',
    counts: { heartbeat: 7, hug: 10, roots: 2, sparkle: 15 },
  },
];

export const DEMO_MEMORIES = [
  { id: 'mem1', title: 'Goa Reunion', date: 'August 2024', by: 'Raj Sharma', image: FAMILY_IMAGES.reunion, caption: 'Every generation on one shoreline.' },
  { id: 'mem2', title: 'Sunday Brunch', date: 'March 2025', by: 'Priya Sharma', image: FAMILY_IMAGES.brunch, caption: 'The table that never feels too small.' },
  { id: 'mem3', title: 'Diwali Night', date: 'November 2024', by: 'Meena Sharma', image: FAMILY_IMAGES.diwali, caption: 'Diyas in the courtyard, stories on the terrace.' },
  { id: 'mem4', title: 'Hill road', date: 'June 2023', by: 'Raj Sharma', image: FAMILY_IMAGES.travel, caption: 'Windows down, old songs on.' },
  { id: 'mem5', title: 'Birthday table', date: 'February 2025', by: 'Priya Sharma', image: FAMILY_IMAGES.birthday, caption: 'Marigold and cake, as always.' },
  { id: 'mem6', title: 'First house visits', date: '2018', by: 'Arun Sharma', image: FAMILY_IMAGES.cover, caption: 'Showing the children the courtyard they came from.' },
  { id: 'mem7', title: 'Beach morning', date: '2025', by: 'Aarav Sharma', image: FAMILY_IMAGES.beach, caption: 'Quiet water before the cousins arrived.' },
  { id: 'mem8', title: 'Garden afternoon', date: '2024', by: 'Ananya Sharma', image: FAMILY_IMAGES.memory1, caption: 'Soft light, slower conversations.' },
];

export function memberById(id: string) {
  return DEMO_FAMILY_MEMBERS.find((m) => m.id === id);
}

export const RELATIONSHIP_OPTIONS = [
  'Grandfather',
  'Grandmother',
  'Father',
  'Mother',
  'Son',
  'Daughter',
  'Uncle',
  'Aunt',
  'Cousin',
  'Partner',
  'Sibling',
  'Family friend',
];
