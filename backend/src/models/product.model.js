import mongoose, { Schema } from "mongoose";


const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        thumbnail: {
            type: String,
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        type: {
            type: String,
            enum: ['product', 'by-product'],
            default: 'product',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema)