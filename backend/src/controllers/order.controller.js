import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Order } from "../models/order.model.js"
import { Product } from "../models/product.model.js"


// create order if role is industry or admin
const createOrder = asyncHandler(async (req, res) => {

    try {
        if (req.user.role !== 'industry') {
            throw new ApiError(403, "You are not authorized to create order")
        }
        const { product, price, quantity, deliveryAddress } = req.body

        const checkProductStock = await Product.findById(product).select('stock')

        if (checkProductStock.stock < quantity) {
            throw new ApiError(400, "Insufficient stock")
        }

        const order = await Order.create({
            product,
            quantity,
            price,
            deliveryAddress,
            customer: req.user._id
        })

        const productStockUpdate = await Product.findByIdAndUpdate(product, {
            $inc: { stock: -quantity }
        }, { new: true })

        // check for order creation
        if (!order) {
            throw new ApiError(500, "Order creation failed")
        }

        // send response
        res.status(201).json(new ApiResponse(201, "Order created successfully", order))
    } catch (error) {
        return res.status(error.status || 500).json(new ApiResponse(400, null, error.message))
    }
})

const getIndustryOrders = asyncHandler(async (req, res) => {
    // get all orders created by industry
    try {
        if (req.user.role !== 'industry') {
            throw new ApiError(403, "You are not authorized to view orders")
        }

        const orders = await Order.find({
            customer: req.user._id
        }).populate('customer', 'fullName email phoneNumber ').populate({
            path: 'product',
            populate: {
                path: 'createdBy',
                select: 'fullName email'
            }

        });


        // check for orders
        if (!orders) {
            throw new ApiError(404, "No orders found")
        }

        // send response
        res.status(200).json(new ApiResponse(200, "Orders retrieved successfully", orders))

    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while retrieving orders")
    }
})


const getFarmerOrders = asyncHandler(async (req, res) => {
    // get all orders created by farmer
    try {
        if (req.user.role !== 'farmer') {
            throw new ApiError(403, "You are not authorized to view orders")
        }

        let orders = await Order.find({}).populate('customer', 'fullName email phoneNumber ').populate({
            path: 'product',
            populate: {
                path: 'createdBy',
                select: 'fullName email'
            }
        });

        orders = orders.filter(order => order.product.createdBy._id.toString() === req.user._id.toString())

        console.log(orders)

        // check for orders
        if (!orders) {
            throw new ApiError(404, "No orders found")
        }

        // send response
        res.status(200).json(new ApiResponse(200, "Orders retrieved successfully", orders))

    } catch (error) {
        return res.status(error.status || 500).json(new ApiResponse(400, null, error.message))
    }
})

const updateOrder = asyncHandler(async (req, res) => {
    // update order status
    try {
        if (req.user.role !== 'industry') {
            throw new ApiError(403, "You are not authorized to update order")
        }

        const { orderId, status } = req.body

        // validation - not empty
        if (
            [orderId, status].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const order = await Order.findByIdAndUpdate(orderId, {
            status
        }, { new: true })

        // check for order creation
        if (!order) {
            throw new ApiError(500, "Order update failed")
        }

        // send response
        res.status(200).json(new ApiResponse(200, "Order updated successfully", order))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating order")
    }
})

const getOrder = asyncHandler(async (req, res) => {
    // get order by id
    try {

        const { orderId } = req.params

        const order = await Order.findById(orderId).populate('customer', 'fullName email phoneNumber ').populate({
            path: 'product',
            populate: {
                path: 'createdBy',
                select: 'fullName email'
            }
        });

        // check for orders
        if (!order) {
            throw new ApiError(404, "No order found")
        }

        // send response
        res.status(200).json(new ApiResponse(200, "Order retrieved successfully", order))

    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while retrieving order")
    }
})


export {
    createOrder,
    getFarmerOrders,
    updateOrder,
    getIndustryOrders,
    getOrder
}