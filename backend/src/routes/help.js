import { Router } from 'express';
import HelpArticle from '../models/HelpArticle.js';

const router = Router();

router.get('/', async (req, res) => {
  const { cat, q } = req.query;
  const filter = {};
  if (cat) filter.cat = cat;
  if (q) filter.title = { $regex: q, $options: 'i' };
  const articles = await HelpArticle.find(filter);
  res.json({ articles });
});

router.get('/popular', async (req, res) => {
  const articles = await HelpArticle.find({ popular: true }).limit(5);
  res.json({ articles });
});

export default router;
