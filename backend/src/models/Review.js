import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
