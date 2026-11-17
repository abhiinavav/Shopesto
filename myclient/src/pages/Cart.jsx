
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch Cart
    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:5000/cart", {
                credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Unable to fetch cart");
            }

            setCart(data.cart || null);

        } catch (error) {
            console.log(error);
            toast.error("Unable to load cart");
        } finally {
            setLoading(false);
        }
    };

    // Remove Product
    const handleRemoveFromCart = async (prodId) => {
        try {
            const res = await fetch(
                `http://localhost:5000/cart/${prodId}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Unable to remove item");
            }

            toast.success("Product removed!");
            fetchCart();

        } catch (error) {
            toast.error(error.message);
        }
    };

    // Update Quantity
    const handleUpdateQuantity = async (prodId, action) => {
        try {
            const res = await fetch(
                `http://localhost:5000/cart/${prodId}/${action}`,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Unable to update quantity");
            }

            fetchCart();

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Calculations
    const items = cart?.items?.filter(item => item.product) || [];

    const totalItems = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shipping = 0;
    const total = cart?.totalPrice ?? subtotal;

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg font-medium text-gray-500">
                    Loading your cart...
                </p>
            </div>
        );
    }

    // Empty Cart
    if (!items.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center bg-white p-12 rounded-2xl shadow-sm max-w-md w-full">

                    <div className="text-6xl mb-5">
                        🛒
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        Your cart is empty
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Looks like you haven't added anything to your cart yet.
                    </p>

                    <a
                        href="/"
                        className="inline-block mt-7 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        Continue Shopping
                    </a>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                        Your Shopping Bag
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Shopping Cart
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {totalItems} items in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Products */}
                    <div className="lg:col-span-2 space-y-5">

                        {items.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition"
                            >

                                {/* Image */}
                                <div className="w-full h-48 sm:w-36 sm:h-36 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                    <img
                                        src={item.product?.images?.[0] || "https://placehold.co/300"}
                                        alt={item.product?.productName || "Product"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col justify-between">

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                                            {item.product?.brand || item.product?.category || "Product"}
                                        </p>

                                        <h2 className="text-lg font-bold text-gray-900 mt-2">
                                            {item.product?.productName}
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-2">
                                            Price per item
                                        </p>

                                        <p className="text-lg font-semibold mt-1">
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleRemoveFromCart(item.product._id)}
                                        className="text-red-500 text-sm font-semibold mt-5 text-left hover:text-red-700 transition"
                                    >
                                        Remove item
                                    </button>

                                </div>

                                {/* Quantity and Price */}
                                <div className="flex sm:flex-col justify-between sm:items-end items-center gap-5">

                                    {/* Quantity */}
                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

                                        <button
                                            onClick={() => handleUpdateQuantity(item.product._id, "decrement")}
                                            disabled={item.quantity <= 1}
                                            className="px-4 py-2 text-lg hover:bg-gray-100 disabled:opacity-40"
                                        >
                                            −
                                        </button>

                                        <span className="px-4 font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => handleUpdateQuantity(item.product._id, "increment")}
                                            className="px-4 py-2 text-lg hover:bg-gray-100"
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">
                                            Total price
                                        </p>

                                        <p className="text-xl font-bold text-gray-900 mt-1">
                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* Order Summary */}
                    <div className="h-fit bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-6">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="mt-7 space-y-5">

                            <div className="flex justify-between text-gray-600">
                                <span>Items ({totalItems})</span>
                                <span className="font-medium text-gray-900">
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-semibold">
                                    Free
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span className="text-gray-900">
                                    Included
                                </span>
                            </div>

                            <hr className="border-gray-200" />

                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-gray-900">
                                    ₹{(total + shipping).toLocaleString("en-IN")}
                                </span>
                            </div>

                        </div>

                        <button
                            className="w-full mt-8 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
                        >
                            Proceed to Checkout →
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-5">
                            🔒 Secure and safe checkout
                        </p>

                        <div className="mt-7 pt-5 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">
                                Need help with your order?
                            </p>

                            <p className="text-sm font-semibold mt-1">
                                Contact Support
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;
