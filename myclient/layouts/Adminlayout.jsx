import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Package, Boxes, Users, Star, CreditCard, Plug,
    Settings, CircleHelp, ShieldCheck, LogOut, ShoppingBag, Menu, X,
} from "lucide-react";
import { useAuth } from "../src/context/useAuth.js";

// `to` = real route. Items without a route yet are shown dimmed with a "Soon" tag.
const general = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/admin", end: true },
    { label: "Product", icon: Package, to: "/admin/products" },
    { label: "Inventory", icon: Boxes },
    { label: "Customers", icon: Users },
    { label: "Review", icon: Star },
    { label: "Payment", icon: CreditCard },
    { label: "Integration", icon: Plug },
];
const account = [
    { label: "Settings", icon: Settings },
    { label: "Help", icon: CircleHelp },
    { label: "Manage Users", icon: ShieldCheck },
];

const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const Item = ({ label, icon: Icon, to, end }) => {
        const base = "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition";
        if (!to) {
            return (
                <div className={`${base} text-gray-600 cursor-not-allowed`}>
                    <Icon size={19} strokeWidth={1.8} />
                    <span>{label}</span>
                    <span className="ml-auto text-[9px] uppercase tracking-wider text-gray-600">Soon</span>
                </div>
            );
        }
        return (
            <NavLink
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                    `${base} ${isActive ? "bg-[#F97316] text-white" : "text-gray-400 hover:bg-white/[0.07] hover:text-white"}`
                }
            >
                <Icon size={19} strokeWidth={1.8} />
                <span>{label}</span>
            </NavLink>
        );
    };

    return (
        <div className="min-h-screen bg-[#F7F7F8] text-[#171717] flex">
            {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />}

            <aside
                className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[250px] shrink-0 bg-[#111113] text-white flex flex-col transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="h-[84px] px-6 flex items-center justify-between">
                    <Link to="/admin" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center">
                            <ShoppingBag size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-[22px] font-bold tracking-tight">
                            Shopes<span className="text-[#F97316]">too.</span>
                        </span>
                    </Link>
                    <button onClick={() => setOpen(false)} className="lg:hidden text-gray-400"><X size={22} /></button>
                </div>

                <div className="flex-1 px-4 py-4 overflow-y-auto">
                    <p className="text-[11px] uppercase tracking-[2px] text-gray-500 font-semibold px-3 mb-3">General</p>
                    <nav className="space-y-1">{general.map((i) => <Item key={i.label} {...i} />)}</nav>

                    <p className="text-[11px] uppercase tracking-[2px] text-gray-500 font-semibold px-3 mt-9 mb-3">Account</p>
                    <nav className="space-y-1">{account.map((i) => <Item key={i.label} {...i} />)}</nav>
                </div>

                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                    >
                        <LogOut size={19} /> Logout
                    </button>
                </div>
            </aside>

            <div className="flex-1 min-w-0">
                {/* Mobile top bar (desktop uses the sidebar) */}
                <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 h-14 px-4 flex items-center">
                    <button onClick={() => setOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-gray-100"><Menu size={22} /></button>
                    <span className="ml-3 font-bold">Shopes<span className="text-[#F97316]">too.</span></span>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
