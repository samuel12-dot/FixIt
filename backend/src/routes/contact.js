import { Router } from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const errors = {};
  if (!name) errors.name = 'Enter your name';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address';
  if (!message) errors.message = 'Enter a message';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const contact = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ contact });
});

export default router;
