import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { randomBytes } from 'crypto';

export const createFamily = async (req: Request, res: Response) => {
  const { name, is_public_feed } = req.body;
  const userId = req.user!.id;
  
  const invite_code = randomBytes(3).toString('hex').toUpperCase(); // 6 chars

  
  const { data: family, error } = await supabase
    .from('families')
    .insert({ name, invite_code, is_public_feed, created_by: userId })
    .select()
    .single();
    
  if (error) return res.status(400).json({ error });
  
  // Add creator as admin
  await supabase.from('family_members').insert({
    family_id: family.id,
    user_id: userId,
    role: 'admin'
  });
  
  res.status(201).json({ family, invite_code });
};

export const getFamilies = async (req: Request, res: Response) => {
  const { data: families, error } = await supabase
    .from('family_members')
    .select('family_id, families(*)')
.eq('user_id', req.user!.id);

    
  if (error) return res.status(400).json({ error });
  res.json(families.map(f => f.families));
};

export const getFamilyById = async (req: Request, res: Response) => {
  const { familyId } = req.params;
  const { data: family, error } = await supabase
    .from('families')
    .select('*, family_members(user_id, users(*))')
    .eq('id', familyId)
    .single();
    
  if (error) return res.status(404).json({ error });
  res.json(family);
};

export const joinFamily = async (req: Request, res: Response) => {
  const { invite_code } = req.body;
  const userId = req.user!.id;

  
  const { data: family, error } = await supabase
    .from('families')
    .select('id')
    .eq('invite_code', invite_code)
    .single();
    
  if (error) return res.status(404).json({ error: 'Family not found' });
  
  // Check if already member
  const { data: existing } = await supabase
    .from('family_members')
    .select('id')
    .eq('family_id', family.id)
    .eq('user_id', userId);
    
  if (existing?.length) return res.status(400).json({ error: 'Already a member' });
  
  await supabase.from('family_members').insert({
    family_id: family.id,
    user_id: userId,
    role: 'member'
  });
  
  res.json({ success: true });
};
