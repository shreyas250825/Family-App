import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getNotifications = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  
  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
    
  if (error) return res.status(400).json({ error });
  
  const { count } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);
    
  res.json({ notifications, unread_count: count || 0 });
};

export const markAsRead = async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const userId = req.user!.id;
  

  
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('user_id', userId);
    
  if (error) return res.status(400).json({ error });
  res.json({ success: true });
};

export const markAllAsRead = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId);
    
  if (error) return res.status(400).json({ error });
  res.json({ success: true });
};
