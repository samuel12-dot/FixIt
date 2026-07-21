import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role };
}

router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Enter your full name';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address';
  if (!phone || phone.trim().length < 7) errors.phone = 'Enter a valid phone number';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(400).json({ errors: { email: 'An account with this email already exists' } });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), phone, passwordHash });
  const token = signToken(user);
  res.status(201).json({ token, user: publicUser(user) });
});

router.post('/login', async (req, res) => {
  const { email, phone, password } = req.body;
  if (!password || (!email && !phone)) {
    return res.status(400).json({ error: 'Provide email or phone, and password' });
  }
  const query = email ? { email: email.toLowerCase() } : { phone };
  const user = await User.findOne(query);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token, user: publicUser(user) });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: publicUser(user) });
});

export default router;
