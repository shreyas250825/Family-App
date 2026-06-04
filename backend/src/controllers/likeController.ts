import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const toggleLike = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user.id;
  
  // Check if already liked
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single();
    
  if (existing) {
    // Unlike
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existing.id);
      
    if (error) return res.status(400).json({ error });
    return res.json({ liked: false });
  }
  
  // Like
  const { data: like, error } = await supabase
    .from('likes')
    .insert({ post_id: postId, user_id: userId })
    .select()
    .single();
    
  if (error) return res.status(400).json({ error });
  res.json({ liked: true, like });
};
