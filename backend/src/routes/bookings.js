import { Router } from 'express';
import Booking, { STATUS_FLOW } from '../models/Booking.js';
import Artisan from '../models/Artisan.js';
import Message from '../models/Message.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { generateOrderCode } from '../utils/orderCode.js';

const router = Router();

async function loadOwnedBooking(req, res) {
  const booking = await Booking.findById(req.params.id).populate('artisan');
  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
    return null;
  }
  if (booking.customer.toString() !== req.userId) {
    res.status(403).json({ error: 'Not your booking' });
    return null;
  }
  return booking;
}

router.use(requireAuth);

router.post('/', async (req, res) => {
  const { artisanId, category, issueDesc, urgency, slotLabel, address, phone, calloutFee } = req.body;
  if (!artisanId || !slotLabel || !address || !phone) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }
  const artisan = await Artisan.findById(artisanId);
  if (!artisan) return res.status(404).json({ error: 'Artisan not found' });

  let orderCode = generateOrderCode();
  while (await Booking.exists({ orderCode })) orderCode = generateOrderCode();

  const booking = await Booking.create({
    orderCode,
    customer: req.userId,
    artisan: artisan._id,
    category: category || artisan.category,
    issueDesc: issueDesc || '',
    urgency: urgency || 'Standard',
    slotLabel,
    address,
    phone,
    calloutFee: calloutFee ?? 3000,
  });

  await Message.create({
    booking: booking._id,
    from: 'artisan',
    text: "Hi! I've accepted your booking — I'll confirm the exact price once I inspect the job.",
  });

  const populated = await booking.populate('artisan');
  res.status(201).json({ booking: populated });
});

router.get('/', async (req, res) => {
  const bookings = await Booking.find({ customer: req.userId }).populate('artisan').sort({ createdAt: -1 });
  res.json({ bookings });
});

router.get('/:id', async (req, res) => {
  const booking = await loadOwnedBooking(req, res);
  if (!booking) return;
  const messages = await Message.find({ booking: booking._id }).sort({ createdAt: 1 });
  res.json({ booking, messages });
});

router.patch('/:id/advance', async (req, res) => {
  const booking = await loadOwnedBooking(req, res);
  if (!booking) return;
  const idx = STATUS_FLOW.indexOf(booking.status);
  const nextIdx = Math.min(STATUS_FLOW.length - 1, idx + 1);
  booking.status = STATUS_FLOW[nextIdx];
  await booking.save();
  res.json({ booking });
});

router.post('/:id/release', async (req, res) => {
  const booking = await loadOwnedBooking(req, res);
  if (!booking) return;
  if (booking.status !== 'in_progress' && booking.status !== 'completed') {
    return res.status(400).json({ error: 'Job must be in progress before payment can be released' });
  }
  booking.status = 'completed';
  booking.paymentReleased = true;
  booking.releasedAt = new Date();
  await booking.save();

  const artisan = await Artisan.findById(booking.artisan);
  if (artisan) {
    artisan.jobsCount += 1;
    await artisan.save();
  }
  res.json({ booking });
});

router.post('/:id/messages', async (req, res) => {
  const booking = await loadOwnedBooking(req, res);
  if (!booking) return;
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'Message text required' });

  const customerMsg = await Message.create({ booking: booking._id, from: 'customer', text: text.trim() });
  const messages = [customerMsg];

  const autoReplies = [
    "Got it, thanks for letting me know!",
    "Sure, I'll factor that in when I arrive.",
    "Noted — see you soon.",
  ];
  const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
  const artisanMsg = await Message.create({ booking: booking._id, from: 'artisan', text: reply });
  messages.push(artisanMsg);

  res.status(201).json({ messages });
});

router.post('/:id/review', async (req, res) => {
  const booking = await loadOwnedBooking(req, res);
  if (!booking) return;
  if (booking.status !== 'completed') {
    return res.status(400).json({ error: 'You can only review a completed job' });
  }
  const { stars, text } = req.body;
  if (!stars || !text) return res.status(400).json({ error: 'Rating and review text are required' });

  const user = await User.findById(req.userId);
  const review = await Review.create({
    booking: booking._id,
    artisan: booking.artisan,
    customer: req.userId,
    customerName: user.name,
    stars,
    text,
  });

  const artisan = await Artisan.findById(booking.artisan);
  if (artisan) {
    const total = artisan.rating * artisan.reviewsCount + stars;
    artisan.reviewsCount += 1;
    artisan.rating = Number((total / artisan.reviewsCount).toFixed(2));
    await artisan.save();
  }

  res.status(201).json({ review });
});

export default router;
