import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createPost, getFamilyPosts } from '../controllers/postController';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = Router();
router.use(authenticate);

router.post('/families/:familyId/posts', upload.array('media', 10), createPost);
router.get('/families/:familyId/posts', getFamilyPosts);

export default router;
