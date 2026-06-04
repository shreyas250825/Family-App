import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { uploadMedia } from '../utils/storage';

export const createPost = async (req: Request, res: Response) => {
  const { familyId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;
  
  // Verify membership
  const { data: member } = await supabase
    .from('family_members')
    .select('id')
    .eq('family_id', familyId)
    .eq('user_id', userId);
  if (!member?.length) return res.status(403).json({ error: 'Not a member' });
  
  const mediaUrls = [];
  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const url = await uploadMedia(file, familyId, userId);
      mediaUrls.push(url);
    }
  }
  
  const { data: post, error } = await supabase
    .from('posts')
    .insert({ family_id: familyId, author_id: userId, content })
    .select()
    .single();
    
  if (error) return res.status(400).json({ error });
  
  // Trigger realtime (handled by Supabase)
  res.status(201).json({ post, mediaUrls });
};

export const getFamilyPosts = async (req: Request, res: Response) => {
  const { familyId } = req.params;
  const { limit = 20, offset = 0 } = req.query;
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, author:users(*), comments_count:comments(count), likes_count:likes(count)')
    .eq('family_id', familyId)
    .order('created_at', { ascending: false })
    .range(Number(offset), Number(offset) + Number(limit) - 1);
    
  if (error) return res.status(400).json({ error });
  res.json({ posts, hasMore: posts.length === Number(limit) });
};
