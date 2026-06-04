"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const supabase_1 = require("../config/supabase");
const register = async (req, res) => {
    const { email, password, full_name } = req.body;
    const { data, error } = await supabase_1.supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name } }
    });
    if (error)
        return res.status(400).json({ error });
    // Insert into public.users table
    await supabase_1.supabase.from('users').insert([{ id: data.user.id, email, full_name }]);
    res.status(201).json({ user: data.user, session: data.session });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase_1.supabase.auth.signInWithPassword({ email, password });
    if (error)
        return res.status(401).json({ error });
    res.json({ user: data.user, session: data.session });
};
exports.login = login;
const getProfile = async (req, res) => {
    const { data: user, error } = await supabase_1.supabase
        .from('users')
        .select('*')
        .eq('id', req.user.id)
        .single();
    if (error)
        return res.status(404).json({ error });
    res.json(user);
};
exports.getProfile = getProfile;
