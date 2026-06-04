import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { supabase } from '../config/supabase';

const router = Router();
router.use(authenticate);

router.get('/profile', async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', (req as any).user.id)
    .single();
    
  if (error) return res.status(404).json({ error });
  res.json(user);
});

router.put('/profile', async (req, res) => {
  const { full_name, birthday, relationship, avatar_url } = req.body;
  const userId = (req as any).user.id;
  
  const { data: user, error } = await supabase
    .from('users')
    .update({ full_name, birthday, relationship, avatar_url })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) return res.status(400).json({ error });
  res.json(user);
});

export default router;
