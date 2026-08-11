-- Row Level Security policies for FamZee
-- Backend uses service role (bypasses RLS). These protect direct client/anon access.

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper: is member of family
CREATE OR REPLACE FUNCTION public.is_family_member(fid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members
    WHERE family_id = fid AND user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Users: read/update own profile
CREATE POLICY users_select_own ON public.users FOR SELECT USING (id = auth.uid());
CREATE POLICY users_update_own ON public.users FOR UPDATE USING (id = auth.uid());

-- Users in same family can see each other
CREATE POLICY users_select_family ON public.users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.family_members fm1
    JOIN public.family_members fm2 ON fm1.family_id = fm2.family_id
    WHERE fm1.user_id = auth.uid() AND fm2.user_id = users.id
  )
);

-- Families: members can read
CREATE POLICY families_select_member ON public.families FOR SELECT USING (public.is_family_member(id));
CREATE POLICY families_insert_authenticated ON public.families FOR INSERT WITH CHECK (created_by = auth.uid());

-- Family members
CREATE POLICY family_members_select ON public.family_members FOR SELECT USING (public.is_family_member(family_id));
CREATE POLICY family_members_insert_self ON public.family_members FOR INSERT WITH CHECK (user_id = auth.uid());

-- Posts
CREATE POLICY posts_select_member ON public.posts FOR SELECT USING (public.is_family_member(family_id));
CREATE POLICY posts_insert_member ON public.posts FOR INSERT WITH CHECK (
  public.is_family_member(family_id) AND author_id = auth.uid()
);
CREATE POLICY posts_update_author ON public.posts FOR UPDATE USING (author_id = auth.uid());
CREATE POLICY posts_delete_author ON public.posts FOR DELETE USING (author_id = auth.uid());

-- Comments
CREATE POLICY comments_select ON public.comments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.posts p
    WHERE p.id = comments.post_id AND public.is_family_member(p.family_id)
  )
);
CREATE POLICY comments_insert ON public.comments FOR INSERT WITH CHECK (author_id = auth.uid());

-- Likes
CREATE POLICY likes_select ON public.likes FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.posts p
    WHERE p.id = likes.post_id AND public.is_family_member(p.family_id)
  )
);
CREATE POLICY likes_insert ON public.likes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY likes_delete_own ON public.likes FOR DELETE USING (user_id = auth.uid());

-- Conversations & participants
CREATE POLICY conv_participants_select ON public.conversation_participants FOR SELECT USING (user_id = auth.uid());
CREATE POLICY conversations_select ON public.conversations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants cp
    WHERE cp.conversation_id = conversations.id AND cp.user_id = auth.uid()
  )
);

-- Messages
CREATE POLICY messages_select ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants cp
    WHERE cp.conversation_id = messages.conversation_id AND cp.user_id = auth.uid()
  )
);
CREATE POLICY messages_insert ON public.messages FOR INSERT WITH CHECK (
  sender_id = auth.uid() AND EXISTS (
    SELECT 1 FROM public.conversation_participants cp
    WHERE cp.conversation_id = messages.conversation_id AND cp.user_id = auth.uid()
  )
);

-- Notifications
CREATE POLICY notifications_select_own ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY notifications_update_own ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- Events
CREATE POLICY events_select_member ON public.events FOR SELECT USING (public.is_family_member(family_id));
CREATE POLICY events_insert_member ON public.events FOR INSERT WITH CHECK (public.is_family_member(family_id));

-- Storage bucket policies (run after creating bucket 'famzee-media' in Supabase dashboard)
-- CREATE POLICY "Family members can read media" ON storage.objects FOR SELECT USING (bucket_id = 'famzee-media');
-- CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'famzee-media' AND auth.role() = 'authenticated');
