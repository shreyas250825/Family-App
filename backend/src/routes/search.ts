import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { supabase } from '../config/supabase';

const router = Router();
router.use(authenticate);

router.get('/search', async (req, res) => {
  const { q, type, familyId } = req.query;
  
  if (!q) return res.status(400).json({ error: 'Query required' });
  
  let results: any[] = [];
  
  if (type === 'posts') {
    const { data } = await supabase
      .from('posts')
      .select('*, author:users(*)')
      .eq('family_id', familyId)
      .ilike('content', `%${q}%`)
      .limit(20);
    results = data || [];
  } else if (type === 'members') {
    const { data } = await supabase
      .from('family_members')
      .select('*, users(*)')
      .eq('family_id', familyId)
      .ilike('users.full_name', `%${q}%`)
      .limit(20);
    results = data || [];
  } else if (type === 'events') {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('family_id', familyId)
      .ilike('title', `%${q}%`)
      .limit(20);
    results = data || [];
  }
  
  res.json({ results });
});

export default router;
