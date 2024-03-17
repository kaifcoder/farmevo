import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrder, getFarmerOrders, getIndustryOrders, updateOrder } from "../controllers/order.controller.js";



const router = Router();


router.route('/').get(
    verifyJWT,
    getIndustryOrders
).post(
    verifyJWT,
    createOrder
);


router.route('/farmer').get(
    verifyJWT,
    getFarmerOrders
).put(
    verifyJWT,
    updateOrder
)





export default router;