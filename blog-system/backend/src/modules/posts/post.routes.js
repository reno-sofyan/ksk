import { Router } from 'express';
import { requireAdmin } from '../../middleware/auth.middleware.js';
import { uploadThumbnail } from '../../middleware/upload.middleware.js';
import * as controller from './post.controller.js';

const router = Router();

router.get('/posts', controller.listPublishedPosts);
router.get('/posts/:slug', controller.getPublishedPostBySlug);
router.get('/admin/posts', requireAdmin, controller.listAdminPosts);
router.post('/posts', requireAdmin, uploadThumbnail.single('thumbnail'), controller.createPost);
router.put('/posts/:id', requireAdmin, uploadThumbnail.single('thumbnail'), controller.updatePost);
router.delete('/posts/:id', requireAdmin, controller.deletePost);

export default router;
