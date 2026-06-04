import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { toggleLike } from '../controllers/likeController';

const router = Router();
router.use(authenticate);

router.post('/posts/:postId/likes', toggleLike);
router.delete('/posts/:postId/likes', toggleLike);

export default router;
