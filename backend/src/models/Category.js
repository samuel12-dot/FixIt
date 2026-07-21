import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  abbr: { type: String, required: true },
  desc: { type: String, required: true },
  longDesc: { type: String, default: '' },
  iconBg: { type: String, required: true },
  iconColor: { type: String, required: true },
  priceRange: { type: String, required: true },
  response: { type: String, required: true },
  duration: { type: String, required: true },
  available: { type: Number, default: 0 },
});

export default mongoose.model('Category', categorySchema);
