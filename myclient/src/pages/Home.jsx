
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    ShoppingCart,
    Heart,
    Search,
    Truck,
    ShieldCheck,
    Headphones,
    Star,
    Flame,
    Zap,
    Mail,
    Instagram,
    Facebook,
    Twitter,
    ChevronRight,
    Grid2X2,
    Package,
    Menu,
    X
} from "lucide-react";

const categories = [
    {
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400"
    },
    {
        name: "Home & Living",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400"
    },
    {
        name: "Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
    },
    {
        name: "Sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        name: "Toys",
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400"
    },
    {
        name: "Groceries",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
    }
];

const products = [
    {
        id: 1,
        name: "AirPods Pro",
        category: "Electronics",
        price: 199,
        oldPrice: 249,
        rating: 4.8,
        reviews: "1.2k",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600"
    },
    {
        id: 2,
        name: "Smart Watch Series 9",
        category: "Electronics",
        price: 249,
        oldPrice: 299,
        rating: 4.7,
        reviews: "856",
        discount: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },
    {
        id: 3,
        name: "Nike Air Max",
        category: "Fashion",
        price: 129,
        oldPrice: 169,
        rating: 4.6,
        reviews: "721",
        discount: "24%",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 4,
        name: "Travel Backpack",
        category: "Accessories",
        price: 89,
        oldPrice: 119,
        rating: 4.7,
        reviews: "934",
        discount: null,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    },
    {
        id: 5,
        name: "Sony Headphones",
        category: "Electronics",
        price: 299,
        oldPrice: 349,
        rating: 4.8,
        reviews: "677",
        discount: null,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    }
];

const testimonials = [
    {
        name: "Rohan Mehta",
        review: "Shopestoo has completely changed the way I shop online!",
        image: "https://i.pravatar.cc/100?img=12"
    },
    {
        name: "Priya Sharma",
        review: "Amazing products and super fast delivery. Highly recommended!",
        image: "https://i.pravatar.cc/100?img=47"
    },
    {
        name: "Amit Verma",
        review: "Best e-commerce experience so far. Love Shopestoo!",
        image: "https://i.pravatar.cc/100?img=11"
    }
];

const Home = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [wishlist, setWishlist] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();

        if (search.trim()) {
            navigate(`/product?search=${encodeURIComponent(search.trim())}`);
        }
    };

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[#0b0b0b] text-white">

            {/* ANNOUNCEMENT BAR */}

            <div className="flex items-center justify-center gap-2 bg-orange-600 px-4 py-2 text-center text-xs font-bold tracking-wide sm:text-sm">
                <Flame size={15} />
                BIG SALE IS LIVE — DISCOVER YOUR NEXT FAVOURITE
                <ArrowRight size={15} />
            </div>


            {/* HERO SECTION */}

            <section className="relative mx-auto max-w-[1500px] px-5 pt-8 sm:px-8 lg:px-12 lg:pt-12">

                <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-[#111111] lg:min-h-[650px]">

                    {/* Hero background */}

                    <div className="absolute inset-0">

                        <img
                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800"
                            alt="Streetwear fashion collection"
                            className="h-full w-full object-cover object-center opacity-65"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/10" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    </div>

                    {/* Orange decorative circle */}

                    <div className="absolute -right-32 top-10 h-[450px] w-[450px] rounded-full border-[65px] border-orange-600/30 blur-[2px] sm:h-[550px] sm:w-[550px]" />

                    {/* Hero content */}

                    <div className="relative z-10 flex min-h-[560px] max-w-2xl flex-col justify-center px-7 py-16 sm:px-12 lg:min-h-[650px] lg:px-16">

                        <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-bold tracking-wider text-orange-400">
                            <Flame size={15} />
                            BIG SALE IS LIVE
                        </div>

                        <h1 className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">

                            Shop Smarter.

                            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Live Better.
                            </span>

                        </h1>

                        <p className="mt-7 max-w-md text-sm leading-7 text-gray-300 sm:text-base">
                            Discover premium products, unbeatable prices
                            and an exceptional shopping experience.
                            Everything you love, all in one place.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">

                            <Link
                                to="/product"
                                className="group flex items-center gap-3 rounded-full bg-orange-600 px-7 py-4 text-sm font-bold transition hover:bg-orange-500"
                            >
                                Shop Now
                                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/about"
                                className="flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold transition hover:border-orange-500 hover:text-orange-400"
                            >
                                Explore More
                                <ArrowUpRight size={17} />
                            </Link>

                        </div>

                        {/* Customer stats */}

                        <div className="mt-12 flex items-center gap-4">

                            <div className="flex -space-x-3">
                                {[12, 47, 11, 32].map((id) => (
                                    <img
                                        key={id}
                                        src={`https://i.pravatar.cc/80?img=${id}`}
                                        alt="Customer"
                                        className="h-9 w-9 rounded-full border-2 border-black object-cover"
                                    />
                                ))}
                            </div>

                            <div>
                                <p className="text-sm font-bold">+10k Happy Customers</p>
                                <p className="text-xs text-gray-400">Shopping made better.</p>
                            </div>

                        </div>

                    </div>

                    {/* Floating label */}

                    <div className="absolute bottom-10 right-8 hidden rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl lg:block">
                        <p className="text-xs font-bold tracking-widest text-orange-400">
                            SHOP DIFFERENT
                        </p>
                        <p className="mt-2 text-lg font-black">
                            Own your style.
                        </p>
                    </div>

                </div>

            </section>


            {/* CATEGORY SECTION */}

            <section className="mx-auto max-w-[1500px] px-5 pt-14 sm:px-8 lg:px-12">

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7">

                        {categories.map((category, index) => (

                            <Link
                                key={category.name}
                                to={`/product?category=${encodeURIComponent(category.name)}`}
                                className={`group flex min-h-[135px] flex-col items-center justify-center gap-3 p-4 transition hover:bg-orange-500/10 ${
                                    index !== categories.length - 1
                                        ? "border-r border-white/10"
                                        : ""
                                }`}
                            >

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-14 w-14 rounded-xl object-cover transition duration-300 group-hover:scale-110"
                                />

                                <span className="text-center text-xs font-bold text-gray-300 transition group-hover:text-orange-400">
                                    {category.name}
                                </span>

                            </Link>

                        ))}

                    </div>

                </div>

            </section>


            {/* FEATURED PRODUCTS */}

            <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">

                <div className="mb-10 flex flex-wrap items-end justify-between gap-5">

                    <div>

                        <div className="mb-3 flex items-center gap-2 text-xs font-black tracking-[0.2em] text-orange-500">
                            <Zap size={16} />
                            TRENDING NOW
                        </div>

                        <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                            Featured <span className="text-orange-500">Products</span>
                        </h2>

                        <p className="mt-3 text-sm text-gray-500">
                            The products everyone's talking about.
                        </p>

                    </div>

                    <Link
                        to="/product"
                        className="flex items-center gap-2 text-sm font-bold transition hover:text-orange-500"
                    >
                        View All Products
                        <ArrowRight size={17} />
                    </Link>

                </div>


                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171717] transition duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5"
                        >

                            {/* Product image */}

                            <div className="relative h-[270px] overflow-hidden bg-[#222222]">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />

                                {product.discount && (
                                    <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-3 py-1.5 text-[10px] font-black">
                                        -{product.discount}
                                    </span>
                                )}

                                <button
                                    type="button"
                                    onClick={() => toggleWishlist(product.id)}
                                    aria-label="Toggle wishlist"
                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-orange-600"
                                >
                                    <Heart
                                        size={17}
                                        fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                                        className={wishlist.includes(product.id) ? "text-orange-500" : ""}
                                    />
                                </button>

                                <Link
                                    to="/product"
                                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-lg transition hover:bg-orange-500"
                                    aria-label={`Explore ${product.name}`}
                                >
                                    <ShoppingCart size={18} />
                                </Link>

                            </div>


                            {/* Product details */}

                            <div className="p-4">

                                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                                    {product.category}
                                </p>

                                <h3 className="mt-2 truncate text-sm font-bold">
                                    {product.name}
                                </h3>

                                <div className="mt-4 flex items-center gap-2">

                                    <span className="text-lg font-black">
                                        ${product.price}
                                    </span>

                                    <span className="text-xs text-gray-500 line-through">
                                        ${product.oldPrice}
                                    </span>

                                </div>

                                <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">

                                    <Star size={14} fill="#f97316" className="text-orange-500" />

                                    <span className="text-xs font-bold text-orange-400">
                                        {product.rating}
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        ({product.reviews} reviews)
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* PROMOTIONAL BANNERS */}

            <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:px-12">

                {/* Sale banner */}

                <div className="group relative min-h-[290px] overflow-hidden rounded-2xl bg-orange-600">

                    <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900"
                        alt="Premium headphones"
                        className="absolute right-0 top-0 h-full w-3/5 object-cover opacity-80 transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-600/90 to-transparent" />

                    <div className="relative z-10 flex h-full min-h-[290px] max-w-xs flex-col justify-center p-7 sm:p-9">

                        <p className="text-xs font-black tracking-widest text-orange-100">
                            LIMITED TIME OFFER
                        </p>

                        <h2 className="mt-3 text-5xl font-black leading-none text-black">
                            UP TO
                            <br />
                            50% OFF
                        </h2>

                        <p className="mt-3 text-sm font-semibold text-orange-950">
                            Don't miss out on the best deals.
                        </p>

                        <Link
                            to="/product"
                            className="mt-6 flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-black"
                        >
                            Shop the Sale <ArrowRight size={15} />
                        </Link>

                    </div>

                </div>


                {/* Shipping banner */}

                <div className="group relative min-h-[290px] overflow-hidden rounded-2xl border border-white/10 bg-[#171717]">

                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
                        alt="Shopping and delivery"
                        className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

                    <div className="relative z-10 flex min-h-[290px] flex-col justify-center p-7 sm:p-9">

                        <Truck size={38} className="mb-5 text-orange-500" />

                        <h2 className="text-3xl font-black sm:text-4xl">
                            Free Shipping
                        </h2>

                        <p className="mt-3 text-lg font-bold text-orange-500">
                            On Orders Over $50
                        </p>

                        <p className="mt-2 max-w-xs text-sm text-gray-400">
                            Great products, delivered right to your doorstep.
                        </p>

                        <Link
                            to="/product"
                            className="mt-6 flex w-fit items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-bold transition hover:border-orange-500 hover:bg-orange-600"
                        >
                            Shop Now <ArrowRight size={15} />
                        </Link>

                    </div>

                </div>

            </section>


            {/* WHY SHOP WITH US */}

            <section className="border-y border-white/10 bg-[#111111] py-20">

                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

                    <div className="mb-12 text-center">

                        <p className="mb-3 text-xs font-black tracking-[0.2em] text-orange-500">
                            THE SHOPESTOO EXPERIENCE
                        </p>

                        <h2 className="text-3xl font-black sm:text-5xl">
                            More than just <span className="text-orange-500">shopping.</span>
                        </h2>

                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                icon: Truck,
                                title: "Fast Delivery",
                                desc: "Get your favourite products delivered to your doorstep."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Secure Payments",
                                desc: "Shop confidently with secure payment experiences."
                            },
                            {
                                icon: Package,
                                title: "Quality Products",
                                desc: "Explore carefully selected products for everyday life."
                            },
                            {
                                icon: Headphones,
                                title: "Customer Support",
                                desc: "We're here to help whenever you need us."
                            }
                        ].map((item, index) => (

                            <div
                                key={index}
                                className="group rounded-2xl border border-white/10 bg-[#181818] p-7 transition hover:border-orange-500/50"
                            >

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 transition group-hover:bg-orange-600 group-hover:text-white">
                                    <item.icon size={26} />
                                </div>

                                <h3 className="text-lg font-bold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-gray-500">
                                    {item.desc}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* CUSTOMER REVIEWS */}

            <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12">

                <div className="mb-10 flex flex-wrap items-end justify-between gap-5">

                    <div>
                        <p className="mb-3 text-xs font-black tracking-[0.2em] text-orange-500">
                            OUR CUSTOMERS
                        </p>

                        <h2 className="text-3xl font-black sm:text-5xl">
                            What Our Customers <span className="text-orange-500">Say</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-orange-500">
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                        <Star size={18} fill="currentColor" />
                    </div>

                </div>

                <div className="grid gap-5 md:grid-cols-3">

                    {testimonials.map((review, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-white/10 bg-[#171717] p-6 transition hover:border-orange-500/40"
                        >

                            <div className="flex items-center gap-4">

                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="font-bold">{review.name}</h3>

                                    <div className="mt-1 flex gap-1 text-orange-500">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={12}
                                                fill="currentColor"
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <p className="mt-6 text-sm leading-7 text-gray-400">
                                "{review.review}"
                            </p>

                        </div>

                    ))}

                </div>

            </section>


            {/* NEWSLETTER */}

            <section className="px-5 pb-16 sm:px-8 lg:px-12">

                <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-950 via-[#241207] to-black px-7 py-12 md:flex-row md:px-14">

                    <div className="flex items-center gap-5">

                        <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-black sm:flex">
                            <Mail size={32} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-black sm:text-3xl">
                                Stay in the Loop.
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                Get exclusive deals and updates straight to your inbox.
                            </p>
                        </div>

                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate("/product");
                        }}
                        className="flex w-full max-w-md gap-2 rounded-xl border border-white/10 bg-black/50 p-2"
                    >

                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-gray-500"
                        />

                        <button
                            type="submit"
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-600 px-4 py-3 text-xs font-bold transition hover:bg-orange-500"
                        >
                            Subscribe <ArrowRight size={15} />
                        </button>

                    </form>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="border-t border-white/10 bg-[#080808]">

                <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">

                    {/* Brand */}

                    <div>

                        <Link to="/" className="text-3xl font-black tracking-tight">
                            Shopes<span className="text-orange-500">too.</span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-gray-500">
                            Shop Smart. Live Better.
                            Discover your next favourite with Shopestoo.
                        </p>

                        <div className="mt-6 flex gap-3">

                            {[Instagram, Facebook, Twitter].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    aria-label="Social media"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-orange-500 hover:bg-orange-600 hover:text-white"
                                >
                                    <Icon size={17} />
                                </a>
                            ))}

                        </div>

                    </div>


                    {/* Quick links */}

                    <div>
                        <h3 className="mb-6 font-bold">Quick Links</h3>

                        <div className="flex flex-col gap-4 text-sm text-gray-500">

                            <Link to="/" className="hover:text-orange-500">Home</Link>
                            <Link to="/product" className="hover:text-orange-500">Products</Link>
                            <Link to="/about" className="hover:text-orange-500">About Us</Link>
                            <Link to="/contact" className="hover:text-orange-500">Contact</Link>

                        </div>
                    </div>


                    {/* Customer care */}

                    <div>
                        <h3 className="mb-6 font-bold">Customer Care</h3>

                        <div className="flex flex-col gap-4 text-sm text-gray-500">

                            <Link to="/contact" className="hover:text-orange-500">Help Center</Link>
                            <Link to="/contact" className="hover:text-orange-500">Returns & Refunds</Link>
                            <Link to="/contact" className="hover:text-orange-500">Shipping Information</Link>
                            <Link to="/contact" className="hover:text-orange-500">Track Order</Link>

                        </div>
                    </div>


                    {/* Contact */}

                    <div>
                        <h3 className="mb-6 font-bold">Get In Touch</h3>

                        <div className="flex flex-col gap-4 text-sm text-gray-500">

                            <p className="flex items-center gap-3">
                                <Mail size={16} className="text-orange-500" />
                                support@shopestoo.com
                            </p>

                            <p className="flex items-center gap-3">
                                <Headphones size={16} className="text-orange-500" />
                                Customer Support
                            </p>

                            <p className="flex items-center gap-3">
                                <Package size={16} className="text-orange-500" />
                                Shopestoo Online Store
                            </p>

                        </div>
                    </div>

                </div>


                {/* Copyright */}

                <div className="border-t border-white/10">

                    <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 px-5 py-6 text-xs text-gray-500 sm:px-8 md:flex-row lg:px-12">

                        <p>
                            © 2026 Shopestoo. All rights reserved.
                        </p>

                        <div className="flex gap-5">
                            <Link to="/about" className="hover:text-orange-500">Privacy Policy</Link>
                            <Link to="/about" className="hover:text-orange-500">Terms & Conditions</Link>
                        </div>

                    </div>

                </div>

            </footer>

        </main>
    );
};

export default Home;
