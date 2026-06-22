export type {
  FamilyMember,
  FamilyPost,
  FamilyEvent,
  Album,
  Message,
  Conversation,
  Memory,
  Birthday,
  FamilyProfile,
} from '../types/family';

import type { FamilyMember } from '../types/family';

export function getMemberById(members: FamilyMember[], id: string): FamilyMember | undefined {
  return members.find((m) => m.id === id);
}
