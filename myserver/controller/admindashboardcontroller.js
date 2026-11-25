import Product from "../models/productmodel.js"
import User from "../models/usermodel.js"
import Admin from "../models/adminmodel.js"
import mongoose from "mongoose"

const LOW_STOCK_LIMIT = 29
const DAY = 24 * 60 * 60 * 1000

// Users have no createdAt field, but every MongoDB _id contains its creation time.
// This builds the smallest possible _id for a given date so we can count by date.
const idFromDate = (date) =>
    mongoose.Types.ObjectId.createFromTime(Math.floor(date.getTime() / 1000))

export const getdashboard = async (req, res) => {
    try {
        const now = Date.now()
        const last30 = idFromDate(new Date(now - 30 * DAY))
        const prev30 = idFromDate(new Date(now - 60 * DAY))

        const [
            totalProducts,
            totalCustomers,
            totalAdmins,
            stockAgg,
            lowStockProducts,
            featuredProducts,
            newCustomers,
            previousNewCustomers,
            recentProducts,
            topRatedProducts,
        ] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments(),
            Admin.countDocuments(),
            Product.aggregate([{ $group: { _id: null, total: { $sum: "$stock" } } }]),
            Product.countDocuments({ stock: { $lte: LOW_STOCK_LIMIT } }),
            Product.countDocuments({ isFeatured: true }),
            User.countDocuments({ _id: { $gte: last30 } }),
            User.countDocuments({ _id: { $gte: prev30, $lt: last30 } }),
            Product.find().sort({ createdAt: -1 }).limit(8),
            Product.find({ ratings: { $gt: 0 } }).sort({ ratings: -1 }).limit(5),
        ])

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalCustomers,
                totalAdmins,
                totalStock: stockAgg[0]?.total || 0,
                lowStockProducts,
                featuredProducts,
                newCustomers,
                previousNewCustomers,
                // totalRevenue is intentionally missing: it needs an Order model.
            },
            recentProducts,
            topRatedProducts,
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Dashboard Error", error: error.message })
    }
}
