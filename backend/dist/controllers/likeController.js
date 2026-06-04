"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = void 0;
const supabase_1 = require("../config/supabase");
const toggleLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    // Check if already liked
    const { data: existing } = await supabase_1.supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();
    if (existing) {
        // Unlike
        const { error } = await supabase_1.supabase
            .from('likes')
            .delete()
            .eq('id', existing.id);
        if (error)
            return res.status(400).json({ error });
        return res.json({ liked: false });
    }
    // Like
    const { data: like, error } = await supabase_1.supabase
        .from('likes')
        .insert({ post_id: postId, user_id: userId })
        .select()
        .single();
    if (error)
        return res.status(400).json({ error });
    res.json({ liked: true, like });
};
exports.toggleLike = toggleLike;
