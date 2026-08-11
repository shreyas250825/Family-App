
  const userId = req.user!.id;

  const { data: membership } = await supabase
    .from('family_members')
    .select('id')
    .eq('family_id', familyId)
    .eq('user_id', userId)
    .maybeSingle();

  if (!membership) return res.status(403).json({ error: { message: 'Not a member' } });
