
import React, { useEffect, useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Package,
    Boxes,
    Star,
    Eye,
    EyeOff
} from "lucide-react";
import toast from "react-hot-toast";

const AdminProduct = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch Products
    const fetchproducts = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                setProducts(data.products || []);
            } else {
                toast.error(data.message || "Failed to fetch products");
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchproducts();
    }, []);

    // Search Filter
    const filteredproducts = products.filter((product) =>
        product.productName?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase())
    );

    // Delete Product
    const deleteproduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Product deleted successfully");
                setProducts(prev => prev.filter(product => product._id !== id));
            } else {
                toast.error(data.message || "Failed to delete product");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f6fa] p-5 md:p-9">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-8">

                <div>
                    <p className="text-sm text-gray-400 font-medium mb-2">
                        ADMIN / INVENTORY
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Product Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage and monitor your store products
                    </p>
                </div>

                <button
                    onClick={() => toast("Add Product form coming next")}
                    className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    <Plus size={19} />
                    Add New Product
                </button>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Total Products</p>
                        <Package className="text-indigo-600" size={25} />
                    </div>
                    <h2 className="text-3xl font-bold mt-3">
                        {products.length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">In Stock</p>
                        <Boxes className="text-emerald-600" size={25} />
                    </div>
                    <h2 className="text-3xl font-bold mt-3">
                        {products.filter(p => p.stock > 0).length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Out of Stock</p>
                        <EyeOff className="text-red-500" size={25} />
                    </div>
                    <h2 className="text-3xl font-bold mt-3">
                        {products.filter(p => p.stock === 0).length}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Featured</p>
                        <Star className="text-orange-500" size={25} />
                    </div>
                    <h2 className="text-3xl font-bold mt-3">
                        {products.filter(p => p.isFeatured).length}
                    </h2>
                </div>

            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-7">

                {/* Search */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            All Products
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            {filteredproducts.length} products found
                        </p>
                    </div>

                    <div className="relative w-full sm:w-80">
                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search name or category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
                        />
                    </div>

                </div>

                {/* Table Heading */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-4 bg-gray-50 rounded-lg text-xs font-semibold uppercase tracking-wide text-gray-500">

                    <div className="col-span-1">Image</div>
                    <div className="col-span-3">Product</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-1">Stock</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2 text-center">Actions</div>

                </div>

                {/* Product Rows */}
                <div className="divide-y divide-gray-100">

                    {loading ? (

                        <div className="text-center py-16 text-gray-400">
                            Loading products...
                        </div>

                    ) : filteredproducts.length === 0 ? (

                        <div className="text-center py-16">
                            <Package size={40} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">
                                No products found
                            </p>
                        </div>

                    ) : (

                        filteredproducts.map((product) => (

                            <div
                                key={product._id}
                                className="grid grid-cols-2 lg:grid-cols-12 gap-4 items-center px-3 lg:px-5 py-5 hover:bg-gray-50 transition"
                            >

                                {/* Image */}
                                <div className="col-span-1 lg:col-span-1">
                                    <img
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.productName}
                                        className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2"
                                    />
                                </div>

                                {/* Product */}
                                <div className="col-span-1 lg:col-span-3 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate">
                                        {product.productName}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {product.isFeatured && (
                                        <span className="inline-flex items-center gap-1 text-xs text-orange-600 mt-2">
                                            <Star size={12} />
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="col-span-1 lg:col-span-2">
                                    <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="col-span-1 lg:col-span-2">
                                    <p className="font-bold text-gray-900">
                                        ₹{Number(product.discountprice ?? product.price).toLocaleString("en-IN")}
                                    </p>

                                    {product.discountprice != null && (
                                        <p className="text-xs text-gray-400 line-through mt-1">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </p>
                                    )}
                                </div>

                                {/* Stock */}
                                <div className="col-span-1 lg:col-span-1">
                                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                                        product.stock > 0
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-red-50 text-red-600"
                                    }`}>
                                        {product.stock > 0 ? product.stock : "Out"}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="col-span-1 lg:col-span-1">
                                    <span className={`text-xs font-semibold px-2 py-1.5 rounded-full ${
                                        product.isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "bg-gray-100 text-gray-500"
                                    }`}>
                                        {product.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="col-span-1 lg:col-span-2 flex items-center justify-end lg:justify-center gap-2">

                                    <button
                                        title="Edit Product"
                                        onClick={() => toast("Edit Product coming next")}
                                        className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                                    >
                                        <Pencil size={17} />
                                    </button>

                                    <button
                                        title="Delete Product"
                                        onClick={() => deleteproduct(product._id)}
                                        className="p-2.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition"
                                    >
                                        <Trash2 size={17} />
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
};

export default AdminProduct;
