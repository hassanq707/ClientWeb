import ORDER from "../models/order.js";

export const vinOrderCollection = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, vinNumber, vehicleModel, year } = req.body;

    let savedOrder;

    if (fullname && vinNumber && vehicleModel && year && !email && !phoneNumber) {
      // Step 1: Create order with partial data (pending)
      savedOrder = await ORDER.create({
        fullname,
        vinNumber,
        vehicleModel,
        year,
        paymentStatus: "pending"
      });

    } else if (email && phoneNumber && vinNumber) {
      // Step 2: Try update, else create new full order if not found
      savedOrder = await ORDER.findOneAndUpdate(
        { vinNumber },
        {
          $set: {
            email,
            phoneNumber,
            paymentStatus: "confirmed"
          }
        },
        { new: true }
      );

      if (!savedOrder) {
        // Create full order if not found
        savedOrder = await ORDER.create({
          fullname,
          vinNumber,
          vehicleModel,
          year,
          email,
          phoneNumber,
          paymentStatus: "confirmed"
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
      message: "Order confirmed",
      order: savedOrder
    });
  } catch (error) {
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
