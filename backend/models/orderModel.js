import mongoose, { Schema } from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            item: {
                type: Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            }
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    user: {
        email: {
            type: String,
            required: true,
        },
        address: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    seller: {
        phone: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Seller",
        },
    },
    isAccepted: {
        type: Boolean,
        required: true,
        default: false
    },
    isCancelled: {
        type: Boolean,
        required: true,
        default: false
    },
    isOutForDelivery: {
        type: Boolean,
        required: true,
        default: false
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Order', orderSchema);