import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const register = async (req: Request, res: Response) => {
  const { email, password, full_name } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name } }
  });
  if (error) return res.status(400).json({ error });
  
  // Insert into public.users table
  await supabase.from('users').insert([{ id: data.user!.id, email, full_name }]);
  
  res.status(201).json({ user: data.user, session: data.session });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error });
  res.json({ user: data.user, session: data.session });
};

export const getProfile = async (req: Request, res: Response) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', (req as any).user.id)
    .single();
  if (error) return res.status(404).json({ error });
  res.json(user);
};
