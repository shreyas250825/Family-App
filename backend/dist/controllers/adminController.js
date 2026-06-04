"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityLogs = exports.removeMember = exports.handleFamilyRequest = exports.getFamilyRequests = void 0;
const supabase_1 = require("../config/supabase");
const getFamilyRequests = async (req, res) => {
    const { familyId } = req.params;
    const userId = req.user.id;
    // Verify admin
    const { data: member } = await supabase_1.supabase
        .from('family_members')
        .select('role')
        .eq('family_id', familyId)
        .eq('user_id', userId)
        .single();
    if (!member || member.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
    }
    const { data: requests, error } = await supabase_1.supabase
        .from('family_requests')
        .select('*, user:users(*)')
        .eq('family_id', familyId)
        .eq('status', 'pending');
    if (error)
        return res.status(400).json({ error });
    res.json(requests);
};
exports.getFamilyRequests = getFamilyRequests;
const handleFamilyRequest = async (req, res) => {
    const { familyId, requestId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'
    const userId = req.user.id;
    // Verify admin
    const { data: member } = await supabase_1.supabase
        .from('family_members')
        .select('role')
        .eq('family_id', familyId)
        .eq('user_id', userId)
        .single();
    if (!member || member.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
    }
    const { data: request } = await supabase_1.supabase
        .from('family_requests')
        .select('user_id')
        .eq('id', requestId)
        .single();
    if (!request)
        return res.status(404).json({ error: 'Request not found' });
    if (status === 'approved') {
        await supabase_1.supabase.from('family_members').insert({
            family_id: familyId,
            user_id: request.user_id,
            role: 'member'
        });
    }
    const { error } = await supabase_1.supabase
        .from('family_requests')
        .update({ status, reviewed_by: userId })
        .eq('id', requestId);
    if (error)
        return res.status(400).json({ error });
    res.json({ success: true });
};
exports.handleFamilyRequest = handleFamilyRequest;
const removeMember = async (req, res) => {
    const { familyId, userId } = req.params;
    const adminId = req.user.id;
    // Verify admin
    const { data: member } = await supabase_1.supabase
        .from('family_members')
        .select('role')
        .eq('family_id', familyId)
        .eq('user_id', adminId)
        .single();
    if (!member || member.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
    }
    const { error } = await supabase_1.supabase
        .from('family_members')
        .delete()
        .eq('family_id', familyId)
        .eq('user_id', userId);
    if (error)
        return res.status(400).json({ error });
    // Log activity
    await supabase_1.supabase.from('activity_logs').insert({
        family_id: familyId,
        admin_id: adminId,
        action: 'remove_member',
        target_user_id: userId
    });
    res.json({ success: true });
};
exports.removeMember = removeMember;
const getActivityLogs = async (req, res) => {
    const { familyId } = req.params;
    const userId = req.user.id;
    // Verify admin
    const { data: member } = await supabase_1.supabase
        .from('family_members')
        .select('role')
        .eq('family_id', familyId)
        .eq('user_id', userId)
        .single();
    if (!member || member.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized' });
    }
    const { data: logs, error } = await supabase_1.supabase
        .from('activity_logs')
        .select('*, admin:users(*), target_user:users(*)')
        .eq('family_id', familyId)
        .order('created_at', { ascending: false })
        .limit(100);
    if (error)
        return res.status(400).json({ error });
    res.json(logs);
};
exports.getActivityLogs = getActivityLogs;
