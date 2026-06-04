import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const createComment = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user!.id;
  
  // Verify post exists and user is family member

  const { data: post } = await supabase
    .from('posts')
    .select('family_id')
    .eq('id', postId)
    .single();
    
  if (!post) return res.status(404).json({ error: 'Post not found' });
  
  const { data: member } = await supabase
    .from('family_members')
    .select('id')
    .eq('family_id', post.family_id)
    .eq('user_id', userId);
    
  if (!member?.length) return res.status(403).json({ error: 'Not a member' });
  
  const { data: comment, error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: userId, content })
    .select('*, author:users(*)')
    .single();
    
  if (error) return res.status(400).json({ error });
  res.status(201).json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user!.id;
  
  const { data: comment } = await supabase
    .from('comments')
    .select('author_id, post_id')
    .eq('id', commentId)
    .single();
    
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  
  // Only author can delete
  if (comment.author_id !== userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);
    
  if (error) return res.status(400).json({ error });
  res.json({ success: true });
};
