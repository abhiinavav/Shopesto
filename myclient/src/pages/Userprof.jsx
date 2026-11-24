
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import {
    LogOut,
    ShieldCheck,
    Mail,
    Phone,
    MapPin,
    UserRound,
    Hash,
    ArrowLeft,
    Package,
    CheckCircle2,
    LockKeyhole
} from "lucide-react";

const UserProf = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8]">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            </div>
        );
    }

    const initial = user.name?.charAt(0).toUpperCase() || "U";
    const address = user.address || {};

    const InfoCard = ({ icon: Icon, title, value }) => (
        <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm">
            <div className="rounded-xl bg-orange-50 p-3 text-orange-500">
                <Icon size={20} />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {title}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f5f6f8] px-4 py-10 sm:px-8">

            <div className="mx-auto max-w-6xl">

                {/* Top Navigation */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            My Account
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your personal information and account.
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-3 text-sm font-semibold text-red-500 shadow-sm transition hover:bg-red-50"
                    >
                        <LogOut size={17} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>

                {/* Profile Hero */}
                <div className="relative overflow-hidden rounded-3xl bg-[#171717] p-7 text-white shadow-xl sm:p-10">

                    <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
                    <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

                    <div className="relative flex flex-col items-center gap-6 sm:flex-row">

                        {/* Avatar */}
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-gradient-to-br from-orange-400 to-orange-600 text-5xl font-bold shadow-lg">
                            {initial}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-300">
                                    MY ACCOUNT
                                </span>

                                {user.isverified && (
                                    <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
                                        <CheckCircle2 size={13} />
                                        Verified
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold capitalize">
                                {user.name || "Customer"}
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                {user.email}
                            </p>

                            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm capitalize text-gray-300">
                                <ShieldCheck size={16} className="text-orange-400" />
                                {user.role || "User"} Account
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <UserRound size={90} className="text-white/10" />
                        </div>
                    </div>
                </div>

                {/* Account Overview */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Account Role
                            </p>
                            <ShieldCheck className="text-orange-500" size={22} />
                        </div>
                        <h3 className="mt-3 text-xl font-bold capitalize text-gray-900">
                            {user.role || "User"}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                            Your account permissions
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Verification
                            </p>
                            <CheckCircle2 className="text-green-500" size={22} />
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-gray-900">
                            {user.isverified ? "Verified" : "Not Verified"}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                            Email/account verification status
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Account Status
                            </p>
                            <LockKeyhole className="text-orange-500" size={22} />
                        </div>
                        <h3 className={`mt-3 text-xl font-bold ${user.isblocked ? "text-red-500" : "text-green-600"}`}>
                            {user.isblocked ? "Blocked" : "Active"}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                            Current account status
                        </p>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-7 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Personal Information
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                Your registered account details
                            </p>
                        </div>

                        <UserRound size={25} className="text-orange-500" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <InfoCard
                            icon={Hash}
                            title="Account ID"
                            value={user._id}
                        />

                        <InfoCard
                            icon={UserRound}
                            title="Full Name"
                            value={user.name}
                        />

                        <InfoCard
                            icon={Mail}
                            title="Email Address"
                            value={user.email}
                        />

                        <InfoCard
                            icon={Phone}
                            title="Phone Number"
                            value={user.phone}
                        />

                    </div>
                </div>

                {/* Address Information */}
                <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                    <div className="mb-7 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Delivery Address
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                Your saved shipping information
                            </p>
                        </div>

                        <MapPin size={25} className="text-orange-500" />
                    </div>

                    {Object.values(address).some(Boolean) ? (
                        <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-6">

                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                                    <MapPin size={22} />
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900">
                                        {address.fullname || user.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        Default Address
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <p>{address.street || "Street not provided"}</p>
                                <p>
                                    {[address.city, address.state, address.pincode]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                                <p>{address.country}</p>
                                <p className="pt-2 font-medium text-gray-800">
                                    Phone: {address.phone || user.phone || "Not provided"}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-10 text-center">
                            <MapPin className="mx-auto text-gray-300" size={35} />
                            <p className="mt-3 font-semibold text-gray-700">
                                No address added yet
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                                Your delivery address will appear here.
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#171717] p-6 text-center text-white sm:flex-row sm:text-left">
                    <div className="flex items-center gap-3">
                        <Package className="text-orange-400" size={25} />
                        <div>
                            <h4 className="font-semibold">
                                Ready to shop?
                            </h4>
                            <p className="text-xs text-gray-400">
                                Explore our latest collection.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/product")}
                        className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                        Explore Products
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserProf;