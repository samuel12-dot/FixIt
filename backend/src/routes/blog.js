import { Router } from 'express';
import BlogPost from '../models/BlogPost.js';

const router = Router();

router.get('/', async (_req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json({ posts });
});

router.get('/:id', async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ post });
});

export default router;
