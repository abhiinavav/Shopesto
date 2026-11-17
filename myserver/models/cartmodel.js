
import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true,
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1,
            },

            price: {
                type: Number,
                required: true,
            },
        },
    ],

    totalPrice: {
        type: Number,
        default: 0,
    },
},


    { timestamps: true }


);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
