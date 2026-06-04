import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController';

const router = Router();
router.use(authenticate);

router.get('/notifications', getNotifications);
router.put('/notifications/:notificationId/read', markAsRead);
router.put('/notifications/read-all', markAllAsRead);

export default router;
