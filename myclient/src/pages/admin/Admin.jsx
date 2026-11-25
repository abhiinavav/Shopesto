
import React, { useState } from "react";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    UserPlus,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    IndianRupee,
    TrendingUp,
    X,
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowUpRight,
    Plus,
    ChevronRight,
    Mail,
    Phone,
    Lock,
    Loader2,
    Store
} from "lucide-react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Admin = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddAdmin, setShowAddAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // ADD NEW ADMIN
    const handleAddAdmin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/adminregister`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(formData)
                }
            );

            const data = await res.json();

            if (res.ok && data.success) {

                toast.success("New admin created successfully!");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: ""
                });

                setShowAddAdmin(false);

            } else {

                toast.error(data.message || "Failed to create admin!");

            }

        } catch (error) {

            console.log("Add Admin Error:", error);
            toast.error("Something went wrong!");

        } finally {

            setLoading(false);

        }
    };


    const stats = [
        {
            title: "Total Revenue",
            value: "₹0",
            description: "Store revenue",
            icon: IndianRupee,
            color: "bg-emerald-50 text-emerald-600",
            trend: true
        },
        {
            title: "Total Orders",
            value: "0",
            description: "All customer orders",
            icon: ShoppingCart,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Total Products",
            value: "0",
            description: "Products in store",
            icon: Package,
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Total Customers",
            value: "0",
            description: "Registered customers",
            icon: Users,
            color: "bg-purple-50 text-purple-600"
        }
    ];


    const navItems = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin",
            active: true
        },
        {
            name: "Products",
            icon: Package,
            path: "/admin/products"
        },
        {
            name: "Orders",
            icon: ShoppingCart,
            path: "/admin/orders"
        },
        {
            name: "Customers",
            icon: Users,
            path: "/admin/users"
        },
        {
            name: "Add Product",
            icon: Plus,
            path: "/admin/add-product"
        }
    ];


    return (

        <div className="min-h-screen bg-[#f7f7f8] flex text-gray-900">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}


            {/* SIDEBAR */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50
                w-[260px] h-screen
                bg-[#171717] text-white
                flex flex-col
                transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>

                <div className="px-7 py-8 flex justify-between items-center">

                    <Link to="/admin" className="text-2xl font-bold tracking-tight">
                        Shopes<span className="text-orange-500">too.</span>
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400"
                    >
                        <X size={22} />
                    </button>

                </div>


                <div className="px-5 flex-1">

                    <p className="text-[10px] tracking-[2px] uppercase text-gray-500 font-semibold px-3 mb-5">
                        Main Menu
                    </p>

                    <nav className="space-y-1">

                        {navItems.map((item) => {

                            const Icon = item.icon;

                            return (

                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3.5
                                        rounded-xl text-sm font-medium
                                        transition-all
                                        ${item.active
                                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }
                                    `}
                                >
                                    <Icon size={19} />
                                    {item.name}

                                    {item.active && (
                                        <ChevronRight size={16} className="ml-auto" />
                                    )}

                                </Link>

                            );

                        })}

                    </nav>


                    <p className="text-[10px] tracking-[2px] uppercase text-gray-500 font-semibold px-3 mt-10 mb-5">
                        Management
                    </p>

                    <button
                        onClick={() => {
                            setShowAddAdmin(true);
                            setSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <UserPlus size={19} />
                        Add New Admin
                    </button>

                    <button
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <ShieldCheck size={19} />
                        Admin Access
                    </button>

                </div>


                {/* SIDEBAR BOTTOM */}
                <div className="p-5 border-t border-white/10 space-y-2">

                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white rounded-xl hover:bg-white/5">
                        <Settings size={19} />
                        Settings
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl">
                        <LogOut size={19} />
                        Logout
                    </button>

                    <div className="flex items-center gap-3 px-3 pt-5">

                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
                            A
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Administrator</p>
                            <p className="text-xs text-gray-500">Store Manager</p>
                        </div>

                    </div>

                </div>

            </aside>



            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0">


                {/* TOP NAVBAR */}
                <header className="h-[85px] bg-white border-b border-gray-100 px-5 md:px-8 flex items-center justify-between sticky top-0 z-30">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={22} />
                        </button>

                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                                Dashboard
                            </h1>

                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                Welcome back to Shopestoo.
                            </p>
                        </div>

                    </div>


                    <div className="flex items-center gap-3 md:gap-5">

                        <div className="relative hidden md:block">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="w-64 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-300 transition"
                            />

                        </div>


                        <button className="relative p-2.5 rounded-xl hover:bg-gray-100">
                            <Bell size={21} className="text-gray-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 border-2 border-white" />
                        </button>


                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                            A
                        </div>

                    </div>

                </header>



                {/* DASHBOARD BODY */}
                <section className="p-5 md:p-8 max-w-[1600px] mx-auto">


                    {/* PAGE INTRO */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-9">

                        <div>
                            <p className="text-orange-500 text-xs font-bold uppercase tracking-[2px] mb-2">
                                Store Overview
                            </p>

                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Welcome back, Admin.
                            </h2>

                            <p className="text-gray-400 text-sm mt-2">
                                Here's what's happening with your store today.
                            </p>
                        </div>


                        <button
                            onClick={() => setShowAddAdmin(true)}
                            className="flex items-center justify-center gap-2 bg-[#171717] hover:bg-orange-500 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                        >
                            <UserPlus size={18} />
                            Add New Admin
                        </button>

                    </div>



                    {/* STAT CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                        {stats.map((stat) => {

                            const Icon = stat.icon;

                            return (

                                <div
                                    key={stat.title}
                                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">
                                                {stat.title}
                                            </p>

                                            <h3 className="text-3xl font-bold mt-3 tracking-tight">
                                                {stat.value}
                                            </h3>
                                        </div>


                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                            <Icon size={23} />
                                        </div>

                                    </div>


                                    <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">

                                        {stat.trend && (
                                            <TrendingUp size={15} className="text-emerald-500" />
                                        )}

                                        {stat.description}

                                    </div>

                                </div>

                            );

                        })}

                    </div>



                    {/* QUICK ACTIONS */}
                    <div className="mt-9">

                        <div className="mb-5">
                            <h2 className="text-lg font-bold">Quick Actions</h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Manage your store with ease.
                            </p>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">


                            {/* ADD PRODUCT */}
                            <Link
                                to="/admin/add-product"
                                className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 hover:border-orange-200 hover:shadow-md transition"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <Package size={23} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm">Add Product</h3>
                                    <p className="text-xs text-gray-400 mt-1">Add products to your store</p>
                                </div>

                                <ArrowUpRight size={19} className="text-gray-400" />
                            </Link>


                            {/* VIEW ORDERS */}
                            <Link
                                to="/admin/orders"
                                className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 hover:border-orange-200 hover:shadow-md transition"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <ShoppingCart size={23} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm">Manage Orders</h3>
                                    <p className="text-xs text-gray-400 mt-1">Track customer purchases</p>
                                </div>

                                <ArrowUpRight size={19} className="text-gray-400" />
                            </Link>


                            {/* ADD ADMIN */}
                            <button
                                onClick={() => setShowAddAdmin(true)}
                                className="bg-white border border-gray-100 p-5 rounded-2xl flex items-center gap-4 text-left hover:border-orange-200 hover:shadow-md transition"
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <ShieldCheck size={23} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm">Create Admin</h3>
                                    <p className="text-xs text-gray-400 mt-1">Add another administrator</p>
                                </div>

                                <ArrowUpRight size={19} className="text-gray-400" />
                            </button>


                        </div>

                    </div>



                    {/* RECENT ORDERS */}
                    <div className="bg-white border border-gray-100 rounded-2xl mt-9 overflow-hidden">

                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            <div>
                                <h2 className="text-lg font-bold">
                                    Recent Orders
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    Latest customer purchases
                                </p>
                            </div>

                            <Link
                                to="/admin/orders"
                                className="text-orange-500 text-sm font-semibold flex items-center gap-1"
                            >
                                View All
                                <ArrowUpRight size={16} />
                            </Link>

                        </div>


                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead>
                                    <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-semibold">Order ID</th>
                                        <th className="px-6 py-4 font-semibold">Customer</th>
                                        <th className="px-6 py-4 font-semibold">Amount</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>


                                <tbody>

                                    <tr>
                                        <td colSpan="4" className="text-center py-16">

                                            <div className="flex flex-col items-center">

                                                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                    <Store size={24} className="text-gray-300" />
                                                </div>

                                                <p className="font-semibold text-gray-700 text-sm">
                                                    No orders yet
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    New customer orders will appear here.
                                                </p>

                                            </div>

                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>


                </section>

            </main>



            {/* ADD ADMIN MODAL */}
            {showAddAdmin && (

                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">


                        {/* MODAL HEADER */}
                        <div className="bg-[#171717] px-7 py-7 relative">

                            <button
                                onClick={() => setShowAddAdmin(false)}
                                className="absolute right-6 top-6 text-gray-400 hover:text-white transition"
                            >
                                <X size={22} />
                            </button>


                            <div className="w-12 h-12 bg-orange-500/15 text-orange-400 rounded-xl flex items-center justify-center mb-5">
                                <ShieldCheck size={25} />
                            </div>


                            <p className="text-orange-400 text-xs uppercase tracking-[2px] font-bold">
                                Admin Management
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-2">
                                Create New Admin
                            </h2>

                            <p className="text-sm text-gray-400 mt-2">
                                Give a new administrator access to Shopestoo.
                            </p>

                        </div>



                        {/* MODAL FORM */}
                        <form onSubmit={handleAddAdmin} className="p-7 space-y-5">


                            {/* NAME */}
                            <div>

                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter admin name"
                                        required
                                        className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                                    />

                                </div>

                            </div>



                            {/* EMAIL */}
                            <div>

                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="admin@example.com"
                                        required
                                        className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                                    />

                                </div>

                            </div>



                            {/* PHONE */}
                            <div>

                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Phone Number
                                </label>

                                <div className="relative">

                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                        className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                                    />

                                </div>

                            </div>



                            {/* PASSWORD */}
                            <div>

                                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a strong password"
                                        minLength={8}
                                        required
                                        className="w-full border border-gray-200 rounded-xl pl-11 pr-12 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>

                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    Use at least 8 characters.
                                </p>

                            </div>



                            {/* SECURITY NOTICE */}
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">

                                <ShieldCheck size={20} className="text-orange-500 shrink-0" />

                                <p className="text-xs text-orange-800 leading-relaxed">
                                    This account will be registered as an administrator and will have access to protected admin features.
                                </p>

                            </div>



                            {/* BUTTONS */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setShowAddAdmin(false)}
                                    className="flex-1 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
                                >

                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={18} />
                                            Create Admin
                                        </>
                                    )}

                                </button>

                            </div>


                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};

export default Admin;
