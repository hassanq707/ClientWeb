const ORDER = require("../models/order.js");
const Payment = require("../models/payment.js");
const mongoose = require('mongoose'); 
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const vinOrderCollection = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, vinNumber, vehicleModel, year } = req.body;

    let savedOrder;

    if (fullname && vinNumber && vehicleModel && year && !email && !phoneNumber) {
      // Step 1: Create initial order with basic info (status: pending)
      savedOrder = await ORDER.create({
        fullname,
        vinNumber,
        vehicleModel,
        year,
        paymentStatus: "pending"
      });

    } else if (email && phoneNumber && vinNumber) {
      // Step 2: Update existing order with contact info (keep status as pending)
      savedOrder = await ORDER.findOneAndUpdate(
        { vinNumber },
        {
          $set: {
            email,
            phoneNumber
          }
        },
        { new: true, upsert: false }
      );

      if (!savedOrder) {
        // Create new order if no existing one found
        savedOrder = await ORDER.create({
          fullname,
          vinNumber,
          vehicleModel,
          year,
          email,
          phoneNumber,
          paymentStatus: "pending" 
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid request data"
      });
    }

    return res.json({
      success: true,
      message: "Order processed",
      order: savedOrder
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// All orders
const getVinOrderCollection = async (req, res) => {
    try {
        const getOrder = await ORDER.find();
        return res.json({
            success: true,
            message: "Get All Orders Successfully",
            orders: getOrder
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: 'orderId',
        select: 'fullname paymentStatus'
      });

    return res.json({
      success: true,
      message: "Get All Payments Successfully",
      payments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const confirmOrderPayment = async (req, res) => {
  try {
    const { orderId, transactionId, amount} = req.body;
    const payment = await Payment.create({
      orderId,
      transactionId,
      amount: typeof amount === 'string' ? parseFloat(amount.replace('$', '')) : amount,
      currency: 'usd',
    });

    // Update order status
    const updatedOrder = await ORDER.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "confirmed",
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      order: updatedOrder,
      payment
    });

  } catch (error) {
    console.error("Payment confirmation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create Payment Intent 
const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id 
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
};

module.exports = {
  createStripePaymentIntent,
  confirmOrderPayment,
  vinOrderCollection,
  getVinOrderCollection,
  getAllPayments
}