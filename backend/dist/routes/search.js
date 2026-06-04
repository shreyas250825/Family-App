"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const supabase_1 = require("../config/supabase");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/search', async (req, res) => {
    const { q, type, familyId } = req.query;
    if (!q)
        return res.status(400).json({ error: 'Query required' });
    let results = [];
    if (type === 'posts') {
        const { data } = await supabase_1.supabase
            .from('posts')
            .select('*, author:users(*)')
            .eq('family_id', familyId)
            .ilike('content', `%${q}%`)
            .limit(20);
        results = data || [];
    }
    else if (type === 'members') {
        const { data } = await supabase_1.supabase
            .from('family_members')
            .select('*, users(*)')
            .eq('family_id', familyId)
            .ilike('users.full_name', `%${q}%`)
            .limit(20);
        results = data || [];
    }
    else if (type === 'events') {
        const { data } = await supabase_1.supabase
            .from('events')
            .select('*')
            .eq('family_id', familyId)
            .ilike('title', `%${q}%`)
            .limit(20);
        results = data || [];
    }
    res.json({ results });
});
exports.default = router;
