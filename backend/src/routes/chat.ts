import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getConversations, getMessages, sendMessage } from '../controllers/chatController';

const router = Router();
router.use(authenticate);

router.get('/conversations', getConversations);
router.get('/conversations/:conversationId/messages', getMessages);
router.post('/conversations/:conversationId/messages', sendMessage);

export default router;
