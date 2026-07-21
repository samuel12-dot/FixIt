import { Router } from 'express';
import Newsletter from '../models/Newsletter.js';

const router = Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address' });
  }
  const existing = await Newsletter.findOne({ email: email.toLowerCase() });
  if (!existing) await Newsletter.create({ email: email.toLowerCase() });
  res.status(201).json({ ok: true });
});

export default router;
