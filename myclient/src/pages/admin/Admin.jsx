
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
    RefreshCw,
    Boxes,
    AlertTriangle,
    Star,
    Plus,
    TrendingUp,
    ChevronRight,
    Activity,
    Crown,
    CircleHelp
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
            description: "Revenue recorded by your store",
            icon: IndianRupee,
            color: "text-orange-600",
            bg: "bg-orange-50",
            gradient: "from-orange-500/10 to-orange-50"
        },
        {
            title: "Total Products",
            value: data?.stats?.totalProducts ?? 0,
            description: `${(data?.stats?.totalStock || 0).toLocaleString("en-IN")} units in inventory`,
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
            gradient: "from-blue-500/10 to-blue-50"
        },
        {
            title: "Total Customers",
            value: data?.stats?.totalCustomers ?? 0,
            description: "Registered customer accounts",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
            gradient: "from-purple-500/10 to-purple-50"
        },
        {
            title: "Total Admins",
            value: data?.stats?.totalAdmins ?? 0,
            description: "Store administrators",
            icon: ShieldCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            gradient: "from-emerald-500/10 to-emerald-50"
        }
    ];

    const recentProducts = data?.recentProducts || [];
    const topRatedProducts = data?.topRatedProducts || [];

    const filteredProducts = recentProducts.filter((product) =>
        product.productName?.toLowerCase().includes(search.toLowerCase())
    );

    const totalStock = data?.stats?.totalStock || 0;
    const lowStock = data?.stats?.lowStockProducts || 0;
    const featuredProducts = data?.stats?.featuredProducts || 0;

    const formatPrice = (price) =>
        `₹${(Number(price) || 0).toLocaleString("en-IN")}`;

    const NavLink = ({ to, icon: Icon, children, active = false }) => (
        <Link
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                    ? "bg-[#F97316] text-white shadow-lg shadow-orange-900/20"
                    : "text-gray-400 hover:bg-white/[0.07] hover:text-white"
            }`}
        >
            <Icon size={19} strokeWidth={1.8} />
            <span>{children}</span>
            {active && <ChevronRight size={16} className="ml-auto" />}
        </Link>
    );

    return (
        <div className="min-h-screen bg-[#F7F7F8] text-[#171717] flex">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 z-50
                    h-screen w-[255px] shrink-0
                    bg-[#111113] text-white
                    flex flex-col
                    transition-transform duration-300
                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"}
                `}
            >

                {/* LOGO */}
                <div className="h-[90px] px-6 flex items-center justify-between border-b border-white/[0.07]">

                    <Link to="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center">
                            <ShoppingBag size={22} strokeWidth={2.5} />
                        </div>

                        <span className="text-[23px] font-bold tracking-tight">
                            Shopes<span className="text-[#F97316]">too.</span>
                        </span>
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* NAVIGATION */}
                <div className="flex-1 px-4 py-8 overflow-y-auto">

                    <p className="text-[10px] uppercase tracking-[2px] text-gray-500 font-bold px-3 mb-5">
                        General
                    </p>

                    <nav className="space-y-2">

                        <NavLink to="/admin" icon={LayoutDashboard} active>
                            Dashboard
                        </NavLink>

                        <NavLink to="/admin/products" icon={Package}>
                            Products
                        </NavLink>

                        <NavLink to="/admin/orders" icon={ShoppingBag}>
                            Orders
                        </NavLink>

                        <NavLink to="/admin/users" icon={Users}>
                            Customers
                        </NavLink>

                    </nav>

                    <p className="text-[10px] uppercase tracking-[2px] text-gray-500 font-bold px-3 mt-10 mb-5">
                        Management
                    </p>

                    <nav className="space-y-2">

                        <NavLink to="/admin/admins" icon={ShieldCheck}>
                            Admin Management
                        </NavLink>

                        <NavLink to="/admin/settings" icon={Settings}>
                            Settings
                        </NavLink>

                        <NavLink to="/admin/help" icon={CircleHelp}>
                            Help & Support
                        </NavLink>

                    </nav>

                </div>

                {/* SIDEBAR BOTTOM */}
                <div className="p-5 border-t border-white/[0.07]">

                    <button
                        onClick={() => toast("Connect your logout function here")}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>

                    <div className="mt-4 px-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                        <p className="text-[11px] text-gray-500">
                            Store Dashboard
                        </p>

                        <p className="text-sm font-semibold mt-1">
                            Shopestoo Admin
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[10px] text-gray-400">
                                Management workspace
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0">

                {/* HEADER */}
                <header className="h-[82px] bg-white border-b border-gray-100 px-5 md:px-8 flex items-center justify-between sticky top-0 z-30">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu size={22} />
                        </button>

                        <div>
                            <p className="hidden sm:block text-[10px] text-gray-400 uppercase tracking-[1.5px]">
                                Shopestoo / Workspace
                            </p>

                            <h1 className="font-bold text-lg mt-1">
                                Dashboard
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-5">

                        <div className="hidden md:flex items-center gap-3 bg-[#F5F5F6] px-4 py-3 rounded-xl w-[230px]">
                            <Search size={18} className="text-gray-400" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="bg-transparent outline-none text-sm w-full"
                            />
                        </div>

                        <button
                            onClick={fetchDashboard}
                            title="Refresh dashboard"
                            className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition"
                        >
                            <RefreshCw
                                size={19}
                                className={loading ? "animate-spin" : ""}
                            />
                        </button>

                        <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 transition">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#F97316] rounded-full border-2 border-white" />
                        </button>

                        <div className="h-8 w-px bg-gray-200 hidden sm:block" />

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFF0E5] text-[#F97316] flex items-center justify-center font-bold border border-orange-100">
                                A
                            </div>

                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold">Admin</p>
                                <p className="text-[11px] text-gray-400">
                                    Administrator
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD BODY */}
                <div className="max-w-[1600px] mx-auto p-5 md:p-8">

                    {/* WELCOME */}
                    <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

                        <div>
                            <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-[2px]">
                                <Activity size={15} />
                                Store Analytics
                            </div>

                            <h2 className="text-3xl md:text-[38px] font-bold tracking-tight mt-3">
                                Welcome Back, Admin!
                            </h2>

                            <p className="text-gray-500 text-sm mt-2">
                                Here's what's happening with your Shopestoo store today.
                            </p>
                        </div>

                        <Link
                            to="/admin/add-product"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-sm shadow-lg shadow-orange-500/15 transition"
                        >
                            <Plus size={18} />
                            Add New Product
                        </Link>

                    </section>

                    {/* STATS */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300`}
                                >
                                    <div className="absolute -right-8 -bottom-12 w-36 h-36 rounded-full bg-white/50" />

                                    <div className="relative z-10">

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-500 font-medium">
                                                {stat.title}
                                            </p>

                                            <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                                <Icon size={22} />
                                            </div>
                                        </div>

                                        <h3 className="text-[30px] font-bold tracking-tight mt-5">
                                            {loading ? "..." : stat.value}
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-3">
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </section>

                    {/* INVENTORY OVERVIEW */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">

                        <div className="lg:col-span-2 bg-[#151515] rounded-2xl p-7 md:p-8 text-white relative overflow-hidden">

                            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-[#F97316]/10 blur-3xl" />

                            <div className="absolute -right-10 -bottom-32 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />

                            <div className="relative z-10">

                                <div className="flex justify-between items-start">

                                    <div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Boxes size={17} />
                                            Inventory Overview
                                        </div>

                                        <h3 className="text-4xl font-bold mt-5">
                                            {loading ? "..." : totalStock.toLocaleString("en-IN")}
                                        </h3>

                                        <p className="text-gray-400 text-xs mt-2">
                                            Total units across your products
                                        </p>
                                    </div>

                                    <div className="w-14 h-14 rounded-2xl bg-[#F97316]/15 text-[#F97316] flex items-center justify-center">
                                        <Package size={27} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5 mt-9 pt-6 border-t border-white/10">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Featured Products
                                        </p>

                                        <p className="text-2xl font-bold mt-2">
                                            {loading ? "..." : featuredProducts}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Low Stock Products
                                        </p>

                                        <p className="text-2xl font-bold text-[#F97316] mt-2">
                                            {loading ? "..." : lowStock}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* ALERT CARD */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col shadow-sm">

                            <div className="flex items-center justify-between">

                                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center">
                                    <AlertTriangle size={23} />
                                </div>

                                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                                    Attention
                                </span>
                            </div>

                            <p className="text-sm text-gray-500 mt-6">
                                Inventory Alerts
                            </p>

                            <h3 className="text-4xl font-bold mt-2">
                                {loading ? "..." : lowStock}
                            </h3>

                            <p className="text-xs text-gray-400 mt-2">
                                Products with 5 or fewer units remaining
                            </p>

                            <Link
                                to="/admin/products"
                                className="flex items-center gap-2 text-[#F97316] font-semibold text-sm mt-auto pt-7 hover:gap-3 transition-all"
                            >
                                Manage Inventory
                                <ArrowUpRight size={17} />
                            </Link>
                        </div>

                    </section>

                    {/* RECENT PRODUCTS */}
                    <section className="bg-white border border-gray-100 rounded-2xl mt-8 overflow-hidden shadow-sm">

                        <div className="p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">

                            <div>
                                <div className="flex items-center gap-2">
                                    <Package size={19} className="text-[#F97316]" />

                                    <h3 className="text-lg font-bold">
                                        Recently Added Products
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-400 mt-1">
                                    Keep track of your latest store additions.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">

                                <div className="relative flex-1 md:hidden">
                                    <Search
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-orange-300"
                                    />
                                </div>

                                <Link
                                    to="/admin/products"
                                    className="text-[#F97316] text-sm font-semibold whitespace-nowrap hover:text-orange-700"
                                >
                                    View All
                                    <ArrowUpRight size={15} className="inline ml-1" />
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-[#FAFAFA] text-[10px] uppercase tracking-wider text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Product</th>
                                        <th className="px-6 py-4 font-semibold">Category</th>
                                        <th className="px-6 py-4 font-semibold">Price</th>
                                        <th className="px-6 py-4 font-semibold">Stock</th>
                                        <th className="px-6 py-4 font-semibold">Rating</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-14 text-gray-400 text-sm">
                                                Loading products...
                                            </td>
                                        </tr>
                                    ) : filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-14 text-gray-400 text-sm">
                                                No products found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <tr
                                                key={product._id}
                                                className="hover:bg-orange-50/30 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3 min-w-[200px]">
                                                        <img
                                                            src={product.images?.[0] || "https://placehold.co/60"}
                                                            alt={product.productName}
                                                            className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-gray-100"
                                                        />

                                                        <span className="font-semibold text-sm text-gray-800">
                                                            {product.productName}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {product.category || "Uncategorized"}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold">
                                                    {formatPrice(product.discountprice ?? product.price)}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${
                                                        product.stock <= 5
                                                            ? "bg-red-50 text-red-600"
                                                            : "bg-emerald-50 text-emerald-600"
                                                    }`}>
                                                        {product.stock ?? 0} units
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1 text-sm font-medium">
                                                        <Star
                                                            size={15}
                                                            className="text-orange-400 fill-orange-400"
                                                        />
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

                    {/* BOTTOM GRID */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                        {/* TOP RATED PRODUCTS */}
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">

                                <div>
                                    <div className="flex items-center gap-2">
                                        <Crown size={19} className="text-[#F97316]" />

                                        <h3 className="font-bold text-lg">
                                            Top Rated Products
                                        </h3>
                                    </div>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Your highest-rated products.
                                    </p>
                                </div>

                                <Star size={20} className="text-orange-400" />
                            </div>

                            <div className="p-5 space-y-4">

                                {loading ? (
                                    <p className="text-center py-10 text-sm text-gray-400">
                                        Loading products...
                                    </p>
                                ) : topRatedProducts.length === 0 ? (
                                    <p className="text-center py-10 text-sm text-gray-400">
                                        No rated products yet.
                                    </p>
                                ) : (
                                    topRatedProducts.slice(0, 5).map((product, index) => (
                                        <div
                                            key={product._id}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="w-6 text-xs font-bold text-gray-400">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <img
                                                src={product.images?.[0] || "https://placehold.co/60"}
                                                alt={product.productName}
                                                className="w-12 h-12 rounded-xl object-cover bg-gray-100"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm truncate">
                                                    {product.productName}
                                                </h4>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-50 px-2.5 py-2 rounded-lg">
                                                <Star size={13} fill="currentColor" />
                                                {product.ratings || 0}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

                            <div className="p-6 border-b border-gray-100">

                                <div className="flex items-center gap-2">
                                    <TrendingUp size={19} className="text-[#F97316]" />

                                    <h3 className="font-bold text-lg">
                                        Quick Actions
                                    </h3>
                                </div>

                                <p className="text-xs text-gray-400 mt-1">
                                    Manage your store with quick access.
                                </p>
                            </div>

                            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

                                <Link
                                    to="/admin/add-product"
                                    className="p-5 rounded-xl bg-orange-50 hover:bg-orange-100 transition group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center">
                                        <Plus size={20} />
                                    </div>

                                    <h4 className="font-bold text-sm mt-4">
                                        Add Product
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Add new products to your store.
                                    </p>

                                    <ArrowUpRight size={16} className="text-[#F97316] mt-3 group-hover:translate-x-1 transition" />
                                </Link>

                                <Link
                                    to="/admin/products"
                                    className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#171717] text-white flex items-center justify-center">
                                        <Package size={20} />
                                    </div>

                                    <h4 className="font-bold text-sm mt-4">
                                        Manage Products
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Edit, update and remove products.
                                    </p>

                                    <ArrowUpRight size={16} className="text-[#F97316] mt-3 group-hover:translate-x-1 transition" />
                                </Link>

                                <Link
                                    to="/admin/users"
                                    className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                                        <Users size={20} />
                                    </div>

                                    <h4 className="font-bold text-sm mt-4">
                                        Customers
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        View registered customers.
                                    </p>

                                    <ArrowUpRight size={16} className="text-[#F97316] mt-3 group-hover:translate-x-1 transition" />
                                </Link>

                                <Link
                                    to="/admin/admins"
                                    className="p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <ShieldCheck size={20} />
                                    </div>

                                    <h4 className="font-bold text-sm mt-4">
                                        Admin Management
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Manage store administrators.
                                    </p>

                                    <ArrowUpRight size={16} className="text-[#F97316] mt-3 group-hover:translate-x-1 transition" />
                                </Link>

                            </div>
                        </div>
                    </section>

                    {/* ORDERS */}
                    <section className="bg-white border border-gray-100 rounded-2xl mt-8 overflow-hidden shadow-sm">

                        <div className="p-6 md:p-7 flex items-center justify-between">

                            <div>
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={19} className="text-[#F97316]" />

                                    <h3 className="font-bold text-lg">
                                        Recent Orders
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-400 mt-1">
                                    Customer purchases and order activity.
                                </p>
                            </div>

                            <ShoppingBag size={25} className="text-orange-200" />
                        </div>

                        <div className="mx-6 mb-6 bg-gray-50 rounded-xl py-10 text-center">

                            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center mx-auto">
                                <ShoppingBag size={21} className="text-gray-400" />
                            </div>

                            <p className="font-semibold text-sm mt-4">
                                Order analytics not connected yet
                            </p>

                            <p className="text-xs text-gray-400 mt-2">
                                Connect your order API to display recent purchases here.
                            </p>

                            <Link
                                to="/admin/orders"
                                className="inline-flex items-center gap-2 text-[#F97316] text-sm font-semibold mt-5 hover:gap-3 transition-all"
                            >
                                Manage Orders
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </section>

                    {/* FOOTER */}
                    <footer className="py-7 mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">

                        <p>
                            © {new Date().getFullYear()} Shopestoo. All rights reserved.
                        </p>

                        <p>
                            Admin Dashboard
                            <span className="text-[#F97316] mx-2">●</span>
                            Store Management
                        </p>
                    </footer>

                </div>
            </main>
        </div>
    );
};

export default Admin;
