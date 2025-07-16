import express from "express"
import { getVinOrderCollection, vinOrderCollection ,confirmOrderPayment} from "../controllers/order.js"


const router = express.Router()

router.post ("/" , vinOrderCollection)

router.post("/payment" , confirmOrderPayment)

router.get("/admin" , getVinOrderCollection)


export default router
