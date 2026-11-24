
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
    ShoppingCart,
    LogOut,
    Shield,
    LogIn,
    UserPlus,
    Menu,
    X,
    UserRound,
    Package
} from "lucide-react";

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] = useState(false);

    const handleLogout = async () => {
        await logout();
        setMobileMenu(false);
        navigate("/login");
    };

    const closeMenu = () => setMobileMenu(false);

    const initial = user?.name?.charAt(0).toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-2xl font-black tracking-tight text-gray-900"
                >
                    Shopes<span className="text-orange-500">too.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">

                    <Link to="/" className="text-sm font-semibold text-gray-600 transition hover:text-orange-500">
                        Home
                    </Link>

                    <Link to="/product" className="text-sm font-semibold text-gray-600 transition hover:text-orange-500">
                        Products
                    </Link>

                    <Link to="/about" className="text-sm font-semibold text-gray-600 transition hover:text-orange-500">
                        About
                    </Link>

                    <Link to="/contact" className="text-sm font-semibold text-gray-600 transition hover:text-orange-500">
                        Contact
                    </Link>

                    {isAuthenticated && user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-600 transition hover:bg-orange-100"
                        >
                            <Shield size={15} />
                            Admin Panel
                        </Link>
                    )}

                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 lg:flex">

                    {isAuthenticated ? (
                        <>
                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative rounded-xl p-2.5 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                            >
                                <ShoppingCart size={21} />
                            </Link>

                            {/* Profile */}
                            <Link
                                to="/me"
                                className="flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2 transition hover:border-orange-200 hover:bg-orange-50"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                                    {initial}
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Welcome back
                                    </p>
                                    <p className="max-w-24 truncate text-sm font-bold text-gray-800">
                                        {user?.name?.split(" ")[0]}
                                    </p>
                                </div>
                            </Link>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-500"
                            >
                                <LogIn size={17} />
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md"
                            >
                                <UserPlus size={17} />
                                Sign Up
                            </Link>
                        </>
                    )}

                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-3 lg:hidden">

                    {isAuthenticated && (
                        <Link
                            to="/cart"
                            className="rounded-lg p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        >
                            <ShoppingCart size={22} />
                        </Link>
                    )}

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="rounded-lg p-2 text-gray-800 hover:bg-gray-100"
                        aria-label="Toggle navigation"
                    >
                        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">

                    <nav className="flex flex-col gap-1">

                        <Link onClick={closeMenu} to="/" className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500">
                            Home
                        </Link>

                        <Link onClick={closeMenu} to="/product" className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500">
                            Products
                        </Link>

                        <Link onClick={closeMenu} to="/about" className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500">
                            About
                        </Link>

                        <Link onClick={closeMenu} to="/contact" className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500">
                            Contact
                        </Link>

                        {isAuthenticated && user?.role === "admin" && (
                            <Link
                                onClick={closeMenu}
                                to="/admin"
                                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50"
                            >
                                <Shield size={17} />
                                Admin Dashboard
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <>
                                <hr className="my-3 border-gray-100" />

                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                                        {initial}
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-gray-800">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            View Profile
                                        </p>
                                    </div>

                                    <UserRound size={18} className="ml-auto text-gray-400" />
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="mt-3 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700"
                                >
                                    <LogIn size={16} />
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white"
                                >
                                    <UserPlus size={16} />
                                    Sign Up
                                </Link>
                            </div>
                        )}

                    </nav>

                </div>
            )}

        </header>
    );
};

export default Header;
