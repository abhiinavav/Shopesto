
import { randomBytes } from "crypto";
import mongoose from "mongoose";

import Order from "../models/ordermodel.js";
import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";

export const placeCodOrder = async (req, res) => {
    const deductedProducts = [];

    try {
        // 1. Only customers can place orders
        if (req.accountType !== "user") {
            return res.status(403).json({
                success: false,
                message: "Only customers can place orders.",
            });
        }

        const userId = req.user._id;

        // 2. Get customer's cart
        const cart = await Cart.findOne({ user: userId });

        console.log("Cart found:", cart);
console.log("Cart items:", cart?.items);

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty.",
            });
        }

        // 3. Get shipping address
        const shippingAddress = req.body.shippingAddress || req.user.address;

        const requiredAddressFields = [
            "fullname",
            "phone",
            "street",
            "city",
            "state",
            "pincode",
        ];

        const missingAddress = requiredAddressFields.some(
            (field) => !shippingAddress?.[field]?.toString().trim()
        );

        if (missingAddress) {
            return res.status(400).json({
                success: false,
                message: "Please provide a complete shipping address.",
            });
        }

        // 4. Combine duplicate products in the cart
        const quantityMap = new Map();

        for (const item of cart.items) {
            const productId = item.product.toString();

            quantityMap.set(
                productId,
                (quantityMap.get(productId) || 0) + item.quantity
            );
        }

        // 5. Fetch products from database
        const productIds = [...quantityMap.keys()];

        const products = await Product.find({
            _id: { $in: productIds },
        });

        const productMap = new Map(
            products.map((product) => [
                product._id.toString(),
                product,
            ])
        );

        const orderItems = [];
        let subtotal = 0;

        // 6. Validate products and calculate prices
        for (const [productId, quantity] of quantityMap) {
            const product = productMap.get(productId);

            if (!product || !product.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "One or more products are unavailable.",
                });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.productName} has only ${product.stock} items available.`,
                });
            }

            // Use discount price when it is valid
            const unitPrice =
                product.discountprice > 0 &&
                product.discountprice < product.price
                    ? product.discountprice
                    : product.price;

            const lineTotal = unitPrice * quantity;

            subtotal += lineTotal;

            orderItems.push({
                product: product._id,
                productName: product.productName,
                image: product.images?.[0] || "",
                quantity,
                unitPrice,
                lineTotal,
            });
        }

        // 7. Calculate final amount
        const shippingCharge = 0;
        const tax = 0;
        const totalAmount = subtotal + shippingCharge + tax;

        // 8. Reduce stock safely
        // The stock condition protects against another checkout
        // using the same stock at the same time.
        for (const item of orderItems) {
            const result = await Product.updateOne(
                {
                    _id: item.product,
                    stock: { $gte: item.quantity },
                    isActive: true,
                },
                {
                    $inc: { stock: -item.quantity },
                }
            );

            if (result.modifiedCount !== 1) {
                const error = new Error(
                    `${item.productName} is no longer available in the requested quantity.`
                );

                error.statusCode = 409;
                throw error;
            }

            deductedProducts.push({
                productId: item.product,
                quantity: item.quantity,
            });
        }

        // 9. Create order
        const order = await Order.create({
            orderNumber: `ORD-${Date.now()}-${randomBytes(3)
                .toString("hex")
                .toUpperCase()}`,

            user: userId,
            items: orderItems,
            shippingAddress: {
                fullname: shippingAddress.fullname,
                phone: shippingAddress.phone,
                street: shippingAddress.street,
                city: shippingAddress.city,
                state: shippingAddress.state,
                pincode: shippingAddress.pincode,
                country: shippingAddress.country || "India",
            },

            subtotal,
            shippingCharge,
            tax,
            totalAmount,

            paymentMethod: "COD",
            paymentStatus: "Pending",
            orderStatus: "Pending",
        });

        // 10. Clear cart after order creation
        try {
            await Cart.updateOne(
                { _id: cart._id },
                {
                    $set: {
                        items: [],
                        totalPrice: 0,
                    },
                }
            );
        } catch (cartError) {
            // The order is already created.
            // Do not report checkout failure just because cart clearing failed.
            console.error("Cart clearing failed:", cartError);
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order,
        });

    } catch (error) {
        console.error("COD checkout error:", error);

        // Restore stock if checkout failed after stock deduction
        for (const item of deductedProducts) {
            try {
                await Product.updateOne(
                    { _id: item.productId },
                    {
                        $inc: { stock: item.quantity },
                    }
                );
            } catch (rollbackError) {
                console.error("Stock rollback failed:", rollbackError);
            }
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Unable to place your order.",
        });
    }
};
