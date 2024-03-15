import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { Category } from "../models/category.model.js"
import mongoose from "mongoose";


// create category if role is admin or farmer

const createCategory = asyncHandler(async (req, res) => {
    // get category details from frontend
    try {
        if (req.user.role !== 'farmer') {
            throw new ApiError(403, "You are not authorized to create category")
        }
        const { name } = req.body

        // validation - not empty
        if (
            [name].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const category = await Category.create({
            name
        })

        // check for category creation
        if (!category) {
            throw new ApiError(500, "Category creation failed")
        }

        // send all categories
        const categories = (await Category.find({})).reverse();

        // send response
        res.status(201).json(new ApiResponse(201, "Category created successfully", categories))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating category")
    }
})

// get all categories for all roles
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(new ApiResponse(200, "All categories", categories))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting categories")
    }
})

//update category if role is admin or farmer
const updateCategory = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== 'farmer') {
            throw new ApiError(403, "You are not authorized to update category")
        }
        const { name } = req.body
        const { id } = req.query


        // validation - not empty
        if (
            [name, id].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const category = await Category.findByIdAndUpdate(id, {
            name
        }, { new: true })

        // check for category creation
        if (!category) {
            throw new ApiError(500, "Category update failed")
        }


        // send response
        res.status(201).json(new ApiResponse(201, "Category updated successfully", category))

    } catch (error) {

        throw new ApiError(500, "Something went wrong while updating category " + error.message)
    }
})

// delete category if role is admin or farmer

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        if (req.user.role !== 'farmer') {
            throw new ApiError(403, "You are not authorized to delete category")
        }
        const { id } = req.query

        // validation - not empty
        if (
            [id].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const category = await Category.findByIdAndDelete(id)

        // check for category creation
        if (!category) {
            throw new ApiError(500, "Category delete failed")
        }

        // send all categories
        const categories = (await Category.find({})).reverse();

        // send response
        res.status(201).json(new ApiResponse(201, "Category deleted successfully", categories))

    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting category")
    }
})



export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}