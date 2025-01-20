import { Router } from "express"
import { paymentRoutes } from "./payment-routes"

export const router = Router()

router.use("/payment", paymentRoutes)

