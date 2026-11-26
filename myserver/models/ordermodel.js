
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    lineTotal: {
        type: Number,
        required: true,
        min: 0,
    },
}, { _id: false });


const addressSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "India",
    },
}, { _id: false });


const orderSchema = new mongoose.Schema({

    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    items: {
        type: [orderItemSchema],
        required: true,
    },

    shippingAddress: {
        type: addressSchema,
        required: true,
    },

    subtotal: {
        type: Number,
        required: true,
    },

    shippingCharge: {
        type: Number,
        default: 0,
    },

    tax: {
        type: Number,
        default: 0,
    },

    totalAmount: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "CARD", "UPI"],
        required: true,
        default: "COD",
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
    },

    orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending",
    },

    // Razorpay integration fields

    paymentGateway: {
        type: String,
        default: null,
    },

    razorpayOrderId: {
        type: String,
        default: null,
    },

    razorpayPaymentId: {
        type: String,
        default: null,
    },

}, { timestamps: true });


orderSchema.index({ user: 1, createdAt: -1 });

orderSchema.index({ orderStatus: 1, createdAt: -1 });


const Order = mongoose.model("Order", orderSchema);

export default Order;
