import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getConversations = async (req: Request, res: Response) => {
  const { data: conversations, error } = await supabase
    .from('conversation_participants')
    .select('conversation_id, conversations(*)')
    .eq('user_id', req.user!.id);
    
  if (error) return res.status(400).json({ error });
  res.json(conversations.map(c => c.conversations));
};

export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { limit = 50, before } = req.query;
  
  let query = supabase
    .from('messages')
    .select('*, sender:users(*)')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(Number(limit));
    
  if (before) {
    query = query.lt('created_at', before);
  }
  
  const { data, error } = await query;
  if (error) return res.status(400).json({ error });
  res.json(data.reverse());
};

export const sendMessage = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { content } = req.body;
  
  const { data: message, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, sender_id: req.user!.id, content })
    .select()
    .single();
    
  if (error) return res.status(400).json({ error });
  res.status(201).json(message);
};
