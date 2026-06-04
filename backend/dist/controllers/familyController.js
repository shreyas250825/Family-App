"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinFamily = exports.getFamilyById = exports.getFamilies = exports.createFamily = void 0;
const supabase_1 = require("../config/supabase");
const crypto_1 = require("crypto");
const createFamily = async (req, res) => {
    const { name, is_public_feed } = req.body;
    const userId = req.user.id;
    const invite_code = (0, crypto_1.randomBytes)(3).toString('hex').toUpperCase(); // 6 chars
    const { data: family, error } = await supabase_1.supabase
        .from('families')
        .insert({ name, invite_code, is_public_feed, created_by: userId })
        .select()
        .single();
    if (error)
        return res.status(400).json({ error });
    // Add creator as admin
    await supabase_1.supabase.from('family_members').insert({
        family_id: family.id,
        user_id: userId,
        role: 'admin'
    });
    res.status(201).json({ family, invite_code });
};
exports.createFamily = createFamily;
const getFamilies = async (req, res) => {
    const { data: families, error } = await supabase_1.supabase
        .from('family_members')
        .select('family_id, families(*)')
        .eq('user_id', req.user.id);
    if (error)
        return res.status(400).json({ error });
    res.json(families.map(f => f.families));
};
exports.getFamilies = getFamilies;
const getFamilyById = async (req, res) => {
    const { familyId } = req.params;
    const { data: family, error } = await supabase_1.supabase
        .from('families')
        .select('*, family_members(user_id, users(*))')
        .eq('id', familyId)
        .single();
    if (error)
        return res.status(404).json({ error });
    res.json(family);
};
exports.getFamilyById = getFamilyById;
const joinFamily = async (req, res) => {
    const { invite_code } = req.body;
    const userId = req.user.id;
    const { data: family, error } = await supabase_1.supabase
        .from('families')
        .select('id')
        .eq('invite_code', invite_code)
        .single();
    if (error)
        return res.status(404).json({ error: 'Family not found' });
    // Check if already member
    const { data: existing } = await supabase_1.supabase
        .from('family_members')
        .select('id')
        .eq('family_id', family.id)
        .eq('user_id', userId);
    if (existing?.length)
        return res.status(400).json({ error: 'Already a member' });
    await supabase_1.supabase.from('family_members').insert({
        family_id: family.id,
        user_id: userId,
        role: 'member'
    });
    res.json({ success: true });
};
exports.joinFamily = joinFamily;
