
import React, { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    ShieldCheck,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    ArrowUpRight,
    IndianRupee,
    TrendingUp,
    AlertTriangle,
    Star,
    Plus,
    RefreshCw,
    Boxes
} from "lucide-react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const Admin = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API}/dashboard`, {
                credentials: "include"
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(result.message || "Dashboard fetch failed");
            }

            setData(result);

        } catch (error) {
            console.log(error);
            toast.error(error.message || "Unable to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const stats = [
        {
            title: "Total Revenue",
            value: `₹${(data?.stats?.totalRevenue || 0).toLocaleString("en-IN")}`,
            description: "Sales analytics coming soon",
            icon: IndianRupee,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Total Products",
            value: data?.stats?.totalProducts ?? "—",
            description: `${data?.stats?.totalStock ?? 0} units in inventory`,
            icon: Package,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Total Customers",
            value: data?.stats?.totalCustomers ?? "—",
            description: "Active customer accounts",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Total Admins",
            value: data?.stats?.totalAdmins ?? "—",
            description: "Active administrators",
            icon: ShieldCheck,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    const recentProducts = data?.recentProducts || [];

    const filteredProducts = recentProducts.filter((product) =>
        product.productName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F5F5F4] flex text-gray-900">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-[#111827] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>

                <div className="h-24 px-7 flex items-center justify-between border-b border-white/10">

                    <Link to="/admin" className="text-2xl font-bold">
                        shopes<span className="text-orange-500">too.</span>
                    </Link>

                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X size={22} />
                    </button>

                </div>

                <div className="flex-1 px-5 py-8 overflow-y-auto">

                    <p className="text-[10px] uppercase tracking-[2px] text-gray-500 mb-5 px-3">
                        Workspace
                    </p>

                    <nav className="space-y-2">

                        <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold">
                            <LayoutDashboard size={19} />
                            Overview
                        </Link>

                        <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white text-sm">
                            <Package size={19} />
                            Products
                        </Link>

                        <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white text-sm">
                            <ShoppingBag size={19} />
                            Orders
                        </Link>

                        <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white text-sm">
                            <Users size={19} />
                            Customers
                        </Link>

                    </nav>

                    <p className="text-[10px] uppercase tracking-[2px] text-gray-500 mt-10 mb-5 px-3">
                        Administration
                    </p>

                    <nav className="space-y-2">

                        <Link to="/admin/admins" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white text-sm">
                            <ShieldCheck size={19} />
                            Admin Management
                        </Link>

                        <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white text-sm">
                            <Settings size={19} />
                            Settings
                        </Link>

                    </nav>

                </div>

                <div className="p-5 border-t border-white/10">
                    <button
                        onClick={() => toast("Connect your logout function here")}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>

            </aside>


            {/* MAIN */}
            <main className="flex-1 min-w-0">

                {/* HEADER */}
                <header className="h-[82px] bg-white border-b border-gray-100 px-5 md:px-9 flex items-center justify-between sticky top-0 z-30">

                    <div className="flex items-center gap-4">

                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Menu size={22} />
                        </button>

                        <div>
                            <p className="text-[10px] uppercase tracking-[2px] text-gray-400">
                                Shopestoo / Workspace
                            </p>
                            <h1 className="text-lg font-bold mt-1">
                                Dashboard Overview
                            </h1>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={fetchDashboard}
                            title="Refresh dashboard"
                            className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500"
                        >
                            <RefreshCw size={19} className={loading ? "animate-spin" : ""} />
                        </button>

                        <button className="relative p-2 text-gray-500">
                            <Bell size={21} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                        </button>

                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                            A
                        </div>

                    </div>

                </header>


                {/* DASHBOARD CONTENT */}
                <div className="p-5 md:p-9 max-w-[1600px] mx-auto">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">

                        <div>
                            <p className="text-orange-600 text-xs font-bold uppercase tracking-[2px]">
                                Store Analytics
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                                Welcome back, Admin.
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                Here's what's happening with your store.
                            </p>
                        </div>

                        <Link
                            to="/admin/add-product"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition"
                        >
                            <Plus size={18} />
                            Add Product
                        </Link>

                    </div>


                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div key={stat.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition">

                                    <div className="flex justify-between items-center">

                                        <p className="text-sm text-gray-500 font-medium">
                                            {stat.title}
                                        </p>

                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                            <Icon size={22} />
                                        </div>

                                    </div>

                                    <h3 className="text-3xl font-bold mt-5">
                                        {loading ? "..." : stat.value}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-3">
                                        {stat.description}
                                    </p>

                                </div>
                            );
                        })}

                    </div>


                    {/* INVENTORY OVERVIEW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

                        <div className="md:col-span-2 bg-[#111827] rounded-2xl p-7 text-white">

                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Inventory Overview
                                    </p>

                                    <h3 className="text-3xl font-bold mt-3">
                                        {loading ? "..." : (data?.stats?.totalStock || 0).toLocaleString("en-IN")}
                                    </h3>

                                    <p className="text-gray-400 text-xs mt-2">
                                        Total units across active products
                                    </p>
                                </div>

                                <div className="w-12 h-12 bg-orange-500/15 text-orange-400 rounded-xl flex items-center justify-center">
                                    <Boxes size={24} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-9 pt-6 border-t border-white/10">

                                <div>
                                    <p className="text-gray-400 text-xs">Featured Products</p>
                                    <p className="text-2xl font-bold mt-2">
                                        {data?.stats?.featuredProducts ?? 0}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs">Low Stock Products</p>
                                    <p className="text-2xl font-bold text-orange-400 mt-2">
                                        {data?.stats?.lowStockProducts ?? 0}
                                    </p>
                                </div>

                            </div>

                        </div>


                        <div className="bg-white border border-gray-100 rounded-2xl p-7">

                            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <AlertTriangle size={22} />
                            </div>

                            <p className="text-sm text-gray-500 mt-5">
                                Inventory Alerts
                            </p>

                            <h3 className="text-3xl font-bold mt-2">
                                {data?.stats?.lowStockProducts ?? 0}
                            </h3>

                            <p className="text-xs text-gray-400 mt-2">
                                Products with 5 or fewer units
                            </p>

                            <Link to="/admin/products" className="flex items-center gap-2 text-orange-600 font-semibold text-sm mt-7">
                                Manage inventory <ArrowUpRight size={16} />
                            </Link>

                        </div>

                    </div>


                    {/* RECENT PRODUCTS */}
                    <section className="bg-white border border-gray-100 rounded-2xl mt-8 overflow-hidden">

                        <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">

                            <div>
                                <h3 className="text-lg font-bold">
                                    Recently Added Products
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Latest products added to your store.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">

                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search products"
                                        className="w-full sm:w-52 pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-orange-300"
                                    />
                                </div>

                                <Link to="/admin/products" className="text-orange-600 text-sm font-semibold whitespace-nowrap">
                                    View all
                                </Link>

                            </div>

                        </div>


                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Rating</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-12 text-gray-400">
                                                Loading products...
                                            </td>
                                        </tr>
                                    ) : filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-12 text-gray-400">
                                                No products found.
                                            </td>
                                        </tr>
                                    ) : (

                                        filteredProducts.map((product) => (

                                            <tr key={product._id} className="hover:bg-gray-50/70">

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3 min-w-[180px]">

                                                        <img
                                                            src={product.images?.[0] || "https://placehold.co/50"}
                                                            alt={product.productName}
                                                            className="w-11 h-11 rounded-lg object-cover bg-gray-100"
                                                        />

                                                        <span className="font-semibold text-sm">
                                                            {product.productName}
                                                        </span>

                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.category}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-semibold">
                                                    ₹{product.discountprice ?? product.price}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${product.stock <= 5 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                                        {product.stock} units
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1 text-sm">
                                                        <Star size={15} className="text-orange-400 fill-orange-400" />
                                                        {product.ratings || 0}
                                                    </span>
                                                </td>

                                            </tr>

                                        ))

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>


                    {/* TOP RATED PRODUCTS */}
                    <section className="mt-8">

                        <div className="mb-5">
                            <h3 className="text-lg font-bold">Top Rated Products</h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Products with the highest customer ratings.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

                            {(data?.topRatedProducts || []).map((product) => (

                                <div key={product._id} className="bg-white border border-gray-100 rounded-xl p-4">

                                    <img
                                        src={product.images?.[0] || "https://placehold.co/200"}
                                        alt={product.productName}
                                        className="w-full h-36 object-cover rounded-lg bg-gray-100"
                                    />

                                    <h4 className="font-semibold text-sm mt-4 truncate">
                                        {product.productName}
                                    </h4>

                                    <div className="flex items-center justify-between mt-3">
                                        <span className="font-bold text-sm">
                                            ₹{product.price}
                                        </span>

                                        <span className="flex items-center gap-1 text-xs text-orange-500">
                                            <Star size={14} fill="currentColor" />
                                            {product.ratings}
                                        </span>
                                    </div>

                                </div>

                            ))}

                        </div>

                        {!loading && (data?.topRatedProducts || []).length === 0 && (
                            <p className="bg-white rounded-xl border border-gray-100 p-8 text-center text-sm text-gray-400">
                                No rated products yet.
                            </p>
                        )}

                    </section>


                    {/* ORDERS PLACEHOLDER */}
                    <section className="mt-8 bg-white border border-gray-100 rounded-2xl p-7">

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg">Recent Orders</h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Order management will be available when checkout is implemented.
                                </p>
                            </div>

                            <ShoppingBag className="text-orange-500" size={24} />
                        </div>

                        <div className="text-center py-10 border-t border-gray-100 mt-6">
                            <p className="font-semibold text-gray-700">
                                No orders yet
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                Your customer purchases will appear here.
                            </p>
                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default Admin;
