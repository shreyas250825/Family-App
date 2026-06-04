import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createComment, deleteComment } from '../controllers/commentController';

const router = Router();
router.use(authenticate);

router.post('/posts/:postId/comments', createComment);
router.delete('/comments/:commentId', deleteComment);

export default router;
