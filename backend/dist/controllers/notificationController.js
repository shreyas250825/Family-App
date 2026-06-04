"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAllAsRead = exports.markAsRead = exports.getNotifications = void 0;
const supabase_1 = require("../config/supabase");
const getNotifications = async (req, res) => {
    const userId = req.user.id;
    const { data: notifications, error } = await supabase_1.supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
    if (error)
        return res.status(400).json({ error });
    const { count } = await supabase_1.supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false);
    res.json({ notifications, unread_count: count || 0 });
};
exports.getNotifications = getNotifications;
const markAsRead = async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user.id;
    const { error } = await supabase_1.supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', userId);
    if (error)
        return res.status(400).json({ error });
    res.json({ success: true });
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (req, res) => {
    const userId = req.user.id;
    const { error } = await supabase_1.supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId);
    if (error)
        return res.status(400).json({ error });
    res.json({ success: true });
};
exports.markAllAsRead = markAllAsRead;
