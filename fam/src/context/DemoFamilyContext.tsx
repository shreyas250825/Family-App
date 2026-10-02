import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEMO_FAMILY_MEMBERS,
  DEMO_FEED,
  type DemoFeedPost,
  type DemoMember,
  type InviteKind,
  type InviteStatus,
  type ReactionKind,
} from '../lib/demoFamily';

const FEATURED_KEY = 'famzee-demo-featured';
const PRIVACY_KEY = 'famzee-demo-privacy';
const INVITES_KEY = 'famzee-demo-invites';
const POSTS_KEY = 'famzee-demo-posts';
const REACTIONS_KEY = 'famzee-demo-reactions';
const WIZARD_KEY = 'famzee-demo-wizard';

export interface MemberPrivacy {
  birthdayVisible: boolean;
  profileVisible: boolean;
  hideChildrenPublic: boolean;
}

export interface DemoInvite {
  id: string;
  kind: InviteKind;
  code?: string;
  link?: string;
  email?: string;
  familyName: string;
  invitingMember: string;
  expiresAt: string;
  status: InviteStatus;
}

export interface WizardMemberDraft {
  id: string;
  fullName: string;
  relationship: string;
  dob: string;
  about: string;
  photo?: string;
  concealDob: boolean;
  isChild: boolean;
}

export interface WizardDraft {
  familyName: string;
  members: WizardMemberDraft[];
  currentIndex: number;
  targetCount: number;
}

interface DemoFamilyContextValue {
  members: DemoMember[];
  featuredId: string;
  setFeaturedId: (id: string) => void;
  selectedMember: DemoMember | null;
  openProfile: (id: string | null) => void;
  privacy: Record<string, MemberPrivacy>;
  updatePrivacy: (id: string, patch: Partial<MemberPrivacy>) => void;
  invites: DemoInvite[];
  generateCodeInvite: () => void;
  sendEmailInvite: (email: string) => void;
  setInviteStatus: (id: string, status: InviteStatus) => void;
  posts: DemoFeedPost[];
  addPost: (post: Omit<DemoFeedPost, 'id' | 'counts' | 'date'>) => void;
  reactions: Record<string, ReactionKind | null>;
  reactToPost: (postId: string, kind: ReactionKind) => void;
  wizard: WizardDraft;
  setWizard: (draft: WizardDraft) => void;
  saveWizardDraft: (draft: WizardDraft) => void;
  clearWizard: () => void;
}

const DemoFamilyContext = createContext<DemoFamilyContextValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* demo only */
  }
}

function defaultPrivacy(): Record<string, MemberPrivacy> {
  const map: Record<string, MemberPrivacy> = {};
  DEMO_FAMILY_MEMBERS.forEach((m) => {
    map[m.id] = {
      birthdayVisible: !m.isChild,
      profileVisible: true,
      hideChildrenPublic: true,
    };
  });
  return map;
}

const emptyWizard = (): WizardDraft => ({
  familyName: 'The Sharma Family',
  members: [
    {
      id: 'wm_start',
      fullName: '',
      relationship: 'Mother',
      dob: '',
      about: '',
      concealDob: false,
      isChild: false,
    },
  ],
  currentIndex: 0,
  targetCount: 6,
});

const defaultInvites = (): DemoInvite[] => [
  {
    id: 'inv_pending',
    kind: 'code',
    code: 'FAM-7K2Q',
    link: 'https://famzee.app/join/FAM-7K2Q',
    familyName: 'The Sharma Family',
    invitingMember: 'Ananya Sharma',
    expiresAt: 'Expires in 48 hours',
    status: 'pending',
  },
  {
    id: 'inv_accepted',
    kind: 'email',
    email: 'meera.cousin@email.com',
    familyName: 'The Sharma Family',
    invitingMember: 'Priya Sharma',
    expiresAt: 'Joined 3 days ago',
    status: 'accepted',
  },
  {
    id: 'inv_expired',
    kind: 'code',
    code: 'FAM-9LX1',
    link: 'https://famzee.app/join/FAM-9LX1',
    familyName: 'The Sharma Family',
    invitingMember: 'Raj Sharma',
    expiresAt: 'Expired yesterday',
    status: 'expired',
  },
];

export function DemoFamilyProvider({ children }: { children: ReactNode }) {
  const [featuredId, setFeaturedState] = useState(
    () => readJson<string>(FEATURED_KEY, 'meena')
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<Record<string, MemberPrivacy>>(() =>
    readJson(PRIVACY_KEY, defaultPrivacy())
  );
  const [invites, setInvites] = useState<DemoInvite[]>(() => readJson(INVITES_KEY, defaultInvites()));
  const [posts, setPosts] = useState<DemoFeedPost[]>(() => readJson(POSTS_KEY, DEMO_FEED));
  const [reactions, setReactions] = useState<Record<string, ReactionKind | null>>(() =>
    readJson(REACTIONS_KEY, {})
  );
  const [wizard, setWizardState] = useState<WizardDraft>(() => readJson(WIZARD_KEY, emptyWizard()));

  const setFeaturedId = useCallback((id: string) => {
    setFeaturedState(id);
    writeJson(FEATURED_KEY, id);
  }, []);

  const updatePrivacy = useCallback((id: string, patch: Partial<MemberPrivacy>) => {
    setPrivacy((prev) => {
      const next = {
        ...prev,
        [id]: { ...(prev[id] || defaultPrivacy()[id]), ...patch },
      };
      writeJson(PRIVACY_KEY, next);
      return next;
    });
  }, []);

  const generateCodeInvite = useCallback(() => {
    const code = `FAM-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const invite: DemoInvite = {
      id: `inv_${Date.now()}`,
      kind: 'code',
      code,
      link: `https://famzee.app/join/${code}`,
      familyName: 'The Sharma Family',
      invitingMember: 'Ananya Sharma',
      expiresAt: 'Expires in 72 hours',
      status: 'pending',
    };
    setInvites((prev) => {
      const next = [invite, ...prev];
      writeJson(INVITES_KEY, next);
      return next;
    });
  }, []);

  const sendEmailInvite = useCallback((email: string) => {
    const invite: DemoInvite = {
      id: `inv_${Date.now()}`,
      kind: 'email',
      email,
      familyName: 'The Sharma Family',
      invitingMember: 'Ananya Sharma',
      expiresAt: 'Pending · 7 days',
      status: 'pending',
    };
    setInvites((prev) => {
      const next = [invite, ...prev];
      writeJson(INVITES_KEY, next);
      return next;
    });
  }, []);

  const setInviteStatus = useCallback((id: string, status: InviteStatus) => {
    setInvites((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, status } : i));
      writeJson(INVITES_KEY, next);
      return next;
    });
  }, []);

  const addPost = useCallback((post: Omit<DemoFeedPost, 'id' | 'counts' | 'date'>) => {
    const created: DemoFeedPost = {
      ...post,
      id: `fp_${Date.now()}`,
      date: 'Just now',
      counts: { heartbeat: 0, hug: 0, roots: 0, sparkle: 0 },
    };
    setPosts((prev) => {
      const next = [created, ...prev];
      writeJson(POSTS_KEY, next);
      return next;
    });
  }, []);

  const reactToPost = useCallback((postId: string, kind: ReactionKind) => {
    setReactions((prev) => {
      const current = prev[postId] || null;
      const nextKind = current === kind ? null : kind;
      const next = { ...prev, [postId]: nextKind };
      writeJson(REACTIONS_KEY, next);
      setPosts((postsPrev) => {
        const updated = postsPrev.map((p) => {
          if (p.id !== postId) return p;
          const counts = { ...p.counts };
          if (current) counts[current] = Math.max(0, counts[current] - 1);
          if (nextKind) counts[nextKind] += 1;
          return { ...p, counts };
        });
        writeJson(POSTS_KEY, updated);
        return updated;
      });
      return next;
    });
  }, []);

  const setWizard = useCallback((draft: WizardDraft) => {
    setWizardState(draft);
  }, []);

  const saveWizardDraft = useCallback((draft: WizardDraft) => {
    setWizardState(draft);
    writeJson(WIZARD_KEY, draft);
  }, []);

  const clearWizard = useCallback(() => {
    const empty = emptyWizard();
    setWizardState(empty);
    writeJson(WIZARD_KEY, empty);
  }, []);

  const selectedMember = useMemo(
    () => DEMO_FAMILY_MEMBERS.find((m) => m.id === selectedId) || null,
    [selectedId]
  );

  const value = useMemo(
    () => ({
      members: DEMO_FAMILY_MEMBERS,
      featuredId,
      setFeaturedId,
      selectedMember,
      openProfile: setSelectedId,
      privacy,
      updatePrivacy,
      invites,
      generateCodeInvite,
      sendEmailInvite,
      setInviteStatus,
      posts,
      addPost,
      reactions,
      reactToPost,
      wizard,
      setWizard,
      saveWizardDraft,
      clearWizard,
    }),
    [
      featuredId,
      setFeaturedId,
      selectedMember,
      privacy,
      updatePrivacy,
      invites,
      generateCodeInvite,
      sendEmailInvite,
      setInviteStatus,
      posts,
      addPost,
      reactions,
      reactToPost,
      wizard,
      setWizard,
      saveWizardDraft,
      clearWizard,
    ]
  );

  return <DemoFamilyContext.Provider value={value}>{children}</DemoFamilyContext.Provider>;
}

export function useDemoFamily() {
  const ctx = useContext(DemoFamilyContext);
  if (!ctx) throw new Error('useDemoFamily must be used within DemoFamilyProvider');
  return ctx;
}
