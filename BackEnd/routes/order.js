const express = require("express")
const { 
  getVinOrderCollection, 
  vinOrderCollection,
  confirmOrderPayment,
  getAllPayments,
  createStripePaymentIntent,
  createPayPalOrder,
  verifyPayPalPayment
} = require("../controllers/order")

const router = express.Router()

router.post("/", vinOrderCollection)
router.post("/payment", confirmOrderPayment)
router.post("/create-payment-intent", createStripePaymentIntent)
router.post("/create-paypal-order", createPayPalOrder) 
router.post("/verify-paypal", verifyPayPalPayment) 
router.get("/admin", getVinOrderCollection)
router.get("/getpayments", getAllPayments)

module.exports = router