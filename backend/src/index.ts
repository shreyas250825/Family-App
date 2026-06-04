import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { globalLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/auth';
import familyRoutes from './routes/families';
import postRoutes from './routes/posts';
import commentRoutes from './routes/comments';
import likeRoutes from './routes/likes';
import chatRoutes from './routes/chat';
import notificationRoutes from './routes/notifications';
import profileRoutes from './routes/profile';
import searchRoutes from './routes/search';
import adminRoutes from './routes/admin';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(globalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
