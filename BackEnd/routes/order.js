const express = require("express")
const { 
  getVinOrderCollection, 
  vinOrderCollection,
  confirmOrderPayment,
  getAllPayments,
  createStripePaymentIntent 
} = require("../controllers/order")

const router = express.Router()

router.post("/", vinOrderCollection)
router.post("/payment", confirmOrderPayment)
router.post("/create-payment-intent", createStripePaymentIntent) 
router.get("/admin", getVinOrderCollection)
router.get("/getpayments", getAllPayments)

module.exports = router