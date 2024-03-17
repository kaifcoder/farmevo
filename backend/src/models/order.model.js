import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

const orderSchema = new Schema(
    {
        price: {
            type: Number,
            required: true,
            default: 0

        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        deliveryAddress: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'cancelled', 'shipped', 'delivered'],
            default: 'pending'
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true
    }
);



export const Order = mongoose.model('Order', orderSchema)