"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const supabase_1 = require("../config/supabase");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/profile', async (req, res) => {
    const { data: user, error } = await supabase_1.supabase
        .from('users')
        .select('*')
        .eq('id', req.user.id)
        .single();
    if (error)
        return res.status(404).json({ error });
    res.json(user);
});
router.put('/profile', async (req, res) => {
    const { full_name, birthday, relationship, avatar_url } = req.body;
    const userId = req.user.id;
    const { data: user, error } = await supabase_1.supabase
        .from('users')
        .update({ full_name, birthday, relationship, avatar_url })
        .eq('id', userId)
        .select()
        .single();
    if (error)
        return res.status(400).json({ error });
    res.json(user);
});
exports.default = router;
