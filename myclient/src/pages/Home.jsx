
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Heart,
    Star,
    Truck,
    ShieldCheck,
    Headphones,
    Package,
    Search,
} from "lucide-react";

const categories = [
    {
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    },
    {
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
    },
    {
        name: "Home & Living",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600",
    },
    {
        name: "Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
    },
    {
        name: "Sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
    {
        name: "Toys",
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600",
    },
    {
        name: "Groceries",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
    },
];

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 8999,
        oldPrice: 10999,
        rating: 4.8,
        reviews: "1.2k",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
        tag: "BESTSELLER",
    },
    {
        id: 2,
        name: "Classic Minimal Watch",
        category: "Electronics",
        price: 5499,
        oldPrice: 6999,
        rating: 4.7,
        reviews: "856",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
        tag: "POPULAR",
    },
    {
        id: 3,
        name: "Everyday Sneakers",
        category: "Fashion",
        price: 4299,
        oldPrice: 5499,
        rating: 4.6,
        reviews: "721",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        tag: "TRENDING",
    },
    {
        id: 4,
        name: "Essential Travel Backpack",
        category: "Fashion",
        price: 3299,
        oldPrice: 3999,
        rating: 4.7,
        reviews: "934",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
        tag: "NEW ARRIVAL",
    },
];

const testimonials = [
    {
        name: "Rohan Mehta",
        review: "A beautiful shopping experience. Great products and an easy checkout process.",
        image: "https://i.pravatar.cc/100?img=12",
    },
    {
        name: "Priya Sharma",
        review: "I love the collection and the quality. Shopestoo has become my favourite store.",
        image: "https://i.pravatar.cc/100?img=47",
    },
    {
        name: "Amit Verma",
        review: "A smooth experience from browsing to delivery. Definitely recommend it.",
        image: "https://i.pravatar.cc/100?img=11",
    },
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
        <main className="min-h-screen overflow-hidden bg-[#f8f7f3] text-[#25241f]">

            {/* ANNOUNCEMENT BAR */}

            <div className="bg-[#292820] px-4 py-3 text-center text-[10px] font-medium tracking-[0.2em] text-[#f5f1e8] sm:text-xs">
                A MORE THOUGHTFUL WAY TO SHOP
                <span className="mx-3 text-[#b9a27b]">✦</span>
                DISCOVER THE COLLECTION
            </div>

            {/* HERO SECTION */}

            <section className="mx-auto max-w-[1500px] px-5 pb-16 pt-8 sm:px-8 lg:px-14 lg:pb-24 lg:pt-14">

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Hero content */}

                    <div className="order-2 py-5 lg:order-1 lg:py-12">

                        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a18a65] sm:text-xs">
                            THE ART OF EVERYDAY LIVING
                        </p>

                        <h1 className="max-w-2xl font-serif text-5xl leading-[1.12] tracking-tight text-[#25241f] sm:text-6xl lg:text-7xl xl:text-[88px]">
                            Find beauty in
                            <span className="block italic text-[#a18a65]">
                                every detail.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-md text-sm leading-8 text-[#77746b] sm:text-base">
                            Thoughtfully selected essentials for the way you
                            live, work and express yourself. Discover pieces
                            that make everyday moments feel special.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-5">

                            <Link
                                to="/product"
                                className="group flex items-center gap-5 bg-[#292820] px-7 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#a18a65]"
                            >
                                Explore Collection
                                <ArrowUpRight
                                    size={17}
                                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>

                            <Link
                                to="/about"
                                className="border-b border-[#b9a27b] pb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#555248] transition hover:text-[#a18a65]"
                            >
                                Our Story
                            </Link>

                        </div>

                        {/* Search */}

                        <form
                            onSubmit={handleSearch}
                            className="mt-12 flex max-w-md items-center border-b border-[#d9d5ca] pb-3"
                        >
                            <Search size={18} className="text-[#a18a65]" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for something special..."
                                className="ml-3 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#aaa69c]"
                            />

                            <button
                                type="submit"
                                className="text-xs font-semibold uppercase tracking-wider text-[#a18a65] hover:text-[#292820]"
                            >
                                Search
                            </button>
                        </form>

                        {/* Small detail */}

                        <div className="mt-12 flex items-center gap-4">
                            <div className="h-px w-12 bg-[#b9a27b]" />
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d897e]">
                                Curated for everyday elegance
                            </p>
                        </div>

                    </div>

                    {/* Hero image */}

                    <div className="relative order-1 lg:order-2">

                        <div className="absolute -right-3 -top-3 h-full w-full border border-[#d8d0c0] sm:-right-5 sm:-top-5" />

                        <div className="relative h-[420px] overflow-hidden sm:h-[560px] lg:h-[680px]">

                            <img
                                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200"
                                alt="Editorial fashion collection"
                                className="h-full w-full object-cover object-center transition duration-1000 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-black/5" />

                            <div className="absolute bottom-6 left-6 bg-[#f8f7f3] px-5 py-4 sm:bottom-10 sm:left-10 sm:px-7 sm:py-6">
                                <p className="text-[9px] uppercase tracking-[0.25em] text-[#a18a65]">
                                    THE NEW EDIT
                                </p>
                                <p className="mt-2 font-serif text-2xl italic text-[#292820] sm:text-3xl">
                                    Less, but better.
                                </p>
                            </div>

                        </div>

                        <p className="mt-4 text-right text-[9px] uppercase tracking-[0.2em] text-[#969186]">
                            SHOPESTOO — EST. 2026
                        </p>

                    </div>

                </div>

            </section>

            {/* BRAND STRIP */}

            <section className="border-y border-[#e5e1d8] bg-[#f1efe9] py-7">
                <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-center gap-x-12 gap-y-5 px-5 text-center text-[10px] uppercase tracking-[0.2em] text-[#77746b] sm:justify-between sm:px-8">
                    <span>Thoughtfully Curated</span>
                    <span className="hidden text-[#b9a27b] sm:block">✦</span>
                    <span>Quality First</span>
                    <span className="hidden text-[#b9a27b] sm:block">✦</span>
                    <span>Everyday Essentials</span>
                    <span className="hidden text-[#b9a27b] sm:block">✦</span>
                    <span>Made for You</span>
                </div>
            </section>

            {/* CATEGORIES */}

            <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

                <div className="mb-10 flex flex-wrap items-end justify-between gap-5">

                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a18a65]">
                            EXPLORE OUR WORLD
                        </p>

                        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
                            Shop by category
                        </h2>
                    </div>

                    <Link
                        to="/product"
                        className="group flex items-center gap-2 border-b border-[#b9a27b] pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555248]"
                    >
                        All Categories
                        <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                    </Link>

                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">

                    {categories.map((category, index) => (

                        <Link
                            key={category.name}
                            to={`/product?category=${encodeURIComponent(category.name)}`}
                            className="group"
                        >

                            <div className="aspect-[4/5] overflow-hidden bg-[#eeece5]">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex items-center justify-between border-b border-[#e2ded5] py-4">
                                <h3 className="text-xs font-medium tracking-wide text-[#39372f]">
                                    {category.name}
                                </h3>

                                <ArrowUpRight
                                    size={15}
                                    className="text-[#a18a65] transition group-hover:-translate-y-1 group-hover:translate-x-1"
                                />
                            </div>

                        </Link>

                    ))}

                </div>

            </section>

            {/* FEATURED PRODUCTS */}

            <section className="bg-[#f0eee8] py-20 lg:py-28">

                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">

                    <div className="mb-12 flex flex-wrap items-end justify-between gap-5">

                        <div>
                            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a18a65]">
                                THE SELECTION
                            </p>

                            <h2 className="font-serif text-4xl sm:text-5xl">
                                Pieces worth discovering.
                            </h2>

                            <p className="mt-4 max-w-md text-sm leading-7 text-[#77746b]">
                                A considered collection of favourites, chosen
                                to bring a little more meaning to everyday life.
                            </p>
                        </div>

                        <Link
                            to="/product"
                            className="group flex items-center gap-2 border-b border-[#b9a27b] pb-2 text-[10px] font-semibold uppercase tracking-[0.15em]"
                        >
                            View All Products
                            <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                        </Link>

                    </div>

                    <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">

                        {products.map((product) => (

                            <div key={product.id} className="group">

                                {/* Product image */}

                                <div className="relative aspect-[4/5] overflow-hidden bg-[#e7e4dc]">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                    />

                                    <span className="absolute left-4 top-4 bg-[#f8f7f3] px-3 py-2 text-[9px] font-medium tracking-[0.15em] text-[#77705f]">
                                        {product.tag}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => toggleWishlist(product.id)}
                                        aria-label="Toggle wishlist"
                                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f7f3]/90 text-[#292820] transition hover:bg-[#292820] hover:text-white"
                                    >
                                        <Heart
                                            size={17}
                                            fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                                        />
                                    </button>

                                    <Link
                                        to="/product"
                                        className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-[#f8f7f3] py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#292820] opacity-0 transition duration-300 hover:bg-[#292820] hover:text-white group-hover:opacity-100"
                                    >
                                        Explore Product
                                        <ArrowUpRight size={15} />
                                    </Link>

                                </div>

                                {/* Product details */}

                                <div className="pt-5">

                                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#a18a65]">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-2 font-serif text-lg text-[#292820]">
                                        {product.name}
                                    </h3>

                                    <div className="mt-3 flex items-center justify-between">

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </span>

                                            <span className="text-xs text-[#a5a196] line-through">
                                                ₹{product.oldPrice.toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1 text-[#a18a65]">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-[10px] text-[#77746b]">
                                                {product.rating}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* EDITORIAL CAMPAIGN */}

            <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

                <div className="grid overflow-hidden bg-[#e7e2d7] lg:grid-cols-2">

                    <div className="relative min-h-[380px] lg:min-h-[570px]">

                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200"
                            alt="Minimal fashion collection"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                    </div>

                    <div className="flex flex-col justify-center px-8 py-14 sm:px-14 lg:px-16 lg:py-20">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a18a65]">
                            A NOTE ON STYLE
                        </p>

                        <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                            Make room for
                            <span className="block italic text-[#a18a65]">
                                what matters.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-8 text-[#77746b]">
                            We believe the best things are not always the
                            loudest. Discover thoughtfully selected pieces
                            that bring simplicity, character and quality
                            into your everyday.
                        </p>

                        <Link
                            to="/product"
                            className="group mt-9 flex w-fit items-center gap-4 border-b border-[#a18a65] pb-3 text-[10px] font-semibold uppercase tracking-[0.15em]"
                        >
                            Discover More
                            <ArrowRight size={16} className="transition group-hover:translate-x-2" />
                        </Link>

                    </div>

                </div>

            </section>

            {/* WHY SHOPESTOO */}

            <section className="border-y border-[#e5e1d8] bg-[#f1efe9] py-20 lg:py-24">

                <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">

                    <div className="mb-14 text-center">

                        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a18a65]">
                            THE SHOPESTOO PROMISE
                        </p>

                        <h2 className="font-serif text-4xl sm:text-5xl">
                            Shopping, made thoughtful.
                        </h2>

                    </div>

                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                        {[
                            {
                                icon: Truck,
                                title: "Reliable Delivery",
                                desc: "Your favourites, delivered right to your doorstep.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Secure Shopping",
                                desc: "A shopping experience designed around your confidence.",
                            },
                            {
                                icon: Package,
                                title: "Curated Quality",
                                desc: "Discover products selected with care and consideration.",
                            },
                            {
                                icon: Headphones,
                                title: "Here to Help",
                                desc: "Friendly support whenever you need a hand.",
                            },
                        ].map((item, index) => (

                            <div key={index} className="text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d6cbb7] text-[#a18a65]">
                                    <item.icon size={23} strokeWidth={1.4} />
                                </div>

                                <h3 className="mt-6 font-serif text-xl">
                                    {item.title}
                                </h3>

                                <p className="mx-auto mt-3 max-w-[230px] text-xs leading-7 text-[#858176]">
                                    {item.desc}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* CUSTOMER REVIEWS */}

            <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">

                <div className="mb-12 text-center">

                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a18a65]">
                        KIND WORDS
                    </p>

                    <h2 className="font-serif text-4xl sm:text-5xl">
                        The experience speaks.
                    </h2>

                </div>

                <div className="grid gap-5 md:grid-cols-3">

                    {testimonials.map((review, index) => (

                        <div
                            key={index}
                            className="border border-[#e5e1d8] bg-[#fbfaf7] p-8 transition duration-300 hover:border-[#b9a27b]"
                        >

                            <div className="flex gap-1 text-[#b9a27b]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={13}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>

                            <p className="mt-7 min-h-[90px] font-serif text-lg leading-8 text-[#454238]">
                                "{review.review}"
                            </p>

                            <div className="mt-7 flex items-center gap-3 border-t border-[#e5e1d8] pt-5">

                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="h-11 w-11 rounded-full object-cover"
                                />

                                <div>
                                    <h3 className="text-xs font-semibold">
                                        {review.name}
                                    </h3>

                                    <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#a18a65]">
                                        Verified Customer
                                    </p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* FINAL CTA */}

            <section className="px-5 pb-20 sm:px-8 lg:px-14 lg:pb-28">

                <div className="mx-auto max-w-[1500px] bg-[#292820] px-7 py-16 text-center text-[#f8f7f3] sm:px-14 sm:py-20">

                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5ae85]">
                        YOUR NEXT FAVOURITE AWAITS
                    </p>

                    <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
                        Discover a more considered way to shop.
                    </h2>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#c3c0b5]">
                        Explore the collection and find something that feels
                        just right.
                    </p>

                    <Link
                        to="/product"
                        className="group mx-auto mt-9 flex w-fit items-center gap-4 bg-[#f8f7f3] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#292820] transition hover:bg-[#c5ae85]"
                    >
                        Explore Shopestoo
                        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </Link>

                </div>

            </section>

            {/* FOOTER */}

            <footer className="border-t border-[#e5e1d8] bg-[#f1efe9]">

                <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-14">

                    {/* Brand */}

                    <div>

                        <Link to="/" className="font-serif text-3xl tracking-tight">
                            Shopes<span className="italic text-[#a18a65]">too.</span>
                        </Link>

                        <p className="mt-5 max-w-xs text-xs leading-7 text-[#858176]">
                            A thoughtful destination for everyday essentials.
                            Discover products that bring quality and simplicity
                            into your life.
                        </p>

                    </div>

                    {/* Quick links */}

                    <div>
                        <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em]">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-4 text-xs text-[#77746b]">
                            <Link to="/" className="transition hover:text-[#a18a65]">Home</Link>
                            <Link to="/product" className="transition hover:text-[#a18a65]">All Products</Link>
                            <Link to="/about" className="transition hover:text-[#a18a65]">Our Story</Link>
                            <Link to="/contact" className="transition hover:text-[#a18a65]">Contact</Link>
                        </div>
                    </div>

                    {/* Customer care */}

                    <div>
                        <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em]">
                            Customer Care
                        </h3>

                        <div className="flex flex-col gap-4 text-xs text-[#77746b]">
                            <Link to="/contact" className="transition hover:text-[#a18a65]">Help Center</Link>
                            <Link to="/contact" className="transition hover:text-[#a18a65]">Returns & Refunds</Link>
                            <Link to="/contact" className="transition hover:text-[#a18a65]">Shipping Information</Link>
                            <Link to="/contact" className="transition hover:text-[#a18a65]">Track Order</Link>
                        </div>
                    </div>

                    {/* Contact */}

                    <div>
                        <h3 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em]">
                            Get in Touch
                        </h3>

                        <div className="flex flex-col gap-4 text-xs text-[#77746b]">
                            <p>support@shopestoo.com</p>
                            <p>Customer Support</p>
                            <p>Shopestoo Online Store</p>
                        </div>
                    </div>

                </div>

                {/* Copyright */}

                <div className="border-t border-[#dedacf]">

                    <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 px-5 py-6 text-[10px] text-[#858176] sm:px-8 md:flex-row lg:px-14">

                        <p>
                            © 2026 Shopestoo. All rights reserved.
                        </p>

                        <div className="flex gap-6">
                            <Link to="/about" className="hover:text-[#a18a65]">Privacy Policy</Link>
                            <Link to="/about" className="hover:text-[#a18a65]">Terms & Conditions</Link>
                        </div>

                    </div>

                </div>

            </footer>

        </main>
    );
};

export default Home;
