import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Order } from "../models/order.model.js"


// create order if role is industry or admin
const createOrder = asyncHandler(async (req, res) => {
    // get order details from frontend
    try {
        if (req.user.role !== 'industry') {
            throw new ApiError(403, "You are not authorized to create order")
        }
        const { product, quantity, price, deliveryAddress, deliveryDate } = req.body

        // validation - not empty
        if (
            [product, quantity, price, deliveryAddress, deliveryDate].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const order = await Order.create({
            product,
            quantity,
            price,
            deliveryAddress,
            deliveryDate,
            createdBy: req.user._id
        })

        // check for order creation
        if (!order) {
            throw new ApiError(500, "Order creation failed")
        }

        // send response
        res.status(201).json(new ApiResponse(201, "Order created successfully", order))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating order")
    }
})


export {
    createOrder
}