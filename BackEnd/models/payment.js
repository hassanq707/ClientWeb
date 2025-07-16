import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal'],
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  amount: {
    type: String,  // Keep as String if you prefer
    required: true
  },
  paidAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Payment || mongoose.model('Payments', paymentSchema);