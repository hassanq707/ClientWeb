import ORDER from "../models/order.js";
import Payment from "../models/payment.js";


export const vinOrderCollection = async (req, res) => {
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
          paymentStatus: "pending" // Set as pending for new orders too
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

// Confirm payment
export const confirmOrderPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, transactionId, amount } = req.body;

    // 1. Create payment record
    const payment = await Payment.create({
      orderId,
      paymentMethod,
      transactionId,
      amount,
      paidAt: new Date()
    });

    // 2. Update order status
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

// For getting orders
export const getVinOrderCollection = async (req, res) => {
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

export const getAllPayments = async (req, res) => {
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

