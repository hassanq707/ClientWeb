const mongoose = require("mongoose");
const moment = require('moment-timezone');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orders',
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["stripe", "paypal"],
    required: true
  },
  currency: {
    type: String,
    default: 'usd'
  },
  paidAt: {
    type: String,
    default: () =>
      moment().tz('Asia/Karachi').format('DD/MM/YYYY, hh:mm A')
  }
});

module.exports = mongoose.models.Payment || mongoose.model('Payments', paymentSchema);