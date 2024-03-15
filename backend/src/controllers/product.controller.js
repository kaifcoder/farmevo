import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Product } from "../models/product.model.js"
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
// create product if role is farmer 

const createProduct = asyncHandler(async (req, res) => {
    // get product details from frontend
    try {
        if (req.user.role !== 'farmer' && req.user.role !== 'admin') {
            throw new ApiError(403, "You are not authorized to create product")
        }
        const { name, description, price, stock, category } = req.body

        // validation - not empty
        if (
            [name, description, price, stock, category].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        // local path for thumbnail
        const thumbnailLocalPath = req.file?.path;


        // upload thumbnail to cloudinary
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)




        const product = await Product.create({
            name,
            description,
            price,
            stock,
            thumbnail: thumbnail.secure_url || "",
            category,
            createdBy: req.user._id
        })


        // check for product creation
        if (!product) {
            throw new ApiError(500, "Product creation failed")
        }

        // populate category and createdBy fields
        const result = await Product.findById(product._id).populate('createdBy', '-password -refreshToken').populate('category', 'name')

        // send response
        res.status(201).json(new ApiResponse(201, "Product created successfully", result))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating product")
    }
})

// get all products for all roles

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({ isPublished: true }).populate('createdBy', '-password -refreshToken').populate('category', 'name')
        res.status(200).json(new ApiResponse(200, "All products", products))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting products")
    }
})

//get product by id
const getProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new ApiError(400, "Product id is required")
        }
        const product = await Product.findById(id).populate('createdBy', '-password -refreshToken').populate('category', 'name')
        if (!product) {
            throw new ApiError(404, "Product not found")
        }
        res.status(200).json(new ApiResponse(200, "Product", product))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting product")
    }
})


//update product if role is admin or farmer
const updateProduct = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== 'farmer' && req.user.role !== 'admin') {
            throw new ApiError(403, "You are not authorized to update product")
        }
        const { name, description, price, stock, category } = req.body
        const { id } = req.params



        // local path for thumbnail
        const thumbnailLocalPath = req.file?.path;

        // upload thumbnail to cloudinary
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        const product = await Product
            .findByIdAndUpdate(id, {
                name,
                description,
                price,
                stock,
                thumbnail: thumbnail.secure_url || "",
                category
            }, { new: true })
            .populate('createdBy', '-password -refreshToken')
            .populate('category', 'name')

        // check for product update
        if (!product) {
            throw new ApiError(500, "Product update failed")
        }

        // send response
        res.status(200).json(new ApiResponse(200, "Product updated successfully", product))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating product " + error.message)
    }
}
)

// delete product if role is admin or farmer

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== 'farmer' && req.user.role !== 'admin') {
            throw new ApiError(403, "You are not authorized to delete product")
        }
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid product id")
        }


        const product = await Product.findByIdAndDelete(id)

        // check for product deletion
        if (!product) {
            throw new ApiError(500, "Product deletion failed")
        }

        // send response
        res.status(200).json(new ApiResponse(200, "Product deleted successfully", product))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting product " + error.message)
    }
}
)


export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
