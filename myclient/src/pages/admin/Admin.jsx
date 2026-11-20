
import React from "react";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    PlusCircle,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    IndianRupee,
    TrendingUp
} from "lucide-react";

const Admin = () => {

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-950 text-white min-h-screen p-6">

                <h1 className="text-2xl font-bold mb-12">
                    Shopes<span className="text-orange-500">too.</span>
                </h1>

                <p className="text-gray-500 text-xs uppercase mb-4">
                    Main Menu
                </p>

                <nav className="space-y-2">

                    <a href="/admin" className="flex items-center gap-3 bg-orange-500 text-white px-4 py-3 rounded-xl">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </a>

                    <a href="/admin/products" className="flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl">
                        <Package size={20} />
                        Products
                    </a>

                    <a href="/admin/orders" className="flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl">
                        <ShoppingCart size={20} />
                        Orders
                    </a>

                    <a href="/admin/users" className="flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl">
                        <Users size={20} />
                        Customers
                    </a>

                    <a href="/admin/add-product" className="flex items-center gap-3 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl">
                        <PlusCircle size={20} />
                        Add Product
                    </a>

                </nav>

                <div className="mt-16 border-t border-gray-800 pt-6 space-y-3">

                    <button className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-2">
                        <Settings size={20} />
                        Settings
                    </button>

                    <button className="flex items-center gap-3 text-red-400 hover:text-red-300 px-4 py-2">
                        <LogOut size={20} />
                        Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}
            <main className="flex-1 min-w-0">

                {/* Navbar */}
                <header className="bg-white px-8 py-5 flex justify-between items-center border-b">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Dashboard
                        </h2>
                        <p className="text-sm text-gray-500">
                            Welcome back, Admin!
                        </p>
                    </div>

                    <div className="flex items-center gap-5">

                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 rounded-xl pl-10 pr-4 py-2 outline-none"
                            />
                        </div>

                        <button className="relative">
                            <Bell size={22} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 bg-orange-500 w-2 h-2 rounded-full"></span>
                        </button>

                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                            A
                        </div>

                    </div>

                </header>


                {/* Dashboard Content */}
                <section className="p-8">

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800">
                            Overview
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Here's what's happening with your store today.
                        </p>
                    </div>


                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Revenue</p>
                                    <h2 className="text-2xl font-bold mt-3">₹0</h2>
                                </div>
                                <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                                    <IndianRupee size={22} />
                                </div>
                            </div>
                            <p className="text-green-600 text-sm mt-5 flex items-center gap-1">
                                <TrendingUp size={16} />
                                Store revenue
                            </p>
                        </div>


                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Orders</p>
                                    <h2 className="text-2xl font-bold mt-3">0</h2>
                                </div>
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                                    <ShoppingCart size={22} />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-5">All customer orders</p>
                        </div>


                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Products</p>
                                    <h2 className="text-2xl font-bold mt-3">0</h2>
                                </div>
                                <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                                    <Package size={22} />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-5">Products in store</p>
                        </div>


                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Customers</p>
                                    <h2 className="text-2xl font-bold mt-3">0</h2>
                                </div>
                                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                                    <Users size={22} />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-5">Registered customers</p>
                        </div>

                    </div>


                    {/* Recent Orders */}
                    <div className="bg-white rounded-2xl shadow-sm mt-8 p-6">

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Orders
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Latest customer purchases
                                </p>
                            </div>

                            <button className="text-orange-500 font-semibold text-sm">
                                View All
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">

                                <thead>
                                    <tr className="text-gray-500 text-sm border-b">
                                        <th className="py-4">Order ID</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="text-gray-400 text-sm">
                                        <td colSpan="4" className="text-center py-10">
                                            No orders found yet.
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Admin;
