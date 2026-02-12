"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, Menu, X, Search, ChevronDown, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Navbar() {
    const { cartCount, wishlistItems } = useStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const categories = [
        { name: "Jamdani", href: "/shop?category=jamdani", icon: "✨" },
        { name: "Muslin", href: "/shop?category=muslin", icon: "🌬️" },
        { name: "Silk", href: "/shop?category=silk", icon: "🧣" },
        { name: "Kantha", href: "/shop?category=kantha", icon: "🧵" },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/shop", hasDropdown: true, icon: <LayoutGrid size={16} className="text-heritage-gold group-hover:scale-110 transition-transform" /> },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 min-h-[70px] md:min-h-[90px] flex items-center",
                isScrolled ? "bg-white shadow-xl py-2 md:py-3 border-b border-heritage-gold/10" : "bg-white/80 backdrop-blur-sm py-4 md:py-6"
            )}
        >
            <div className="max-w-[1600px] mx-auto px-4 md:px-10">
                <div className="flex items-center justify-between relative">

                    {/* Desktop: Left Links */}
                    <div className="hidden lg:flex items-center space-x-8 xl:space-x-12 flex-1 basis-0">
                        {navLinks.slice(0, 4).map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                                ref={link.hasDropdown ? dropdownRef : null}
                            >
                                {link.hasDropdown ? (
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                        className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-emerald-royal hover:text-heritage-gold transition-colors"
                                    >
                                        {link.icon && link.icon}
                                        {link.name}
                                        <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-xs uppercase tracking-[0.2em] font-medium text-emerald-royal hover:text-heritage-gold transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                                <div className={cn(
                                    "absolute -bottom-1 left-0 h-px bg-heritage-gold transition-all duration-500",
                                    (activeDropdown === link.name) ? "w-full" : "w-0 group-hover:w-full"
                                )}></div>

                                {link.hasDropdown && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-4 w-[600px] bg-white shadow-2xl border-t-2 border-heritage-gold p-8 grid grid-cols-2 gap-10"
                                    >
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest font-bold text-heritage-gold mb-6 border-b border-heritage-gold/10 pb-2">Royal Collections</h4>
                                            <ul className="space-y-4">
                                                {categories.map((cat) => (
                                                    <li key={cat.name}>
                                                        <Link
                                                            href={cat.href}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="text-sm text-emerald-royal/70 hover:text-heritage-gold transition-colors font-medium flex items-center group/item"
                                                        >
                                                            <span className="mr-3 text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">{cat.icon}</span>
                                                            {cat.name}
                                                            <div className="ml-auto w-0 h-px bg-heritage-gold group-hover/item:w-8 transition-all"></div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-emerald-royal/5 p-8 flex flex-col justify-between rounded-xl">
                                            <div>
                                                <p className="font-serif text-xl text-emerald-royal mb-2 italic">The Royal Selection</p>
                                                <p className="text-xs text-emerald-royal/50 leading-relaxed font-light">Explore the legendary looms of Bengal. Each piece is a testament to hundred-year-old heritage.</p>
                                            </div>
                                            <Link
                                                href="/shop"
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-[10px] uppercase tracking-[0.3em] font-bold text-white bg-emerald-royal px-6 py-3 text-center hover:bg-heritage-gold transition-all gold-gradient-bg"
                                            >
                                                View The Full Palace
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Burger Menu Left */}
                    <div className="lg:hidden flex-1 basis-0 flex justify-start">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="text-emerald-royal p-2 hover:text-heritage-gold transition-colors active:scale-90"
                            aria-label="Open Mobile Menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex justify-center flex-shrink-0 mx-4 md:mx-8">
                        <Link href="/" className="relative h-[45px] w-[140px] md:h-[65px] md:w-[190px] transition-transform duration-500 hover:scale-105">
                            <Image
                                src="/img/logo.png"
                                alt="Lily Crown"
                                fill
                                priority
                                sizes="(max-width: 768px) 140px, 190px"
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Right: Icons & Links */}
                    <div className="flex items-center justify-end space-x-2 md:space-x-6 flex-1 basis-0">
                        <div className="hidden lg:flex items-center space-x-8 xl:space-x-12 mr-4">
                            {navLinks.slice(4).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xs uppercase tracking-[0.2em] font-medium text-emerald-royal hover:text-heritage-gold transition-colors relative group"
                                >
                                    {link.name}
                                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-heritage-gold transition-all duration-500 group-hover:w-full"></div>
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar - Hidden on Mobile Header, moved to side menu */}
                        <div className="hidden lg:relative lg:block">
                            {isSearchOpen ? (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "200px", opacity: 1 }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white flex items-center border-b border-heritage-gold"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full text-xs p-2 outline-none text-emerald-royal bg-transparent placeholder:text-emerald-royal/30"
                                        autoFocus
                                    />
                                    <button onClick={() => setIsSearchOpen(false)} className="p-2 text-emerald-royal hover:text-red-500">
                                        <X size={14} />
                                    </button>
                                </motion.div>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-emerald-royal hover:text-heritage-gold transition-transform hover:scale-110 p-2"
                                    aria-label="Open Search"
                                    aria-expanded={isSearchOpen}
                                >
                                    <Search size={20} />
                                </button>
                            )}
                        </div>

                        {/* Auth Buttons (Desktop) */}
                        <div className="hidden lg:flex items-center space-x-3 ml-2 border-l border-emerald-royal/10 pl-4">
                            <Link href="/login" className="text-xs font-medium text-emerald-royal hover:text-heritage-gold transition-colors">
                                Login
                            </Link>
                            <span className="text-xs text-emerald-royal/30">|</span>
                            <Link href="/register" className="text-xs font-medium text-emerald-royal hover:text-heritage-gold transition-colors">
                                Register
                            </Link>
                        </div>

                        <Link
                            href="/wishlist"
                            className="hidden lg:inline-block relative group p-2 hover:text-heritage-gold transition-transform hover:scale-110"
                            aria-label={`View Wishlist (${wishlistItems.size} items)`}
                        >
                            <Heart size={20} className={wishlistItems.size > 0 ? "fill-deep-maroon text-deep-maroon" : "text-emerald-royal"} />
                            {wishlistItems.size > 0 && (
                                <span className="absolute -top-1 -right-1 bg-deep-maroon text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-bold">
                                    {wishlistItems.size}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/cart"
                            className="flex items-center space-x-2 group bg-emerald-royal text-white px-3 py-2 md:px-5 md:py-2.5 rounded-none hover:bg-heritage-gold transition-all duration-500 shadow-md gold-gradient-bg active:scale-95"
                            aria-label={`View Shopping Bag (${cartCount} items)`}
                        >
                            <ShoppingBag size={18} />
                            <span className="text-[10px] uppercase tracking-[0.1em] font-bold hidden sm:inline">Bag</span>
                            <span className="bg-white text-emerald-royal text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                                {cartCount}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-emerald-royal/20 backdrop-blur-md z-[110]"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            style={{ height: "100vh" }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[120] shadow-2xl p-6 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Image src="/img/logo.png" alt="Logo" width={140} height={55} className="object-contain" />
                                </Link>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-emerald-royal p-1 border border-emerald-royal/10 rounded-full bg-emerald-royal/5">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-10">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-royal/30 group-focus-within:text-heritage-gold transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search monarch treasures..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-muslin-cream/50 border border-emerald-royal/5 rounded-xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-heritage-gold/30 focus:bg-white transition-all transition-hover"
                                    />
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        {link.hasDropdown ? (
                                            <button
                                                onClick={() => setMobileCategoriesOpen(true)}
                                                className="w-full flex items-center justify-between py-5 text-xl font-serif text-emerald-royal border-b border-emerald-royal/5 group active:bg-emerald-royal/5 px-2 transition-colors rounded-lg"
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown size={20} className="-rotate-90 text-heritage-gold group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-5 text-xl font-serif text-emerald-royal border-b border-emerald-royal/5 active:bg-emerald-royal/5 px-2 transition-colors rounded-lg"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}

                                <Link
                                    href="/wishlist"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-5 text-xl font-serif text-emerald-royal border-b border-emerald-royal/5 active:bg-emerald-royal/5 px-2 transition-colors rounded-lg group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Heart size={20} className={wishlistItems.size > 0 ? "fill-deep-maroon text-deep-maroon" : "text-emerald-royal"} />
                                        <span>My Wishlist</span>
                                        {wishlistItems.size > 0 && (
                                            <span className="bg-deep-maroon text-white text-[10px] px-2 py-0.5 rounded-full">{wishlistItems.size}</span>
                                        )}
                                    </div>
                                    <ChevronDown size={20} className="-rotate-90 text-heritage-gold/30 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <div className="pt-10 mt-6 grid grid-cols-2 gap-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-center py-3 border border-emerald-royal text-emerald-royal text-xs uppercase font-bold tracking-widest hover:bg-emerald-royal hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-center py-3 bg-emerald-royal text-white text-xs uppercase font-bold tracking-widest hover:bg-emerald-royal/90 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>

                                <div className="mt-12 text-center">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-royal/40 mb-2">Connect With Us</p>
                                    <p className="text-xs text-emerald-royal font-serif">+880 1234 567890</p>
                                </div>
                            </nav>

                            {/* Nested Category Modal for Mobile */}
                            <AnimatePresence>
                                {mobileCategoriesOpen && (
                                    <motion.div
                                        initial={{ x: "100%" }}
                                        animate={{ x: 0 }}
                                        exit={{ x: "100%" }}
                                        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                                        className="absolute inset-0 bg-white z-[130] p-6 flex flex-col"
                                    >
                                        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-emerald-royal/5">
                                            <button
                                                onClick={() => setMobileCategoriesOpen(false)}
                                                className="p-2 -ml-2 text-emerald-royal hover:text-heritage-gold transition-colors"
                                            >
                                                <X size={24} className="rotate-0 transition-transform" />
                                            </button>
                                            <h2 className="text-2xl font-serif text-emerald-royal">Our Collections</h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-10">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.name}
                                                    href={cat.href}
                                                    onClick={() => {
                                                        setMobileCategoriesOpen(false);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className="group relative h-32 overflow-hidden rounded-xl bg-muslin-cream shadow-sm"
                                                >
                                                    <div className="absolute inset-0 flex items-center justify-between p-6 z-10">
                                                        <div className="space-y-1">
                                                            <span className="text-2xl">{cat.icon}</span>
                                                            <h3 className="text-lg font-serif text-emerald-royal group-hover:text-heritage-gold transition-colors">{cat.name}</h3>
                                                            <p className="text-[10px] uppercase tracking-widest text-emerald-royal/50">Explore Heritage</p>
                                                        </div>
                                                        <ChevronDown size={20} className="-rotate-90 text-heritage-gold/30 group-hover:text-heritage-gold transition-colors" />
                                                    </div>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                                </Link>
                                            ))}

                                            <Link
                                                href="/shop"
                                                onClick={() => {
                                                    setMobileCategoriesOpen(false);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="mt-4 flex items-center justify-center py-4 border-2 border-heritage-gold/20 text-heritage-gold text-xs uppercase font-bold tracking-[0.2em] hover:bg-heritage-gold hover:text-white transition-all rounded-xl"
                                            >
                                                View All Monarch Collections
                                            </Link>
                                        </div>

                                        <div className="mt-auto p-6 bg-emerald-royal/5 rounded-2xl">
                                            <p className="text-xs text-emerald-royal/60 italic text-center">"Crafting legacies for the modern Nawabi spirit."</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
