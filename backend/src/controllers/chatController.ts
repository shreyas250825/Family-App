
  const userId = req.user!.id;

  const { data: participant } = await supabase
    .from('conversation_participants')
    .select('id')
    .eq('conversation_id', conversationId)
    .eq('user_id', userId)
    .maybeSingle();

  if (!participant) return res.status(403).json({ error: { message: 'Not in conversation' } });

  const userId = req.user!.id;

  const { data: participant } = await supabase
    .from('conversation_participants')
    .select('id')
    .eq('conversation_id', conversationId)
    .eq('user_id', userId)
    .maybeSingle();

  if (!participant) return res.status(403).json({ error: { message: 'Not in conversation' } });
