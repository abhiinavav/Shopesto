
import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowUpRight,
    ArrowRight,
    Truck,
    ShieldCheck,
    Headphones,
    Star,
    ShoppingBag,
    Sparkles
} from "lucide-react";

const categories = [
    {
        name: "Electronics",
        subtitle: "Technology that inspires",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700"
    },
    {
        name: "Fashion",
        subtitle: "Your style, your story",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700"
    },
    {
        name: "Lifestyle",
        subtitle: "Make everyday special",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=700"
    },
    {
        name: "Accessories",
        subtitle: "Details make the difference",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
    }
];

const products = [
    {
        name: "Studio Headphones",
        category: "Electronics",
        price: "₹2,499",
        oldPrice: "₹3,499",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
        tag: "BESTSELLER"
    },
    {
        name: "Everyday Sneakers",
        category: "Fashion",
        price: "₹1,899",
        oldPrice: "₹2,599",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        tag: "TRENDING"
    },
    {
        name: "Classic Timepiece",
        category: "Accessories",
        price: "₹3,299",
        oldPrice: "₹4,499",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
        tag: "POPULAR"
    },
    {
        name: "Minimal Backpack",
        category: "Lifestyle",
        price: "₹1,599",
        oldPrice: "₹2,199",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
        tag: "NEW ARRIVAL"
    }
];

const Home = () => {
    return (
        <main className="bg-[#faf9f6] text-[#20201e]">

            {/* HERO SECTION */}

            <section className="px-5 pt-8 pb-12 sm:px-8 lg:px-12 lg:pt-12">

                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#20201e]">

                    <div className="grid min-h-[560px] items-center md:grid-cols-2">

                        <div className="relative z-10 px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">

                            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-widest text-orange-300">
                                <Sparkles size={15} />
                                THE NEW WAY TO SHOP
                            </div>

                            <h1 className="max-w-xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                                Find your
                                <br />
                                next
                                <span className="text-orange-500"> favourite.</span>
                            </h1>

                            <p className="mt-7 max-w-md text-base leading-8 text-gray-400">
                                Discover thoughtfully selected products,
                                everyday essentials and little things
                                that make life better.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-4">

                                <Link
                                    to="/product"
                                    className="group flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
                                >
                                    Explore Collection
                                    <ArrowUpRight
                                        size={18}
                                        className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </Link>

                                <Link
                                    to="/about"
                                    className="rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Our Story
                                </Link>

                            </div>

                            <div className="mt-14 flex gap-10 border-t border-white/10 pt-7">

                                <div>
                                    <h3 className="text-2xl font-bold">Quality</h3>
                                    <p className="mt-1 text-xs text-gray-400">First, always.</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">Style</h3>
                                    <p className="mt-1 text-xs text-gray-400">Without limits.</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">Value</h3>
                                    <p className="mt-1 text-xs text-gray-400">Every purchase.</p>
                                </div>

                            </div>

                        </div>

                        <div className="relative min-h-[350px] md:h-full">

                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
                                alt="Modern shopping lifestyle"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-[#20201e] via-transparent to-transparent md:bg-gradient-to-l" />

                            <div className="absolute bottom-8 right-8 rounded-2xl border border-white/20 bg-black/30 p-5 text-white backdrop-blur-xl">
                                <p className="text-xs tracking-widest text-orange-300">
                                    SHOP DIFFERENT
                                </p>
                                <p className="mt-2 text-lg font-bold">
                                    Love what you find.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


            {/* BENEFITS */}

            <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-12 sm:grid-cols-3 sm:px-8 lg:px-12">

                {[
                    {
                        icon: Truck,
                        title: "Reliable Delivery",
                        desc: "Your favourites, delivered to you."
                    },
                    {
                        icon: ShieldCheck,
                        title: "Secure Shopping",
                        desc: "Shop with confidence every time."
                    },
                    {
                        icon: Headphones,
                        title: "Customer Support",
                        desc: "We're here whenever you need us."
                    }
                ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 border-b border-gray-200 pb-5 sm:border-b-0 sm:border-r sm:pb-0">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                            <item.icon size={23} />
                        </div>
                        <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                        </div>
                    </div>
                ))}

            </section>


            {/* CATEGORIES */}

            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">

                <div className="mb-10 flex flex-wrap items-end justify-between gap-5">

                    <div>
                        <p className="mb-3 text-xs font-bold tracking-[0.25em] text-orange-500">
                            EXPLORE YOUR STYLE
                        </p>
                        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                            Shop by category.
                        </h2>
                    </div>

                    <Link to="/product" className="flex items-center gap-2 text-sm font-bold transition hover:text-orange-500">
                        All categories <ArrowUpRight size={17} />
                    </Link>

                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {categories.map((category, index) => (

                        <Link
                            to="/product"
                            key={index}
                            className="group relative h-[330px] overflow-hidden rounded-3xl bg-gray-200"
                        >

                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                            <div className="absolute bottom-0 left-0 w-full p-6 text-white">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <h3 className="text-2xl font-bold">
                                            {category.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-300">
                                            {category.subtitle}
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-orange-500 group-hover:border-orange-500">
                                        <ArrowUpRight size={20} />
                                    </div>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>


            {/* FEATURED PRODUCTS */}

            <section className="bg-[#f0eee9] py-20">

                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

                    <div className="mb-12 flex flex-wrap items-end justify-between gap-5">

                        <div>
                            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-orange-500">
                                HANDPICKED FOR YOU
                            </p>
                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                                The good stuff.
                            </h2>
                            <p className="mt-3 text-sm text-gray-500">
                                Products worth making room for.
                            </p>
                        </div>

                        <Link
                            to="/product"
                            className="flex items-center gap-2 rounded-full bg-[#20201e] px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
                        >
                            View all products <ArrowRight size={17} />
                        </Link>

                    </div>


                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {products.map((product, index) => (

                            <div
                                key={index}
                                className="group overflow-hidden rounded-3xl bg-white"
                            >

                                <div className="relative h-[280px] overflow-hidden bg-gray-100">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />

                                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 text-[10px] font-black tracking-wider text-orange-600">
                                        {product.tag}
                                    </span>

                                    <Link
                                        to="/product"
                                        aria-label={`Explore ${product.name}`}
                                        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition hover:bg-orange-500 hover:text-white"
                                    >
                                        <ShoppingBag size={19} />
                                    </Link>

                                </div>

                                <div className="p-5">

                                    <p className="text-xs font-medium text-gray-400">
                                        {product.category}
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold">
                                        {product.name}
                                    </h3>

                                    <div className="mt-4 flex items-center justify-between">

                                        <div className="flex items-center gap-2">
                                            <span className="font-black">
                                                {product.price}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                {product.oldPrice}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-orange-500">
                                            <Star size={13} fill="currentColor" />
                                            <span className="font-bold">Featured</span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* PROMO SECTION */}

            <section className="px-5 py-20 sm:px-8 lg:px-12">

                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-orange-500">

                    <div className="grid items-center md:grid-cols-2">

                        <div className="relative z-10 px-8 py-14 text-white sm:px-14 lg:py-20">

                            <p className="mb-5 text-xs font-black tracking-[0.25em] text-orange-100">
                                A LITTLE SOMETHING SPECIAL
                            </p>

                            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                                Great finds.
                                <br />
                                Better prices.
                            </h2>

                            <p className="mt-5 max-w-sm text-sm leading-7 text-orange-50">
                                Your next favourite product might be
                                closer than you think. Explore our
                                collection and find something special.
                            </p>

                            <Link
                                to="/product"
                                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-900 transition hover:bg-gray-100"
                            >
                                Start Shopping <ArrowUpRight size={18} />
                            </Link>

                        </div>

                        <div className="relative h-[300px] md:h-full">

                            <img
                                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000"
                                alt="Shopping collection"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/60 to-transparent" />

                        </div>

                    </div>

                </div>

            </section>


            {/* NEWSLETTER */}

            <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">

                <div className="rounded-3xl bg-[#20201e] px-7 py-14 text-center text-white sm:px-14">

                    <Sparkles className="mx-auto mb-5 text-orange-500" size={30} />

                    <h2 className="text-3xl font-black sm:text-4xl">
                        Good things are coming.
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400">
                        Stay in the loop with new arrivals, exciting
                        collections and special offers from Shopestoo.
                    </p>

                    <Link
                        to="/product"
                        className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
                    >
                        Discover Shopestoo <ArrowUpRight size={18} />
                    </Link>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="border-t border-gray-200 bg-[#faf9f6]">

                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center lg:px-12">

                    <Link to="/" className="text-2xl font-black tracking-tight">
                        Shopes<span className="text-orange-500">too.</span>
                    </Link>

                    <p className="text-sm text-gray-500">
                        © 2026 Shopestoo. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm font-semibold text-gray-500">
                        <Link to="/about" className="hover:text-orange-500">About</Link>
                        <Link to="/contact" className="hover:text-orange-500">Contact</Link>
                        <Link to="/product" className="hover:text-orange-500">Shop</Link>
                    </div>

                </div>

            </footer>

        </main>
    );
};

export default Home;
