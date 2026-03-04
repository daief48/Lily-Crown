"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { WishlistModal } from "@/components/ui/WishlistModal";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopSort } from "@/components/shop/ShopSort";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { api } from "@/lib/api";
import Skeleton from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, ShoppingBag, LayoutGrid, List } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function ShopPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'

    // Filter State
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || null,
        min_price: searchParams.get('min_price') || null,
        max_price: searchParams.get('max_price') || null,
        sort: searchParams.get('sort') || 'newest',
        search: searchParams.get('search') || null,
        in_stock: searchParams.get('in_stock') === 'true',
        is_ready_to_ship: searchParams.get('is_ready_to_ship') === 'true',
    });

    const loadProducts = async () => {
        setLoading(true);
        const activeParams = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v != null && v !== '')
        );
        const data = await api.getProducts(activeParams);
        if (data) setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        loadProducts();

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => {
            if (v) params.set(k, v);
        });
        const currentUrl = window.location.search;
        const nextUrl = params.toString() ? `?${params.toString()}` : '';
        if (currentUrl !== nextUrl) {
            router.push(`/shop${nextUrl}`, { scroll: false });
        }
    }, [filters]);

    // Sync URL params to state (Internal & External changes)
    useEffect(() => {
        setFilters({
            category: searchParams.get('category') || null,
            min_price: searchParams.get('min_price') || null,
            max_price: searchParams.get('max_price') || null,
            sort: searchParams.get('sort') || 'newest',
            search: searchParams.get('search') || null,
            in_stock: searchParams.get('in_stock') === 'true',
            is_ready_to_ship: searchParams.get('is_ready_to_ship') === 'true',
        });
    }, [searchParams]);

    // Body scroll lock
    useEffect(() => {
        if (isMobileFiltersOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileFiltersOpen]);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const clearAllFilters = () => {
        setFilters({
            category: null,
            min_price: null,
            max_price: null,
            sort: 'newest',
            search: null,
            in_stock: false,
            is_ready_to_ship: false
        });
    };

    return (
        <main className="min-h-screen bg-[#f8f9fa]">
            <Navbar />

            <div className="pt-[90px] md:pt-[100px] lg:pt-[110px] pb-16 px-4 md:px-10 max-w-[1700px] mx-auto relative z-10">
                <Breadcrumbs
                    items={[
                        { label: t('shop_treasury'), href: "/shop" },
                        { label: filters.category || t('shop_all_collections') }
                    ]}
                    className="mb-6"
                />

                {/* Category Banner area */}
                <div className="relative h-44 md:h-64 rounded-3xl overflow-hidden bg-emerald-royal mb-10 group shadow-2xl shadow-emerald-royal/10">
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://picsum.photos/1600/600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-[2s]"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-royal via-emerald-royal/80 to-transparent"></div>

                    <div className="relative h-full flex flex-col justify-center px-10 md:px-20">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-serif text-white mb-4 capitalize tracking-tight"
                        >
                            {filters.category ? filters.category.replace('-', ' ') : t('shop_royal_treasury_title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/60 text-sm md:text-lg max-w-xl font-light leading-relaxed font-serif italic"
                        >
                            "{t('shop_royal_treasury_desc')}"
                        </motion.p>
                    </div>

                    {/* Royal Decoration */}
                    <div className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center opacity-10">
                        <div className="w-56 h-56 border-[0.5px] border-white/50 rounded-full animate-spin-slow flex items-center justify-center">
                            <div className="w-48 h-48 border-[0.5px] border-white/30 rounded-full flex items-center justify-center">
                                <div className="w-40 h-40 bg-white/20 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:items-start">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32">
                        <ShopFilters
                            activeFilters={filters}
                            onFilterChange={handleFilterChange}
                            onClearAll={clearAllFilters}
                        />
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        {/* Compact Professional Top Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3.5 rounded-2xl shadow-sm border border-black/[0.03] mb-8 gap-4">
                            <div className="flex items-center gap-4 pl-4">
                                <p className="text-emerald-royal/40 font-bold text-[10px] uppercase tracking-[0.2em]">
                                    <span className="text-emerald-royal mr-1">{products.length}</span> {t('shop_results')}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto pr-2">
                                {/* Density Toggle */}
                                <div className="hidden md:flex items-center bg-gray-50/50 p-1 rounded-xl border border-black/[0.02]">
                                    <button
                                        onClick={() => setViewType('grid')}
                                        className={cn(
                                            "p-2 rounded-lg transition-all",
                                            viewType === 'grid' ? "bg-white text-emerald-royal shadow-sm" : "text-gray-300 hover:text-emerald-royal"
                                        )}
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        onClick={() => setViewType('list')}
                                        className={cn(
                                            "p-2 rounded-lg transition-all",
                                            viewType === 'list' ? "bg-white text-emerald-royal shadow-sm" : "text-gray-300 hover:text-emerald-royal"
                                        )}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>

                                <ShopSort
                                    activeSort={filters.sort}
                                    onSortChange={(val) => handleFilterChange({ sort: val })}
                                    totalItems={products.length}
                                    onMobileFilterClick={() => setIsMobileFiltersOpen(true)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="space-y-4 bg-white p-5 rounded-2xl border border-black/[0.03]">
                                        <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                        <div className="space-y-3">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-4 w-1/4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <motion.div
                                layout
                                className={cn(
                                    "grid gap-6 md:gap-8",
                                    viewType === 'grid' ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                                )}
                            >
                                <AnimatePresence mode="popLayout">
                                    {products.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.02 }}
                                        >
                                            <ProductCard product={product} index={index} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-40 bg-white rounded-[2.5rem] border border-dashed border-heritage-gold/20"
                            >
                                <ShoppingBag size={56} className="mx-auto text-heritage-gold/20 mb-6" />
                                <h3 className="text-2xl font-serif text-emerald-royal italic mb-2">{t('shop_no_results_title')}</h3>
                                <p className="text-gray-400 font-light max-w-xs mx-auto text-sm">{t('shop_no_results_desc')}</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-8 px-10 py-3.5 bg-emerald-royal text-white rounded-full text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl"
                                >
                                    {t('shop_reset_hunt')}
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
            <WishlistModal />

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-[#0c1a16]/80 backdrop-blur-md z-[60]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-[#f8f9fa] z-[70] shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 border-b border-black/[0.05]">
                                <div className="flex items-center gap-4 text-emerald-royal">
                                    <SlidersHorizontal size={20} className="text-heritage-gold" />
                                    <h2 className="text-xl font-serif">{t('shop_refine_selection')}</h2>
                                </div>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2"><X size={24} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                                <ShopFilters
                                    activeFilters={filters}
                                    onFilterChange={handleFilterChange}
                                    onClearAll={clearAllFilters}
                                    isMobile={true}
                                />
                            </div>

                            <div className="p-8 border-t bg-white">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-emerald-royal text-white py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold shadow-xl shadow-emerald-royal/20 active:scale-95 transition-all"
                                >
                                    {t('shop_experience_results')}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </main>
    );
}
