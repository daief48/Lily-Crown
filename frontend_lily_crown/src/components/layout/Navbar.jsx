"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, ShoppingBag, Menu, X, Search, ChevronDown, LayoutGrid, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RoyalImage } from "@/components/ui/RoyalImage";
import { getOptimizedImage } from "@/lib/utils";
import { api } from "@/lib/api";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Navbar() {
    const { cartCount, wishlistItems } = useStore();
    const { user, logout } = useAuth();
    const { t, lang, toggleLang } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
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

    // Live Search Logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            try {
                const results = await api.searchProducts(searchQuery);
                setSearchResults(results || []);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsSearching(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const [categories, setCategories] = useState([]);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await api.getCategories();
                if (data) {
                    setCategories(data.map(cat => ({
                        name: cat.name,
                        href: `/shop?category=${cat.slug}`,
                        icon: cat.icon,
                        image: cat.image
                    })));
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const loadSettings = async () => {
            try {
                const data = await api.getSettings();
                if (data) {
                    setSettings(data);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };

        loadCategories();
        loadSettings();
    }, []);

    // Helper to render Lucide icon
    const renderIcon = (iconName, size = 16) => {
        if (!iconName) return null;
        if (React.isValidElement(iconName)) return iconName;

        const icons = { LayoutGrid, ShoppingBag, Heart, Search, User, Menu };
        const IconComponent = icons[iconName];
        if (IconComponent) {
            return <IconComponent size={size} className="text-heritage-gold group-hover:scale-110 transition-transform" />;
        }
        return <span className="text-heritage-gold group-hover:scale-110 transition-transform text-xs font-bold">{iconName}</span>;
    };

    const navLinks = [
        { name: t("nav_home"), href: "/" },
        {
            name: t("nav_shop"),
            href: "/shop",
            hasDropdown: true,
            icon: renderIcon(settings.navbar_shop_icon || "LayoutGrid")
        },
    ];

    const LangToggle = ({ className = "" }) => (
        <button
            onClick={toggleLang}
            className={`flex items-center gap-1 border border-emerald-royal/20 rounded-full px-2.5 py-1 text-xs uppercase tracking-widest font-bold hover:border-heritage-gold hover:text-heritage-gold transition-all duration-300 ${className}`}
            aria-label="Toggle language"
        >
            <span className={lang === "en" ? "text-heritage-gold" : "text-emerald-royal/40"}>EN</span>
            <span className="text-emerald-royal/20">|</span>
            <span className={lang === "bn" ? "text-heritage-gold" : "text-emerald-royal/40"}>বাং</span>
        </button>
    );

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white shadow-lg lg:py-5 py-3 border-b border-heritage-gold/10"
                    : "bg-white lg:py-5 py-4"
            )}
        >
            <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
                <div className="flex items-center justify-between gap-2 md:gap-3 lg:gap-4 relative">

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="text-emerald-royal p-2 hover:text-heritage-gold transition-colors"
                            aria-label="Open Mobile Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Desktop Navigation - Left */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group" ref={link.hasDropdown ? dropdownRef : null}>
                                {link.hasDropdown ? (
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                        className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] font-medium text-emerald-royal hover:text-heritage-gold transition-all"
                                    >
                                        {link.icon}
                                        {link.name}
                                        <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.name && "rotate-180")} />
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-xs uppercase tracking-[0.08em] font-medium text-emerald-royal hover:text-heritage-gold transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                                <div className={cn(
                                    "absolute bottom-0 left-0 h-px bg-heritage-gold transition-all",
                                    activeDropdown === link.name ? "w-full" : "w-0 group-hover:w-full"
                                )}></div>

                                <AnimatePresence>
                                    {link.hasDropdown && activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 mt-4 w-[650px] bg-white shadow-2xl border-t-2 border-heritage-gold p-8 grid grid-cols-5 gap-8 z-[100]"
                                        >
                                            <div className="col-span-3">
                                                <h4 className="text-xs uppercase tracking-widest font-bold text-heritage-gold mb-6 border-b border-heritage-gold/10 pb-2">
                                                    {t("nav_royal_collections")}
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {categories.length > 0 ? (
                                                        categories.map((cat) => (
                                                            <Link
                                                                key={cat.name}
                                                                href={cat.href}
                                                                onClick={() => setActiveDropdown(null)}
                                                                className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-royal/5 transition-colors border border-transparent hover:border-heritage-gold/20"
                                                            >
                                                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muslin-cream flex-shrink-0 shadow-sm">
                                                                    <RoyalImage
                                                                        src={getOptimizedImage(cat.image || cat.icon || '/img/placeholder.png')}
                                                                        alt={cat.name}
                                                                        fill
                                                                        className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                                                    />
                                                                </div>
                                                                <span className="text-sm font-medium text-emerald-royal group-hover/item:text-heritage-gold transition-colors">
                                                                    {cat.name}
                                                                </span>
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        [1, 2, 3, 4].map((i) => (
                                                            <div key={i} className="flex gap-3 items-center p-2">
                                                                <div className="w-12 h-12 bg-emerald-royal/5 rounded-md animate-pulse"></div>
                                                                <div className="h-4 w-24 bg-emerald-royal/5 rounded animate-pulse"></div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-span-2 bg-emerald-royal/5 p-6 flex flex-col justify-between rounded-xl border border-emerald-royal/10">
                                                <div>
                                                    <p className="font-serif text-lg text-emerald-royal mb-3 italic">{t("nav_royal_selection_title")}</p>
                                                    <p className="text-xs text-emerald-royal/60 leading-relaxed mb-6">{t("nav_royal_selection_desc")}</p>
                                                </div>
                                                <Link
                                                    href="/shop"
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="text-xs uppercase tracking-[0.15em] font-bold text-white bg-emerald-royal px-6 py-4 text-center hover:bg-heritage-gold transition-all shadow-md hover:shadow-lg w-full rounded"
                                                >
                                                    {t("nav_view_full_palace")}
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Center Logo - Absolute Positioned */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
                        <Link href="/" className="block hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/img/logo.png"
                                alt="Lily Crown Logo"
                                width={210}
                                height={72}
                                priority
                                className="object-contain drop-shadow-[0_0_25px_rgba(153,101,21,0.15)] md:w-[190px] md:h-[65px] lg:w-[220px] lg:h-[75px] w-[160px] h-[55px]"
                            />
                        </Link>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center justify-end gap-1 md:gap-2 lg:gap-2 xl:gap-3">
                        {/* Desktop Search */}
                        <div className="hidden lg:block relative">
                            {isSearchOpen ? (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "160px", opacity: 1 }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white flex items-center border-b border-heritage-gold"
                                >
                                    <input
                                        type="text"
                                        placeholder={t("nav_search_placeholder")}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full text-xs p-2 outline-none text-emerald-royal bg-transparent placeholder:text-emerald-royal/30"
                                        autoFocus
                                    />
                                    <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="p-2 text-emerald-royal hover:text-red-500">
                                        <X size={14} />
                                    </button>

                                    <AnimatePresence>
                                        {(searchQuery && (searchResults.length > 0 || isSearching)) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full right-0 mt-4 w-[340px] bg-white border border-heritage-gold/20 shadow-2xl z-[60] overflow-hidden"
                                            >
                                                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                                    {isSearching ? (
                                                        <div className="p-4 text-center text-xs text-emerald-royal/50 uppercase tracking-widest">
                                                            {t("nav_searching")}
                                                        </div>
                                                    ) : searchResults.length > 0 ? (
                                                        <div className="py-2">
                                                            <div className="px-4 py-2 border-b border-heritage-gold/5">
                                                                <p className="text-xs uppercase tracking-widest font-bold text-heritage-gold">
                                                                    {t("nav_found_treasures")} ({searchResults.length})
                                                                </p>
                                                            </div>
                                                            {searchResults.map((product) => (
                                                                <Link
                                                                    key={product.id}
                                                                    href={`/products/${product.slug || product.id}`}
                                                                    onClick={() => setIsSearchOpen(false)}
                                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-muslin-cream/30 border-b border-heritage-gold/5"
                                                                >
                                                                    <div className="relative h-10 w-10 flex-shrink-0 border border-heritage-gold/10">
                                                                        <RoyalImage
                                                                            src={getOptimizedImage(product.image)}
                                                                            alt={product.name || t('product_name_fallback')}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h5 className="text-xs font-serif text-emerald-royal truncate">{product.name}</h5>
                                                                        <p className="text-xs text-heritage-gold font-bold">৳{product.price}</p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-6 text-center">
                                                            <p className="text-xs text-emerald-royal/50 italic">{t("nav_no_treasures")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {searchResults.length > 0 && (
                                                    <Link
                                                        href={`/shop?search=${searchQuery}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="block py-3 bg-emerald-royal text-white text-center text-xs uppercase tracking-widest font-bold hover:bg-heritage-gold"
                                                    >
                                                        {t("nav_view_all_results")}
                                                    </Link>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-emerald-royal hover:text-heritage-gold transition-transform hover:scale-110 p-2"
                                    aria-label="Search"
                                >
                                    <Search size={18} />
                                </button>
                            )}
                        </div>

                        {/* User Account - Desktop */}
                        <div className="hidden lg:flex items-center gap-2">
                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center gap-1 text-emerald-royal hover:text-heritage-gold transition-all py-2">
                                        <div className="p-1 border border-emerald-royal/20 rounded-full">
                                            <User size={14} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest max-w-[90px] truncate">
                                            {user.name}
                                        </span>
                                        <ChevronDown size={10} className="text-emerald-royal/50 group-hover:rotate-180 transition-transform" />
                                    </button>

                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-heritage-gold/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all origin-top-right z-50">
                                        <div className="p-4 border-b border-heritage-gold/10 bg-muslin-cream/30">
                                            <p className="text-xs text-emerald-royal/50 uppercase tracking-widest font-bold mb-1">{t("nav_signed_in_as")}</p>
                                            <p className="text-sm font-serif text-emerald-royal truncate">{user.name}</p>
                                        </div>
                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-emerald-royal hover:bg-emerald-royal/5 hover:text-heritage-gold font-bold"
                                            >
                                                <User size={14} />
                                                {t("nav_my_profile")}
                                            </Link>
                                            <Link
                                                href="/orders"
                                                className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-emerald-royal hover:bg-emerald-royal/5 hover:text-heritage-gold font-bold"
                                            >
                                                <ShoppingBag size={14} />
                                                {t("nav_my_orders")}
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 font-bold"
                                            >
                                                <LogOut size={14} />
                                                {t("nav_logout")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login" className="text-xs uppercase tracking-[0.08em] font-bold text-emerald-royal hover:text-heritage-gold">
                                        {t("nav_sign_in")}
                                    </Link>
                                    <span className="text-xs text-emerald-royal/20">|</span>
                                    <Link href="/register" className="text-xs uppercase tracking-[0.08em] font-bold text-emerald-royal hover:text-heritage-gold">
                                        {t("nav_join_us")}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Language - Desktop */}
                        <div className="hidden xl:block">
                            <LangToggle />
                        </div>

                        {/* Wishlist - Secondary Action */}
                        <Link
                            href="/wishlist"
                            className="hidden md:block relative group p-2 text-emerald-royal hover:text-heritage-gold transition-all hover:scale-110"
                            aria-label={`Wishlist (${wishlistItems.length})`}
                        >
                            <Heart size={18} className={wishlistItems.length > 0 ? "fill-deep-maroon text-deep-maroon" : "text-emerald-royal"} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-deep-maroon text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-1.5 bg-emerald-royal text-white px-3 py-2 md:px-4 md:py-2 hover:bg-heritage-gold transition-all shadow-md active:scale-95"
                            aria-label={`Cart (${cartCount})`}
                        >
                            <ShoppingBag size={16} />
                            <span className="text-xs uppercase tracking-[0.08em] font-bold hidden sm:inline">{t("nav_bag")}</span>
                            <span className="bg-white text-emerald-royal text-[7px] font-bold px-1.5 rounded-full min-w-[18px] text-center">
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
                            className="fixed inset-0 bg-emerald-royal/20 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 w-[85vw] sm:max-w-sm bg-white z-[120] shadow-2xl overflow-y-auto h-screen flex flex-col"
                        >
                            <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b border-emerald-royal/5">
                                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Image src="/img/logo.png" alt="Logo" width={120} height={45} className="object-contain" />
                                </Link>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-emerald-royal p-2 hover:bg-emerald-royal/5 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Mobile Search */}
                            <div className="p-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-royal/30 group-focus-within:text-heritage-gold" size={16} />
                                    <input
                                        type="text"
                                        placeholder={t("nav_search_mobile_placeholder")}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 border border-emerald-royal/10 rounded-lg text-sm text-emerald-royal placeholder:text-emerald-royal/30 focus:outline-none focus:border-heritage-gold"
                                    />
                                </div>

                                {/* Mobile Search Results */}
                                <AnimatePresence>
                                    {searchQuery && (searchResults.length > 0 || isSearching) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 bg-muslin-cream/30 rounded-lg overflow-hidden"
                                        >
                                            <div className="max-h-[250px] overflow-y-auto">
                                                {isSearching ? (
                                                    <div className="p-4 text-center text-xs text-emerald-royal/40">
                                                        {t("nav_searching")}
                                                    </div>
                                                ) : searchResults.length > 0 ? (
                                                    <div className="py-2">
                                                        {searchResults.slice(0, 5).map((product) => (
                                                            <Link
                                                                key={product.id}
                                                                href={`/products/${product.slug || product.id}`}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="flex items-center gap-3 px-3 py-2 border-b border-emerald-royal/5"
                                                            >
                                                                <div className="relative h-10 w-10 flex-shrink-0">
                                                                    <RoyalImage
                                                                        src={getOptimizedImage(product.image)}
                                                                        alt={product.name || "Product"}
                                                                        fill
                                                                        className="object-cover rounded"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h5 className="text-xs font-serif text-emerald-royal truncate">{product.name}</h5>
                                                                    <p className="text-xs text-heritage-gold font-bold">৳{product.price}</p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-4 text-center">
                                                        <p className="text-xs text-emerald-royal/40 italic">{t("nav_no_treasures")}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="px-2 py-2 space-y-1">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        {link.hasDropdown ? (
                                            <button
                                                onClick={() => setMobileCategoriesOpen(true)}
                                                className="w-full flex items-center justify-between py-3 px-2 text-lg font-serif text-emerald-royal border-b border-emerald-royal/5 hover:bg-emerald-royal/5 rounded transition-colors"
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown size={18} className="text-heritage-gold" />
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-3 px-2 text-lg font-serif text-emerald-royal border-b border-emerald-royal/5 hover:bg-emerald-royal/5 rounded transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}

                                <Link
                                    href="/wishlist"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-3 px-2 text-lg font-serif text-emerald-royal border-b border-emerald-royal/5 hover:bg-emerald-royal/5 rounded transition-colors group"
                                >
                                    <div className="flex items-center gap-2">
                                        <Heart size={18} className={wishlistItems.length > 0 ? "fill-deep-maroon text-deep-maroon" : "text-emerald-royal"} />
                                        <span>{t('nav_wishlist')}</span>
                                        {wishlistItems.length > 0 && (
                                            <span className="bg-deep-maroon text-white text-[9px] px-1.5 py-0.5 rounded-full">{wishlistItems.length}</span>
                                        )}
                                    </div>
                                </Link>
                            </nav>

                            {/* Mobile Auth Section */}
                            <div className="p-4 border-t border-emerald-royal/5">
                                {user ? (
                                    <div className="space-y-3">
                                        <p className="text-sm font-serif text-emerald-royal text-center">{t("nav_welcome")}, {user.name}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href="/profile"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="py-2 px-3 bg-emerald-royal/5 text-emerald-royal text-xs uppercase font-bold text-center hover:bg-emerald-royal hover:text-white transition-colors rounded"
                                            >
                                                {t("nav_profile")}
                                            </Link>
                                            <Link
                                                href="/orders"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="py-2 px-3 bg-emerald-royal/5 text-emerald-royal text-xs uppercase font-bold text-center hover:bg-emerald-royal hover:text-white transition-colors rounded"
                                            >
                                                {t("nav_orders")}
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full py-2 px-3 bg-red-50 text-red-600 text-xs uppercase font-bold hover:bg-red-600 hover:text-white transition-colors rounded"
                                        >
                                            {t("nav_logout")}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-2 px-3 border border-emerald-royal text-emerald-royal text-xs uppercase font-bold text-center hover:bg-emerald-royal hover:text-white transition-colors rounded"
                                        >
                                            {t("nav_sign_in")}
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-2 px-3 bg-emerald-royal text-white text-xs uppercase font-bold text-center hover:bg-emerald-royal/90 transition-colors rounded"
                                        >
                                            {t("nav_join_us")}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Language */}
                            <div className="p-4 border-t border-emerald-royal/5">
                                <div className="flex justify-center mb-4">
                                    <LangToggle />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-royal/40 text-center mb-2">{t("nav_connect")}</p>
                                <p className="text-xs text-center text-emerald-royal font-serif">+880 1234 567890</p>
                            </div>

                            {/* Mobile Categories Modal */}
                            <AnimatePresence>
                                {mobileCategoriesOpen && (
                                    <motion.div
                                        initial={{ x: "100%" }}
                                        animate={{ x: 0 }}
                                        exit={{ x: "100%" }}
                                        className="absolute inset-0 bg-white z-[130] flex flex-col"
                                    >
                                        <div className="sticky top-0 bg-white flex items-center gap-3 p-4 border-b border-emerald-royal/5">
                                            <button
                                                onClick={() => setMobileCategoriesOpen(false)}
                                                className="p-2 text-emerald-royal hover:bg-emerald-royal/5 rounded-full"
                                            >
                                                <X size={20} />
                                            </button>
                                            <h2 className="text-xl font-serif text-emerald-royal">{t("nav_our_collections")}</h2>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-4">
                                            <div className="space-y-3">
                                                {categories.map((cat) => (
                                                    <Link
                                                        key={cat.name}
                                                        href={cat.href}
                                                        onClick={() => {
                                                            setMobileCategoriesOpen(false);
                                                            setIsMobileMenuOpen(false);
                                                        }}
                                                        className="group relative h-24 overflow-hidden rounded-lg bg-muslin-cream shadow-sm flex items-center justify-between p-4 border border-emerald-royal/5"
                                                    >
                                                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                                                            <RoyalImage
                                                                src={getOptimizedImage(cat.image || cat.icon || '/img/placeholder.png')}
                                                                alt={cat.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                                                        </div>

                                                        <div className="space-y-1 z-10 relative">
                                                            <h3 className="text-lg font-serif text-emerald-royal group-hover:text-heritage-gold transition-colors">{cat.name}</h3>
                                                        </div>
                                                        <ChevronDown size={16} className="text-heritage-gold/50 group-hover:text-heritage-gold transition-colors transform -rotate-90 z-10 relative" />
                                                    </Link>
                                                ))}

                                                <Link
                                                    href="/shop"
                                                    onClick={() => {
                                                        setMobileCategoriesOpen(false);
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    className="flex items-center justify-center py-3 border-2 border-heritage-gold/20 text-heritage-gold text-xs uppercase font-bold tracking-widest hover:bg-heritage-gold hover:text-white transition-all rounded-lg mt-4"
                                                >
                                                    {t("nav_view_all_monarch")}
                                                </Link>
                                            </div>
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
