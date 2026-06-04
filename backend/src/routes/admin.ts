import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getFamilyRequests, handleFamilyRequest, removeMember, getActivityLogs } from '../controllers/adminController';

const router = Router();
router.use(authenticate);

router.get('/families/:familyId/requests', getFamilyRequests);
router.put('/families/:familyId/requests/:requestId', handleFamilyRequest);
router.delete('/families/:familyId/members/:userId', removeMember);
router.get('/families/:familyId/activity-logs', getActivityLogs);

export default router;
