
import { authLimiter } from '../middleware/rateLimiter';
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);