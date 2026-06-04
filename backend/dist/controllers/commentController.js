"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.createComment = void 0;
const supabase_1 = require("../config/supabase");
const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    // Verify post exists and user is family member
    const { data: post } = await supabase_1.supabase
        .from('posts')
        .select('family_id')
        .eq('id', postId)
        .single();
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    const { data: member } = await supabase_1.supabase
        .from('family_members')
        .select('id')
        .eq('family_id', post.family_id)
        .eq('user_id', userId);
    if (!member?.length)
        return res.status(403).json({ error: 'Not a member' });
    const { data: comment, error } = await supabase_1.supabase
        .from('comments')
        .insert({ post_id: postId, author_id: userId, content })
        .select('*, author:users(*)')
        .single();
    if (error)
        return res.status(400).json({ error });
    res.status(201).json(comment);
};
exports.createComment = createComment;
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const { data: comment } = await supabase_1.supabase
        .from('comments')
        .select('author_id, post_id')
        .eq('id', commentId)
        .single();
    if (!comment)
        return res.status(404).json({ error: 'Comment not found' });
    // Only author can delete
    if (comment.author_id !== userId) {
        return res.status(403).json({ error: 'Not authorized' });
    }
    const { error } = await supabase_1.supabase
        .from('comments')
        .delete()
        .eq('id', commentId);
    if (error)
        return res.status(400).json({ error });
    res.json({ success: true });
};
exports.deleteComment = deleteComment;
