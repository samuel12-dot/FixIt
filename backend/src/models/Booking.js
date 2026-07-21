import mongoose from 'mongoose';

const STATUS_FLOW = ['pending', 'accepted', 'en_route', 'in_progress', 'completed'];

const bookingSchema = new mongoose.Schema(
  {
    orderCode: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'Artisan', required: true },
    category: { type: String, required: true },
    issueDesc: { type: String, default: '' },
    urgency: { type: String, enum: ['Standard', 'Same day', 'Emergency'], default: 'Standard' },
    slotLabel: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    calloutFee: { type: Number, default: 3000 },
    status: { type: String, enum: [...STATUS_FLOW, 'cancelled', 'disputed'], default: 'pending' },
    paymentReleased: { type: Boolean, default: false },
    releasedAt: { type: Date },
  },
  { timestamps: true }
);

export { STATUS_FLOW };
export default mongoose.model('Booking', bookingSchema);
