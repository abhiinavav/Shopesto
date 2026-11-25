import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Bell, ChevronDown, Search, RefreshCw, Plus, Star, TrendingUp, TrendingDown,
    IndianRupee, Users, Repeat, Receipt, MousePointerClick, ShoppingBag, Package,
} from "lucide-react";
import { useAuth } from "../../context/useAuth.js";

const API = import.meta.env.VITE_API_URL;
const formatPrice = (p) => `₹${(Number(p) || 0).toLocaleString("en-IN")}`;

// Shared empty-state block used by every panel that needs order data.
const Empty = ({ icon: Icon, title, text }) => (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
        <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
            <Icon size={19} className="text-gray-400" />
        </div>
        <p className="text-sm font-semibold mt-3">{title}</p>
        <p className="text-xs text-gray-400 mt-1 max-w-[260px]">{text}</p>
    </div>
);

const Panel = ({ title, children, action, className = "" }) => (
    <section className={`bg-white border border-gray-100 rounded-2xl ${className}`}>
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <h3 className="font-semibold text-[17px]">{title}</h3>
            {action}
        </div>
        {children}
    </section>
);

const Trend = ({ current, previous }) => {
    if (previous === undefined || previous === null) return null;
    if (previous === 0) {
        return <span className="text-[11px] text-gray-500 bg-white px-2.5 py-1 rounded-full">No prior data</span>;
    }
    const pct = ((current - previous) / previous) * 100;
    const up = pct >= 0;
    const Icon = up ? TrendingUp : TrendingDown;
    return (
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white ${up ? "text-emerald-600" : "text-red-500"}`}>
            <Icon size={12} /> {Math.abs(pct).toFixed(1)} %
        </span>
    );
};

const Admin = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/dashboard`, { credentials: "include" });
            const result = await res.json();
            if (!res.ok || !result.success) throw new Error(result.message || "Dashboard fetch failed");
            setData(result);
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Unable to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDashboard(); }, []);

    const s = data?.stats || {};
    const recentProducts = (data?.recentProducts || []).filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
    );
    const topRated = data?.topRatedProducts || [];
    const show = (v) => (loading ? "..." : v);

    // Revenue, repeat rate and AOV need an Order model; conversion needs visit tracking.
    const cards = [
        { title: "Ecommerce Revenue", icon: IndianRupee, bg: "bg-[#FDF0E6]", value: "—", note: "Needs orders" },
        { title: "New Customers", icon: Users, bg: "bg-[#EBF3E8]", value: show(s.newCustomers ?? 0), trend: <Trend current={s.newCustomers} previous={s.previousNewCustomers} />, note: "Last 30 days" },
        { title: "Repeat Purchase Rate", icon: Repeat, bg: "bg-[#E8EEFB]", value: "—", note: "Needs orders" },
        { title: "Average Order Value", icon: Receipt, bg: "bg-[#E8F1EF]", value: "—", note: "Needs orders" },
        { title: "Conversion Rate", icon: MousePointerClick, bg: "bg-[#F9E9E9]", value: "—", note: "Needs visit tracking" },
    ];

    return (
        <div>
            {/* HEADER */}
            <header className="bg-white border-b border-gray-100 px-5 md:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        Welcome Back, {user?.name || "Admin"}!
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Here's what's happening with your store today</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button disabled title="Available once orders exist" className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed">
                        Previous Year <ChevronDown size={16} />
                    </button>
                    <button disabled title="Available once orders exist" className="px-4 py-2.5 rounded-lg text-sm font-medium bg-[#111113] text-white opacity-60 cursor-not-allowed">
                        View All Time
                    </button>
                    <button onClick={fetchDashboard} title="Refresh" className="p-2.5 rounded-lg text-gray-500 hover:bg-gray-100">
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                    <button className="relative p-2.5 rounded-lg text-gray-500 hover:bg-gray-100">
                        <Bell size={19} />
                    </button>
                    <div className="w-9 h-9 rounded-full bg-[#FFF0E5] text-[#F97316] flex items-center justify-center font-bold border border-orange-100">
                        {(user?.name || "A")[0].toUpperCase()}
                    </div>
                </div>
            </header>

            <div className="max-w-[1500px] mx-auto p-5 md:p-8 space-y-6">
                {/* KPI CARDS */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
                    {cards.map(({ title, icon: Icon, bg, value, trend, note }) => (
                        <div key={title} className={`${bg} rounded-2xl p-5`}>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">{title}</p>
                                <Icon size={18} className="text-gray-500" />
                            </div>
                            <p className="text-[28px] font-bold tracking-tight mt-3">{value}</p>
                            <div className="flex items-center justify-between mt-4 min-h-[26px]">
                                {trend}
                                <span className="text-[11px] text-gray-500 ml-auto">{note}</span>
                            </div>
                        </div>
                    ))}
                </section>

                {/* SUMMARY + MOST SELLING */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Panel title="Summary" className="xl:col-span-2">
                        <div className="px-6 pb-6">
                            <div className="relative h-[250px] rounded-xl bg-[#FAFAFA] border border-dashed border-gray-200 overflow-hidden">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="absolute left-0 right-0 border-t border-gray-100" style={{ top: `${15 + i * 22}%` }} />
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Empty icon={TrendingUp} title="No sales data yet" text="Orders and income growth will be plotted here once customers start placing orders." />
                                </div>
                            </div>
                        </div>
                    </Panel>

                    <Panel title="Most Selling Products">
                        <Empty icon={Package} title="No sales yet" text="Best sellers appear here once orders are recorded." />
                    </Panel>
                </div>

                {/* RECENT ORDERS + TOP CUSTOMERS */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Panel
                        title="Recent Orders"
                        className="xl:col-span-2"
                        action={<Link to="/admin/orders" className="text-xs font-medium text-blue-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">View All</Link>}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[560px]">
                                <thead className="text-xs text-gray-500 border-y border-gray-100">
                                    <tr>
                                        {["Product", "Customer", "Order ID", "Date", "Status"].map((h) => (
                                            <th key={h} className="px-6 py-3 font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <Empty icon={ShoppingBag} title="No orders yet" text="Recent purchases with status (Pending, Shipped, Canceled) will show here." />
                    </Panel>

                    <Panel title="Weekly Top Customers">
                        <Empty icon={Users} title="No customer orders yet" text="Your most active customers this week will appear here." />
                    </Panel>
                </div>

                {/* EXISTING PRODUCT / INVENTORY FEATURES (preserved) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Panel
                        title="Recently Added Products"
                        className="xl:col-span-2"
                        action={
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-2 bg-[#F5F5F6] px-3 py-2 rounded-lg">
                                    <Search size={15} className="text-gray-400" />
                                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="bg-transparent outline-none text-sm w-40" />
                                </div>
                                <Link to="/admin/products" className="text-xs font-medium text-[#F97316] hover:text-[#EA580C]">View All</Link>
                            </div>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[560px]">
                                <thead className="text-xs text-gray-500 border-y border-gray-100">
                                    <tr>
                                        {["Product", "Category", "Price", "Stock", "Rating"].map((h) => (
                                            <th key={h} className="px-6 py-3 font-medium">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr><td colSpan="5" className="text-center py-10 text-sm text-gray-400">Loading products...</td></tr>
                                    ) : recentProducts.length === 0 ? (
                                        <tr><td colSpan="5" className="text-center py-10 text-sm text-gray-400">No products found.</td></tr>
                                    ) : (
                                        recentProducts.map((p) => (
                                            <tr key={p._id} className="hover:bg-orange-50/30">
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <img src={p.images?.[0] || "https://placehold.co/60"} alt={p.productName} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                                        <span className="text-sm font-medium">{p.productName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-sm text-gray-500">{p.category || "Uncategorized"}</td>
                                                <td className="px-6 py-3 text-sm font-semibold">{formatPrice(p.discountprice ?? p.price)}</td>
                                                <td className="px-6 py-3">
                                                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${p.stock <= 5 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
                                                        {p.stock ?? 0} units
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-sm">
                                                    <span className="inline-flex items-center gap-1"><Star size={14} className="text-orange-400 fill-orange-400" />{p.ratings || 0}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Panel>

                    <div className="space-y-6">
                        <Panel title="Inventory Overview">
                            <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                                {[
                                    ["Total Products", s.totalProducts],
                                    ["Units in Stock", (s.totalStock || 0).toLocaleString("en-IN")],
                                    ["Featured", s.featuredProducts],
                                    ["Low Stock (≤5)", s.lowStockProducts, true],
                                ].map(([label, val, warn]) => (
                                    <div key={label} className="rounded-xl bg-[#FAFAFA] p-4">
                                        <p className="text-[11px] text-gray-500">{label}</p>
                                        <p className={`text-xl font-bold mt-1 ${warn && s.lowStockProducts > 0 ? "text-[#F97316]" : ""}`}>{show(val ?? 0)}</p>
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        <Panel title="Top Rated Products">
                            <div className="px-6 pb-5 space-y-3">
                                {loading ? (
                                    <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
                                ) : topRated.length === 0 ? (
                                    <p className="text-sm text-gray-400 text-center py-6">No rated products yet.</p>
                                ) : (
                                    topRated.map((p) => (
                                        <div key={p._id} className="flex items-center gap-3">
                                            <img src={p.images?.[0] || "https://placehold.co/60"} alt={p.productName} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{p.productName}</p>
                                                <p className="text-xs text-gray-400">{formatPrice(p.price)}</p>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                                                <Star size={12} fill="currentColor" />{p.ratings}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Panel>

                        <Link to="/admin/add-product" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-semibold transition">
                            <Plus size={18} /> Add New Product
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
