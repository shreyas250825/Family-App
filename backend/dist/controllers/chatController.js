"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getMessages = exports.getConversations = void 0;
const supabase_1 = require("../config/supabase");
const getConversations = async (req, res) => {
    const { data: conversations, error } = await supabase_1.supabase
        .from('conversation_participants')
        .select('conversation_id, conversations(*)')
        .eq('user_id', req.user.id);
    if (error)
        return res.status(400).json({ error });
    res.json(conversations.map(c => c.conversations));
};
exports.getConversations = getConversations;
const getMessages = async (req, res) => {
    const { conversationId } = req.params;
    const { limit = 50, before } = req.query;
    let query = supabase_1.supabase
        .from('messages')
        .select('*, sender:users(*)')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(Number(limit));
    if (before) {
        query = query.lt('created_at', before);
    }
    const { data, error } = await query;
    if (error)
        return res.status(400).json({ error });
    res.json(data.reverse());
};
exports.getMessages = getMessages;
const sendMessage = async (req, res) => {
    const { conversationId } = req.params;
    const { content } = req.body;
    const { data: message, error } = await supabase_1.supabase
        .from('messages')
        .insert({ conversation_id: conversationId, sender_id: req.user.id, content })
        .select()
        .single();
    if (error)
        return res.status(400).json({ error });
    res.status(201).json(message);
};
exports.sendMessage = sendMessage;
