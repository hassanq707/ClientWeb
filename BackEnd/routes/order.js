import express from "express"
import { getVinOrderCollection, vinOrderCollection } from "../controllers/order.js"


const router = express.Router()

router.post ("/" , vinOrderCollection )

router.get("/admin" , getVinOrderCollection)


export default router
