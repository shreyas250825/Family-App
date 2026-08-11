
async function assertMember(familyId: string, userId: string) {
  const { data } = await supabase
    .eq('user_id', userId)
    .maybeSingle();
  return !!data;
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const { familyId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id;

    if (!content?.trim() && !(req.files && Array.isArray(req.files) && req.files.length)) {
      return res.status(400).json({ error: { message: 'Post content or image required' } });
    }

    if (!(await assertMember(familyId, userId))) {
      return res.status(403).json({ error: { message: 'Not a member of this family' } });
    }

    let imageUrl: string | null = null;
    const mediaUrls: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const url = await uploadMedia(file, familyId, userId);
        mediaUrls.push(url);
        if (!imageUrl) imageUrl = url;
      }
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        family_id: familyId,
        author_id: userId,
        content: content?.trim() || 'Shared a photo',
        image_url: imageUrl,
        type: imageUrl ? 'photo' : 'update',
      })
      .select('*, author:users(*)')
      .single();

    if (error) return res.status(400).json({ error });

    res.status(201).json({
      post: { ...post, media_urls: mediaUrls.length ? mediaUrls : post.image_url ? [post.image_url] : [] },
      mediaUrls,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: { message: 'Failed to create post' } });
  }
  const userId = req.user!.id;

  if (!(await assertMember(familyId, userId))) {
    return res.status(403).json({ error: { message: 'Not a member of this family' } });
  }

    .select('*, author:users(*)')


  const enriched = await Promise.all(
    (posts || []).map(async (post) => {
      const [{ count: commentsCount }, { count: likesCount }] = await Promise.all([
        supabase.from('comments').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
        supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
      ]);
      return {
        ...post,
        media_urls: post.image_url ? [post.image_url] : [],
        comments_count: commentsCount || 0,
        likes_count: likesCount || 0,
      };
    })
  );

  res.json({ posts: enriched, hasMore: enriched.length === Number(limit) });