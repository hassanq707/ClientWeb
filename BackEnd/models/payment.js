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
    type: String,  
    required: true
  },
  paidAt: {
          type: String,
          default: () =>
          moment().tz('Asia/Karachi').format('DD/MM/YYYY, hh:mm A')
  }
});

export default mongoose.models.Payment || mongoose.model('Payments', paymentSchema);