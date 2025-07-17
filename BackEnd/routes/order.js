import express from "express"
import { getVinOrderCollection, vinOrderCollection ,confirmOrderPayment,getAllPayments} from "../controllers/order.js"


const router = express.Router()

router.post ("/" , vinOrderCollection)

router.post("/payment" , confirmOrderPayment)

router.get("/admin" , getVinOrderCollection)

router.get("/getpayments" , getAllPayments)



export default router
