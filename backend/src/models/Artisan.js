import mongoose from 'mongoose';

const artisanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    category: { type: String, required: true },
    area: { type: String, required: true },
    distance: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 0 },
    jobsCount: { type: Number, default: 0 },
    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },
    response: { type: String, default: '1 hr' },
    verifiedId: { type: Boolean, default: false },
    portfolio: [{ title: String, desc: String }],
    availability: [
      {
        day: String,
        slots: [{ time: String, disabled: Boolean }],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Artisan', artisanSchema);
