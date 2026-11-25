
import React, { useState } from "react";
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
    Plus,
    ChevronDown,
    ChevronRight,
    ArrowUpRight,
    IndianRupee,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    UserPlus,
    MoreHorizontal,
    CalendarDays,
    Eye,
    EyeOff,
    Mail,
    Phone,
    Lock,
    Loader2
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Admin = () => {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // CREATE ADMIN
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

                toast.success("Admin created successfully!");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: ""
                });

                setShowAddAdmin(false);

            } else {
                toast.error(data.message || "Admin creation failed!");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };


    const stats = [
        {
            title: "Total Revenue",
            value: "₹0",
            change: "Store revenue",
            icon: IndianRupee,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Total Orders",
            value: "0",
            change: "All customer orders",
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Total Products",
            value: "0",
            change: "Products available",
            icon: Package,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            title: "Total Customers",
            value: "0",
            change: "Registered customers",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];


    const closeSidebar = () => setSidebarOpen(false);


    return (

        <div className="min-h-screen bg-[#F6F5F2] flex font-sans text-[#242424]">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />
            )}


            {/* SIDEBAR */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50
                h-screen w-[270px] shrink-0
                bg-[#20211F] text-white
                flex flex-col
                transition-transform duration-300
                ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"}
            `}>

                {/* BRAND */}
                <div className="h-24 px-8 flex items-center justify-between border-b border-white/10">

                    <Link to="/admin" className="text-2xl tracking-tight font-bold">
                        shopes<span className="text-[#D99A65]">too.</span>
                    </Link>

                    <button
                        onClick={closeSidebar}
                        className="lg:hidden text-gray-400"
                    >
                        <X size={22}/>
                    </button>

                </div>


                {/* NAVIGATION */}
                <div className="flex-1 overflow-y-auto px-5 py-8">

                    <p className="text-[10px] tracking-[2.5px] text-gray-500 font-semibold mb-5 px-3">
                        WORKSPACE
                    </p>


                    <nav className="space-y-2">

                        <Link
                            to="/admin"
                            onClick={closeSidebar}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-[#D99A65] text-[#20211F] text-sm font-semibold"
                        >
                            <LayoutDashboard size={19}/>
                            Overview
                        </Link>


                        {/* PRODUCTS DROPDOWN */}
                        <div>

                            <button
                                onClick={() => setProductOpen(!productOpen)}
                                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition text-sm"
                            >
                                <Package size={19}/>
                                <span className="flex-1 text-left">Products</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${productOpen ? "rotate-180" : ""}`}
                                />
                            </button>


                            {productOpen && (

                                <div className="ml-6 pl-5 border-l border-white/10 mt-2 space-y-1">

                                    <Link
                                        to="/admin/products"
                                        onClick={closeSidebar}
                                        className="block px-3 py-2.5 text-sm text-gray-400 hover:text-[#D99A65]"
                                    >
                                        All Products
                                    </Link>

                                    <Link
                                        to="/admin/add-product"
                                        onClick={closeSidebar}
                                        className="block px-3 py-2.5 text-sm text-gray-400 hover:text-[#D99A65]"
                                    >
                                        Add New Product
                                    </Link>

                                    <Link
                                        to="/admin/categories"
                                        onClick={closeSidebar}
                                        className="block px-3 py-2.5 text-sm text-gray-400 hover:text-[#D99A65]"
                                    >
                                        Categories
                                    </Link>

                                </div>

                            )}

                        </div>


                        <Link
                            to="/admin/orders"
                            onClick={closeSidebar}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition text-sm"
                        >
                            <ShoppingBag size={19}/>
                            Orders
                        </Link>


                        <Link
                            to="/admin/users"
                            onClick={closeSidebar}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition text-sm"
                        >
                            <Users size={19}/>
                            Customers
                        </Link>

                    </nav>


                    <div className="mt-12">

                        <p className="text-[10px] tracking-[2.5px] text-gray-500 font-semibold mb-5 px-3">
                            ADMINISTRATION
                        </p>


                        <button
                            onClick={() => {
                                setShowAddAdmin(true);
                                closeSidebar();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition text-sm"
                        >
                            <ShieldCheck size={19}/>
                            Admin Management
                        </button>


                        <button
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition text-sm"
                        >
                            <Settings size={19}/>
                            Settings
                        </button>

                    </div>

                </div>


                {/* SIDEBAR FOOTER */}
                <div className="p-5 border-t border-white/10">

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">

                        <div className="w-10 h-10 rounded-full bg-[#D99A65] text-[#20211F] flex items-center justify-center font-bold">
                            A
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">Administrator</p>
                            <p className="text-xs text-gray-500">Store Admin</p>
                        </div>

                        <button
                            onClick={() => toast("Connect your logout function here")}
                            className="text-gray-500 hover:text-red-400"
                        >
                            <LogOut size={18}/>
                        </button>

                    </div>

                </div>

            </aside>



            {/* MAIN AREA */}
            <main className="flex-1 min-w-0">


                {/* HEADER */}
                <header className="h-[82px] bg-white/80 backdrop-blur-xl border-b border-[#EAE8E3] px-5 md:px-10 flex items-center justify-between sticky top-0 z-30">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu size={23}/>
                        </button>

                        <div>
                            <p className="text-[10px] uppercase tracking-[2px] text-gray-400 font-semibold">
                                Shopestoo / Workspace
                            </p>

                            <h1 className="text-lg font-semibold mt-1">
                                Overview
                            </h1>
                        </div>

                    </div>


                    <div className="flex items-center gap-3 md:gap-6">

                        <div className="hidden md:flex items-center bg-[#F6F5F2] px-4 py-2.5 rounded-lg w-64">

                            <Search size={17} className="text-gray-400"/>

                            <input
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm ml-3 w-full"
                            />

                        </div>


                        <button className="relative p-2 text-gray-500 hover:text-black">
                            <Bell size={20}/>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D99A65]"/>
                        </button>


                        <div className="w-9 h-9 rounded-full bg-[#E9D5C3] flex items-center justify-center text-sm font-bold">
                            A
                        </div>

                    </div>

                </header>



                {/* CONTENT */}
                <div className="max-w-[1550px] mx-auto px-5 md:px-10 py-10">


                    {/* WELCOME SECTION */}
                    <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">

                        <div>

                            <p className="text-[#B77D50] text-xs uppercase tracking-[3px] font-semibold mb-4">
                                Dashboard
                            </p>

                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                Good to see you, Admin.
                            </h2>

                            <p className="text-gray-500 text-sm mt-3">
                                Here's a look at what's happening across your store.
                            </p>

                        </div>


                        <div className="flex items-center gap-3">

                            <div className="flex items-center gap-2 px-4 py-3 bg-white border border-[#EAE8E3] rounded-lg text-sm text-gray-500">
                                <CalendarDays size={17}/>
                                Store Overview
                            </div>

                            <button
                                onClick={() => navigate("/admin/products")}
                                className="flex items-center gap-2 px-5 py-3 bg-[#20211F] hover:bg-[#D99A65] hover:text-[#20211F] text-white rounded-lg text-sm font-semibold transition"
                            >
                                <Package size={17}/>
                                Products
                                <ArrowUpRight size={15}/>
                            </button>

                        </div>

                    </section>



                    {/* STATS */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {stats.map((stat) => {

                            const Icon = stat.icon;

                            return (

                                <div
                                    key={stat.title}
                                    className="bg-white p-6 rounded-xl border border-[#EAE8E3] hover:shadow-md transition"
                                >

                                    <div className="flex justify-between items-center">

                                        <span className="text-sm text-gray-500 font-medium">
                                            {stat.title}
                                        </span>

                                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                                            <Icon size={20}/>
                                        </div>

                                    </div>


                                    <h3 className="text-3xl font-semibold mt-6 tracking-tight">
                                        {stat.value}
                                    </h3>


                                    <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                                        {stat.change}
                                    </div>

                                </div>

                            );

                        })}

                    </section>



                    {/* MAIN DASHBOARD GRID */}
                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">


                        {/* REVENUE PANEL */}
                        <div className="xl:col-span-2 bg-white rounded-xl border border-[#EAE8E3] p-6 md:p-8">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Revenue Overview
                                    </p>

                                    <h3 className="text-3xl font-semibold mt-2">
                                        ₹0.00
                                    </h3>
                                </div>

                                <button className="text-gray-400 hover:text-black">
                                    <MoreHorizontal size={23}/>
                                </button>

                            </div>


                            <div className="h-[220px] mt-8 flex flex-col items-center justify-center border-t border-[#F0EFEB]">

                                <div className="w-12 h-12 rounded-full bg-[#F6F5F2] flex items-center justify-center mb-4">
                                    <TrendingUp size={22} className="text-[#B77D50]"/>
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    Revenue analytics will appear here
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    Waiting for your first store transactions.
                                </p>

                            </div>

                        </div>



                        {/* QUICK ACTIONS */}
                        <div className="bg-[#20211F] text-white rounded-xl p-7">

                            <p className="text-xs uppercase tracking-[2px] text-[#D99A65] font-semibold">
                                Shortcuts
                            </p>

                            <h3 className="text-2xl font-semibold mt-3">
                                Manage your store.
                            </h3>

                            <p className="text-gray-400 text-sm mt-2">
                                Everything you need to keep things running.
                            </p>


                            <div className="space-y-3 mt-8">


                                <Link
                                    to="/admin/add-product"
                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <Plus size={18} className="text-[#D99A65]"/>
                                        <span className="text-sm font-medium">Add Product</span>
                                    </div>

                                    <ArrowUpRight size={17} className="text-gray-400"/>
                                </Link>


                                <Link
                                    to="/admin/orders"
                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <ShoppingBag size={18} className="text-[#D99A65]"/>
                                        <span className="text-sm font-medium">View Orders</span>
                                    </div>

                                    <ArrowUpRight size={17} className="text-gray-400"/>
                                </Link>


                                <button
                                    onClick={() => setShowAddAdmin(true)}
                                    className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <UserPlus size={18} className="text-[#D99A65]"/>
                                        <span className="text-sm font-medium">Create Admin</span>
                                    </div>

                                    <ArrowUpRight size={17} className="text-gray-400"/>
                                </button>

                            </div>

                        </div>

                    </section>



                    {/* RECENT ORDERS */}
                    <section className="mt-8 bg-white border border-[#EAE8E3] rounded-xl overflow-hidden">

                        <div className="p-6 md:p-8 flex items-center justify-between">

                            <div>
                                <h3 className="text-lg font-semibold">
                                    Recent Orders
                                </h3>

                                <p className="text-sm text-gray-400 mt-1">
                                    Keep track of the latest purchases.
                                </p>
                            </div>

                            <Link
                                to="/admin/orders"
                                className="text-sm font-semibold text-[#B77D50] flex items-center gap-2"
                            >
                                View All
                                <ArrowUpRight size={16}/>
                            </Link>

                        </div>


                        <div className="overflow-x-auto">

                            <table className="w-full text-left">

                                <thead className="bg-[#F8F7F4]">

                                    <tr className="text-[11px] uppercase tracking-wider text-gray-400">
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
                                                <ShoppingBag size={27} className="text-gray-300 mb-3"/>

                                                <p className="text-sm font-semibold text-gray-700">
                                                    No orders yet
                                                </p>

                                                <p className="text-xs text-gray-400 mt-2">
                                                    Your latest orders will show up here.
                                                </p>
                                            </div>

                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </section>


                </div>

            </main>



            {/* ADD ADMIN MODAL */}
            {showAddAdmin && (

                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">

                        <div className="bg-[#20211F] p-7 relative">

                            <button
                                onClick={() => setShowAddAdmin(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white"
                            >
                                <X size={22}/>
                            </button>

                            <ShieldCheck size={30} className="text-[#D99A65] mb-5"/>

                            <p className="text-[#D99A65] text-xs uppercase tracking-[2px] font-semibold">
                                Administrator Access
                            </p>

                            <h2 className="text-2xl text-white font-semibold mt-2">
                                Add New Admin
                            </h2>

                            <p className="text-gray-400 text-sm mt-2">
                                Create a new administrator account.
                            </p>

                        </div>


                        <form onSubmit={handleAddAdmin} className="p-7 space-y-5">

                            <div>
                                <label className="text-sm font-semibold block mb-2">
                                    Full Name
                                </label>

                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                    className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#D99A65]"
                                />
                            </div>


                            <div>
                                <label className="text-sm font-semibold block mb-2">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="admin@example.com"
                                        required
                                        className="w-full pl-10 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#D99A65]"
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="text-sm font-semibold block mb-2">
                                    Phone Number
                                </label>

                                <div className="relative">
                                    <Phone size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                        required
                                        className="w-full pl-10 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#D99A65]"
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="text-sm font-semibold block mb-2">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create password"
                                        minLength={8}
                                        required
                                        className="w-full pl-10 pr-11 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#D99A65]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>
                            </div>


                            <div className="bg-[#F8F7F4] p-4 rounded-lg flex gap-3">
                                <ShieldCheck size={20} className="text-[#B77D50] shrink-0"/>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                    The new account will have administrator privileges. Only authorized admins should be allowed to create accounts.
                                </p>
                            </div>


                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setShowAddAdmin(false)}
                                    className="flex-1 border border-gray-200 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-[#20211F] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#D99A65] hover:text-[#20211F] transition flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={17} className="animate-spin"/>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={17}/>
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
