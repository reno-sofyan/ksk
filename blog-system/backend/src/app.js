import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import { loginAdmin } from './middleware/auth.middleware.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import postRoutes from './modules/posts/post.routes.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.PUBLIC_BASE_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.post('/api/auth/login', loginAdmin);
app.use('/api', postRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
