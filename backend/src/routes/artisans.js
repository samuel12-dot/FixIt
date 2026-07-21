import { Router } from 'express';
import Artisan from '../models/Artisan.js';
import Review from '../models/Review.js';
import ArtisanApplication from '../models/ArtisanApplication.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q, category, area, priceMax, minRating, verifiedOnly, sort } = req.query;
  const filter = {};
  if (category && category !== 'all') filter.category = category;
  if (area) filter.area = area;
  if (priceMax) filter.priceMin = { $lte: Number(priceMax) };
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (verifiedOnly === 'true') filter.verifiedId = true;
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
      { area: { $regex: q, $options: 'i' } },
    ];
  }

  let query = Artisan.find(filter);
  switch (sort) {
    case 'rating':
      query = query.sort({ rating: -1 });
      break;
    case 'price_low':
      query = query.sort({ priceMin: 1 });
      break;
    case 'price_high':
      query = query.sort({ priceMax: -1 });
      break;
    case 'distance':
      query = query.sort({ distance: 1 });
      break;
    default:
      query = query.sort({ rating: -1, jobsCount: -1 });
  }

  const artisans = await query.exec();
  res.json({ artisans });
});

router.get('/:id', async (req, res) => {
  const artisan = await Artisan.findById(req.params.id);
  if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
  const reviews = await Review.find({ artisan: artisan._id }).sort({ createdAt: -1 }).limit(20);
  res.json({ artisan, reviews });
});

router.post('/apply', async (req, res) => {
  const { name, trade, area, phone } = req.body;
  if (!name || !trade || !area || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const application = await ArtisanApplication.create({ name, trade, area, phone });
  res.status(201).json({ application });
});

export default router;
