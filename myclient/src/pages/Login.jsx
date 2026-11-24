
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const [showpassword, setshowpassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            const data = await res.json();

            console.log("Login Response:", data);

                 if (res.ok && data.success && data.user) {

        // toast.success("Login Successful!");
if (data.user.role === "admin") {
    
    toast.success("Signed in as ADMIN! 👑");
    navigate("/admin");
} else {
    toast.success("Welcome back!");
    navigate("/product");
}

}

     else {

    toast.error(data.message || "Login failed!");

    }

} catch (error) {

    console.log(error);
    toast.error("Something went wrong!");

} finally {

    setLoading(false);

}
};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

                {/* Left Side */}

                <div className="hidden md:flex flex-col justify-between bg-gray-950 text-white p-12 relative overflow-hidden">

                    <div className="absolute w-80 h-80 bg-orange-500/20 rounded-full blur-3xl -top-20 -right-20"></div>

                    <Link to="/product" className="text-3xl font-bold relative z-10">
                        Shopes<span className="text-orange-500">too.</span>
                    </Link>

                    <div className="relative z-10">

                        <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-4">
                            Welcome Back
                        </p>

                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Good to
                            <br />
                            See You
                            <br />
                            Again.
                        </h1>

                        <p className="text-gray-400 leading-7 max-w-sm">
                            Sign in to explore amazing products, discover new deals and enjoy a better shopping experience.
                        </p>

                    </div>

                    <p className="text-gray-500 text-sm relative z-10">
                        © 2026 Shopestoo. All rights reserved.
                    </p>

                </div>

                {/* Right Side */}

                <div className="bg-white px-8 py-12 md:px-14 md:py-16 flex items-center">

                    <div className="max-w-md w-full mx-auto">

                        <div className="mb-10">

                            <p className="text-orange-500 font-semibold text-sm tracking-wider mb-3">
                                WELCOME BACK
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900">
                                Login to your account
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Enter your details to continue shopping.
                            </p>

                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                                />

                            </div>

                            {/* Password */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showpassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pr-12 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setshowpassword(!showpassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
                                    >
                                        {showpassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Forgot Password */}

                            <div className="flex justify-end">

                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-orange-500 font-semibold hover:text-orange-600"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 rounded-xl transition duration-200 shadow-lg shadow-orange-500/20"
                            >
                                {loading ? "Logging in..." : "Login →"}
                            </button>

                        </form>

                        {/* Register Link */}

                        <p className="text-center text-gray-500 text-sm mt-8">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="text-orange-500 font-bold ml-1 hover:text-orange-600"
                            >
                                Create Account
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
