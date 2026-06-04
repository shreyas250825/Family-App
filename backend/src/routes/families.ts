import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createFamily, getFamilies, getFamilyById, joinFamily } from '../controllers/familyController';

const router = Router();
router.use(authenticate);

router.post('/', createFamily);
router.get('/', getFamilies);
router.get('/:familyId', getFamilyById);
router.post('/join', joinFamily);

export default router;
