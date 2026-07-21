import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    from: { type: String, enum: ['customer', 'artisan'], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
