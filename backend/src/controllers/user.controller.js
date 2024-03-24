import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    try {
        const { fullName, email, password, phoneNumber, role, location } = req.body

        // validation - not empty
        if (
            [fullName, email, password, phoneNumber].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.findOne({ email })

        // check if user already exists: username, email
        if (existedUser) {
            throw new ApiError(400, "User already exists")
        }


        // create user object - create entry in db
        const user = await User.create({
            fullName,
            email,
            password,
            phoneNumber,
            role,
            location
        })

        // remove password and refresh token field from response
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        // check for user creation
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }


        // return res
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )

    } catch (error) {
        return res.status(error.status || 500).json(new ApiResponse(400, null, error.message))
    }

})
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    console.log(incomingRefreshToken)
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    const { email, password } = req.body
    // username or email
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }
    //find the user
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(401, "Invalid email or password or user does not exist")
    }
    //password check
    const isPasswordValid = await user.verifyPassword(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }
    //access and referesh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)
    //send cookie
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})




export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    refreshAccessToken
}